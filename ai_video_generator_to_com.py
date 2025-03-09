from flask import Flask, request, jsonify
import os
import stripe  # Payment integration
import subprocess  # For running AI video generation commands

app = Flask(__name__)

# Configure Stripe
stripe.api_key = "your_stripe_secret_key"

# Placeholder route for AI video generation
@app.route('/generate-video', methods=['POST'])
def generate_video():
    data = request.json
    prompt = data.get("prompt", "")
    language = data.get("language", "en")
    
    # AI video generation logic (Placeholder using subprocess)
    video_filename = f"{prompt.replace(' ', '_')}.mp4"
    video_path = os.path.join("generated_videos", video_filename)
    
    try:
        subprocess.run(["python", "ai_video_generator.py", prompt, language, video_path], check=True)
        video_url = f"https://yourdomain.com/videos/{video_filename}"
        return jsonify({"status": "success", "video_url": video_url})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

# Subscription route for payments
@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    user_email = data.get("email", "")
    payment_method_id = data.get("payment_method_id", "")
    
    try:
        customer = stripe.Customer.create(email=user_email, payment_method=payment_method_id)
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{"price": "your_price_id"}],
            expand=["latest_invoice.payment_intent"]
        )
        return jsonify({"status": "success", "message": f"Subscription activated for {user_email}"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

# New route for AI-powered video enhancements
@app.route('/enhance-video', methods=['POST'])
def enhance_video():
    data = request.json
    video_url = data.get("video_url", "")
    voiceover = data.get("voiceover", True)
    subtitles = data.get("subtitles", True)
    background_music = data.get("background_music", True)
    
    try:
        subprocess.run(["python", "ai_video_enhancer.py", video_url, str(voiceover), str(subtitles), str(background_music)], check=True)
        enhanced_video_url = video_url.replace(".mp4", "_enhanced.mp4")
        return jsonify({"status": "success", "enhanced_video_url": enhanced_video_url})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
