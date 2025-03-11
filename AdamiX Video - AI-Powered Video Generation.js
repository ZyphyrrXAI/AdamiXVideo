/* AdamiX Video - AI-Powered Video Generation */
document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generate-video");
    const promptInput = document.getElementById("prompt-input");
    const outputSection = document.getElementById("output-section");
    const videoElement = document.getElementById("generated-video");
    const statusMessage = document.getElementById("status-message");
    
    generateBtn.addEventListener("click", async function () {
        const promptText = promptInput.value.trim();
        if (!promptText) {
            alert("Please enter a prompt to generate a video.");
            return;
        }
        
        generateBtn.textContent = "Generating...";
        generateBtn.disabled = true;
        statusMessage.textContent = "Processing your request...";
        
        try {
            const videoUrl = await generateVideoFromPrompt(promptText);
            videoElement.src = videoUrl;
            outputSection.style.display = "block";
            statusMessage.textContent = "Video generation complete!";
        } catch (error) {
            alert("Error generating video. Please try again.");
            console.error(error);
            statusMessage.textContent = "Failed to generate video.";
        }
        
        generateBtn.textContent = "Generate Video";
        generateBtn.disabled = false;
    });
    
    async function generateVideoFromPrompt(prompt) {
        try {
            const response = await fetch("https://api.example.com/generate-video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: prompt })
            });
            
            if (!response.ok) {
                throw new Error("Failed to fetch video");
            }
            
            const data = await response.json();
            return data.videoUrl;
        } catch (error) {
            console.error("Error in video generation API:", error);
            throw error;
        }
    }
});
