from flask import Flask, request, jsonify
import os
import subprocess

app = Flask(__name__)

# Route to handle video generation requests
@app.route('/generate-video', methods=['POST'])
def generate_video():
    data = request.json
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        # AI Video Generation Logic (Placeholder - Replace with actual AI pipeline)
        video_path = f"generated_videos/{prompt.replace(' ', '_')}.mp4"
        command = f"python ai_video_generator.py --prompt \"{prompt}\" --output {video_path}"
        subprocess.run(command, shell=True, check=True)
        
        return jsonify({'message': 'Video generation started', 'video_url': video_path})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    os.makedirs("generated_videos", exist_ok=True)
    app.run(debug=True, port=5000)
