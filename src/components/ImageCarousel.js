// ImageCarousel.js
import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ImageCarousel.css'; // Ensure correct path to CSS

function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active slide index
  const sliderRef = useRef(null); // Ref to access the Slider component

  // Array of images with metadata (title and description)
  const images = [
    { src: '/images/imageGallery/image1.jpg', title: 'Title 1', description: 'Description for Image 1' },
    { src: '/images/imageGallery/image2.jpg', title: 'Title 2', description: 'Description for Image 2' },
    { src: '/images/imageGallery/image3.jpg', title: 'Title 3', description: 'Description for Image 3' },
    { src: '/images/imageGallery/image4.jpg', title: 'Title 4', description: 'Description for Image 4' },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: 'ease-in-out',
    arrows: true,
    beforeChange: (current, next) => {
      setActiveIndex(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show only one image on smaller screens
          centerMode: true,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Ensure only one image shows on very small screens
          centerMode: true,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <div className="slide-container">
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide-card ${activeIndex === index ? 'active' : ''}`} // Apply active class when centered
          >
            <img src={img.src} alt={`Carousel of digital art ${index + 1}`} className="slide-image" />
            {/* Overlay container with animated text */}
            {activeIndex === index && (
              <div className="overlay-container">
                <div className="overlay-text">
                  <h3 className="overlay-title">{img.title}</h3>
                  <p className="overlay-description">{img.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
