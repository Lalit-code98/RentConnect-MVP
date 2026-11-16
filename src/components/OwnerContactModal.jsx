import React from 'react';
import './OwnerContactModal.css';

function OwnerContactModal({ property, onClose }) {
  if (!property) return null;

  const { owner, title, rent, location, category } = property;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className={`modal-category-badge ${category === 'Commercial Shop' ? 'badge-commercial' : 'badge-room'}`}>
              {category}
            </span>
            <h3 className="modal-property-title">{title}</h3>
            <p className="modal-property-location">📍 {location}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <div className="modal-price-box">
          <span className="price-label">Monthly Rent</span>
          <span className="price-value">₹{rent.toLocaleString('en-IN')} <small>/ month</small></span>
        </div>

        <div className="owner-profile-card">
          <div className="owner-avatar">
            {owner.name.charAt(0)}
          </div>
          <div className="owner-info">
            <span className="owner-role">Property Owner</span>
            <h4 className="owner-name">{owner.name}</h4>
          </div>
        </div>

        <div className="contact-actions">
          <a href={`tel:${owner.phone}`} className="contact-btn phone-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call {owner.phone}
          </a>

          <a href={`mailto:${owner.email}?subject=Inquiry regarding ${encodeURIComponent(title)}`} className="contact-btn email-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email Owner
          </a>
        </div>
      </div>
    </div>
  );
}

export default OwnerContactModal;
