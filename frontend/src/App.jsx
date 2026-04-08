import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';
import Detector from './pages/Detector';
import FAQ from './pages/FAQ';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [journeyActive, setJourneyActive] = useState(false);
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const startJourney = () => {
    setJourneyActive(true);
    setCurrentJourneyStep(0);
  };

  const pauseJourney = () => {
    setJourneyActive(false);
  };

  const skipJourney = () => {
    setJourneyActive(false);
    setCurrentJourneyStep(0);
  };

  const nextStep = () => {
    setCurrentJourneyStep((prev) => {
      const next = prev + 1;
      if (next > 1) {
        setJourneyActive(false);
        return 0;
      }
      return next;
    });
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900' : 'bg-white'}`}>
        {/* Particle background */}
        <ParticlesBackground isDark={isDarkMode} />

        {/* Navigation */}
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme}
          onStartJourney={startJourney}
          journeyActive={journeyActive}
          onPauseJourney={pauseJourney}
        />

        {/* Main content */}
        <div className="relative z-10">
          <Routes>
            <Route 
              path="/" 
              element={
                <Showcase 
                  isDarkMode={isDarkMode}
                  journeyActive={journeyActive}
                  currentStep={currentJourneyStep}
                  onSkipJourney={skipJourney}
                  onNextStep={nextStep}
                />
              } 
            />
            <Route path="/detect" element={<Detector isDarkMode={isDarkMode} />} />
            <Route path="/faq" element={<FAQ isDarkMode={isDarkMode} />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className={`relative z-10 py-8 mt-12 text-center border-t transition-colors ${isDarkMode ? 'border-purple-500/20 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
          <p className="font-light">© 2026 Waste Classification AI. Built with precision and care.</p>
        </footer>
      </div>
    </Router>
  );
}

// Floating particles background component
function ParticlesBackground({ isDark }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 5 }).map(() => ({
      id: Math.random(),
      size: Math.random() * 300 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles-bg">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: isDark ? 0.15 : 0.08,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            background: isDark 
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)',
          }}
        />
      ))}
    </div>
  );
}

export default App;