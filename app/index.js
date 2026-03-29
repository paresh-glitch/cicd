const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'Deployed via SSH!',
        version: process.env.APP_VERSION || 'v1',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'broken' });
});

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

module.exports = server;    // ← export so test.js can close it
