// AI-Powered Video Generation Integration
// This will replace the placeholder message with real AI-driven video processing

document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate-video");
    const outputVideo = document.getElementById("output-video");
    const statusMessage = document.getElementById("status-message");

    generateButton.addEventListener("click", async function () {
        statusMessage.textContent = "Generating video... Please wait.";
        generateButton.disabled = true;

        try {
            const response = await fetch("/generate-video", { method: "POST" });
            if (!response.ok) throw new Error("Video generation failed.");

            const videoData = await response.json();
            outputVideo.src = videoData.videoUrl;
            outputVideo.style.display = "block";
            statusMessage.textContent = "Video generation complete!";
        } catch (error) {
            statusMessage.textContent = "Error: " + error.message;
        } finally {
            generateButton.disabled = false;
        }
    });
});
