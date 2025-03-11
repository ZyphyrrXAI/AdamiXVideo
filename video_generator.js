const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function generateVideo(prompt) {
    try {
        const response = await axios.post("https://api.example.com/generate-video", {
            prompt: prompt
        });

        if (!response.data || !response.data.videoUrl) {
            throw new Error("Invalid response from video generation API.");
        }

        return response.data.videoUrl;
    } catch (error) {
        console.error("Video generation failed:", error);
        throw new Error("Failed to generate video.");
    }
}

module.exports = { generateVideo };
