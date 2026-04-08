import React, { useState } from 'react';
import axios from 'axios';
import { Upload, AlertCircle, CheckCircle, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Detector = ({ isDarkMode }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles[0]) {
      handleFileChange(droppedFiles[0]);
    }
  };

  const handleFileChange = (file) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
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
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = response.data;

      // Convert to percentage if backend sends decimal (0.82 → 82)
      const confidencePercent = data.confidence <= 1 ? data.confidence * 100 : data.confidence;

      if (confidencePercent < 70) {
        setError("🗑️ Even garbage deserves clarity. Try uploading a better picture!");
        setResult(null);
      } else {
        setResult(data);
        setError('');
      }

    } catch (err) {
      setError('Failed to connect to the server. Is Backend running?');
    } finally {
      setLoading(false);
    }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const normalizedClass = result?.class?.toLowerCase() || '';

  const classMeta = {
    hazardous: {
      tone: 'danger',
      title: '⚠️ Hazardous Waste',
      description: 'This item needs specialized handling. Keep it away from regular bins and follow local hazardous disposal rules.',
      suggestions: [
        'Use a sealed container before disposal.',
        'Drop it only at approved hazardous collection points.',
        'Avoid direct contact; use gloves if needed.',
      ],
    },
    recyclable: {
      tone: 'safe',
      title: '♻️ Recyclable Waste',
      description: 'This item can be processed through recycling streams when prepared correctly.',
      suggestions: [
        'Rinse and dry before placing in recycling.',
        'Separate by material type if your local rules require it.',
        'Do not mix with food-contaminated waste.',
      ],
    },
    'non-recyclable': {
      tone: 'neutral',
      title: '🗑️ Non-Recyclable Waste',
      description: 'This item should go to general waste because it cannot be processed in standard recycling.',
      suggestions: [
        'Place in general trash, not recycling bins.',
        'Reduce use of similar single-use items where possible.',
        'Check if your municipality offers special recovery programs.',
      ],
    },
    safe: {
      tone: 'safe',
      title: '✅ Safe Waste',
      description: 'This item appears safe for standard handling and can follow normal waste sorting practices.',
      suggestions: [
        'Sort by local dry/wet waste rules.',
        'If reusable, consider donation or repurposing first.',
        'Keep recyclable parts separate for better recovery.',
      ],
    },
    default: {
      tone: 'neutral',
      title: `🔎 ${result?.class || 'Unknown Class'}`,
      description: 'Classification received. Follow your local waste-management guidelines for final disposal.',
      suggestions: [
        'Check local municipal disposal instructions.',
        'Avoid mixing with hazardous materials.',
      ],
    },
  };

  const activeClassMeta = classMeta[normalizedClass] || classMeta.default;

  const resultContainerClass =
    activeClassMeta.tone === 'danger'
      ? isDarkMode
        ? 'bg-red-500/10 border-red-500/30'
        : 'bg-red-50 border-red-200'
      : activeClassMeta.tone === 'safe'
      ? isDarkMode
        ? 'bg-green-500/10 border-green-500/30'
        : 'bg-green-50 border-green-200'
      : isDarkMode
      ? 'bg-slate-700/30 border-slate-500/30'
      : 'bg-slate-100 border-slate-300';

  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVars} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
              Waste Detector
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Upload an image to instantly classify waste type
            </p>
          </motion.div>

          {/* Upload Area */}
          <motion.div variants={itemVars}>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative p-16 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                dragActive
                  ? isDarkMode
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-purple-600 bg-purple-100'
                  : isDarkMode
                  ? 'border-purple-300/30 bg-slate-800/30 hover:border-purple-400 hover:bg-purple-500/10'
                  : 'border-slate-300 bg-slate-50 hover:border-purple-400 hover:bg-purple-50'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                className="hidden"
                id="file-input-detector"
              />
              <label htmlFor="file-input-detector" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ y: dragActive ? -5 : 0 }}
                    transition={{ type: 'spring' }}
                  >
                    <Upload
                      size={56}
                      className={dragActive ? 'text-purple-400' : 'text-purple-300'}
                    />
                  </motion.div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      {dragActive ? 'Drop your image here' : 'Drag & drop your image'}
                    </p>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      or click to browse (PNG, JPG, JPEG)
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Preview Grid */}
          <AnimatePresence>
            {preview && (
              <motion.div
                variants={itemVars}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className={`card-glow p-6 rounded-xl overflow-hidden max-w-sm mx-auto`}>
                  <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4 justify-center flex-wrap"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Identify Waste
                      <Zap size={18} />
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setResult(null);
                    setError('');
                  }}
                  className="btn-secondary"
                >
                  Clear
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg border ${
                  isDarkMode
                    ? 'bg-red-500/20 border-red-500/50 text-red-300'
                    : 'bg-red-50 border-red-200 text-red-700'
                } flex items-center gap-3`}
              >
                <AlertCircle size={20} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Card */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', bounce: 0.4 }}
              >
                <div
                  className={`card-glow p-8 rounded-2xl text-center max-w-xl mx-auto ${resultContainerClass}`}
                >
                  {/* Icon */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex justify-center mb-6"
                  >
                    {activeClassMeta.tone === 'danger' ? (
                      <AlertCircle size={80} className="text-red-500" />
                    ) : (
                      <CheckCircle size={80} className="text-green-500" />
                    )}
                  </motion.div>

                  {/* Classification Result */}
                  <h2 className="text-3xl font-bold mb-2">
                    {activeClassMeta.title}
                  </h2>

                  {/* Confidence Bar */}
                  <div className="mt-8 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Confidence Score</span>
                      <span className="font-bold text-xl text-purple-400">
                        {result.confidence ? result.confidence.toFixed(1) : 'N/A'}%
                      </span>
                    </div>
                    <div className={`w-full h-5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence || 0}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 relative"
                      >
                        <motion.div
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`mt-6 text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {activeClassMeta.description}
                  </p>

                  <div className={`mt-6 p-4 rounded-lg text-left ${isDarkMode ? 'bg-black/20' : 'bg-white/70'}`}>
                    <p className="font-semibold mb-2">Suggested Next Steps</p>
                    <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {activeClassMeta.suggestions.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                      setResult(null);
                      setError('');
                    }}
                    className="btn-primary mt-8"
                  >
                    Classify Another Image
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Box */}
          {!result && (
            <motion.div
              variants={itemVars}
              className={`p-6 rounded-xl card-glow ${isDarkMode ? 'bg-slate-800/30' : 'bg-slate-100'}`}
            >
              <div className="flex gap-4 items-start">
                <Sparkles size={24} className="text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">How to use</h3>
                  <ol className={`list-decimal list-inside space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <li>Upload or drag an image of waste</li>
                    <li>Click "Identify Waste" to process</li>
                    <li>See the classification and confidence score</li>
                    <li>Use the results to improve waste management</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Detector;
