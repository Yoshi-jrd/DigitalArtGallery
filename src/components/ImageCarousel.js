import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ImageCarousel.css'; // Ensure this CSS file is correctly linked

function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "/images/imageGallery/image1.jpg",
        "/images/imageGallery/image2.jpg",
        "/images/imageGallery/image3.jpg",
        "/images/imageGallery/image4.jpg"
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        beforeChange: (current, next) => setCurrentIndex(next),
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    };

    return (
        <div className="carousel-background" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
            <div style={{ padding: '0 20px' }}>
                <Slider {...settings}>
                    {images.map((src, index) => (
                        <div key={index} className="slide-container">
                            <img src={src} alt={`Slide ${index + 1}`} className="slide-image" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ImageCarousel;
