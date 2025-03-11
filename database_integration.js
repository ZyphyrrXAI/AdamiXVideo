document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-video");
    const promptInput = document.getElementById("prompt");
    const videoContainer = document.getElementById("video-container");
    const errorMessage = document.getElementById("error-message");

    generateButton.addEventListener("click", async () => {
        const userPrompt = promptInput.value.trim();
        if (!userPrompt) {
            errorMessage.textContent = "Please enter a valid prompt.";
            errorMessage.style.display = "block";
            return;
        }
        
        errorMessage.style.display = "none";
        generateButton.disabled = true;
        generateButton.textContent = "Generating...";

        try {
            const response = await fetch("https://api.example.com/generate-video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userPrompt })
            });

            if (!response.ok) {
                throw new Error("Failed to generate video. Try again later.");
            }

            const data = await response.json();
            videoContainer.innerHTML = `<video controls src="${data.videoUrl}" autoplay></video>`;
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        } finally {
            generateButton.disabled = false;
            generateButton.textContent = "Generate Video";
        }
    });

    // Database setup for storing generated videos and user data
    const saveVideoToDatabase = async (videoUrl, userPrompt) => {
        try {
            await fetch("/save-video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl, prompt: userPrompt })
            });
        } catch (error) {
            console.error("Error saving video:", error);
        }
    };
});
