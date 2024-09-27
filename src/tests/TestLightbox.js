// src/TestLightbox.js
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import Lightbox styles

const TestLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Test images array with known working URLs from your previous logs
  const images = [
    '/static/media/AWorthyGaze.98cab3a9a067d2fbce3e.jpg',
    '/static/media/AWarriorsTouch.05b2b27ad4e7aceb5dd5.jpg',
  ];

  // Function to open the Lightbox at the clicked index
  const openLightbox = (index) => {
    console.log('Opening Lightbox at index:', index);
    setCurrentImage(index);
    setIsOpen(true);
  };

  // Function to close the Lightbox
  const closeLightbox = () => {
    console.log('Closing Lightbox');
    setIsOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lightbox Test Component</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        {images.map((image, index) => (
          <button key={index} onClick={() => openLightbox(index)}>
            Open Image {index + 1}
          </button>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[currentImage]}
          nextSrc={images[(currentImage + 1) % images.length]}
          prevSrc={images[(currentImage + images.length - 1) % images.length]}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setCurrentImage((currentImage + images.length - 1) % images.length)}
          onMoveNextRequest={() => setCurrentImage((currentImage + 1) % images.length)}
          ariaHideApp={false} // Prevents setting aria-hidden on the entire body
        />
      )}
    </div>
  );
};

export default TestLightbox;
