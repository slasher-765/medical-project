require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { BlobServiceClient } = require('@azure/storage-blob');
const { ClientSecretCredential } = require('@azure/identity');
const User = require('./models/User');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors({ origin: 'http://localhost:8000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-storage')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Authentication Routes
// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
    try {
        console.log('Signup request received:', { email: req.body.email, name: req.body.name });
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            console.log('Missing fields:', { email: !!email, password: !!password, name: !!name });
            return res.status(400).json({ message: 'Email, password, and name are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, name });
        console.log('User created successfully:', email);

        const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { email, name } });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Signup failed: ' + err.message });
    }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        console.log('Login request received:', { email: req.body.email });
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('Login successful:', email);
        const token = jwt.sign({ email, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { email, name: user.name } });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed: ' + err.message });
    }
});


// Verify token endpoint
app.get('/api/auth/verify', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// Logout endpoint (client-side mainly)
app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Azure AD authentication
const credential = new ClientSecretCredential(
    process.env.TENANT_ID,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
    credential
);

const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_CONTAINER
);

// Home page
app.get('/', (req, res) => {
    res.json({ message: 'Medical Storage API. Use React frontend on port 3001 to access.' });
});

// Upload file (protected)
app.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
    try {
        const blobName = req.file.originalname;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadFile(req.file.path);

        res.send("File uploaded successfully!");
    } catch (err) {
        console.error(err);
        res.send("Upload failed");
    }
});

// List files (protected)
app.get('/files', authenticateToken, async (req, res) => {
    let files = [];

    for await (const blob of containerClient.listBlobsFlat()) {
        files.push(blob.name);
    }

    res.json({ files, message: `Retrieved ${files.length} files` });
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Server running on port ${PORT}`);
});