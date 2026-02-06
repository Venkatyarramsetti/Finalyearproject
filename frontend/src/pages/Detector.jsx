import React, { useState } from 'react';
import axios from 'axios';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

const Detector = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      // Connects to Flask Backend
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to connect to the server. Is Backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detector-page">
      <h2>Waste Classification AI</h2>
      
      <div className="upload-box">
        <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} hidden />
        <label htmlFor="file-upload" className="upload-label">
          <Upload size={40} />
          <p>Click to Upload Image</p>
        </label>
      </div>

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
        </div>
      )}

      <button onClick={handleUpload} className="analyze-btn" disabled={loading}>
        {loading ? 'Analyzing...' : 'Identify Waste'}
      </button>

      {error && <p className="error-msg">{error}</p>}

      {result && (
        <div className={`result-card ${result.class === 'Hazardous' ? 'danger' : 'safe'}`}>
          {result.class === 'Hazardous' ? <AlertCircle size={32} /> : <CheckCircle size={32} />}
          <div>
            <h3>Predicted Class: <span>{result.class}</span></h3>
            {/* <p>Confidence: {result.confidence}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detector;