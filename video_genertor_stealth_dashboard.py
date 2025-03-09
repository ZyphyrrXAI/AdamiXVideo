<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AdamiX Video - AI Video Creator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>AdamiX Video</h1>
        <p>AI-Powered Video Creation Platform</p>
    </header>
    <main>
        <section id="video-generator">
            <h2>Generate Your AI Video</h2>
            <textarea id="prompt" placeholder="Enter your prompt..."></textarea>
            <button id="generate-btn">Generate Video</button>
        </section>
        <section id="output">
            <h2>Your Generated Video</h2>
            <video id="video-output" controls></video>
            <p id="status">Waiting for generation...</p>
        </section>
        <section id="dashboard">
            <h2>Stealth Dashboard</h2>
            <p>Monitor revenue, subscriptions, and analytics.</p>
            <button id="dashboard-btn">Access Dashboard</button>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 AdamiX Video. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
