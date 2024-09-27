// SidebarFilter.js
import React, { useState, useEffect, useRef } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import './SidebarFilter.css'

function SidebarFilter({ filterOptions, setFilterOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to manage button visibility
  const galleryRef = useRef(null); // Reference to the gallery section

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

  // Intersection Observer to control button visibility
  useEffect(() => {
    const currentRef = galleryRef.current; // Copy the ref value to a local variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjusts when the button should appear
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Use the local variable in cleanup
      }
    };
  }, [galleryRef]);

  return (
    <>
      {/* Reference for the Gallery Section */}
      <div ref={galleryRef}></div>

      {/* Overlay when sidebar is open */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar Toggle Button */}
      {isVisible && (
        <button
          className={`toggle-btn ${isOpen ? 'open' : ''}`}
          onClick={toggleSidebar}
          aria-label="Filter Artworks"
          title="Filter Artworks"
        >
          {isOpen ? <FiX size={24} /> : <FiFilter size={24} />}
        </button>
      )}

      {/* Sidebar Content */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3 className="filter-title">Filter Artworks</h3>

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
    </>
  );
}

export default SidebarFilter;
