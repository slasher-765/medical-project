# Visual Route Diagram

## Application Structure

```
┌──────────────────────────────────────────────────────────────────┐
│                     Medical Storage App                          │
│                    (http://localhost:8000)                       │
└──────────────────────────────────────────────────────────────────┘

                          App.js
                   (Route Configuration)
                           │
        ┌──────────────────┼──────────────────┬──────────────┐
        │                  │                  │              │
        ▼                  ▼                  ▼              ▼
    Route: /          Route: /login      Route: /signup  Route: /dashboard
    (Public)          (Public)           (Public)        (Protected)
        │                  │                  │              │
        ▼                  ▼                  ▼              ▼
   LandingPage.js      Login.js          Signup.js       Dashboard.js
        │                  │                  │              │
        │                  │                  │              │
    ┌───┴────────┐    ┌────┴───┐        ┌────┴────┐    ┌────┴──────┐
    │ Marketing  │    │ Email  │        │  Name   │    │  Upload   │
    │ Hero       │    │ Pass   │        │  Email  │    │  Section  │
    │ Features   │    │ Form   │        │  Pass   │    │           │
    │ CTA Btns   │    │        │        │  Confirm│    │  Files    │
    │            │    │[Login] │        │  Pass   │    │  List     │
    │            │    │        │        │         │    │           │
    │            │    │Link to │        │ [Create]│    │ [Logout]  │
    │            │    │Signup  │        │         │    │           │
    └────────────┘    │Link to │        │Link to  │    └───────────┘
                      │Landing │        │Login    │
                      └─────────┘        └────────┘
```

## Navigation Map

```
                    START
                     │
                     ▼
             /  (Landing Page)
                     │
        ┌────────────┴─────────────┐
        │                          │
        ▼                          ▼
   "Sign Up" btn           "Sign In" btn
        │                          │
        ▼                          ▼
   /signup                      /login
     │                            │
     │ Enter details              │ Enter credentials
     ▼                            ▼
   [Create Account]          [Login]
         │                        │
         └────────┬───────────────┘
                  │
                  ▼ (Both routes)
            JWT Token generated
            Save to localStorage
                  │
                  ▼
            /dashboard
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
    Upload Files      View Files
        │                    │
        └─────────┬──────────┘
                  │
              [Logout]
                  │
    Remove Token from localStorage
                  │
                  ▼
            /login again
```

## Component Hierarchy

```
App.js
├── BrowserRouter
│   └── AuthProvider
│       └── AppRoutes
│           ├── Route: /
│           │   └── LandingPage
│           │       ├── Navbar
│           │       ├── Hero Section
│           │       └── Features Section
│           │
│           ├── Route: /login
│           │   └── Login
│           │       └── Auth Form
│           │
│           ├── Route: /signup
│           │   └── Signup
│           │       └── Auth Form
│           │
│           └── Route: /dashboard
│               └── ProtectedRoute
│                   └── Dashboard
│                       ├── Header
│                       ├── Upload Section
│                       └── Files Section
```

## Data Flow

```
┌────────────────────────────────────────────────────────┐
│                  authContext.js                         │
│  (Manages user state, login, signup, logout)           │
└────────────────────────────────────────────────────────┘
         ▲                            ▲
         │                            │
    useAuth()                    useAuth()
         │                            │
         ▼                            ▼
    Login.js                      Dashboard.js
    Signup.js                      (calls authContext)
                                    (shows user data)
```

## Authentication Flow

```
1. User Action (Login/Signup)
   │
   ▼
2. Form Submission
   │
   ▼
3. API Request to Backend
   (http://localhost:3000/api/auth/login or /signup)
   │
   ▼
4. Backend Validates & Returns JWT Token
   │
   ▼
5. Token Saved in localStorage
   │
   ▼
6. AuthContext Updated with User Data
   │
   ▼
7. Navigation to /dashboard
   │
   ▼
8. Dashboard Renders (Protected Route checks token)
```

## Protected Route Check

```
User navigates to /dashboard
        │
        ▼
Load ProtectedRoute Component
        │
        ▼
Check: Is user logged in?
        │
    ┌───┴───┐
    │       │
   YES     NO
    │       │
    ▼       ▼
 Show    Navigate
Dashboard to /login
```

## File Organization

```
client/src/
│
├── 📄 App.js (Central routing)
│
├── 📁 components/
│   ├── 📄 LandingPage.js
│   ├── 📄 Login.js
│   ├── 📄 Signup.js
│   └── 📄 Dashboard.js
│
├── 📁 context/
│   └── 📄 AuthContext.js (Authentication logic)
│
├── 📁 utils/
│   └── 📄 api.js (API calls)
│
├── 📁 styles/
│   ├── 📄 LandingPage.css
│   ├── 📄 Auth.css
│   └── 📄 Dashboard.css
│
└── 📄 index.js
```

## Route Decision Tree

```
                    User Visits App
                           │
                           ▼
              Is user already logged in?
                    (Token in localStorage)
                           │
                ┌──────────┴──────────┐
                │                     │
               YES                   NO
                │                     │
                ▼                     ▼
          Redirect to          Show requested page
          /dashboard           (/, /login, /signup)
                                     │
                        ┌────────────┼────────────┐
                        ▼            ▼            ▼
                        /        /login           /signup
                    (Landing) (Login form)    (Signup form)
                        │            │            │
              Click buttons │          │            │
                    │        │          │
                    └────┬───┴──────────┘
                         │
                         ▼
                   Enter credentials
                         │
                         ▼
                   Click "Login/Create"
                         │
                         ▼
                   Valid? (Backend check)
                    │     │
                   YES    NO
                    │     │
                    ▼     ▼
                Success  Error message
                    │     (user stays)
                    ▼
              Get JWT Token
                    │
                    ▼
            Save to localStorage
                    │
                    ▼
            Redirect to /dashboard
                    │
                    ▼
                DASHBOARD
                (Protected Page)
```

## Summary

- **4 Routes Total**: Landing, Login, Signup, Dashboard
- **3 Public Routes**: Anyone can access (/, /login, /signup)
- **1 Protected Route**: Only authenticated users (/dashboard)
- **Smart Redirects**: Already logged-in users skip directly to dashboard
- **Clear Navigation**: Each page has links to related pages
