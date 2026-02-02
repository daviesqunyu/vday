#!/bin/bash

# Valentine's Day Website Deployment Script
# This script helps deploy your website to various platforms

echo "💕 Valentine's Day Website Deployment Script 💕"
echo "=============================================="

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please create a .env file with your email configuration."
    echo "See EMAIL_SETUP.md for details."
    echo ""
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Test the server locally
echo "🧪 Testing server locally..."
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test if server is responding
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server is running successfully!"
    echo "🌐 Visit: http://localhost:3000"
    echo "📊 Admin: http://localhost:3000/admin"
else
    echo "❌ Server failed to start. Check for errors above."
fi

# Kill the test server
kill $SERVER_PID 2>/dev/null

echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Choose your deployment platform:"
echo "1. Vercel (Recommended - FREE)"
echo "2. Heroku"
echo "3. Railway"
echo "4. Netlify"
echo ""
echo "For Vercel deployment:"
echo "1. Push to GitHub"
echo "2. Connect repo to Vercel"
echo "3. Set environment variables in Vercel dashboard"
echo ""
echo "See DEPLOYMENT.md and VERCEL_DEPLOY.md for detailed instructions."
