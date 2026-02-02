const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve CSS and JS files EXPLICITLY FIRST (before static middleware)
app.get('/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Serve MP3 files
app.get('*.mp3', (req, res) => {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, req.path.substring(1)));
});

// Serve other static files (images, etc.)
app.use(express.static(__dirname, {
    maxAge: '1d',
    etag: true
}));

// Initialize database
// Use in-memory database for Vercel (serverless) or file-based for local
const dbPath = process.env.VERCEL ? ':memory:' : './valentine_responses.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
        console.error('Database path:', dbPath);
    } else {
        console.log('✅ Connected to SQLite database:', dbPath);
        
        // Create table if it doesn't exist with enhanced tracking
        db.run(`CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            answer TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            ip_address TEXT,
            user_agent TEXT,
            browser_info TEXT,
            device_type TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('❌ Error creating table:', err.message);
            } else {
                console.log('✅ Database table ready.');
                // Try to add new columns (will fail silently if they exist)
                db.run(`ALTER TABLE responses ADD COLUMN ip_address TEXT`, () => {});
                db.run(`ALTER TABLE responses ADD COLUMN user_agent TEXT`, () => {});
                db.run(`ALTER TABLE responses ADD COLUMN browser_info TEXT`, () => {});
                db.run(`ALTER TABLE responses ADD COLUMN device_type TEXT`, () => {});
            }
        });
    }
});

// Helper function to get client IP
function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0] || 
           req.headers['x-real-ip'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           'Unknown';
}

// Helper function to detect device type
function getDeviceType(userAgent) {
    if (!userAgent) return 'Unknown';
    const ua = userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
        return 'Mobile';
    } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
        return 'Tablet';
    }
    return 'Desktop';
}

// Helper function to get browser info
function getBrowserInfo(userAgent) {
    if (!userAgent) return 'Unknown';
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edg')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Other';
}

// API endpoint to save response with enhanced tracking
app.post('/api/save-response', (req, res) => {
    console.log('📥 POST /api/save-response received');
    console.log('Request body:', req.body);
    console.log('Headers:', req.headers);
    
    const { answer, timestamp } = req.body;
    
    if (!answer) {
        console.error('❌ Missing answer in request');
        return res.status(400).json({ error: 'Answer is required' });
    }
    
    // Check if database is available
    if (!db) {
        console.error('❌ Database not initialized');
        return res.status(500).json({ error: 'Database not available' });
    }
    
    // Capture tracking information
    const ipAddress = getClientIP(req);
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const browserInfo = getBrowserInfo(userAgent);
    const deviceType = getDeviceType(userAgent);
    const responseTime = timestamp || new Date().toISOString();
    
    console.log('📊 Tracking info:', {
        answer,
        ipAddress,
        deviceType,
        browserInfo,
        responseTime
    });
    
    const query = `INSERT INTO responses (answer, timestamp, ip_address, user_agent, browser_info, device_type) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [answer, responseTime, ipAddress, userAgent, browserInfo, deviceType], function(err) {
        if (err) {
            console.error('❌ Database error:', err.message);
            console.error('Error details:', err);
            return res.status(500).json({ 
                error: 'Failed to save response',
                details: err.message 
            });
        }
        
        // Log to console for monitoring
        console.log('\n🎉 NEW RESPONSE RECEIVED! 🎉');
        console.log(`ID: ${this.lastID}`);
        console.log(`Answer: ${answer.toUpperCase()}`);
        console.log(`Time: ${responseTime}`);
        console.log(`IP: ${ipAddress}`);
        console.log(`Device: ${deviceType}`);
        console.log(`Browser: ${browserInfo}`);
        console.log('─'.repeat(50));
        
        res.json({ 
            success: true, 
            id: this.lastID,
            message: 'Response saved successfully!',
            data: {
                answer,
                timestamp: responseTime,
                device: deviceType,
                browser: browserInfo
            }
        });
    });
});

// API endpoint to get all responses
app.get('/api/responses', (req, res) => {
    const query = `SELECT * FROM responses ORDER BY created_at DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching responses:', err.message);
            return res.status(500).json({ error: 'Failed to fetch responses' });
        }
        
        res.json({ responses: rows });
    });
});

// API endpoint to get latest response (for real-time monitoring)
app.get('/api/latest-response', (req, res) => {
    const query = `SELECT * FROM responses ORDER BY created_at DESC LIMIT 1`;
    
    db.get(query, [], (err, row) => {
        if (err) {
            console.error('Error fetching latest response:', err.message);
            return res.status(500).json({ error: 'Failed to fetch latest response' });
        }
        
        res.json({ response: row || null });
    });
});

// API endpoint to get response count
app.get('/api/stats', (req, res) => {
    const query = `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN answer = 'yes' THEN 1 ELSE 0 END) as yes_count
        FROM responses`;
    
    db.get(query, [], (err, row) => {
        if (err) {
            console.error('Error fetching stats:', err.message);
            return res.status(500).json({ error: 'Failed to fetch stats' });
        }
        
        res.json({ 
            total: row.total || 0,
            yesCount: row.yes_count || 0
        });
    });
});

// Serve static files explicitly
// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), {
        headers: { 'Content-Type': 'text/html' }
    });
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'), {
        headers: { 'Content-Type': 'text/html' }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`💕 Valentine server running on http://localhost:${PORT}`);
    console.log(`📊 Database: valentine_responses.db`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});

