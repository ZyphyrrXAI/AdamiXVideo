import express from 'express';
import { generateVideo } from './videoProcessor.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());

// Optimized Route for Video Generation
app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
        
        console.time('VideoGeneration'); // Performance Debugging
        const videoPath = await generateVideo(prompt);
        console.timeEnd('VideoGeneration');
        
        res.json({ success: true, videoUrl: videoPath });
    } catch (error) {
        console.error('Video Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate video' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
