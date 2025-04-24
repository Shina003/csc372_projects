import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links social">
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
      </div>

      <div className="footer-links nav">
        <Link to="/home">Home</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Fountain Brothers
      </p>
    </footer>
  );
};

export default Footer;
