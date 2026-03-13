# Signup/Login Troubleshooting Guide

## Common Issues and Solutions

### 1. **Backend Server Not Running**
If you see "Signup failed - please check backend server is running" error:

**Check if backend is running:**
```bash
# Terminal 1 - Check if port 3000 is in use
lsof -i :3000
```

**Start the backend:**
```bash
cd /Users/shreyashkumar/Desktop/medical-project
npm start
```

You should see:
```
Backend Server running on port 3000
```

---

## 2. **Browser Console Debugging**

Open your browser's Developer Tools (F12 or Cmd+Option+I) and check the **Console** tab.

### Look for these logs:

**For Signup:**
```
API Request: POST http://localhost:3000/api/auth/signup
API Response: 200 http://localhost:3000/api/auth/signup
```

**Backend Console should show:**
```
Signup request received: { email: 'test@example.com', name: 'Test User' }
User created successfully: test@example.com
```

### Common API Errors:

| Error | Cause | Solution |
|-------|-------|----------|
| `Response error: undefined` | Backend not running | Start backend with `npm start` |
| `CORS error` | Frontend CORS misconfigured | Verify frontend is on port 8000 |
| `400 User already exists` | Email already signed up | Use a different email address |
| `400 Email, password, and name are required` | Missing form field | Fill all fields |
| `500 Signup failed` | Backend error | Check backend console logs |

---

## 3. **Port Conflicts**

If ports are already in use:

**Kill process on port 3000 (backend):**
```bash
lsof -ti:3000 | xargs kill -9
```

**Kill process on port 8000 (frontend):**
```bash
lsof -ti:8000 | xargs kill -9
```

---

## 4. **Step-by-Step Debug**

1. **Start Backend:**
   ```bash
   cd /Users/shreyashkumar/Desktop/medical-project
   npm start
   ```
   Wait for: `Backend Server running on port 3000`

2. **Start Frontend:**
   ```bash
   cd /Users/shreyashkumar/Desktop/medical-project/client
   npm start
   ```

3. **Test API in Browser:**
   - Open http://localhost:8000
   - Open Developer Tools (F12)
   - Go to Console tab

4. **Try Signup:**
   - Email: `test123@example.com`
   - Password: `password123`
   - Name: `Test User`
   - Check Console for logs

5. **Check Logs:**
   - **Frontend Console:** Should show `API Request: POST` and `API Response: 200`
   - **Backend Console:** Should show `Signup request received:` and `User created successfully:`

---

## 5. **Network Tab Debugging**

In DevTools, go to **Network** tab:

1. Click on the signup request
2. Check:
   - Status: Should be `200`
   - Response: Should show `{ token: "...", user: { email, name } }`
   - Headers: Should show `Content-Type: application/json`

---

## 6. **Clear Cache & Reinstall**

If nothing works:

```bash
# Clear frontend node_modules
cd /Users/shreyashkumar/Desktop/medical-project/client
rm -rf node_modules package-lock.json
npm install

# Go back to backend
cd ..
unset NODE_ENV
npm start
```

---

## 7. **Verify .env Files**

**Backend `.env` (in root):**
```
PORT=3000
JWT_SECRET=4384bdsbfbhshjdkjscnsdfjhsdfhjsdfh
```

**Frontend `.env` (in client folder):**
```
PORT=8000
BROWSER=none
```

---

## 8. **Test API Directly with curl**

```bash
# Test if backend is responding
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

Expected response:
```json
{"token":"eyJhbGc...","user":{"email":"test@example.com","name":"Test User"}}
```

---

## 9. **Still Not Working?**

1. Check if both servers are running
2. Check port numbers (Backend: 3000, Frontend: 8000)
3. Check .env files are configured
4. Look at browser console (F12)
5. Look at terminal where npm start is running
6. Try different email address (not used before)

---

**More Help:** If you're still stuck, share:
- Screenshot of error message
- Console logs from browser (F12 → Console)
- Console output from terminal running `npm start`
