# Email Setup Instructions

To enable email functionality when someone clicks "YES", you need to configure email settings.

## 1. Install Dependencies
```bash
npm install
```

## 2. Configure Email Settings

Create a `.env` file in your project root with the following variables:

```env
# Email Configuration
# For Gmail, use your Gmail address and an App Password (not your regular password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# The email address where you want to receive the Valentine message
RECIPIENT_EMAIL=your-recipient@example.com

# Server Configuration
PORT=3000
```

## 3. Gmail Setup (Recommended)

### Generate App Password:
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App passwords
4. Generate a new app password for "Valentine Website"
5. Use this app password (not your regular Gmail password) in EMAIL_PASS

### Alternative Email Providers:
- **Outlook/Hotmail**: Use `service: 'outlook'` and your email/password
- **Yahoo**: Use `service: 'yahoo'` and your email/password
- **Custom SMTP**: Modify the emailConfig in server.js

## 4. Test the Setup

1. Start the server: `npm start`
2. Visit your Valentine website
3. Click "YES" to test email sending
4. Check your email for the Valentine message!

## Email Content

When someone clicks "YES", they will receive an email with:
- Subject: "🎉 Happy Valentine's Day! 💕"
- Content: "YOU WILL BE DAVIS VALENTINE" prominently displayed
- Beautiful styling with hearts and colors

## Troubleshooting

- **Emails not sending**: Check your email credentials and app password
- **Gmail blocking**: Make sure you're using an App Password, not your regular password
- **Port issues**: The app runs on port 3000 by default
