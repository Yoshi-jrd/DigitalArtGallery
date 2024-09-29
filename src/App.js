// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication monitoring
import { auth } from './firebaseConfig'; // Firebase config with auth and db

import { GalleryProvider } from './context/GalleryContext';
import Navigation from './components/Layout/Navigation';
import ScrollToTop from './components/Utils/scrollToTop';
import HomePage from './pages/Home';
import GalleryPage from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import Donate from './pages/Donate';
import Auth from './components/Utils/Auth'; // Corrected path for Auth component
import ImageUpload from './components/Utils/ImageUpload'; // Corrected path for ImageUpload component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Monitor authentication state and update accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is signed in
      } else {
        setIsAuthenticated(false); // User is signed out
      }
    });
    return () => unsubscribe(); // Clean up on component unmount
  }, []);

  return (
    <GalleryProvider>
      <Router>
        <ScrollToTop /> {/* Ensures scroll-to-top on route change */}
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={isAuthenticated ? <GalleryPage /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/upload" element={isAuthenticated ? <ImageUpload /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </Router>
    </GalleryProvider>
  );
}

export default App;
