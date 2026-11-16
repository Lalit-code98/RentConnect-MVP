import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">🏢</span>
            <span>RentConnect</span>
          </div>
          <p className="footer-tagline">
            Connecting property owners with seekers for commercial shops and rooms/PGs.
          </p>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RentConnect. Built for students and commercial seekers.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
