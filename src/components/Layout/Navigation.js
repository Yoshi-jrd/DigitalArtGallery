import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navigation.css'; // Linking the new CSS file

function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    // Example logic for fetching suggestions
    const fakeSuggestions = ['Art 1', 'Art 2', 'Art 3'].filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(fakeSuggestions);
    setShowSuggestions(query.length > 0);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search for:', searchTerm);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="logo">Digital Art Gallery</Link>
          <form onSubmit={handleSearchSubmit} className="flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fa fa-search"></i>
            </button>
            {showSuggestions && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
        <button onClick={toggleDrawer} className="menu-button block lg:hidden">
          <i className="fa fa-bars"></i>
        </button>
        <div className="nav-links hidden lg:flex">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/donate" className="nav-link">Donate</Link>
        </div>
        {isDrawerOpen && (
          <div className="side-drawer">
            <button onClick={toggleDrawer} className="close-drawer">
              <i className="fa fa-times"></i>
            </button>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/gallery" className="nav-link">Gallery</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/donate" className="nav-link">Donate</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
