import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black text-white shadow-lg p-4 fixed w-full z-50 top-0 left-0 backdrop-filter backdrop-blur-lg bg-opacity-80 rounded-b-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Digital Art Gallery</h1>
        <button onClick={toggleMenu} className="text-white md:hidden">
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <ul className={`absolute md:relative top-full left-0 w-full md:w-auto md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-black bg-opacity-90 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
          <li><Link to="/" className="hover:text-gray-300 transition duration-300 ease-in-out block">Home</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-300 transition duration-300 ease-in-out block">Gallery</Link></li>
          <li><Link to="/about" className="hover:text-gray-300 transition duration-300 ease-in-out block">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300 transition duration-300 ease-in-out block">Contact</Link></li>
          <li><Link to="/donate" className="hover:text-gray-300 transition duration-300 ease-in-out block">Donate</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
