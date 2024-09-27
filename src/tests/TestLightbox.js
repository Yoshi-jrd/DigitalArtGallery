// src/tests/TestLightbox.js
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const TestLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: '/static/media/AWorthyGaze.98cab3a9a067d2fbce3e.jpg' },
    { src: '/static/media/AWarriorsTouch.05b2b27ad4e7aceb5dd5.jpg' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lightbox Test Component</h1>
      <button onClick={() => setIsOpen(true)}>Open Lightbox</button>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={images}
          currentIndex={currentIndex}
          on={{
            close: () => setIsOpen(false),
            next: () => setCurrentIndex((currentIndex + 1) % images.length),
            prev: () => setCurrentIndex((currentIndex + images.length - 1) % images.length),
          }}
        />
      )}
    </div>
  );
};

export default TestLightbox;
