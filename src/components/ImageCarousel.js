import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ImageCarousel.css'; // Make sure this path matches your file structure

function ImageCarousel() {
    const [currentImage, setCurrentImage] = useState('/images/imageGallery/image1.jpg');

    const images = [
        '/images/imageGallery/image1.jpg',
        '/images/imageGallery/image2.jpg',
        '/images/imageGallery/image3.jpg',
        '/images/imageGallery/image4.jpg'
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        beforeChange: (current, next) => setCurrentImage(images[next]),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="carousel-wrapper" style={{ marginTop: '80px' }}>
            {/* Background Layer */}
            <div className="carousel-background">
                <div
                    className="background-blur"
                    style={{
                        backgroundImage: `url(${currentImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </div>

            {/* Foreground Carousel */}
            <div className="slide-container">
                <Slider {...settings}>
                    {images.map((img) => (
                        <div key={img} className="slide-card">
                            <img
                                src={img}
                                alt={img.substring(img.lastIndexOf('/') + 1)}
                                className="slide-image"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ImageCarousel;
