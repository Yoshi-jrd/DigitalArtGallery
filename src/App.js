// App.js
import React from 'react';
import { GalleryProvider } from './context/GalleryContext'; // Import the provider
import Navigation from './components/Layout/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/Utils/scrollToTop';
import GalleryPage from './pages/Gallery';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Donate from './pages/Donate';

function App() {
  return (
    <GalleryProvider>
    <Router>
      <ScrollToTop /> {/* Ensures scroll-to-top on route change */}
      <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
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
