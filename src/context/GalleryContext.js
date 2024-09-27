// src/context/GalleryContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const GalleryContext = createContext();

// GalleryContext Provider Component
export const GalleryProvider = ({ children }) => {
  // States for filtering and sorting
  const [filterOptions, setFilterOptions] = useState({
    style: 'All',
    artist: 'All',
  });

  // State for managing the artworks data
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Effect to fetch artworks data (replace with actual data fetching logic)
  useEffect(() => {
    // Placeholder data fetching - replace with real API or data source
    const fetchArtworks = async () => {
      const data = [
        { id: 1, title: 'Abstract Dreamscape', artist: 'Jane Doe', style: 'Abstract', popularity: 8, date: '2023-08-15' },
        { id: 2, title: 'Modern Geometry', artist: 'John Smith', style: 'Modern', popularity: 10, date: '2023-09-01' },
        { id: 3, title: 'Futuristic Visions', artist: 'Anna Lee', style: 'Surreal', popularity: 5, date: '2023-07-20' },
        // Add more artworks as needed
      ];
      setArtworks(data);
      setFilteredArtworks(data);
    };

    fetchArtworks();
  }, []);

  // Effect to filter artworks based on filterOptions and search query
  useEffect(() => {
    let filtered = [...artworks];

    // Filter by style
    if (filterOptions.style !== 'All') {
      filtered = filtered.filter((art) => art.style === filterOptions.style);
    }

    // Filter by artist
    if (filterOptions.artist !== 'All') {
      filtered = filtered.filter((art) => art.artist === filterOptions.artist);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((art) =>
        art.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArtworks(filtered);
  }, [filterOptions, searchQuery, artworks]);

  return (
    <GalleryContext.Provider
      value={{
        artworks,
        filteredArtworks,
        filterOptions,
        setFilterOptions,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
