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
          <Link to="/home" className="hover:text-gray-300 transition duration-300">Home</Link>
          <Link to="/gallery" className="hover:text-gray-300 transition duration-300">Gallery</Link>
          <Link to="/about" className="hover:text-gray-300 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link>
          <Link to="/donate" className="hover:text-gray-300 transition duration-300">Donate</Link>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-600"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-300"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-600"><i className="fab fa-instagram"></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-700"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
