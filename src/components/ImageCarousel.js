import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";         // Slick core CSS
import "slick-carousel/slick/slick-theme.css";  // Slick theme CSS

function ImageCarousel() {
    // your carousel code
}


function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };

  const images = [
    '/images/imageGallery/image1.jpg',
    '/images/imageGallery/image2.jpg',
    '/images/imageGallery/image3.jpg',
    '/images/imageGallery/image4.jpg'
  ];

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
