# Routing Guide

## Application Routes

The Medical Storage application has the following route structure:

### Public Routes (No Authentication Required)

#### 1. **Landing Page** - `/`
- **Component:** `LandingPage.js`
- **Purpose:** Marketing and home page
- **Features:**
  - Project hero section
  - Feature showcase
  - Call-to-action buttons
  - Navigation to login/signup
  - Fully responsive design
- **Navbar Links:**
  - "Login" button → `/login`
  - "Sign Up" button → `/signup`

#### 2. **Login Page** - `/login`
- **Component:** `Login.js`
- **Purpose:** User authentication
- **Features:**
  - Email input field
  - Password input field
  - Form validation
  - Error message display
  - Loading state
  - Link to signup page
- **After Success:** Redirects to `/dashboard`
- **If Already Logged In:** Redirects to `/dashboard`

#### 3. **Signup Page** - `/signup`
- **Component:** `Signup.js`
- **Purpose:** User registration
- **Features:**
  - Full name input field
  - Email input field
  - Password input field
  - Confirm password input field
  - Password validation (min 6 chars, matching)
  - Error message display
  - Loading state
  - Link to login page
- **After Success:** Redirects to `/dashboard`
- **If Already Logged In:** Redirects to `/dashboard`

### Protected Routes (Authentication Required)

#### 4. **Dashboard** - `/dashboard`
- **Component:** `Dashboard.js`
- **Purpose:** Main application interface
- **Features:**
  - File upload section
  - Medical records listing
  - User profile display
  - Logout button
  - Real-time file refresh
- **Access Protection:** Requires valid JWT token in localStorage
- **If Not Authenticated:** Redirects to `/login`

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  User Visits http://localhost:8000                         │
│                     ↓                                        │
│           LandingPage Component (/)                         │
│        [Browse Features & Benefits]                         │
│                     ↓                                        │
│    ┌────────────────────────────────┐                      │
│    ↓                                ↓                       │
│ Login Page                      Signup Page                │
│   (/login)                       (/signup)                 │
│                                                             │
│ Try login                      Create new account           │
│    ↓                                ↓                       │
│ Valid credentials?             Valid data?                  │
│    ↓                                ↓                       │
│   YES ──────────────────────────── YES                      │
│    ↓                                ↓                       │
│    └────────────────────────────────┘                       │
│                  ↓                                           │
│         Generate JWT Token                                 │
│         Save to localStorage                               │
│                  ↓                                           │
│          Redirect to /dashboard                             │
│                  ↓                                           │
│         Dashboard Component                                │
│      [User's Medical Records]                              │
│          [Upload Files]                                    │
│          [View Files]                                      │
│          [Logout Button]                                   │
│                  ↓                                           │
│           User Clicks Logout                               │
│              ↓                                              │
│      Remove JWT Token                                      │
│      Clear localStorage                                    │
│              ↓                                              │
│         Redirect to /login                                 │
│              ↓                                              │
│        Back to Login Page                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Protected Route Implementation

```javascript
// In App.js
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingComponent />;
    }

    return user ? children : <Navigate to="/login" />;
}

// Usage:
<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
```

## Authentication Flow

### Login Process
```
1. User enters email & password on /login
2. Click "Login" button
3. Send POST request to http://localhost:3000/api/auth/login
4. Backend validates credentials
5. Backend returns JWT token if valid
6. Token stored in localStorage
7. User state updated in AuthContext
8. Redirect to /dashboard
```

### Signup Process
```
1. User enters name, email, password on /signup
2. Client validates password match & length
3. Click "Create Account" button
4. Send POST request to http://localhost:3000/api/auth/signup
5. Backend creates user account
6. Backend returns JWT token
7. Token stored in localStorage
8. User state updated in AuthContext
9. Redirect to /dashboard
```

### Logout Process
```
1. User clicks "Logout" button on /dashboard
2. Clear localStorage token
3. Clear user state in AuthContext
4. Redirect to /login
```

## URL Mapping

```
┌─────────────────────┬────────────────────────┬──────────────┐
│ Path                │ Component              │ Status       │
├─────────────────────┼────────────────────────┼──────────────┤
│ /                   │ LandingPage.js         │ Public       │
│ /login              │ Login.js               │ Public       │
│ /signup             │ Signup.js              │ Public       │
│ /dashboard          │ Dashboard.js           │ Protected    │
│ /unknown-route      │ Dashboard.js (if auth) │ Conditional  │
│                     │ Login.js (if unauth)   │              │
└─────────────────────┴────────────────────────┴──────────────┘
```

## Browser History Example

**User Session:**
```
1. User opens http://localhost:8000
   → LandingPage displayed

2. User clicks "Sign Up" button
   → Navigate to http://localhost:8000/signup
   → Signup page displayed

3. User fills form and clicks "Create Account"
   → API request to backend
   → Token received
   → Navigate to http://localhost:8000/dashboard
   → Dashboard page displayed

4. User clicks "Logout" button
   → Token removed
   → Navigate to http://localhost:8000/login
   → Login page displayed

5. User enters credentials and clicks "Login"
   → API request to backend
   → Token received
   → Navigate to http://localhost:8000/dashboard
   → Dashboard page displayed
```

## Testing Routes

### Test Public Routes (No Auth)
```bash
# Should see landing page
curl http://localhost:8000/

# Should see login page
curl http://localhost:8000/login

# Should see signup page
curl http://localhost:8000/signup
```

### Test Redirect to Public Route (If Already Logged In)
```
1. Login with valid credentials
2. Navigate to http://localhost:8000/login
→ Should redirect to /dashboard

3. Still logged in
4. Navigate to http://localhost:8000/signup
→ Should redirect to /dashboard
```

### Test Protected Route (Auth Required)
```
1. Don't login
2. Try to access http://localhost:8000/dashboard
→ Should redirect to /login

3. Try to access directly via URL
→ Should still redirect to /login
```

## Component File Locations

```
client/src/
├── App.js                    # Route definitions
│   ├── <Route path="/">
│   ├── <Route path="/login">
│   ├── <Route path="/signup">
│   └── <Route path="/dashboard">
│
├── components/
│   ├── LandingPage.js        # / route
│   ├── Login.js              # /login route
│   ├── Signup.js             # /signup route
│   └── Dashboard.js          # /dashboard route (protected)
│
├── context/
│   └── AuthContext.js        # Auth state & logic
│
├── utils/
│   └── api.js                # API client with interceptors
│
└── styles/
    ├── LandingPage.css
    ├── Auth.css
    └── Dashboard.css
```

## Important Notes

1. **Token Storage:** JWT token is stored in `localStorage`
2. **Auto-redirect:** Already logged-in users are redirected from login/signup to dashboard
3. **Protected Routes:** Unauthenticated users trying to access dashboard are redirected to login
4. **Loading State:** App shows loading screen while checking authentication status
5. **CORS:** Backend allows requests from http://localhost:8000

## Troubleshooting Routes

| Issue | Cause | Solution |
|-------|-------|----------|
| Login redirect loops | Token invalid/expired | Clear localStorage and login again |
| Blank page on route | Component not loaded | Check browser console for errors |
| Cannot access dashboard | Not authenticated | Login first |
| Redirects to login when logged in | Token not saved | Check localStorage in DevTools |
