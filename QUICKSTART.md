# Quick Start Guide - Medical Storage with Authentication

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 2: Configure Environment

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_secret_key_here
PORT=3000
```

For Azure Storage (optional):
```env
TENANT_ID=your_tenant_id
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
AZURE_STORAGE_ACCOUNT=your_account_name
AZURE_CONTAINER=medical-records
```

### Step 3: Start Backend (Terminal 1)

```bash
npm start
```

Expected output:
```
Backend Server running on port 3000
```

### Step 4: Start Frontend (Terminal 2)

```bash
cd client
npm start
```

Frontend opens at: `http://localhost:8000`

### Step 5: Test Application Flow

1. **Landing Page**
   - You'll see the Medical Storage marketing page
   - Browse features and benefits
   - Click "Get Started Free" or "Sign In"

2. **Sign Up (New User)**
   - Click "Sign Up" button or link from login page
   - Fill: Name, Email, Password, Confirm Password
   - Click "Create Account"

3. **Login (Existing User)**
   - Click "Sign In" button or link from signup page
   - Enter email and password
   - Click "Login"

4. **Dashboard**
   - Upload and manage medical records
   - View all uploaded files
   - Click "Logout" to disconnect

## �️ Application Routes

Your app has **4 main routes**:

| URL | Page | Purpose | Auth Required |
|-----|------|---------|---------------|
| `http://localhost:8000/` | Landing Page | Marketing & Features | ❌ No |
| `http://localhost:8000/login` | Login Page | User Login | ❌ No |
| `http://localhost:8000/signup` | Signup Page | User Registration | ❌ No |
| `http://localhost:8000/dashboard` | Dashboard | Medical Records | ✅ Yes |

**Smart Redirects:**
- If already logged in → Clicking login/signup redirects to dashboard
- If not logged in → Accessing dashboard redirects to login

## 📁 Project Architecture

```
Frontend (React) - Port 8000
    ├── /            (LandingPage.js - Marketing)
    ├── /login       (Login.js)
    ├── /signup      (Signup.js)
    └── /dashboard   (Dashboard.js - Protected)
        ↓ (API calls)
Backend (Express) - Port 3000
    ↓ (File storage)
Azure Blob Storage
````

## 🔑 Key Features

✅ **Authentication**
- Signup with email and password
- Secure login with JWT tokens
- Token expires after 24 hours
- Automatic logout on expiration

✅ **File Management**
- Upload medical records
- View list of uploaded files
- Azure Storage integration

✅ **User Experience**
- Beautiful gradient UI
- Responsive design
- Real-time error messages
- Loading states

## 📝 Default Test Account

During development, you can create a test account:

- Email: `test@medical.com`
- Password: `password123`
- Name: `Test User`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| Port 8000 in use | `lsof -ti:8000 \| xargs kill -9` |
| CORS errors | Ensure frontend runs on 8000, backend on 3000 |
| Login fails | Check JWT_SECRET in .env file |
| File upload fails | Check Azure credentials if using real storage |

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use .env file (never commit to git)
- [ ] Add .env to .gitignore
- [ ] Use HTTPS in production
- [ ] Implement database for users (replace in-memory storage)
- [ ] Add password reset functionality
- [ ] Enable 2FA for admin users
- [ ] Add rate limiting
- [ ] Sanitize file uploads

## 📚 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Create new account |
| POST | `/api/auth/login` | No | User login |
| GET | `/api/auth/verify` | Yes | Verify token |
| POST | `/api/auth/logout` | Yes | User logout |
| POST | `/upload` | Yes | Upload file |
| GET | `/files` | Yes | List files |

## 🎯 Next Steps

1. Add database (MongoDB/PostgreSQL)
2. Implement password reset
3. Add email verification
4. Create user profile page
5. Add file download feature
6. Implement file sharing
7. Add admin dashboard

## 📞 Support

For detailed documentation, see `README.md`

Happy coding! 🎉
