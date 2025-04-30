import React, { useState } from 'react';
import './Navigation.css';
import { urlFor } from '../utils/cloudinary';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <img
          src={urlFor('logoSite_ijknrv', { width: 50, height: 40 })}
          alt="Logo"
          className="nav-logo"
        />
        <button className="nav-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="/home">Home</a></li>
          <li><a href="/members">Members</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
