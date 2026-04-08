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
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
MODEL_PATH = os.path.join(BASE_DIR, 'final_waste_model.h5')
LABELS_PATH = os.path.join(BASE_DIR, 'class_labels.json')
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

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'service': 'waste-classification-api'})

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    filename = secure_filename(file.filename or '')
    if filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        try:
            # --- PREPROCESSING (Same as Colab) ---
            img = image.load_img(filepath, target_size=(224, 224))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array /= 255.0  # Normalize

            # --- PREDICTION ---
            predictions = model.predict(img_array)
            predicted_index = int(np.argmax(predictions))
            confidence = float(np.max(predictions) * 100)
            result_label = class_map.get(predicted_index, "Unknown")

            return jsonify({
                'class': result_label,
                'confidence': confidence
            })
        finally:
            if os.path.exists(filepath):
                os.remove(filepath)

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', '5000'))
    app.run(debug=True, host='0.0.0.0', port=port)