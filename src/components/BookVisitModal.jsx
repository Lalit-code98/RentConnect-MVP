import React, { useState } from 'react';
import './BookVisitModal.css';

function BookVisitModal({ property, isOpen, onClose }) {
  if (!isOpen || !property) return null;

  const {
    id: propertyId,
    title,
    location,
    rent,
    ownerName,
    owner,
    category
  } = property;

  const displayName = ownerName || (owner && owner.name) || 'Property Owner';

  // Form input states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [message, setMessage] = useState('');

  // Validation & Submission states
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Compute today's date in YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long.';
    }

    // 2. Phone Number validation (at least 10 digits)
    const digitsOnly = phoneNumber.replace(/[^0-9]/g, '');
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (digitsOnly.length < 10) {
      newErrors.phoneNumber = 'Please enter a valid phone number (at least 10 digits).';
    }

    // 3. Visit Date validation (must not be empty, must not be in past)
    if (!visitDate) {
      newErrors.visitDate = 'Preferred Visit Date is required.';
    } else if (visitDate < todayStr) {
      newErrors.visitDate = 'Visit date cannot be in the past.';
    }

    // 4. Visit Time validation
    if (!visitTime) {
      newErrors.visitTime = 'Preferred Visit Time is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Construct visit request record
    const visitRequest = {
      id: 'vr_' + Date.now(),
      propertyId,
      propertyTitle: title,
      propertyLocation: location,
      propertyRent: rent,
      propertyCategory: category,
      ownerName: displayName,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      visitDate,
      visitTime,
      message: message.trim(),
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const STORAGE_KEY = 'rentconnect_visit_requests';
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.push(visitRequest);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not persist visit request to localStorage:', err);
    }

    setSubmittedData(visitRequest);
    setIsSubmitted(true);
  };

  // Reset and close
  const handleClose = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFullName('');
    setPhoneNumber('');
    setVisitDate('');
    setVisitTime('');
    setMessage('');
    setErrors({});
    onClose();
  };

  return (
    <div className="booking-modal-backdrop" onClick={handleClose}>
      <div 
        className="booking-modal-card" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Modal Close Button */}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={handleClose}
          aria-label="Close booking modal"
        >
          &times;
        </button>

        {!isSubmitted ? (
          <>
            {/* Modal Header */}
            <div className="modal-header-section">
              <span className="booking-badge">📅 Schedule a Property Visit</span>
              <h2 id="booking-modal-title" className="booking-modal-title">Book a Visit</h2>
              <p className="booking-modal-subtitle">
                Choose a convenient date and time to visit this space. The property owner will be notified to confirm.
              </p>
            </div>

            {/* Requirement 4: Automatically displayed property details */}
            <div className="property-summary-banner">
              <div className="summary-col">
                <span className="summary-label">Property:</span>
                <strong className="summary-value" title={title}>{title}</strong>
              </div>
              <div className="summary-col">
                <span className="summary-label">Location:</span>
                <span className="summary-value">📍 {location}</span>
              </div>
              <div className="summary-col">
                <span className="summary-label">Monthly Rent:</span>
                <span className="summary-price">₹{rent.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="summary-col">
                <span className="summary-label">Owner:</span>
                <span className="summary-value">👤 {displayName}</span>
              </div>
            </div>

            {/* Requirement 3: Professional Booking Form */}
            <form className="booking-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                {/* 1. Full Name */}
                <div className="form-group">
                  <label htmlFor="visitor-name">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input
                    id="visitor-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                    className={errors.fullName ? 'input-error' : ''}
                  />
                  {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
                </div>

                {/* 2. Phone Number */}
                <div className="form-group">
                  <label htmlFor="visitor-phone">
                    Phone Number <span className="required-star">*</span>
                  </label>
                  <input
                    id="visitor-phone"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: null });
                    }}
                    className={errors.phoneNumber ? 'input-error' : ''}
                  />
                  {errors.phoneNumber && <span className="field-error-msg">{errors.phoneNumber}</span>}
                </div>

                {/* 3. Preferred Visit Date */}
                <div className="form-group">
                  <label htmlFor="visit-date">
                    Preferred Visit Date <span className="required-star">*</span>
                  </label>
                  <input
                    id="visit-date"
                    type="date"
                    min={todayStr}
                    value={visitDate}
                    onChange={(e) => {
                      setVisitDate(e.target.value);
                      if (errors.visitDate) setErrors({ ...errors, visitDate: null });
                    }}
                    className={errors.visitDate ? 'input-error' : ''}
                  />
                  {errors.visitDate && <span className="field-error-msg">{errors.visitDate}</span>}
                </div>

                {/* 4. Preferred Visit Time */}
                <div className="form-group">
                  <label htmlFor="visit-time">
                    Preferred Visit Time <span className="required-star">*</span>
                  </label>
                  <select
                    id="visit-time"
                    value={visitTime}
                    onChange={(e) => {
                      setVisitTime(e.target.value);
                      if (errors.visitTime) setErrors({ ...errors, visitTime: null });
                    }}
                    className={errors.visitTime ? 'input-error' : ''}
                  >
                    <option value="">Select a time slot</option>
                    <option value="10:00 AM - 12:00 PM">Morning (10:00 AM – 12:00 PM)</option>
                    <option value="12:00 PM - 02:00 PM">Afternoon (12:00 PM – 02:00 PM)</option>
                    <option value="02:00 PM - 04:00 PM">Late Afternoon (02:00 PM – 04:00 PM)</option>
                    <option value="04:00 PM - 06:00 PM">Evening (04:00 PM – 06:00 PM)</option>
                    <option value="06:00 PM - 08:00 PM">Late Evening (06:00 PM – 08:00 PM)</option>
                  </select>
                  {errors.visitTime && <span className="field-error-msg">{errors.visitTime}</span>}
                </div>

                {/* 5. Additional Message (optional) */}
                <div className="form-group full-width">
                  <label htmlFor="visit-message">
                    Additional Message <span className="optional-tag">(Optional)</span>
                  </label>
                  <textarea
                    id="visit-message"
                    rows="3"
                    placeholder="Any specific questions, preferred meeting point, or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              {/* Requirement 5: Submit Button */}
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-booking-btn"
                  id="submit-visit-request-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Submit Visit Request
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Requirement 7 & 8: Confirmation Screen */
          <div className="confirmation-screen" id="visit-confirmation-screen">
            <div className="success-icon-badge" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h2 className="confirmation-heading">Your visit request has been submitted successfully!</h2>
            <p className="confirmation-subtext">
              The owner has received your request and will reach out via phone to coordinate your visit.
            </p>

            {/* Visit Details Summary */}
            {submittedData && (
              <div className="confirmation-details-box">
                <div className="confirm-row">
                  <span className="confirm-label">Property:</span>
                  <span className="confirm-value"><strong>{submittedData.propertyTitle}</strong></span>
                </div>
                <div className="confirm-row">
                  <span className="confirm-label">Location:</span>
                  <span className="confirm-value">{submittedData.propertyLocation}</span>
                </div>
                <div className="confirm-row">
                  <span className="confirm-label">Visit Schedule:</span>
                  <span className="confirm-value highlight-schedule">
                    📅 {submittedData.visitDate} ({submittedData.visitTime})
                  </span>
                </div>
                <div className="confirm-row">
                  <span className="confirm-label">Visitor:</span>
                  <span className="confirm-value">{submittedData.fullName} • {submittedData.phoneNumber}</span>
                </div>
                <div className="confirm-row">
                  <span className="confirm-label">Property Owner:</span>
                  <span className="confirm-value">{submittedData.ownerName}</span>
                </div>
                {submittedData.message && (
                  <div className="confirm-row">
                    <span className="confirm-label">Note:</span>
                    <span className="confirm-value">"{submittedData.message}"</span>
                  </div>
                )}
              </div>
            )}

            {/* Storage note explaining localStorage limitations for demo */}
            <div className="storage-info-note">
              <span className="storage-icon">ℹ️</span>
              <p>
                <strong>Demo Mode Storage:</strong> This visit request is saved in your browser's <code>localStorage</code> under <code>rentconnect_visit_requests</code>. It will persist in this browser session without sending data to an external server.
              </p>
            </div>

            {/* Return to Property Details */}
            <div className="confirmation-actions">
              <button 
                type="button" 
                className="return-details-btn"
                onClick={handleClose}
                id="return-to-details-btn"
              >
                &larr; Return to Property Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookVisitModal;
