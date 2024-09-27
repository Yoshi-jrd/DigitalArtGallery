// SidebarFilter.js
import React, { useState, useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext'; // Context for managing state

function SidebarFilter() {
  const { filterOptions, setFilterOptions } = useContext(GalleryContext); // Context state management
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  return (
    <div>
      <button onClick={toggleSidebar} className="filter-button">
        Filter Artworks
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="close-button">X</button>
        <h3>Filter Artworks</h3>
        <div className="filter-group">
          <label>Style:</label>
          <select name="style" onChange={handleFilterChange} value={filterOptions.style}>
            <option value="All">All</option>
            <option value="Abstract">Abstract</option>
            <option value="Modern">Modern</option>
            <option value="Portrait">Portrait</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Artist:</label>
          <select name="artist" onChange={handleFilterChange} value={filterOptions.artist}>
            <option value="All">All</option>
            <option value="Jane Doe">Jane Doe</option>
            <option value="John Smith">John Smith</option>
          </select>
        </div>
        {/* Add more filter controls as needed */}
      </div>
    </div>
  );
}

export default SidebarFilter;
