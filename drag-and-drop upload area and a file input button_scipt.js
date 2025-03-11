// Updated script.js to integrate both drag-and-drop and file input upload functionality
document.addEventListener("DOMContentLoaded", function () {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-button");
    
    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Highlight drop area when dragging over it
    ["dragenter", "dragover"].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add("highlight"), false);
    });
    
    ["dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove("highlight"), false);
    });
    
    // Handle dropped files
    dropArea.addEventListener("drop", (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;
        handleFiles(files);
    });
    
    // Handle selected files
    fileInput.addEventListener("change", (e) => {
        let files = e.target.files;
        handleFiles(files);
    });
    
    function handleFiles(files) {
        if (files.length > 0) {
            const formData = new FormData();
            formData.append("video", files[0]);
            uploadFile(formData);
        }
    }
    
    function uploadFile(formData) {
        fetch("/upload", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Upload successful: " + data.filename);
            } else {
                alert("Upload failed");
            }
        })
        .catch(error => console.error("Error uploading file:", error));
    }
    
    uploadButton.addEventListener("click", () => {
        fileInput.click();
    });
});