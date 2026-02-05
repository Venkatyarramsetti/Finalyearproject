import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Image classification</h1>
        <p>Using Deep Learning (VGG16 + ResNet50) to classify waste into Hazardous, Safe, Recyclable, and Non-Recyclable categories.</p>
        <Link to="/detect" className="cta-button">Start Detecting</Link>
      </div>
    </div>
  );
};

export default Home;