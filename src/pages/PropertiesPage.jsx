import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, mockProperties } from '../data/mockProperties';
import PropertyCard from '../components/PropertyCard';
import OwnerContactModal from '../components/OwnerContactModal';
import './PropertiesPage.css';

function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategoryParam = searchParams.get('category');
  
  // Normalize category parameter
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

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [locationSearch, setLocationSearch] = useState(initialLocation);
  const [maxBudget, setMaxBudget] = useState('All');
  const [selectedPropertyForContact, setSelectedPropertyForContact] = useState(null);

  // Sync state if URL query parameters change
  useEffect(() => {
    const cat = resolveCategory(searchParams.get('category'));
    const loc = searchParams.get('location') || '';
    setSelectedCategory(cat);
    setLocationSearch(loc);
  }, [searchParams]);

  // Update query params when category changes
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

  // Filter listings based on category, location, and monthly budget
  const filteredProperties = mockProperties.filter((property) => {
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

    // 3. Monthly Budget Filter
    if (maxBudget !== 'All') {
      const budgetNum = parseInt(maxBudget, 10);
      if (property.rent > budgetNum) {
        return false;
      }
    }

    return true;
  });

  const commercialCount = mockProperties.filter(p => p.category === CATEGORIES.COMMERCIAL).length;
  const residentialCount = mockProperties.filter(p => p.category === CATEGORIES.RESIDENTIAL).length;

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
              Showing {filteredProperties.length} verified {selectedCategory === 'All' ? 'properties' : selectedCategory.toLowerCase()} available for rent in Surat
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
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

        {/* Location & Budget Filter Controls */}
        <div className="filter-inputs-row">
          <div className="input-group search-group">
            <label htmlFor="prop-location">Location Search</label>
            <div className="input-with-icon">
              <span className="field-icon">📍</span>
              <input
                id="prop-location"
                type="text"
                placeholder="Search by area (e.g. Adajan, Vesu, City Light)..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
              {locationSearch && (
                <button 
                  type="button" 
                  className="clear-input-btn"
                  onClick={() => setLocationSearch('')}
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          <div className="input-group budget-group">
            <label htmlFor="prop-budget">Max Monthly Budget</label>
            <select
              id="prop-budget"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="budget-select"
            >
              <option value="All">Any Monthly Budget</option>
              <option value="5000">Up to ₹5,000 / month</option>
              <option value="10000">Up to ₹10,000 / month</option>
              <option value="15000">Up to ₹15,000 / month</option>
              <option value="20000">Up to ₹20,000 / month</option>
            </select>
          </div>
        </div>
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
            <h3>No Properties Found</h3>
            <p>
              We couldn't find any listings matching your current filter criteria in Surat.
              Try adjusting your area or budget.
            </p>
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('All');
                setLocationSearch('');
                setMaxBudget('All');
                setSearchParams({});
              }}
            >
              Reset All Filters
            </button>
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
