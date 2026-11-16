import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, getProperties, mockProperties } from '../services/propertyService';
import './HomePage.css';

function HomePage() {
  const [locationQuery, setLocationQuery] = useState('');
  const [properties, setProperties] = useState(mockProperties);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function loadCounts() {
      try {
        const res = await getProperties();
        if (isMounted && res.data) {
          setProperties(res.data);
        }
      } catch (err) {
        console.error('Error fetching properties on home:', err);
      }
    }
    loadCounts();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (locationQuery.trim()) {
      navigate(`/properties?location=${encodeURIComponent(locationQuery.trim())}`);
    } else {
      navigate('/properties');
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/properties?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-wrapper">
          <h1 className="hero-heading">
            Find the Right <span className="highlight">Space for You</span>
          </h1>

          <p className="hero-subtitle">
            RentConnect connects property owners directly with individuals searching for 
            commercial shops and residential rooms/PGs with zero middlemen.
          </p>

          {/* Location Search Input & Search Property Button */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <span className="search-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <input
                type="text"
                id="location-search"
                className="location-input"
                placeholder="Enter city, locality, or area (e.g. Adajan, Vesu, City Light)..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search Property
            </button>
          </form>
        </div>
      </section>

      {/* Two Category Cards */}
      <section className="categories-section container">
        <div className="section-header">
          <span className="section-tag">Rental Categories</span>
          <h2 className="section-title">What type of space are you looking for?</h2>
          <p className="section-desc">Select a category to browse verified listings tailored to your requirements</p>
        </div>

        <div className="category-cards-grid">
          {/* Card 1: Find a Commercial Shop */}
          <div 
            className="category-card commercial-card"
            onClick={() => handleCategoryClick(CATEGORIES.COMMERCIAL)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(CATEGORIES.COMMERCIAL)}
            id="category-commercial-shop"
          >
            <div className="card-top">
              <div className="card-icon-wrapper commercial-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <path d="M7 8h10" />
                  <path d="M7 12h5" />
                </svg>
              </div>
              <span className="category-badge shop-badge">Commercial</span>
            </div>

            <div className="card-body">
              <h3 className="card-title">Find a Commercial Shop</h3>
              <p className="card-description">
                Explore retail shops, showrooms, boutique stores, clinics, and offices across Adajan, Vesu, and City Light.
              </p>
            </div>

            <div className="card-footer">
              <span className="card-action-link">
                Browse Commercial Shops ({properties.filter(p => p.category === CATEGORIES.COMMERCIAL).length})
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>

          {/* Card 2: Find a Room / PG */}
          <div 
            className="category-card room-card"
            onClick={() => handleCategoryClick(CATEGORIES.RESIDENTIAL)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(CATEGORIES.RESIDENTIAL)}
            id="category-room-pg"
          >
            <div className="card-top">
              <div className="card-icon-wrapper room-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4v16" />
                  <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                  <path d="M2 17h20" />
                  <path d="M6 8v9" />
                </svg>
              </div>
              <span className="category-badge room-badge">Residential</span>
            </div>

            <div className="card-body">
              <h3 className="card-title">Find a Room / PG</h3>
              <p className="card-description">
                Discover furnished single & shared rooms, student hostels, and PG accommodations with meals and WiFi.
              </p>
            </div>

            <div className="card-footer">
              <span className="card-action-link">
                Browse Residential Rooms & PGs ({properties.filter(p => p.category === CATEGORIES.RESIDENTIAL).length})
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Highlights Section */}
      <section className="features-preview container">
        <div className="preview-grid">
          <div className="preview-item">
            <div className="preview-icon">📍</div>
            <div className="preview-text">
              <h4>Location-Based Search</h4>
              <p>Filter properties by your preferred area like Adajan, Vesu, or City Light</p>
            </div>
          </div>
          <div className="preview-item">
            <div className="preview-icon">💰</div>
            <div className="preview-text">
              <h4>Budget Filter</h4>
              <p>Find spaces matching your exact monthly rent budget from ₹4,500 to ₹18,000</p>
            </div>
          </div>
          <div className="preview-item">
            <div className="preview-icon">📞</div>
            <div className="preview-text">
              <h4>Direct Owner Contact</h4>
              <p>Connect with property owners directly with verified contact numbers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
