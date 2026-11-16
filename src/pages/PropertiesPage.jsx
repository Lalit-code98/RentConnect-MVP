import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, mockProperties } from '../data/mockProperties';
import PropertyCard from '../components/PropertyCard';
import OwnerContactModal from '../components/OwnerContactModal';
import './PropertiesPage.css';

// Helper for Indian Rupee (INR) currency formatting
export const formatINR = (amount) => {
  return '₹' + Number(amount).toLocaleString('en-IN');
};

function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategoryParam = searchParams.get('category');
  
  // Normalize URL category parameter
  const resolveCategory = (param) => {
    if (!param || param === 'All') return 'All';
    if (param.toLowerCase().includes('commercial') || param.toLowerCase().includes('shop')) {
      return CATEGORIES.COMMERCIAL;
    }
    if (param.toLowerCase().includes('room') || param.toLowerCase().includes('pg') || param.toLowerCase().includes('residential')) {
      return CATEGORIES.RESIDENTIAL;
    }
    return 'All';
  };

  const initialCategory = resolveCategory(rawCategoryParam);
  const initialLocation = searchParams.get('location') || '';
  const initialMinRent = searchParams.get('min') || searchParams.get('minRent') || '';
  const initialMaxRent = searchParams.get('max') || searchParams.get('maxRent') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [locationSearch, setLocationSearch] = useState(initialLocation);
  const [minRent, setMinRent] = useState(initialMinRent);
  const [maxRent, setMaxRent] = useState(initialMaxRent);
  const [validationError, setValidationError] = useState('');
  const [selectedPropertyForContact, setSelectedPropertyForContact] = useState(null);

  // Sync state if URL query parameters change (e.g. from homepage category cards or search)
  useEffect(() => {
    const cat = resolveCategory(searchParams.get('category'));
    const loc = searchParams.get('location') || '';
    const min = searchParams.get('min') || searchParams.get('minRent') || '';
    const max = searchParams.get('max') || searchParams.get('maxRent') || '';
    setSelectedCategory(cat);
    setLocationSearch(loc);
    if (min !== minRent) setMinRent(min);
    if (max !== maxRent) setMaxRent(max);
  }, [searchParams]);

  // Validate budget inputs whenever minRent or maxRent changes
  useEffect(() => {
    const min = parseFloat(minRent);
    const max = parseFloat(maxRent);

    if (minRent !== '' && min < 0) {
      setValidationError('Minimum rent cannot be negative.');
      return;
    }
    if (maxRent !== '' && max < 0) {
      setValidationError('Maximum rent cannot be negative.');
      return;
    }
    if (minRent !== '' && maxRent !== '' && min > max) {
      setValidationError(`Minimum rent (${formatINR(min)}) cannot be greater than Maximum rent (${formatINR(max)}).`);
      return;
    }

    setValidationError('');
  }, [minRent, maxRent]);

  // Handle category pill clicks
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  // Quick budget preset handler
  const handleBudgetPreset = (min, max) => {
    setMinRent(min.toString());
    setMaxRent(max.toString());
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setLocationSearch('');
    setMinRent('');
    setMaxRent('');
    setValidationError('');
    setSearchParams({});
  };

  // COMBINED FILTERING LOGIC
  const filteredProperties = mockProperties.filter((property) => {
    // If budget validation error exists, do not show any mismatched properties
    if (validationError) {
      return false;
    }

    // 1. Category Filter
    if (selectedCategory !== 'All' && property.category !== selectedCategory) {
      return false;
    }

    // 2. Location Search Filter (case-insensitive search against location and title)
    if (locationSearch.trim()) {
      const query = locationSearch.toLowerCase().trim();
      const matchesLocation = property.location.toLowerCase().includes(query);
      const matchesTitle = property.title.toLowerCase().includes(query);
      if (!matchesLocation && !matchesTitle) {
        return false;
      }
    }

    // 3. Minimum Monthly Rent Filter
    if (minRent !== '' && !isNaN(Number(minRent))) {
      if (property.rent < Number(minRent)) {
        return false;
      }
    }

    // 4. Maximum Monthly Rent Filter
    if (maxRent !== '' && !isNaN(Number(maxRent))) {
      if (property.rent > Number(maxRent)) {
        return false;
      }
    }

    return true;
  });

  const commercialCount = mockProperties.filter(p => p.category === CATEGORIES.COMMERCIAL).length;
  const residentialCount = mockProperties.filter(p => p.category === CATEGORIES.RESIDENTIAL).length;
  const isAnyFilterActive = selectedCategory !== 'All' || locationSearch.trim() !== '' || minRent !== '' || maxRent !== '';

  return (
    <div className="properties-page container">
      {/* Top Filter Panel */}
      <section className="filter-panel">
        <div className="filter-header">
          <div>
            <h1 className="page-title">
              {selectedCategory === 'All' ? 'All Rental Listings' : selectedCategory}
            </h1>
            <p className="page-subtitle">
              Showing {filteredProperties.length} of {mockProperties.length} verified listings in Surat
            </p>
          </div>

          {/* Reset Filters Action Button */}
          {isAnyFilterActive && (
            <button
              type="button"
              className="reset-header-btn"
              onClick={handleResetFilters}
              title="Reset all search and budget filters"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset Filters
            </button>
          )}
        </div>

        {/* 1. Category Filter Tabs */}
        <div className="category-filter-bar">
          <button
            type="button"
            className={`filter-pill ${selectedCategory === 'All' ? 'pill-active' : ''}`}
            onClick={() => handleCategorySelect('All')}
          >
            All Spaces ({mockProperties.length})
          </button>
          <button
            type="button"
            id="filter-btn-commercial"
            className={`filter-pill ${selectedCategory === CATEGORIES.COMMERCIAL ? 'pill-active' : ''}`}
            onClick={() => handleCategorySelect(CATEGORIES.COMMERCIAL)}
          >
            🏬 Commercial Shops ({commercialCount})
          </button>
          <button
            type="button"
            id="filter-btn-residential"
            className={`filter-pill ${selectedCategory === CATEGORIES.RESIDENTIAL ? 'pill-active' : ''}`}
            onClick={() => handleCategorySelect(CATEGORIES.RESIDENTIAL)}
          >
            🛏️ Residential Rooms / PGs ({residentialCount})
          </button>
        </div>

        {/* 2. Combined Filter Inputs: Location & Min/Max Monthly Rent */}
        <div className="filter-inputs-grid">
          {/* Location Search Input */}
          <div className="input-group location-group">
            <label htmlFor="prop-location">Location Search</label>
            <div className="input-with-icon">
              <span className="field-icon">📍</span>
              <input
                id="prop-location"
                type="text"
                placeholder="Enter area (e.g. Adajan, Vesu, City Light)..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
              {locationSearch && (
                <button 
                  type="button" 
                  className="clear-input-btn"
                  onClick={() => setLocationSearch('')}
                  aria-label="Clear location search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Min Monthly Rent Input */}
          <div className="input-group budget-input-group">
            <label htmlFor="min-rent">Min Rent (₹/mo)</label>
            <div className="input-with-currency">
              <span className="currency-symbol">₹</span>
              <input
                id="min-rent"
                type="number"
                min="0"
                step="500"
                placeholder="0"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
              />
              {minRent && (
                <button 
                  type="button" 
                  className="clear-input-btn"
                  onClick={() => setMinRent('')}
                  aria-label="Clear minimum rent"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Max Monthly Rent Input */}
          <div className="input-group budget-input-group">
            <label htmlFor="max-rent">Max Rent (₹/mo)</label>
            <div className="input-with-currency">
              <span className="currency-symbol">₹</span>
              <input
                id="max-rent"
                type="number"
                min="0"
                step="500"
                placeholder="e.g. 20000"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
              />
              {maxRent && (
                <button 
                  type="button" 
                  className="clear-input-btn"
                  onClick={() => setMaxRent('')}
                  aria-label="Clear maximum rent"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Budget Presets */}
        <div className="budget-presets-row">
          <span className="presets-label">Popular Budgets:</span>
          <button
            type="button"
            className={`preset-btn ${minRent === '5000' && maxRent === '10000' ? 'preset-active' : ''}`}
            onClick={() => handleBudgetPreset(5000, 10000)}
          >
            ₹5,000 – ₹10,000
          </button>
          <button
            type="button"
            className={`preset-btn ${minRent === '10000' && maxRent === '20000' ? 'preset-active' : ''}`}
            onClick={() => handleBudgetPreset(10000, 20000)}
          >
            ₹10,000 – ₹20,000
          </button>
          <button
            type="button"
            className={`preset-btn ${minRent === '0' && maxRent === '6000' ? 'preset-active' : ''}`}
            onClick={() => handleBudgetPreset(0, 6000)}
          >
            Under ₹6,000
          </button>
          {(minRent || maxRent) && (
            <button
              type="button"
              className="clear-budget-link"
              onClick={() => { setMinRent(''); setMaxRent(''); }}
            >
              Clear Budget
            </button>
          )}
        </div>

        {/* Budget Validation Error Notice */}
        {validationError && (
          <div className="validation-error-box" role="alert">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{validationError}</span>
          </div>
        )}
      </section>

      {/* Property Listings Grid */}
      <section className="listings-grid-section">
        {filteredProperties.length > 0 ? (
          <div className="listings-grid">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onContactClick={(prop) => setSelectedPropertyForContact(prop)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-listings-state">
            <div className="empty-icon">🔍</div>
            <h3>No Properties Match Your Search</h3>
            <p>
              {validationError 
                ? 'Please correct the budget range above to view properties.'
                : 'No properties found matching your combined location and monthly budget criteria.'
              }
            </p>
            <div className="empty-state-actions">
              <button
                type="button"
                className="reset-filters-btn"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Owner Contact Modal */}
      {selectedPropertyForContact && (
        <OwnerContactModal
          property={selectedPropertyForContact}
          onClose={() => setSelectedPropertyForContact(null)}
        />
      )}
    </div>
  );
}

export default PropertiesPage;
