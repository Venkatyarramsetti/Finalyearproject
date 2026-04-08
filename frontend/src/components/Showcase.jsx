import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowRight, CheckCircle, Sparkles, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Showcase = ({ isDarkMode, journeyActive, currentStep, onSkipJourney, onNextStep }) => {
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
  };

  const journeySteps = [
    { section: 'hero', title: 'Welcome', description: 'Learn about our AI-powered waste classification system' },
    { section: 'about', title: 'Learn More', description: 'Understand how our system works' },
  ];

  useEffect(() => {
    if (journeyActive && sectionRefs[journeySteps[currentStep]?.section]) {
      sectionRefs[journeySteps[currentStep].section].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [journeyActive, currentStep]);

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

  return (
    <div className="min-h-screen relative z-10">
      {/* Journey Guide Tooltip */}
      <AnimatePresence>
        {journeyActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed top-24 right-4 z-40 rounded-lg shadow-2xl p-4 max-w-xs backdrop-blur-xl ${
              isDarkMode ? 'bg-slate-800/90 border border-purple-500/50' : 'bg-white/90 border border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {journeySteps[currentStep]?.title}
                </h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {journeySteps[currentStep]?.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={onSkipJourney}
                className={`p-1 rounded transition-colors ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 justify-center mt-3">
              {journeySteps.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentStep ? 'bg-purple-500' : isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            {currentStep < journeySteps.length - 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNextStep}
                className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold text-sm transition-colors"
              >
                Next
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        ref={sectionRefs.hero}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`relative py-20 px-4 overflow-hidden ${
          journeyActive && currentStep === 0 ? 'journey-highlight' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div variants={itemVars} className="flex justify-center mb-6">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-xl"
                />
                <Sparkles size={64} className="text-purple-400 relative" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Waste Classification AI
            </h1>
            <p className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Intelligent waste detection and classification powered by deep learning
            </p>

            <motion.div variants={itemVars} className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Brain, title: 'AI Powered', desc: 'Deep neural networks' },
                { icon: Zap, title: 'Real-time', desc: 'Instant predictions' },
                { icon: CheckCircle, title: 'Accurate', desc: '95%+ accuracy' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className={`card-glow p-6 ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100'}`}
                >
                  <feature.icon className="text-purple-400 mb-3 mx-auto" size={32} />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVars}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#about-section"
                className="btn-primary inline-flex items-center gap-2"
              >
                Explore Project <ArrowRight size={20} />
              </a>
            </motion.div>
            <motion.div
              variants={itemVars}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4"
            >
              <Link
                to="/detect"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Open Detector <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        ref={sectionRefs.about}
        id="about-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`relative py-20 px-4 ${
          journeyActive && currentStep === 1 ? 'journey-highlight' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Smart Recognition',
                  desc: 'Our CNN-based model identifies waste types with 95%+ accuracy',
                  icon: Brain,
                },
                {
                  title: 'Real-time Processing',
                  desc: 'Get instant predictions in seconds, not minutes',
                  icon: Zap,
                },
                {
                  title: 'Eco-Friendly Impact',
                  desc: 'Improve waste management and recycling rates in your community',
                  icon: CheckCircle,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVars}
                  whileHover={{ y: -5 }}
                  className={`card-glow p-8 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100'}`}
                >
                  <item.icon className="text-purple-400 mb-4" size={40} />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVars}
              className={`mt-12 p-8 rounded-xl card-glow ${isDarkMode ? 'bg-slate-800/30' : 'bg-slate-100'}`}
            >
              <h3 className="text-2xl font-bold mb-4">Technology Stack</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold mb-2">Backend</p>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Flask, TensorFlow, Keras - Deep learning inference
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Frontend</p>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    React, Framer Motion, Tailwind CSS - Modern UI
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Model</p>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Convolutional Neural Network - 224x224 image recognition
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Deployment</p>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    Docker, Cloud-ready - Scalable infrastructure
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Showcase;
