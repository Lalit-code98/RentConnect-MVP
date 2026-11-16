import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProperties } from '../data/mockProperties';
import './PropertyDetailsPage.css';

function PropertyDetailsPage() {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);

  return (
    <div className="property-details-page container">
      <Link to="/" className="back-link">&larr; Back to all properties</Link>
      {property ? (
        <div className="details-placeholder-card">
          <h1>{property.title}</h1>
          <span className="category-pill">{property.category}</span>
          <p className="price-tag">₹{property.rent.toLocaleString('en-IN')}/month</p>
          <p className="location-tag">📍 {property.location}</p>
        </div>
      ) : (
        <div className="not-found-card">
          <h2>Property Not Found</h2>
          <p>The property listing you requested does not exist.</p>
        </div>
      )}
    </div>
  );
}

export default PropertyDetailsPage;
