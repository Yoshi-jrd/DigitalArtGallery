import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function GalleryCarousel({ images, slideToShow = 3, slideToScroll = 3, autoplaySpeed = 10000, infinite = true }) {
  const settings = {
    dots: true,
    infinite: infinite,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: slideToScroll,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slideToShow > 2 ? 2 : slideToShow,
          slidesToScroll: slideToScroll > 2 ? 2 : slideToScroll,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="image-slide">
          <img src={image.src} alt={image.alt} style={{ width: '100%', height: 'auto' }} />
        </div>
      ))}
    </Slider>
  );
}

export default GalleryCarousel;
