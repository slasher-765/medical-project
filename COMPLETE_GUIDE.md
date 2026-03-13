# Complete Setup & Usage Guide

## 🎯 Quick Overview

Your Medical Storage application now has **4 separate routes** with a professional landing page:

```
Home Page      → /          (Marketing/Features)
Login Page     → /login     (User Authentication)
Signup Page    → /signup    (User Registration)
Dashboard      → /dashboard (Medical Records - Protected)
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16+ installed
- npm or yarn
- Backend and Frontend running on separate ports

### Step 1: Install Dependencies

**Backend:**
```bash
cd /Users/shreyashkumar/Desktop/medical-project
npm install
```

**Frontend:**
```bash
cd /Users/shreyashkumar/Desktop/medical-project/client
npm install
```

### Step 2: Configure Environment

**Backend `.env` (in root directory):**
```env
PORT=3000
JWT_SECRET=your_secure_secret_key

# Azure Storage (optional)
TENANT_ID=your_tenant_id
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
AZURE_STORAGE_ACCOUNT=your_account_name
AZURE_CONTAINER=medical-records
```

**Frontend `.env` (in client folder):**
```env
PORT=8000
BROWSER=none
```

---

## 🏃 Running the Application

### Terminal 1 - Start Backend

```bash
cd /Users/shreyashkumar/Desktop/medical-project
npm start
```

Expected output:
```
Backend Server running on port 3000
```

### Terminal 2 - Start Frontend

```bash
cd /Users/shreyashkumar/Desktop/medical-project/client
npm start
```

Browser should open: `http://localhost:8000`

---

## 🗺️ Application Routes Guide

### Route 1: Landing Page (`/`)
**What you'll see:**
- Medical Storage branding
- Features showcase with icons
- Call-to-action buttons
- Navigation buttons to login/signup
- Responsive design

**Navbar Actions:**
- "Login" button → Goes to `/login`
- "Sign Up" button → Goes to `/signup`

**Hero Section Actions:**
- "Get Started Free" → Goes to `/signup`
- "Sign In" → Goes to `/login`

---

### Route 2: Login Page (`/login`)

**What you'll see:**
- Email input field
- Password input field
- "Login" button
- Link to signup page
- Error messages (if login fails)

**What to do:**
1. Enter your registered email
2. Enter your password
3. Click "Login"
4. If valid → Redirected to `/dashboard`
5. If invalid → Error message displayed

**Links:**
- "Sign up here" → Goes to `/signup`

---

### Route 3: Signup Page (`/signup`)

**What you'll see:**
- Full Name input field
- Email input field
- Password input field (min 6 characters)
- Confirm Password input field
- "Create Account" button
- Link to login page
- Validation errors (if form invalid)

**What to do:**
1. Enter your full name
2. Enter an email (must be new)
3. Enter password (min 6 characters)
4. Confirm password (must match)
5. Click "Create Account"
6. If valid → Automatically logged in → Redirected to `/dashboard`
7. If invalid → Error message displayed

**Validations:**
- ✅ Passwords must match
- ✅ Password must be at least 6 characters
- ✅ Email must be new (not already registered)
- ✅ All fields must be filled

**Links:**
- "Sign in here" → Goes to `/login`

---

### Route 4: Dashboard (`/dashboard`)

**What you'll see:**
- User welcome message with name
- "Logout" button
- Upload Section with file input
- Medical Records list

**What you can do:**
1. **Upload Files:**
   - Click "Choose File" button
   - Select a medical record file
   - Click "Upload File"
   - File appears in Medical Records section

2. **View Files:**
   - See all uploaded files in the "Medical Records" section
   - Files display with document icon and filename

3. **Logout:**
   - Click "Logout" button
   - Redirected to `/login`

**Access Protection:**
- Can only access if logged in
- If not logged in → Redirected to `/login`
- Token stored in localStorage
- If token expires → Auto-redirect to `/login`

---

## 📱 User Journey Example

### New User Signup Flow
```
1. Open http://localhost:8000
2. See Landing Page with features
3. Click "Get Started Free" button
4. Redirected to /signup
5. Fill: Name, Email, Password, Confirm
6. Click "Create Account"
7. Account created + Auto-login
8. Redirected to /dashboard
9. Upload medical files
10. Click Logout
11. Redirected to /login
```

### Existing User Login Flow
```
1. Open http://localhost:8000
2. See Landing Page
3. Click "Sign In" button
4. Redirected to /login
5. Enter email and password
6. Click "Login"
7. Redirect to /dashboard
8. Access medical records
9. Upload new files
10. Click Logout
```

---

## 🔒 Security Features

✅ **JWT Authentication**
- Token generated after login/signup
- Stored securely in localStorage
- Validated on every protected route access

✅ **Password Security**
- Passwords hashed with bcryptjs
- Minimum 6 characters required
- Never stored in plain text

✅ **Protected Routes**
- Dashboard only accessible to authenticated users
- Unauthorized access redirects to login
- Token validation on each request

✅ **CORS Protection**
- Backend only accepts requests from port 8000
- Prevents unauthorized cross-origin requests

---

## 🐛 Troubleshooting

### Issue: Can't Access Landing Page
**Solution:**
- Make sure frontend is running (`npm start` in client folder)
- Check if port 8000 is available
- Navigate to http://localhost:8000

### Issue: Login/Signup Fails
**Solution:**
- Make sure backend is running (`npm start` in root folder)
- Check if port 3000 is available
- Check browser console (F12) for error details
- Verify email isn't already registered (for signup)

### Issue: Can't Access Dashboard
**Solution:**
- Make sure you're logged in
- Check if authentication token exists (DevTools → Storage → localStorage)
- Try logging out and logging in again
- Clear browser cache and try again

### Issue: Dashboard Won't Load Files
**Solution:**
- Make sure backend is running
- Check if Azure credentials are configured correctly
- Check browser console for error details

### Clear Port Issues
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

---

## 📁 Project Structure

```
medical-project/
├── app.js                    # Backend server
├── package.json             # Backend dependencies
├── .env                     # Backend config
├── uploads/                 # Temp file storage
│
└── client/                  # React Frontend
    ├── package.json
    ├── .env                 # Frontend config
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js           # Route definitions
        ├── index.js
        ├── components/
        │   ├── LandingPage.js
        │   ├── Login.js
        │   ├── Signup.js
        │   └── Dashboard.js
        ├── context/
        │   └── AuthContext.js
        ├── utils/
        │   └── api.js
        └── styles/
            ├── LandingPage.css
            ├── Auth.css
            └── Dashboard.css
```

---

## 📚 Additional Documentation

For more detailed information, see:
- `ROUTING_GUIDE.md` - Complete routing documentation
- `ROUTING_SUMMARY.md` - Quick routing reference
- `VISUAL_ROUTES.md` - Diagrams and visual explanations
- `TROUBLESHOOTING.md` - Common issues and solutions

---

## ✨ Features Summary

✅ Professional landing page with features
✅ Separate login and signup pages
✅ User authentication with JWT
✅ Protected dashboard route
✅ File upload to Azure Storage
✅ File management and listing
✅ Responsive design (mobile-friendly)
✅ Form validation
✅ Error handling
✅ Loading states
✅ Console logging for debugging

---

## 🎉 You're All Set!

Your Medical Storage application is ready to use. Start with the landing page and explore all the features!

**Quick Links:**
- 🏠 Home: http://localhost:8000
- 🔐 Login: http://localhost:8000/login
- ✍️ Signup: http://localhost:8000/signup
- 📊 Dashboard: http://localhost:8000/dashboard (after login)


