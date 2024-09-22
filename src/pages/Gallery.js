import React from 'react';
import Carousel from '../components/Carousel';

const images = [
  '/images/highlands1.jpg',
  '/images/highlands2.jpg',
  '/images/highlands3.jpg' // Ensure these paths are correct
];

function Gallery() {
  return (
    <div className="gallery-container h-screen">
        <Carousel images={images} />
    </div>

  );
}

export default Gallery;
