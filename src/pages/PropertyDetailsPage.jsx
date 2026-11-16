import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, mockProperties } from '../data/mockProperties';
import './PropertyDetailsPage.css';

function PropertyDetailsPage() {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Retrieve selected property by unique ID
  const property = mockProperties.find((p) => p.id === id);

  // If property is not found, display graceful fallback
  if (!property) {
    return (
      <div className="property-details-page container">
        <Link to="/properties" className="back-link">&larr; Back to all listings</Link>
        <div className="not-found-card">
          <div className="not-found-icon">🏢</div>
          <h2>Property Listing Not Found</h2>
          <p>The property you are looking for does not exist or has been removed.</p>
          <Link to="/properties" className="primary-action-btn">
            Browse All Available Properties
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    category,
    rent,
    location,
    availability,
    description,
    image,
    images = [],
    details,
    ownerName,
    ownerPhone,
    owner
  } = property;

  const isCommercial = category === CATEGORIES.COMMERCIAL;
  const fallbackImg = isCommercial ? '/images/shop-placeholder.svg' : '/images/room-placeholder.svg';
  
  // Image gallery array
  const imageGallery = (images && images.length > 0) ? images : (image ? [image] : [fallbackImg]);
  const activeImage = imageGallery[activeImageIndex] || fallbackImg;

  const displayName = ownerName || (owner && owner.name) || 'Property Owner';
  const displayPhone = ownerPhone || (owner && owner.phone) || '';
  const cleanPhone = displayPhone.replace(/[^0-9+]/g, '');
  const displayEmail = (owner && owner.email) || 'contact@rentconnect.com';

  return (
    <div className="property-details-page container">
      {/* Back to listings button */}
      <nav className="details-navigation" aria-label="Breadcrumb">
        <Link to="/properties" className="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to all listings
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{title}</span>
      </nav>

      <div className="details-layout-grid">
        {/* Main Column (Images, Overview, Specs, Description) */}
        <div className="details-main-column">
          {/* Property Image Gallery */}
          <div className="gallery-card">
            <div className="hero-image-wrapper">
              <img
                src={activeImage}
                alt={`${title} - view ${activeImageIndex + 1}`}
                className="hero-display-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackImg;
                }}
              />
              <span className={`details-category-badge ${isCommercial ? 'badge-commercial' : 'badge-residential'}`}>
                {isCommercial ? '🏬 Commercial Shop' : '🛏️ Residential Room / PG'}
              </span>
              <div className="image-counter">
                {activeImageIndex + 1} / {imageGallery.length}
              </div>
            </div>

            {/* Thumbnail switcher if multiple images are present */}
            {imageGallery.length > 1 && (
              <div className="thumbnails-strip">
                {imageGallery.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`thumb-btn ${activeImageIndex === index ? 'thumb-active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Show photo ${index + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImg;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Location Header */}
          <div className="details-card header-details-card">
            <h1 className="details-title">{title}</h1>
            <p className="details-location">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{location}</span>
            </p>

            {/* Availability Badge */}
            {availability && (
              <div className="availability-tag">
                <span className="status-dot"></span>
                <strong>Availability:</strong> {availability}
              </div>
            )}
          </div>

          {/* Property Specifications Section */}
          <div className="details-card">
            <h2 className="section-heading">
              {isCommercial ? 'Commercial Shop Specifications' : 'Room & Facility Details'}
            </h2>

            <div className="specs-grid">
              {isCommercial ? (
                /* Commercial Specific Fields */
                <>
                  <div className="spec-tile highlight-tile">
                    <span className="spec-tile-label">Shop Size</span>
                    <strong className="spec-tile-value highlight-value">📐 {details?.area || 'N/A'}</strong>
                    <span className="spec-tile-note">Carpet Area</span>
                  </div>

                  <div className="spec-tile">
                    <span className="spec-tile-label">Furnishing Status</span>
                    <strong className="spec-tile-value">🛋️ {details?.furnishing || 'N/A'}</strong>
                    <span className="spec-tile-note">Interior Setup</span>
                  </div>

                  <div className="spec-tile">
                    <span className="spec-tile-label">Floor Position</span>
                    <strong className="spec-tile-value">🏢 {details?.floor || 'Ground Floor'}</strong>
                    <span className="spec-tile-note">Market Level</span>
                  </div>

                  <div className="spec-tile full-width-tile">
                    <span className="spec-tile-label">Suitable For</span>
                    <strong className="spec-tile-value">💼 {details?.suitableFor || 'Retail, Clinic, Office'}</strong>
                    <span className="spec-tile-note">Commercial Zoning</span>
                  </div>

                  {details?.availableFor && (
                    <div className="spec-tile full-width-tile">
                      <span className="spec-tile-label">Tenant Preference</span>
                      <strong className="spec-tile-value">👥 {details.availableFor}</strong>
                    </div>
                  )}
                </>
              ) : (
                /* Residential Room/PG Specific Fields */
                <>
                  <div className="spec-tile highlight-tile">
                    <span className="spec-tile-label">Room Type</span>
                    <strong className="spec-tile-value highlight-value">🛏️ {details?.roomType || 'Standard Room'}</strong>
                    <span className="spec-tile-note">Occupancy</span>
                  </div>

                  <div className="spec-tile">
                    <span className="spec-tile-label">Furnishing Status</span>
                    <strong className="spec-tile-value">🛋️ {details?.furnishing || 'N/A'}</strong>
                    <span className="spec-tile-note">Furniture Included</span>
                  </div>

                  <div className="spec-tile">
                    <span className="spec-tile-label">Available For</span>
                    <strong className="spec-tile-value">👥 {details?.availableFor || 'All Seekers'}</strong>
                    <span className="spec-tile-note">Tenant Suitability</span>
                  </div>

                  <div className="spec-tile full-width-tile">
                    <span className="spec-tile-label">Included Facilities & Amenities</span>
                    <div className="facilities-pills-list">
                      {details?.amenities?.split(',').map((facility, idx) => (
                        <span key={idx} className="facility-pill">
                          ✨ {facility.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Full Description Section */}
          <div className="details-card">
            <h2 className="section-heading">Property Description</h2>
            <p className="full-description-text">{description}</p>
          </div>
        </div>

        {/* Sidebar: Sticky Pricing & Contact Owner Section */}
        <aside className="details-sidebar-column">
          <div className="sticky-sidebar-card">
            {/* Rent Pricing Block */}
            <div className="rent-pricing-block">
              <span className="pricing-label">Monthly Rent</span>
              <div className="pricing-value">
                ₹{rent.toLocaleString('en-IN')}<small> / month</small>
              </div>
              <p className="pricing-subtext">Direct from Owner • Zero Brokerage</p>
            </div>

            {/* Contact Owner Section */}
            <div className="contact-owner-section">
              <h3 className="contact-section-title">Contact Property Owner</h3>
              
              <div className="owner-profile-card">
                <div className="owner-avatar">
                  {displayName.charAt(0)}
                </div>
                <div className="owner-meta">
                  <span className="verified-badge">✓ Verified Owner</span>
                  <h4 className="owner-name">{displayName}</h4>
                  <p className="owner-location">📍 {location}</p>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="contact-cta-buttons">
                {displayPhone && (
                  <a 
                    href={`tel:${cleanPhone}`} 
                    className="contact-action-btn phone-call-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Call {displayPhone}</span>
                  </a>
                )}

                {displayPhone && (
                  <a 
                    href={`https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(`Hello ${displayName}, I am inquiring about "${title}" listed on RentConnect for ₹${rent.toLocaleString('en-IN')}/month.`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-action-btn whatsapp-btn"
                  >
                    <span className="whatsapp-icon" aria-hidden="true">💬</span>
                    <span>Chat on WhatsApp</span>
                  </a>
                )}

                {displayEmail && (
                  <a 
                    href={`mailto:${displayEmail}?subject=${encodeURIComponent(`Inquiry for ${title}`)}&body=${encodeURIComponent(`Hello ${displayName},\n\nI am interested in your property "${title}" located in ${location} listed on RentConnect for ₹${rent.toLocaleString('en-IN')}/month.\n\nPlease let me know when we can schedule a visit.\n\nThank you!`)}`} 
                    className="contact-action-btn email-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>Email Owner</span>
                  </a>
                )}
              </div>

              {/* Safety notice for renters */}
              <div className="security-notice">
                <span className="notice-icon">🛡️</span>
                <p className="notice-text">
                  <strong>RentConnect Safety Tip:</strong> Always visit and inspect the property in person before paying advance rent.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
