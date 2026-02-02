# 🎵 How to Add Gunna's "Bachelor" Song

## Quick Method (Easiest!)

### Option 1: Download and Add MP3 File

1. **Find the song:**
   - Search for "Gunna Bachelor" on YouTube
   - Use a YouTube to MP3 converter (like yt-dlp, 4K Video Downloader, etc.)
   - Download as MP3

2. **Add to your project:**
   - Save the file as `bachelor.mp3` in your project folder
   - Make sure it's in the same folder as `index.html`

3. **Update `index.html`:**
   Find this line:
   ```html
   <audio id="backgroundMusic" loop>
   ```
   
   Change it to:
   ```html
   <audio id="backgroundMusic" loop>
       <source src="bachelor.mp3" type="audio/mpeg">
   </audio>
   ```

4. **Update `script.js`:**
   Find the `musicSources` array and change it to:
   ```javascript
   const musicSources = [
       'bachelor.mp3'
   ];
   ```

5. **Push to GitHub and redeploy:**
   ```bash
   git add bachelor.mp3
   git add index.html script.js
   git commit -m "Add Gunna Bachelor song"
   git push origin main
   ```

---

## Option 2: Use YouTube Direct Link

1. **Find the YouTube video:**
   - Go to YouTube
   - Search "Gunna Bachelor"
   - Copy the video URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)

2. **Get the video ID:**
   - From URL: `https://www.youtube.com/watch?v=VIDEO_ID`
   - The `VIDEO_ID` is what you need

3. **Update the code:**
   - I'll help you set this up if you provide the YouTube video ID

---

## Option 3: Use Online Audio Hosting

1. **Upload to a free hosting service:**
   - Upload `bachelor.mp3` to Google Drive, Dropbox, or similar
   - Get a direct download link
   - Use that link in `musicSources` array

---

## ⚠️ Important Notes

- **Copyright**: Make sure you have rights to use the song
- **File Size**: Keep MP3 under 5MB for faster loading
- **Format**: MP3 works best for web browsers

---

## 🚀 After Adding the File

1. Test locally: `npm start`
2. Click the music button (bottom right)
3. Music should play!
4. Push to GitHub
5. Vercel will auto-deploy

---

**Need help?** Just let me know the YouTube video ID or if you need help with any step!

