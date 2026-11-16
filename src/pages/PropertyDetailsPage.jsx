import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, mockProperties } from '../data/mockProperties';
import './PropertyDetailsPage.css';

function PropertyDetailsPage() {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="property-details-page container">
        <Link to="/properties" className="back-link">&larr; Back to all properties</Link>
        <div className="not-found-card">
          <h2>Property Not Found</h2>
          <p>The property listing you requested does not exist or has been removed.</p>
          <Link to="/properties" className="primary-action-btn">Browse Available Properties</Link>
        </div>
      </div>
    );
  }

  const { title, category, rent, location, description, image, images, details, ownerName, ownerPhone, owner } = property;
  const isShop = category === CATEGORIES.COMMERCIAL;
  const fallbackImg = isShop ? '/images/shop-placeholder.svg' : '/images/room-placeholder.svg';
  const displayImage = image || (images && images[0]) || fallbackImg;
  const displayName = ownerName || (owner && owner.name) || 'Property Owner';
  const displayPhone = ownerPhone || (owner && owner.phone) || '';
  const displayEmail = (owner && owner.email) || 'contact@rentconnect.com';

  return (
    <div className="property-details-page container">
      <Link to="/properties" className="back-link">&larr; Back to all properties</Link>

      <div className="details-layout">
        {/* Left Column: Photos & Details */}
        <div className="details-main">
          <div className="details-image-container">
            <img 
              src={displayImage} 
              alt={title} 
              className="details-main-image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImg;
              }}
            />
            <span className={`category-tag ${isShop ? 'tag-shop' : 'tag-room'}`}>
              {category}
            </span>
          </div>

          <div className="details-content-box">
            <h1 className="details-title">{title}</h1>
            <p className="details-location">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {location}
            </p>

            <div className="details-section">
              <h3 className="section-subtitle">Property Overview</h3>
              <div className="specs-grid">
                {details && details.area && (
                  <div className="spec-box">
                    <span className="spec-label">Area</span>
                    <span className="spec-value">{details.area}</span>
                  </div>
                )}
                {details && details.roomType && (
                  <div className="spec-box">
                    <span className="spec-label">Room Type</span>
                    <span className="spec-value">{details.roomType}</span>
                  </div>
                )}
                {details && details.furnishing && (
                  <div className="spec-box">
                    <span className="spec-label">Furnishing</span>
                    <span className="spec-value">{details.furnishing}</span>
                  </div>
                )}
                {details && details.floor && (
                  <div className="spec-box">
                    <span className="spec-label">Floor</span>
                    <span className="spec-value">{details.floor}</span>
                  </div>
                )}
                {details && details.suitableFor && (
                  <div className="spec-box">
                    <span className="spec-label">Suitable For</span>
                    <span className="spec-value">{details.suitableFor}</span>
                  </div>
                )}
                {details && details.amenities && (
                  <div className="spec-box">
                    <span className="spec-label">Amenities</span>
                    <span className="spec-value">{details.amenities}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="details-section">
              <h3 className="section-subtitle">Description</h3>
              <p className="description-text">{description}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Owner Contact Card */}
        <aside className="details-sidebar">
          <div className="pricing-card">
            <span className="rent-label">Monthly Rent</span>
            <div className="rent-amount">
              ₹{rent.toLocaleString('en-IN')} <small>/ month</small>
            </div>
            <p className="rent-subtext">No brokerage • Direct with owner</p>

            <div className="owner-card-box">
              <div className="owner-avatar-lg">
                {displayName.charAt(0)}
              </div>
              <div className="owner-info-lg">
                <span className="owner-role-tag">Property Owner</span>
                <h4 className="owner-name-lg">{displayName}</h4>
              </div>
            </div>

            <div className="sidebar-contact-actions">
              {displayPhone && (
                <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="action-btn call-action">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call {displayPhone}
                </a>
              )}

              {displayEmail && (
                <a href={`mailto:${displayEmail}?subject=Inquiry regarding ${encodeURIComponent(title)}`} className="action-btn email-action">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email Owner
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
