@echo off
REM Valentine's Day Website Deployment Script for Windows
REM This script helps deploy your website to various platforms

echo 💕 Valentine's Day Website Deployment Script 💕
echo ==============================================
echo.

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  Warning: .env file not found!
    echo Please create a .env file with your email configuration.
    echo See EMAIL_SETUP.md for details.
    echo.
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Test the server locally
echo 🧪 Testing server locally...
start /B npm start
timeout /t 5 /nobreak > nul

REM Test if server is responding
curl -s http://localhost:3000 > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Server is running successfully!
    echo 🌐 Visit: http://localhost:3000
    echo 📊 Admin: http://localhost:3000/admin
) else (
    echo ❌ Server failed to start. Check for errors above.
)

REM Kill any remaining node processes
taskkill /F /IM node.exe > nul 2>&1

echo.
echo 🚀 Ready for deployment!
echo.
echo Choose your deployment platform:
echo 1. Vercel (Recommended - FREE)
echo 2. Heroku
echo 3. Railway
echo 4. Netlify
echo.
echo For Vercel deployment:
echo 1. Push to GitHub
echo 2. Connect repo to Vercel
echo 3. Set environment variables in Vercel dashboard
echo.
echo See DEPLOYMENT.md and VERCEL_DEPLOY.md for detailed instructions.

pause
