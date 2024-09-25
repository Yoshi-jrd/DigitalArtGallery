// ImageCarousel.js
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ImageCarousel.css'; // Link to the updated CSS file

function ImageCarousel() {
  const images = [
    '/images/imageGallery/image1.jpg',
    '/images/imageGallery/image2.jpg',
    '/images/imageGallery/image3.jpg',
    '/images/imageGallery/image4.jpg',
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 cards at once
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px', // Keep slides close to the center
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    arrows: true, // Display navigation arrows
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

  // This useEffect runs after the component mounts
  useEffect(() => {
    const updateSliderAccessibility = () => {
      const clonedSlides = document.querySelectorAll('.slick-cloned');
      clonedSlides.forEach(slide => {
        slide.removeAttribute('aria-hidden');
        slide.setAttribute('inert', ''); // Apply inert instead of aria-hidden
      });
    };

    // Run the function after the slider initializes
    setTimeout(updateSliderAccessibility, 500);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="slide-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="slide-card">
            <img
              src={img}
              alt={`Carousel of digital art ${index + 1}`}
              className="slide-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
