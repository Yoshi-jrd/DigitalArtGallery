import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication monitoring
import { auth } from './firebaseConfig'; // Firebase config with auth and db

import { GalleryProvider } from './context/GalleryContext';
import Navigation from './components/Layout/Navigation';
import ScrollToTop from './components/Utils/scrollToTop';
import HomePage from './pages/Home';
import GalleryPage from './pages/Gallery';
import Contact from './pages/Contact';
import ImageUploadPage from './pages/ImageUpload';
import Donate from './pages/Donate';
import Auth from './components/Utils/Auth';

// Memoized Router to prevent unnecessary re-renders
const MemoizedRouter = React.memo(({ isAuthenticated, handleLogout, setIsAuthenticated }) => (
  <Router>
    <ScrollToTop />
    <Navigation isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/gallery"
        element={isAuthenticated ? <GalleryPage /> : <Navigate to="/login" />}
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/donate" element={<Donate />} />
      <Route
        path="/upload"
        element={isAuthenticated ? <ImageUploadPage /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
  </Router>
));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Monitor authentication state and update accordingly
  useEffect(() => {
    let debounceTimer;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (user) {
          console.log('User is authenticated');
          setIsAuthenticated(true); // User is signed in
        } else {
          console.log('User is NOT authenticated');
          setIsAuthenticated(false); // User is signed out
        }
      }, 300); // Debounce auth state updates to prevent multiple state changes
    });

    return () => {
      clearTimeout(debounceTimer);
      unsubscribe(); // Clean up on component unmount
    };
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <GalleryProvider>
      <MemoizedRouter
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        setIsAuthenticated={setIsAuthenticated}
      />
    </GalleryProvider>
  );
}

export default App;
