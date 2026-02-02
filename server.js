const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize database
const db = new sqlite3.Database('./valentine_responses.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            answer TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Database table ready.');
            }
        });
    }
});

// API endpoint to save response
app.post('/api/save-response', (req, res) => {
    const { answer, timestamp } = req.body;
    
    if (!answer) {
        return res.status(400).json({ error: 'Answer is required' });
    }
    
    const query = `INSERT INTO responses (answer, timestamp) VALUES (?, ?)`;
    
    db.run(query, [answer, timestamp || new Date().toISOString()], function(err) {
        if (err) {
            console.error('Error saving response:', err.message);
            return res.status(500).json({ error: 'Failed to save response' });
        }
        
        console.log(`Response saved with ID: ${this.lastID}`);
        res.json({ 
            success: true, 
            id: this.lastID,
            message: 'Response saved successfully!' 
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

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
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

