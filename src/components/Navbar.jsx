import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏢</span>
          <span className="logo-text">
            Rent<span className="logo-highlight">Connect</span>
          </span>
        </Link>
        <nav className="navbar-nav">
          <Link to="/" className="nav-link active">Properties</Link>
          <a href="#about" className="nav-link">About</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
