from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_URL = 'https://api.example.com/generate-video'  # Placeholder API

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Backend is running"})

# Video generation endpoint
@app.route('/generate-video', methods=['POST'])
def generate_video():
    try:
        response = requests.post(API_URL, json=request.json)
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error generating video", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
