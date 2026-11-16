import React from 'react';
import './ContactOwnerSection.css';

function ContactOwnerSection({ ownerName, ownerPhone, propertyTitle }) {
  // Format clean phone number for tel: link (removes spaces, dashes, parentheses)
  const cleanTelNumber = ownerPhone ? ownerPhone.replace(/[^0-9+]/g, '') : '';

  return (
    <section className="contact-owner-card" id="contact-owner-section">
      <div className="contact-card-header">
        <div className="owner-avatar-circle">
          {ownerName ? ownerName.charAt(0) : 'O'}
        </div>
        <div className="owner-title-block">
          <span className="owner-tag">Verified Property Owner</span>
          <h3 className="owner-full-name">{ownerName || 'Property Owner'}</h3>
        </div>
      </div>

      <div className="owner-phone-display-box">
        <span className="phone-label">Direct Phone Number:</span>
        <span className="phone-number-value">{ownerPhone}</span>
      </div>

      {/* Requirement 3 & 4: Call Owner button with working tel: link */}
      <a 
        href={`tel:${cleanTelNumber}`} 
        className="call-owner-btn"
        id="call-owner-action"
        title={`Call ${ownerName} directly at ${ownerPhone}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>Call Owner ({ownerPhone})</span>
      </a>

      <p className="call-helper-text">
        Tapping this button will open your device's phone app with <strong>{cleanTelNumber}</strong> ready to dial.
      </p>
    </section>
  );
}

export default ContactOwnerSection;
