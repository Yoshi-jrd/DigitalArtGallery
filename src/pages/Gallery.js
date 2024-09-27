// src/pages/Gallery.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Masonry from 'react-masonry-css';
import { FiFilter } from 'react-icons/fi';
import '../styles/Gallery.css';

const GalleryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filterButtonRef = useRef(null);

  const images = [
    { src: '/static/media/AWorthyGaze.98cab3a9a067d2fbce3e.jpg', title: 'A Worthy Gaze', category: 'Portraits' },
    { src: '/static/media/AWarriorsTouch.05b2b27ad4e7aceb5dd5.jpg', title: 'A Warrior’s Touch', category: 'Portraits' },
    { src: '/static/media/ArtHeroImage1.f47923e9db742e5092ac.jpg', title: 'Art Hero Image 1', category: 'Abstract' },
    { src: '/static/media/ArtHeroImage2.88745b080edc427de203.jpg', title: 'Art Hero Image 2', category: 'Abstract' },
    { src: '/static/media/ArtHeroImage3.1eb70ed9ae251e1ef307.jpg', title: 'Art Hero Image 3', category: 'Nature' },
    { src: '/static/media/ArtHeroImage4.aa75e826a7fe3b952170.jpg', title: 'Art Hero Image 4', category: 'Nature' },
    { src: '/static/media/CosmicVogue.49f5c022f37b69990f16.jpg', title: 'Cosmic Vogue', category: 'Fashion' },
    { src: '/static/media/Shimmer.8a138fa310b8c4838c5b.jpg', title: 'Shimmer', category: 'Fashion' },
    { src: '/static/media/glowUp.7f351444e5dc1ca6a406.jpg', title: 'Glow Up', category: 'Abstract' },
    { src: '/static/media/irridescentRiver.d9add9ca480907fda8d7.jpg', title: 'Irridescent River', category: 'Nature' },
    { src: '/static/media/theMilkeyWay.1b7fcefe287cc3aebaaf.jpg', title: 'The Milky Way', category: 'Space' },
  ];

  const openLightbox = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  // Wrap closeLightbox in useCallback to memoize it and avoid unnecessary re-renders
  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    filterButtonRef.current?.focus();
  }, []);

  const filteredImages = images.filter((image) => {
    const matchesCategory = filter === 'All' || image.category === filter;
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox]);

  return (
    <div className="gallery-page" role="main" aria-label="Art Gallery">
      <h1>Art Gallery</h1>

      {/* Filter Icon - Always Visible */}
      <button
        ref={filterButtonRef}
        className="filter-icon"
        onClick={() => setFilterVisible(!filterVisible)}
        aria-expanded={filterVisible}
        aria-controls="filter-sidebar"
        aria-label="Open filter sidebar"
      >
        <FiFilter size={24} />
      </button>

      {/* Collapsible Sidebar */}
      <aside
        id="filter-sidebar"
        className={`filter-sidebar ${filterVisible ? 'visible' : ''}`}
        aria-hidden={!filterVisible}
      >
        <h2 id="filter-label">Filters</h2>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search artworks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
          aria-label="Search artworks"
        />
        {/* Category Filters */}
        <div className="filter-categories">
          {['All', 'Portraits', 'Abstract', 'Nature', 'Fashion', 'Space'].map((category) => (
            <button
              key={category}
              className={`filter-button ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          className="close-sidebar"
          onClick={() => setFilterVisible(false)}
          aria-label="Close filter sidebar"
        >
          Close
        </button>
      </aside>

      {/* Masonry layout for displaying images */}
      <Masonry
        breakpointCols={{
          default: 4,
          1100: 3,
          700: 2,
          500: 1,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openLightbox(index)}
            tabIndex="0"
            role="button"
            aria-label={`View artwork: ${image.title}`}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.title || `Artwork ${index + 1}`}
              loading="lazy"
              style={{ width: '100%', display: 'block', cursor: 'pointer' }}
            />
            <p className="gallery-title">{image.title}</p>
          </div>
        ))}
      </Masonry>

      {/* Render Lightbox when isOpen is true */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={closeLightbox}
          slides={images}
          index={currentImage}
          on={{
            close: closeLightbox,
            next: () => setCurrentImage((currentImage + 1) % images.length),
            prev: () => setCurrentImage((currentImage + images.length - 1) % images.length),
          }}
        />
      )}
    </div>
  );
};

export default GalleryPage;
