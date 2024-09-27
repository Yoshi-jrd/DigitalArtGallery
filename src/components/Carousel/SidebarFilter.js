// SidebarFilter.js
import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi'; // Icons for toggle buttons

function SidebarFilter({ filterOptions, setFilterOptions }) {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterOptions({ style: 'All', artist: 'All' });
  };

  return (
    <div className={`sidebar-filter ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FiX size={24} /> : <FiFilter size={24} />}
      </button>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        <h3 className="filter-title">Filters</h3>

        {/* Style Filter */}
        <div className="filter-group">
          <label className="filter-label">Style</label>
          <select name="style" value={filterOptions.style} onChange={handleFilterChange} className="filter-select">
            <option value="All">All</option>
            <option value="Abstract">Abstract</option>
            <option value="Modern">Modern</option>
            <option value="Surreal">Surreal</option>
          </select>
        </div>

        {/* Artist Filter */}
        <div className="filter-group">
          <label className="filter-label">Artist</label>
          <select name="artist" value={filterOptions.artist} onChange={handleFilterChange} className="filter-select">
            <option value="All">All</option>
            <option value="Jane Doe">Jane Doe</option>
            <option value="John Smith">John Smith</option>
            <option value="Anna Lee">Anna Lee</option>
          </select>
        </div>

        {/* Apply and Reset Buttons */}
        <div className="filter-buttons">
          <button className="apply-btn" onClick={toggleSidebar}>
            Apply
          </button>
          <button className="reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarFilter;
