# 🎵 Background Music Setup Guide

## How to Add Your Own Music

### Option 1: Add a Local Music File (Recommended)

1. **Add your music file** to the project folder (e.g., `music.mp3`, `valentine-song.mp3`)

2. **Update `index.html`** - Find the audio element and update it:
```html
<audio id="backgroundMusic" loop>
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    <!-- Your browser does not support the audio element -->
</audio>
```

3. **Update `script.js`** - Find the musicSources array and update:
```javascript
const musicSources = [
    'music.mp3', // Your music file
];
```

### Option 2: Use an Online Music URL

1. **Upload your music** to a hosting service (Google Drive, Dropbox, etc.)
2. **Get a direct link** to the music file
3. **Update `script.js`**:
```javascript
const musicSources = [
    'https://your-music-url.com/music.mp3',
];
```

### Option 3: Use Royalty-Free Music

Here are some free sources for romantic/Valentine's music:

- **Pixabay Music**: https://pixabay.com/music/
- **Free Music Archive**: https://freemusicarchive.org/
- **YouTube Audio Library**: https://www.youtube.com/audiolibrary
- **Incompetech**: https://incompetech.com/music/

**Search for**: "romantic", "love", "valentine", "soft", "ambient"

## Recommended Music Formats

- **MP3** - Most compatible format
- **OGG** - Good alternative
- **WAV** - High quality but larger file size

## File Size Tips

- Keep music files under 5MB for faster loading
- Use MP3 format with 128kbps bitrate for good quality/size balance
- Consider using shorter loops (30-60 seconds) for background music

## Testing

1. Make sure your music file is in the project folder
2. Start the server: `npm start`
3. Open the website and click the music button (bottom right)
4. Music should start playing and loop automatically

## Troubleshooting

**Music doesn't play?**
- Check browser console for errors
- Make sure file path is correct
- Try a different audio format (MP3 usually works best)
- Some browsers block autoplay - user must click the music button first

**Music file too large?**
- Compress the audio file using an online tool
- Use a shorter clip (30-60 seconds) that loops
- Convert to lower bitrate MP3

Enjoy your romantic background music! 💕🎵

