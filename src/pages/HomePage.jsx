import React from 'react';
import { mockProperties } from '../data/mockProperties';
import './HomePage.css';

function HomePage() {
  const shopCount = mockProperties.filter(p => p.category === 'Commercial Shop').length;
  const pgCount = mockProperties.filter(p => p.category === 'Room/PG').length;

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="container hero-content">
          <span className="hero-badge">Step 1 — React + Vite Architecture Ready</span>
          <h1 className="hero-title">
            Find Your Ideal <span className="highlight-text">Commercial Shop</span> or <span className="highlight-text">Room/PG</span>
          </h1>
          <p className="hero-subtitle">
            RentConnect connects property owners directly with individuals searching for verified commercial spaces and residential rentals.
          </p>

          <div className="category-stats-grid">
            <div className="stat-card">
              <span className="stat-icon">🏬</span>
              <div className="stat-info">
                <h3>Commercial Shops</h3>
                <p>{shopCount} Properties available</p>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🛏️</span>
              <div className="stat-info">
                <h3>Rooms / PGs</h3>
                <p>{pgCount} Properties available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="setup-status-section container">
        <div className="status-box">
          <h2 className="status-heading">✅ Step 1 Initialization Complete</h2>
          <ul className="status-checklist">
            <li><strong>Framework:</strong> React 18 configured with Vite build tooling</li>
            <li><strong>Router:</strong> React Router DOM v6 wired with routes</li>
            <li><strong>Styling:</strong> Pure CSS design system with custom variables and responsive rules</li>
            <li><strong>Dataset:</strong> Initialized mock dataset ({mockProperties.length} verified sample properties)</li>
            <li><strong>Next Step (Step 2):</strong> Building Property Cards, Category Filter, and Navbar controls</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
