import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-badge-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="brand-name">Rent<span className="brand-accent">Connect</span></span>
            </div>
            <p className="footer-description">
              A rental property platform connecting property owners directly with individuals searching for commercial shops and residential rooms/PGs.
            </p>
          </div>

          <div className="footer-links-group">
            <span className="links-header">Navigation</span>
            <ul className="links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Find Property</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <span className="links-header">Categories</span>
            <ul className="links-list">
              <li><Link to="/properties?category=Commercial+Shop">Commercial Shops</Link></li>
              <li><Link to="/properties?category=Residential+Room+%2F+PG">Rooms / PGs</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RentConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
