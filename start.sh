#!/bin/bash

# Start Backend and Frontend in parallel

echo "🚀 Starting Medical Storage Application..."
echo ""
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
echo "Starting Backend Server..."
cd /Users/shreyashkumar/Desktop/medical-project
npm start &
BACKEND_PID=$!

sleep 2

# Start frontend
echo "Starting Frontend Server..."
cd /Users/shreyashkumar/Desktop/medical-project/client
npm start &
FRONTEND_PID=$!

# Handle Ctrl+C to kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
