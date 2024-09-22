import React from 'react';

// Sample data for gallery images, assuming images are named systematically
const images = [
  'highlands1.jpg', 'highlands2.jpg', 'highlands3.jpg' // Add more images as needed
];

function Gallery() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center text-white mb-8">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden shadow-lg rounded-lg">
            <img src={`/images/${image}`} alt={`Artwork ${index + 1}`} className="w-full object-cover"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
