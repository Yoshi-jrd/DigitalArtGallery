import React from 'react';
import ImageCarousel from '../components/ImageCarousel'; // Adjust path as necessary

function Gallery() {
  return (
    <div className="gallery-page">
      <h1 className="text-center text-4xl font-bold my-8">Gallery</h1>
      <ImageCarousel />
    </div>
  );
}

export default Gallery;
