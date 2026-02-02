# 💕 Valentine's Day Website

A beautiful, interactive Valentine's Day website with a fun game where the "No" button runs away from your cursor!

## Features

- 🎨 Beautiful pink-themed design with animations
- 🧸 Cute teddy bear images and adorable elements
- 💖 Floating hearts background
- 🎮 Interactive game: "No" button runs away from cursor
- ✅ Only "Yes" button is clickable
- 💾 SQLite database to record responses
- 🎉 Celebration animation when "Yes" is clicked
- 📱 Fully responsive design
- 📊 Admin page to view all responses

## Quick Start (Local)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - Main page: `http://localhost:3000`
   - Admin page: `http://localhost:3000/admin`

## 🚀 Deploy to Get a Shareable Link!

### Option 1: Vercel (Easiest - FREE!)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "Add New Project" → Import your GitHub repo
4. Deploy! (Takes 1-2 minutes)

**Your links:**
- Main: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin`

### Option 2: Railway (Best for Database - FREE!)

1. Push to GitHub
2. Go to [railway.app](https://railway.app) and sign up
3. New Project → Deploy from GitHub
4. Done!

**Your links:**
- Main: `https://your-project.up.railway.app`
- Admin: `https://your-project.up.railway.app/admin`

### Option 3: Render (FREE!)

1. Push to GitHub
2. Go to [render.com](https://render.com) and sign up
3. New Web Service → Connect GitHub repo
4. Deploy!

**Your links:**
- Main: `https://your-project.onrender.com`
- Admin: `https://your-project.onrender.com/admin`

📖 **Full deployment guide:** See `DEPLOYMENT.md` for detailed instructions!

## How It Works

- The "No" button detects your cursor and moves away from it (black button, unclickable)
- Only the "Yes" button can be clicked
- When "Yes" is clicked, a celebration animation plays
- The response is saved to a SQLite database
- View all responses on the `/admin` page

## API Endpoints

- `POST /api/save-response` - Save a response to the database
- `GET /api/responses` - Get all saved responses

## Pages

- `/` - Main Valentine's page
- `/admin` - View all responses (who said yes!)

## Technologies Used

- HTML5 & CSS3
- JavaScript (Vanilla)
- Node.js & Express
- SQLite3
- Font Awesome Icons
- Unsplash Images

Enjoy! 💕

