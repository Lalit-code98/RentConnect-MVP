import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Requirement 1: RentConnect Logo & Name */}
        <Link to="/" className="navbar-logo" aria-label="RentConnect Home">
          <div className="logo-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="logo-title">
            Rent<span className="logo-accent">Connect</span>
          </span>
        </Link>

        {/* Requirement 2: Navigation Links (Home, Find Property) */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/properties" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Find Property
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
