document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-video");
    const promptInput = document.getElementById("prompt");
    const videoContainer = document.getElementById("video-container");
    const errorMessage = document.getElementById("error-message");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutButton = document.getElementById("logout-button");

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
            saveVideoToDatabase(data.videoUrl, userPrompt);
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

    // User authentication handling
    loginForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                body: formData
            });
            if (!response.ok) throw new Error("Login failed");
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    });

    signupForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        try {
            const response = await fetch("/auth/signup", {
                method: "POST",
                body: formData
            });
            if (!response.ok) throw new Error("Signup failed");
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    });

    logoutButton?.addEventListener("click", async () => {
        try {
            await fetch("/auth/logout", { method: "POST" });
            window.location.reload();
        } catch (error) {
            alert("Logout failed");
        }
    });
});
