require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { BlobServiceClient } = require('@azure/storage-blob');
const { ClientSecretCredential } = require('@azure/identity');
const path = require("path");

const User = require('./models/User');

const app = express();
const upload = multer({ dest: 'uploads/' });

/* -------------------- Middleware -------------------- */

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- MongoDB -------------------- */

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-storage')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

/* -------------------- JWT -------------------- */

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

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

/* -------------------- AUTH ROUTES -------------------- */

app.post('/api/auth/signup', async (req, res) => {

    try {

        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password, and name are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword,
            name
        });

        const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ token, user: { email, name } });

    } catch (err) {

        res.status(500).json({ message: 'Signup failed: ' + err.message });

    }

});


app.post('/api/auth/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { email, name: user.name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { email, name: user.name } });

    } catch (err) {

        res.status(500).json({ message: 'Login failed: ' + err.message });

    }

});


app.get('/api/auth/verify', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});


/* -------------------- AZURE STORAGE -------------------- */

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


/* -------------------- FILE UPLOAD -------------------- */

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


app.get('/files', authenticateToken, async (req, res) => {

    let files = [];

    for await (const blob of containerClient.listBlobsFlat()) {
        files.push(blob.name);
    }

    res.json({
        files,
        message: `Retrieved ${files.length} files`
    });

});


/* -------------------- SERVE REACT FRONTEND -------------------- */

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "build", "index.html"));

});


/* -------------------- START SERVER -------------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {

    console.log(`Backend Server running on port ${PORT}`);

});