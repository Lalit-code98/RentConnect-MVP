import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, getPropertyById } from '../services/propertyService';
import ContactOwnerSection from '../components/ContactOwnerSection';
import BookVisitModal from '../components/BookVisitModal';
import './PropertyDetailsPage.css';

function PropertyDetailsPage() {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataInfo, setDataInfo] = useState({ source: 'local', isLive: false });

  // Retrieve selected property by unique ID using propertyService
  useEffect(() => {
    let isMounted = true;
    async function loadPropertyDetails() {
      setLoading(true);
      try {
        const result = await getPropertyById(id);
        if (isMounted) {
          setProperty(result.data);
          setDataInfo({
            source: result.source,
            isLive: result.isLive,
          });
        }
      } catch (err) {
        console.error('Error fetching property details:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPropertyDetails();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="property-details-page container">
        <Link to="/properties" className="back-link">&larr; Back to all listings</Link>
        <div className="details-loading-card">
          <div className="spinner"></div>
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

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
        {/* Main Column (Images, Overview, Specs, Description, Contact Section) */}
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

            {/* Availability Badge, Data Source Badge & Quick Book Action */}
            <div className="header-meta-row">
              {availability && (
                <div className="availability-tag">
                  <span className="status-dot"></span>
                  <strong>Availability:</strong> {availability}
                </div>
              )}
              {dataInfo.isLive ? (
                <span className="data-source-badge live" title="Loaded from Firebase Firestore">
                  <span className="badge-dot live-dot"></span> Live Firestore
                </span>
              ) : (
                <span className="data-source-badge local" title="Loaded from local sample data fallback">
                  <span className="badge-dot local-dot"></span> Local Demo Data
                </span>
              )}
              <button
                type="button"
                className="book-visit-header-btn"
                onClick={() => setIsBookingOpen(true)}
                id="book-visit-btn-main"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Book a Visit</span>
              </button>
            </div>
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

          {/* Dedicated Contact Owner Section on Main Flow */}
          <div className="details-card contact-section-card">
            <h2 className="section-heading">Contact Owner Directly</h2>
            <ContactOwnerSection
              ownerName={displayName}
              ownerPhone={displayPhone}
              propertyTitle={title}
            />
          </div>
        </div>

        {/* Sidebar: Sticky Pricing & Call Owner Card */}
        <aside className="details-sidebar-column">
          <div className="sticky-sidebar-card">
            {/* Rent Pricing Block */}
            <div className="rent-pricing-block">
              <span className="pricing-label">Monthly Rent</span>
              <div className="pricing-value">
                ₹{rent.toLocaleString('en-IN')}<small> / month</small>
              </div>
              <p className="pricing-subtext">Direct from Owner • Zero Brokerage</p>

              {/* Requirement 1: Clearly visible "Book a Visit" button */}
              <button
                type="button"
                className="book-visit-primary-btn"
                onClick={() => setIsBookingOpen(true)}
                id="book-visit-btn-sidebar"
                title="Schedule an in-person visit to inspect this space"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Book a Visit</span>
              </button>
            </div>

            {/* Sidebar Contact Owner Widget */}
            <div className="sidebar-contact-widget">
              <ContactOwnerSection
                ownerName={displayName}
                ownerPhone={displayPhone}
                propertyTitle={title}
              />
            </div>
          </div>
        </aside>
      </div>

      {/* Step 11: Book a Visit Modal Component */}
      <BookVisitModal
        property={property}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

export default PropertyDetailsPage;
