# 💕 Valentine's Day Website 💕

A beautiful, interactive Valentine's Day proposal website with music, animations, and email notifications!

## ✨ Features

- 🎵 Background music (Gunna - Bachelor)
- 💖 Floating hearts animation
- 🎯 Interactive "Yes/No" buttons (No button runs away!)
- 📧 Automatic email notifications when someone says "YES"
- 📊 Admin dashboard to monitor responses
- 📱 Mobile responsive design
- 🎉 Confetti animation on "YES" click

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Gmail account (for email notifications)

### Installation

1. **Clone or download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure email settings:**
   Create a `.env` file in the project root:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   RECIPIENT_EMAIL=your-recipient@example.com
   PORT=3000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   - Main site: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

## 📧 Email Setup

### Gmail Configuration
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > App passwords
   - Generate password for "Valentine Website"
3. Use the App Password (not your regular password) in `EMAIL_PASS`

### Alternative Email Providers
- **Outlook/Hotmail**: Set `EMAIL_USER` to your Outlook email and `EMAIL_PASS` to your password
- **Yahoo**: Set `EMAIL_USER` to your Yahoo email and `EMAIL_PASS` to your password

## 🎵 Music Setup

The website includes "Gunna - Bachelor" as background music. The audio file is already included in the project.

## 📊 Admin Dashboard

Access the admin panel at `/admin` to:
- View all responses in real-time
- See statistics (total responses, yes count)
- Monitor new responses with notifications
- Track device types and browsers

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app works on any Node.js hosting platform (Heroku, Railway, etc.)

## 📁 Project Structure

```
valentine-website/
├── index.html          # Main Valentine proposal page
├── admin.html          # Admin dashboard
├── server.js           # Express server with API endpoints
├── script.js           # Frontend JavaScript
├── style.css           # Styles and animations
├── vercel.json         # Vercel deployment config
├── package.json        # Dependencies and scripts
├── Gunna - Bachelor.mp3 # Background music
├── valentine_responses.db # SQLite database (auto-created)
└── README.md          # This file
```

## 🔧 API Endpoints

- `POST /api/save-response` - Save a yes/no response
- `GET /api/responses` - Get all responses
- `GET /api/latest-response` - Get the most recent response
- `GET /api/stats` - Get response statistics

## 🎨 Customization

### Colors
Edit `style.css` to change the color scheme. Main colors:
- Pink: `#ff1493`, `#ff69b4`, `#ffb6c1`
- Background gradients and heart colors

### Music
Replace `Gunna - Bachelor.mp3` with your favorite song.

### Email Content
Edit the `sendValentineEmail()` function in `server.js` to customize the email message.

### Messages
Update the button messages and responses in `script.js`.

## 📱 Mobile Support

The website is fully responsive and works great on mobile devices!

## 🤝 Contributing

Feel free to improve this project! Add more features, better animations, or different music.

## 📄 License

MIT License - feel free to use for your own Valentine's Day proposal! 💕

---

Made with ❤️ for Valentine's Day 2025
