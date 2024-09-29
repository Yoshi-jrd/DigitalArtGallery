import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navigation.css'; // Linking the new CSS file
import Auth from '../Utils/Auth.js'; // Assuming Auth component is in the Utils folder

function Navigation({ isAuthenticated, handleLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false); // State for the login dropdown

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
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

  const toggleLoginForm = () => {
    setIsLoginVisible(!isLoginVisible); // Toggle login form visibility
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
              id="search-input"
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
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/upload" className="nav-link">Upload</Link>
          <Link to="/donate" className="nav-link">Donate</Link>

          {/* Conditional Login/Logout Link */}
          {!isAuthenticated ? (
            <div className="login-section">
              <button onClick={toggleLoginForm} className="nav-link">Login</button>
              {/* Collapsible Login Form */}
              {isLoginVisible && (
                <div className="login-form-dropdown">
                  <Auth setIsAuthenticated={() => setIsLoginVisible(false)} />
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLogout} className="nav-link">Logout</button>
          )}
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

            {/* Conditional Login/Logout in Drawer */}
            {!isAuthenticated ? (
              <Link to="/login" className="nav-link">Login</Link>
            ) : (
              <button onClick={handleLogout} className="nav-link">Logout</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
