import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Moon, Sun, Navigation, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ isDarkMode, toggleTheme, onStartJourney, journeyActive, onPauseJourney }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors ${
        isDarkMode 
          ? 'bg-slate-950/80 border-purple-500/20' 
          : 'bg-white/80 border-slate-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ scale: 1.1, rotate: 10 }}>
            <Leaf 
              size={28} 
              className={`transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
            />
          </motion.div>
          <div>
            <h1 className={`text-lg font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              WasteAI
            </h1>
            <p className={`text-xs transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Waste Classification
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className={`hidden md:flex gap-8 items-center`}>
          <Link 
            to="/" 
            className={`font-medium transition-colors hover:text-purple-400 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
          >
            Home
          </Link>
          <Link 
            to="/detect" 
            className={`font-medium transition-colors hover:text-purple-400 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
          >
            Detect
          </Link>
          <Link 
            to="/faq" 
            className={`font-medium transition-colors hover:text-purple-400 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
          >
            FAQ
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Journey Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={journeyActive ? onPauseJourney : onStartJourney}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              journeyActive
                ? 'bg-purple-600/80 text-white'
                : isDarkMode
                ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/40'
                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            }`}
          >
            {journeyActive ? <Pause size={18} /> : <Navigation size={18} />}
            <span className="hidden sm:inline">
              {journeyActive ? 'Pause' : 'Journey'}
            </span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode
                ? 'bg-purple-600/20 text-yellow-300 hover:bg-purple-600/40'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Mobile Menu Dropdown Indicator */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`md:hidden p-2 rounded-lg transition-all ${
              isDarkMode
                ? 'bg-purple-600/20 hover:bg-purple-600/40 text-slate-300'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {dropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden border-t transition-colors ${isDarkMode ? 'border-purple-500/20 bg-slate-900/80' : 'border-slate-200 bg-slate-50/80'}`}
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link to="/" className={`font-medium transition-colors ${isDarkMode ? 'text-slate-300 hover:text-purple-400' : 'text-slate-700 hover:text-purple-600'}`}>
              Home
            </Link>
            <Link to="/detect" className={`font-medium transition-colors ${isDarkMode ? 'text-slate-300 hover:text-purple-400' : 'text-slate-700 hover:text-purple-600'}`}>
              Detect
            </Link>
            <Link to="/faq" className={`font-medium transition-colors ${isDarkMode ? 'text-slate-300 hover:text-purple-400' : 'text-slate-700 hover:text-purple-600'}`}>
              FAQ
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;