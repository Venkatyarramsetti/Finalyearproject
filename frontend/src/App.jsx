import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detector from './pages/Detector';
import FAQ from './pages/FAQ';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<Detector />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
        <footer className="footer">
          <p>Fourth_Two_Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;