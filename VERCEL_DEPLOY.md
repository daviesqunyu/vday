# 🚀 Vercel Deployment Guide

## Quick Steps to Deploy

### 1. Go to Vercel
- Visit: https://vercel.com
- **Sign in with GitHub** (use the same account as your repo)

### 2. Import Project
- Click **"Add New..."** → **"Project"**
- Find your repository: `daviesqunyu/vday`
- Click **"Import"**

### 3. Configure Settings
Vercel should auto-detect everything, but verify:
- **Framework Preset**: `Other`
- **Root Directory**: `./`
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `npm install` (auto-filled)

### 4. Deploy!
- Click **"Deploy"** button
- Wait 1-2 minutes ⏳

### 5. Get Your Links! 🎉
After deployment completes:
- **Main Website**: `https://vday-xxxxx.vercel.app`
- **Admin Page**: `https://vday-xxxxx.vercel.app/admin`

## Important Notes

### Database Limitation on Vercel
⚠️ **Vercel uses serverless functions** - SQLite files reset on each deployment.

**Solutions:**
1. **For Testing**: Current setup works, but data resets
2. **For Production**: Use one of these:
   - **Railway** (recommended) - supports persistent SQLite
   - **Render** - also supports persistent storage
   - **Cloud Database** - Supabase, PlanetScale, MongoDB Atlas

### If You Need Persistent Database

**Option A: Deploy to Railway Instead**
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select `daviesqunyu/vday`
5. Done! Database persists automatically

**Option B: Use Cloud Database**
- Sign up for free Supabase account
- Create PostgreSQL database
- Update `server.js` to use PostgreSQL instead of SQLite

## Troubleshooting

**Build fails?**
- Check that `package.json` has all dependencies
- Make sure `vercel.json` is in the root

**Database not working?**
- This is expected on Vercel (serverless)
- Use Railway or Render for persistent database

**Music not playing?**
- Make sure you've added your music file
- Check browser console for errors
- Some browsers block autoplay

## Your Repository
🔗 https://github.com/daviesqunyu/vday

## After Deployment

1. **Test your website**: Visit the main URL
2. **Test admin page**: Visit `/admin` URL
3. **Share the main link** with your valentine! 💕
4. **Keep admin link private** to see responses

Enjoy! 🎉

