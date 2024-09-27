// App.js
import React from 'react';
import { GalleryProvider } from './context/GalleryContext'; // Import the provider
import Navigation from './components/Layout/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/Utils/scrollToTop';
import HomePage from './pages/Home';
import GalleryPage from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import Donate from './pages/Donate';

// import TestLightbox from './tests/TestLightbox';

function App() {
  return (
    <GalleryProvider>
    <Router>
      {/* <TestLightbox /> */}
      <ScrollToTop /> {/* Ensures scroll-to-top on route change */}
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Router>
    </GalleryProvider>
  );
}

export default App;
