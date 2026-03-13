# Medical Storage with Authentication

A full-stack medical records management system with user authentication, file upload/download capabilities, and Azure Storage integration.

## Project Structure

```
medical-project/
├── app.js                 # Backend server (Express.js)
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── uploads/               # Temporary file storage
└── client/                # React frontend
    ├── package.json       # Frontend dependencies
    ├── public/
    │   └── index.html     # HTML template
    └── src/
        ├── App.js         # Main app with route definitions
        ├── index.js       # React entry point
        ├── components/    # React components
        │   ├── LandingPage.js    # Marketing/home page (NEW)
        │   ├── Login.js          # Login route page
        │   ├── Signup.js         # Signup route page
        │   └── Dashboard.js      # Medical records dashboard
        ├── context/       # React context
        │   └── AuthContext.js
        ├── utils/         # Utility functions
        │   └── api.js     # Axios API client
        └── styles/        # CSS files
            ├── LandingPage.css   # Marketing page styles (NEW)
            ├── Auth.css          # Login/Signup styles
            └── Dashboard.css     # Dashboard styles
```

## Routing Structure

```
/                  → Landing Page (marketing, public)
/login             → Login Page (public)
/signup            → Signup Page (public)
/dashboard         → Dashboard (protected - requires authentication)
```

## Features

✅ Marketing Landing Page with Features
✅ Separate Login & Signup Pages
✅ User Authentication (JWT-based)
- Environment variables configured

## Installation

### 1. Backend Setup

```bash
cd /Users/shreyashkumar/Desktop/medical-project

# Install dependencies
npm install
```

### 2. Frontend Setup

```bash
cd client

# Install dependencies
npm install
```

## Environment Configuration

Create a `.env` file in the root directory:

```env
# Server
PORT=3000
JWT_SECRET=your_jwt_secret_key_change_this

# Azure Storage (optional for production)
TENANT_ID=your_tenant_id
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
AZURE_STORAGE_ACCOUNT=your_storage_account
AZURE_CONTAINER=medical-records
```

Create a `.env` file in the client directory:

```env
PORT=8000
BROWSER=none
```

## Running the Application

### Start Backend (Port 3000)

```bash
node app.js
```

Or with npm script:

```bash
npm start
```

Output:
```
Backend Server running on port 3000
```

### Start Frontend (Port 8000)

In a new terminal:

```bash
cd client
npm start
```

The frontend will automatically open at `http://localhost:8000`

## API Endpoints

### Authentication

**POST** `/api/auth/signup`
- Request: `{ email, password, name }`
- Response: `{ token, user }`

**POST** `/api/auth/login`
- Request: `{ email, password }`
- Response: `{ token, user }`

**GET** `/api/auth/verify`
- Headers: `Authorization: Bearer <token>`
- Response: `{ user }`

**POST** `/api/auth/logout`
- Response: `{ message }`

### File Operations

**POST** `/upload` (Protected)
- Headers: `Authorization: Bearer <token>`
- Body: FormData with file
- Response: Success message

**GET** `/files` (Protected)
- Headers: `Authorization: Bearer <token>`
- Response: `{ files: [...], message }`

## Usage Guide

### 1. Access Landing Page (Marketing/Home)
- Navigate to `http://localhost:8000`
- You'll see the Medical Storage marketing page
- Browse features, benefits, and call-to-action buttons
- Click "Get Started Free" or "Sign In" to navigate to signup/login

### 2. Sign Up (New User)
- Click "Get Started Free" button from landing page or use `/signup` route
- Enter:
  - Full Name
  - Email Address
  - Password (minimum 6 characters)
  - Confirm Password
- Click "Create Account"
- Automatically logged in and redirected to dashboard

### 3. Login (Existing User)
- Click "Sign In" button from landing page or use `/login` route
- Enter email and password
- Click "Login"
- Redirected to dashboard

### 4. Dashboard - Upload Medical Records
- Click "Choose File" and select a medical record file
- Click "Upload File"
- Files are securely stored in Azure Storage

### 5. Dashboard - View Your Records
- Your uploaded files appear in the "Your Medical Records" section
- The list automatically refreshes after upload
- Each file shows with a document icon and filename

### 6. Logout
- Click "Logout" button in the top-right corner

## Security Notes

⚠️ **Important for Production:**
1. Replace JWT_SECRET with a strong random string
2. Use a real database instead of in-memory user storage
3. Implement proper password reset flow
4. Use HTTPS instead of HTTP
5. Add rate limiting
6. Implement proper CORS policies
7. Use environment variables for sensitive data
8. Consider adding 2FA/MFA

## Technology Stack

**Backend:**
- Express.js - Web framework
- JWT - Token-based authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests
- Azure Storage SDK - File storage

**Frontend:**
- React 18 - UI library
- React Router - Client-side routing
- Axios - HTTP client
- Context API - State management

## Troubleshooting

### CORS Errors
Ensure the frontend is running on `http://localhost:8000` and backend on `http://localhost:3000`

### Token Expired
The token expires after 24 hours. Users will be redirected to login.

### File Upload Fails
- Check if Azure credentials are correct
- Verify file permissions in Azure Storage
- Check browser console for detailed errors

### Port Already in Use
```bash
# Force kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Force kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Email verification on signup
- Password reset functionality
- User profile management
- File sharing between users
- Download functionality for stored files
- Real-time notifications
- Two-factor authentication
- Admin panel for user management
- Audit logs

## License

ISC

## Support

For issues or questions, please check the console logs and error messages.
