// ImageCarousel.js
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ImageCarousel.css'; // Ensure correct path to CSS

function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active slide index
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility on touch
  const sliderRef = useRef(null); // Ref to access the Slider component
  const inactivityTimeout = useRef(null); // Ref to store the inactivity timeout

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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    arrows: true,
    beforeChange: (current, next) => {
      setActiveIndex(next);
      setShowOverlay(false); // Reset overlay state when slide changes
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
          slidesToShow: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  // Effect to address ARIA and accessibility issues
  useEffect(() => {
    const updateSliderAccessibility = () => {
      const clonedSlides = document.querySelectorAll('.slick-cloned');
      clonedSlides.forEach(slide => {
        slide.removeAttribute('aria-hidden');
        slide.setAttribute('inert', '');
      });
    };

    setTimeout(updateSliderAccessibility, 500);
  }, []);

  // Function to toggle overlay on touch
  const handleTouch = (index) => {
    if (activeIndex === index) {
      setShowOverlay(!showOverlay);
    } else {
      setShowOverlay(false); // Hide overlay if touching a different slide
    }
    resetInactivityTimer(); // Reset the inactivity timer on touch
    sliderRef.current.slickPause(); // Pause the slider on touch
  };

  // Function to reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    inactivityTimeout.current = setTimeout(() => {
      setShowOverlay(false); // Hide overlay after 5 seconds of inactivity
      sliderRef.current.slickPlay(); // Resume autoplay when overlay is hidden
    }, 5000);
  };

  // Effect to clear the inactivity timer on component unmount
  useEffect(() => {
    return () => {
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
    };
  }, []);

  return (
    <div className="slide-container">
      <Slider ref={sliderRef} {...settings}>
        {images.map((img, index) => (
          <div
            key={index}
            className="slide-card"
            onTouchStart={() => handleTouch(index)} // Toggle overlay on touch and reset inactivity timer
          >
            <img src={img.src} alt={`Carousel of digital art ${index + 1}`} className="slide-image" />
            {/* Only show overlay text if the current slide is the active one and showOverlay is true */}
            {activeIndex === index && showOverlay && (
              <div className="overlay-text">
                <h3 className="overlay-title">{img.title}</h3>
                <p className="overlay-description">{img.description}</p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
