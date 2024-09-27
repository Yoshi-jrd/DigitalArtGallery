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
      { src: '/images/featureCarousel/AWorthyGaze.jpg', title: 'A Worthy Gaze', category: 'Portraits' },
      { src: '/images/publicGallery/irridescentRiver.jpg', title: 'A Worthy Gaze', category: 'Portraits' },
      { src: '/images/featureCarousel/AWarriorsTouch.jpg', title: 'A Worthy Gaze', category: 'Portraits' },
      { src: '/images/featureCarousel/CosmicVogue.jpg', title: 'A Worthy Gaze', category: 'Portraits' },
      { src: '/images/featureCarousel/Shimmer.jpg', title: 'A Worthy Gaze', category: 'Portraits' },
      { src: '/images/hero/ArtheroImage1.jpg', title: 'A Worthy Gaze', category: 'Portraits' },
      { src: '/images/publicGallery/theMilkeyWay.jpg', title: 'A Worthy Gaze', category: 'Portraits' },
      // Other images omitted for brevity
  ];

  const openLightbox = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

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
      <header className="gallery-header">
        <h1>Art Gallery</h1>
      </header>

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

      <aside
        id="filter-sidebar"
        className={`filter-sidebar ${filterVisible ? 'visible' : ''}`}
        aria-hidden={!filterVisible}
      >
        <h2 id="filter-label">Filters</h2>
        <input
          type="text"
          placeholder="Search artworks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
          aria-label="Search artworks"
        />
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
            />
            <p className="gallery-title">{image.title}</p>
          </div>
        ))}
      </Masonry>

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
