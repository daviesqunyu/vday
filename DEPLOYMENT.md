# 🚀 Deployment Guide - Valentine Website

## Option 1: Deploy to Vercel (Recommended - FREE & Easy!)

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. In your project folder, run:
```bash
git init
git add .
git commit -m "Initial commit - Valentine website"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login (use GitHub account)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect settings:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Click "Deploy"
6. Wait 1-2 minutes for deployment

### Step 3: Access Your Website

- **Main Website**: `https://your-project-name.vercel.app`
- **Admin Page**: `https://your-project-name.vercel.app/admin`

### Important Notes for Vercel:

⚠️ **Database Limitation**: Vercel uses serverless functions, so SQLite files are read-only. For production, consider:
- Using Vercel's serverless SQL (free tier available)
- Or use a cloud database like Supabase (free), PlanetScale, or MongoDB Atlas

**Quick Fix for Testing**: The current setup will work, but data resets on each deployment. For persistent data, see the database options below.

---

## Option 2: Deploy to Railway (Better for Databases - FREE!)

Railway is great because it supports persistent SQLite databases.

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Node.js
5. Add environment variable: `PORT=3000`
6. Deploy!

**Your links:**
- Main: `https://your-project.up.railway.app`
- Admin: `https://your-project.up.railway.app/admin`

---

## Option 3: Deploy to Render (FREE with Persistent Storage!)

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Name**: valentine-website
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Click "Create Web Service"

**Your links:**
- Main: `https://your-project.onrender.com`
- Admin: `https://your-project.onrender.com/admin`

---

## Option 4: Use a Cloud Database (Recommended for Production)

### Using Supabase (FREE & Easy!)

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run:
```sql
CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    answer TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```
4. Get your connection string from Settings → Database
5. Update `server.js` to use PostgreSQL instead of SQLite

---

## Quick Setup Commands

```bash
# Install dependencies
npm install

# Test locally
npm start

# Visit http://localhost:3000
# Admin: http://localhost:3000/admin
```

---

## Sharing Your Website

Once deployed, share these links:
- **Main Website**: Share this with your valentine! 💕
- **Admin Page**: Keep this private to see responses

---

## Troubleshooting

**Database not working on Vercel?**
- Vercel uses serverless functions (stateless)
- Use Railway, Render, or a cloud database instead

**Can't see responses?**
- Check the admin page: `/admin`
- Make sure the API endpoint is working: `/api/responses`

**Need help?** Check the deployment platform's documentation!

