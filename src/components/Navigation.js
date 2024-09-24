import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search for:', searchTerm);
  };

  return (
    <nav className="bg-black bg-opacity-70 text-white fixed w-full z-10" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold hover:text-gray-300 transition duration-300 mr-4">Digital Art Gallery</Link>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-2 py-1 rounded-full text-white placeholder-gray-300 bg-black bg-opacity-50 border border-gray-500 focus:outline-none focus:border-white transition duration-300"
              style={{ minWidth: '200px' }}
            />
            <button type="submit" className="ml-2 text-white bg-gray-500 hover:bg-gray-400 rounded-full px-3 py-1">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link> {/* Ensure this matches "/" */}
          <Link to="/gallery" className="hover:text-gray-300 transition duration-300">Gallery</Link> {/* Ensure this matches "/gallery" */}
          <Link to="/about" className="hover:text-gray-300 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
          <Link to="/donate" className="hover:text-gray-300 transition duration-300">Donate</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
