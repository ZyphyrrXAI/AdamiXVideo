const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Placeholder route for AI video generation
app.post("/generate-video", async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        // Call AI video generation API (mock response for now)
        const videoUrl = `https://example.com/generated_video.mp4`;
        
        return res.json({ videoUrl });
    } catch (error) {
        console.error("Error generating video:", error);
        return res.status(500).json({ error: "Failed to generate video." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
