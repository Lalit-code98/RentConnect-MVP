import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockProperties';
import './PropertyCard.css';

function PropertyCard({ property, onContactClick }) {
  const { id, title, category, rent, location, image, images, details, ownerName, ownerPhone, owner } = property;
  const isShop = category === CATEGORIES.COMMERCIAL;
  const fallbackImg = isShop ? '/images/shop-placeholder.svg' : '/images/room-placeholder.svg';
  const displayImage = image || (images && images[0]) || fallbackImg;
  const displayName = ownerName || (owner && owner.name);
  const displayPhone = ownerPhone || (owner && owner.phone);

  return (
    <div className="property-card" id={`card-${id}`}>
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
        <span className={`category-tag ${isShop ? 'tag-shop' : 'tag-room'}`}>
          {category}
        </span>
        <div className="rent-badge">
          ₹{rent.toLocaleString('en-IN')}<small>/mo</small>
        </div>
      </div>

      <div className="card-content">
        <h3 className="property-title">
          <Link to={`/property/${id}`}>{title}</Link>
        </h3>

        <p className="property-location">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </p>

        {details && (
          <div className="property-specs">
            {details.area && <span className="spec-pill">📐 {details.area}</span>}
            {details.roomType && <span className="spec-pill">🛏️ {details.roomType}</span>}
            {details.furnishing && <span className="spec-pill">🛋️ {details.furnishing}</span>}
            {details.floor && <span className="spec-pill">🏢 {details.floor}</span>}
          </div>
        )}

        <div className="owner-card-preview">
          <span className="owner-preview-label">Owner:</span>
          <span className="owner-preview-name">{displayName}</span>
          <a href={`tel:${displayPhone}`} className="owner-preview-phone" title="Call Owner">
            📞 {displayPhone}
          </a>
        </div>

        <div className="card-actions">
          <button 
            type="button" 
            className="contact-owner-btn"
            onClick={() => onContactClick(property)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Contact Owner
          </button>
          <Link to={`/property/${id}`} className="view-details-link">
            Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
