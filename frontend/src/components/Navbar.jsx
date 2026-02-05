import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Leaf color="#2ecc71" size={28} />
        <h2>Automatic Garbage Classification in Images</h2>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/detect">Detection</Link>
        <Link to="/faq">Q&A</Link>
      </div>
    </nav>
  );
};

export default Navbar;