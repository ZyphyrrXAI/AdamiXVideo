document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate-video");

    if (generateButton) {
        generateButton.addEventListener("click", async function () {
            console.log("Generate Video button clicked!");

            // Simulate AI-powered video generation
            try {
                generateButton.textContent = "Generating...";
                generateButton.disabled = true;

                // Simulating processing time
                await new Promise(resolve => setTimeout(resolve, 3000));

                generateButton.textContent = "Generate Video";
                generateButton.disabled = false;

                alert("Video generation complete!");
            } catch (error) {
                console.error("Error generating video:", error);
                generateButton.textContent = "Generate Video";
                generateButton.disabled = false;
            }
        });
    } else {
        console.error("Error: Generate Video button not found!");
    }
});
