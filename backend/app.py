import os
import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Allow React to communicate with this server

# --- CONFIGURATION ---
UPLOAD_FOLDER = 'uploads'
MODEL_PATH = 'final_waste_model.h5'
LABELS_PATH = 'class_labels.json'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- LOAD MODEL ONCE ---
print("Loading Model...")
model = load_model(MODEL_PATH)

# Load Labels
with open(LABELS_PATH, 'r') as f:
    class_map = json.load(f)
    # Ensure keys are integers: {0: 'Hazardous', 1: 'safe', ...}
    class_map = {int(k): v for k, v in class_map.items()}

print("Model & Labels Loaded successfully!")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # --- PREPROCESSING (Same as Colab) ---
        img = image.load_img(filepath, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # Normalize

        # --- PREDICTION ---
        predictions = model.predict(img_array)
        predicted_index = np.argmax(predictions)
        confidence = float(np.max(predictions) * 100)
        result_label = class_map.get(predicted_index, "Unknown")

        # Cleanup
        os.remove(filepath)

        return jsonify({
            'class': result_label
            # 'confidence': f"{confidence:.2f}%"
        })

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)