import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProperties } from '../data/mockProperties';
import PropertyCard from '../components/PropertyCard';
import OwnerContactModal from '../components/OwnerContactModal';
import './PropertiesPage.css';

function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialLocation = searchParams.get('location') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [locationSearch, setLocationSearch] = useState(initialLocation);
  const [maxBudget, setMaxBudget] = useState('All');
  const [selectedPropertyForContact, setSelectedPropertyForContact] = useState(null);

  // Sync state if URL query parameters change (e.g. navigation from navbar or category cards)
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
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

    // 2. Location Search Filter (case-insensitive substring match)
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

  return (
    <div className="properties-page container">
      {/* Top Controls: Search, Category, and Budget Filter */}
      <section className="filter-panel">
        <div className="filter-header">
          <div>
            <h1 className="page-title">
              {selectedCategory === 'All' ? 'All Rental Listings' : `${selectedCategory}s`}
            </h1>
            <p className="page-subtitle">
              Showing {filteredProperties.length} verified {selectedCategory === 'All' ? 'spaces' : selectedCategory.toLowerCase()} available for rent
            </p>
          </div>
        </div>

        {/* Feature 1: Category Filter Buttons */}
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
            className={`filter-pill ${selectedCategory === 'Commercial Shop' ? 'pill-active' : ''}`}
            onClick={() => handleCategorySelect('Commercial Shop')}
          >
            🏬 Commercial Shops ({mockProperties.filter(p => p.category === 'Commercial Shop').length})
          </button>
          <button
            type="button"
            id="filter-btn-room"
            className={`filter-pill ${selectedCategory === 'Room/PG' ? 'pill-active' : ''}`}
            onClick={() => handleCategorySelect('Room/PG')}
          >
            🛏️ Rooms / PGs ({mockProperties.filter(p => p.category === 'Room/PG').length})
          </button>
        </div>

        {/* Search & Budget Filter Controls */}
        <div className="filter-inputs-row">
          {/* Feature 2: Location Search Input */}
          <div className="input-group search-group">
            <label htmlFor="prop-location">Location Search</label>
            <div className="input-with-icon">
              <span className="field-icon">📍</span>
              <input
                id="prop-location"
                type="text"
                placeholder="Search city, sector, or locality..."
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

          {/* Feature 3: Monthly Rent Budget Filter */}
          <div className="input-group budget-group">
            <label htmlFor="prop-budget">Max Monthly Budget</label>
            <select
              id="prop-budget"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="budget-select"
            >
              <option value="All">Any Monthly Budget</option>
              <option value="10000">Up to ₹10,000 / month</option>
              <option value="20000">Up to ₹20,000 / month</option>
              <option value="30000">Up to ₹30,000 / month</option>
              <option value="50000">Up to ₹50,000 / month</option>
            </select>
          </div>
        </div>
      </section>

      {/* Feature 4: Property Listings Grid */}
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
              We couldn't find any listings matching your current filter criteria.
              Try adjusting your location or budget.
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

      {/* Feature 5: Owner Contact Modal */}
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
