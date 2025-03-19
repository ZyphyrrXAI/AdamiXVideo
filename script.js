document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generate-video");
    
    if (generateBtn) {
        generateBtn.addEventListener("click", function () {
            console.log("Generate button clicked!");
            // Call the AI video generation logic here
        });
    } else {
        console.error("Generate button not found!");
    }
});
