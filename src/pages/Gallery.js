// src/pages/Gallery.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';  // Make sure this points to the correct config
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
  const [images, setImages] = useState([]); // State for storing images fetched from Firestore
  const filterButtonRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'artworks'));
        const fetchedImages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(fetchedImages); // Store fetched images in state
      } catch (error) {
        console.error('Error fetching artworks: ', error);
      }
    };

    fetchImages(); // Call the fetch function on component mount
  }, []);

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
            key={image.id}
            className="gallery-item"
            onClick={() => openLightbox(index)}
            tabIndex="0"
            role="button"
            aria-label={`View artwork: ${image.title}`}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
          >
            <img
              src={image.imageUrl} // Fetch image URL from Firestore
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
          slides={images.map(image => ({ src: image.imageUrl }))}
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
