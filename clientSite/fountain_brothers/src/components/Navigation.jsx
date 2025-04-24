import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {

  return (
    <nav className="navbar">
  <div className="nav-inner">
    <img src="/images/logoSite.jpg" alt="Logo" className="nav-logo" />
    <ul className="nav-links">
      <li><a href="/home">Home</a></li>
      <li><a href="/members">Members</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </div>
</nav>

  );
};

export default Navigation;
