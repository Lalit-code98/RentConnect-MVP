import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockProperties';
import './PropertyCard.css';

function PropertyCard({ property, onContactClick }) {
  const { 
    id, 
    title, 
    category, 
    rent, 
    location, 
    description,
    image, 
    images, 
    details, 
    ownerName, 
    ownerPhone, 
    owner 
  } = property;

  const isCommercial = category === CATEGORIES.COMMERCIAL;
  const fallbackImg = isCommercial ? '/images/shop-placeholder.svg' : '/images/room-placeholder.svg';
  const displayImage = image || (images && images[0]) || fallbackImg;
  const displayName = ownerName || (owner && owner.name);
  const displayPhone = ownerPhone || (owner && owner.phone);

  return (
    <article className="property-card" id={`card-${id}`}>
      {/* 1. Consistent Property Image */}
      <div className="card-media">
        <img 
          src={displayImage} 
          alt={title} 
          className="property-image"
          loading="lazy" 
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg;
          }}
        />

        {/* 5. Category Badge */}
        <span className={`category-tag ${isCommercial ? 'tag-commercial' : 'tag-residential'}`}>
          {isCommercial ? '🏬 Commercial Shop' : '🛏️ Room / PG'}
        </span>

        {/* 3. Monthly Rent Badge (INR formatting) */}
        <div className="rent-badge">
          ₹{rent.toLocaleString('en-IN')}<small>/month</small>
        </div>
      </div>

      <div className="card-content">
        {/* 2. Property Title */}
        <h3 className="property-title" title={title}>
          <Link to={`/property/${id}`}>{title}</Link>
        </h3>

        {/* 4. Location */}
        <p className="property-location">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{location}</span>
        </p>

        {/* Category-Specific Specifications */}
        <div className="property-specs-container">
          {isCommercial ? (
            /* Commercial Shop: Display Shop Size in square feet */
            <div className="spec-item commercial-spec">
              <span className="spec-label">Shop Size:</span>
              <strong className="spec-value highlight-spec">📐 {details?.area || 'N/A'}</strong>
              {details?.furnishing && <span className="spec-sub">({details.furnishing})</span>}
            </div>
          ) : (
            /* Room/PG: Display Room Type and Facilities */
            <div className="residential-specs">
              <div className="spec-item">
                <span className="spec-label">Room Type:</span>
                <strong className="spec-value">🛏️ {details?.roomType || 'Standard Room'}</strong>
              </div>
              {details?.amenities && (
                <div className="spec-item facilities-spec">
                  <span className="spec-label">Facilities:</span>
                  <span className="spec-facilities-text" title={details.amenities}>
                    ✨ {details.amenities}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 6. Short Description */}
        <p className="property-description" title={description}>
          {description}
        </p>

        {/* Owner Info Snippet */}
        <div className="card-owner-snippet">
          <span className="owner-label">Owner:</span>
          <span className="owner-name-text">{displayName}</span>
          {displayPhone && (
            <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="owner-call-link" title="Call Owner Directly">
              📞 {displayPhone}
            </a>
          )}
        </div>

        {/* Card Action Buttons: 7. View Details Button & Contact Owner */}
        <div className="card-actions-wrapper">
          <Link to={`/property/${id}`} className="view-details-btn">
            View Details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {onContactClick && (
            <button 
              type="button" 
              className="quick-contact-btn"
              onClick={() => onContactClick(property)}
              title="Quick Contact Modal"
            >
              Contact
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
