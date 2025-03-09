// Frontend: Connecting to AI Video Generator API

const apiUrl = 'http://localhost:5000/generate-video'; // Change this to deployed backend URL

document.getElementById('generateButton').addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;
    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }
    
    document.getElementById('status').innerText = 'Generating...';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ prompt })
        });
        
        const data = await response.json();
        if (data.video_url) {
            document.getElementById('videoPlayer').src = data.video_url;
            document.getElementById('status').innerText = 'Video Generated Successfully!';
        } else {
            document.getElementById('status').innerText = 'Failed to generate video.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('status').innerText = 'Error generating video.';
    }
});
