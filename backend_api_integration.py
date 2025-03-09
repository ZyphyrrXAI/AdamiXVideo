const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_URL = 'https://api.example.com/generate-video'; // Placeholder API

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Backend is running' });
});

// Video generation endpoint
app.post('/generate-video', async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error generating video', details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
