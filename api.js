import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/generate-video", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await fetch(process.env.AI_VIDEO_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.AI_API_KEY}`
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error("Failed to generate video.");
        }

        const data = await response.json();
        res.json({ videoUrl: data.videoUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
