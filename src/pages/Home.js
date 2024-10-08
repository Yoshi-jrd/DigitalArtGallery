// Home.js
import React, { useEffect, useRef } from 'react';
import ImageCarousel from '../components/Carousel/ImageCarousel.js';
import GalleryCarousel from '../components/Carousel/GalleryCarousel.js';

function HomePage() {
  const instagramRef = useRef(null);

  useEffect(() => {
    const currentRef = instagramRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const images = entry.target.querySelectorAll('img[data-src]');
            images.forEach((img) => {
              img.src = img.getAttribute('data-src'); // Load the image
              img.removeAttribute('data-src'); // Remove the data-src attribute
            });
            observer.unobserve(entry.target); // Stop observing once images are loaded
          }
        });
      },
      {
        rootMargin: '0px 0px 100px 0px', // Adjusts when images start loading relative to viewport
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const galleryImages = [
    { src: '/images/publicGallery/glowUp.jpg', alt: 'Glow Up' },
    { src: '/images/publicGallery/irridescentRiver.jpg', alt: 'Irridescent River' },
    { src: '/images/publicGallery/theMilkeyWay.jpg', alt: 'A Milky Galaxy' },
    // Add more images as needed
  ];

  return (
    <div className="gallery-page">

      {/* Hero Section */}
      <section className="hero-gallery bg-gray-900 text-white flex flex-col items-center justify-center h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/hero/ArtHeroImage2.jpg)',
            filter: 'brightness(0.5)',
          }}
        ></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Curated Collection</h1>
          <p className="max-w-lg mx-auto text-lg">
            Explore exclusive artworks that tell a story beyond the canvas.
          </p>
          <button className="mt-6 bg-white text-black py-2 px-6 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300">
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="feature-highlight py-12 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Featured Artworks</h2>
          <p className="mb-8 text-lg">
            Discover a selection of curated masterpieces that stand out for their creativity, technique, and story.
          </p>
          <ImageCarousel />
        </div>
      </section>

      {/* Featured Collection */}
      <section className="featured-collection py-12 bg-white text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-6">
          Explore More Artworks
        </h2>
        <div className='gallery-carousel-container'>
          <GalleryCarousel 
            images={galleryImages} 
            slideToShow={3}
            slideToScroll={3}
            autoplaySpeed={10000}
          />
        </div>
      </section>
      <section className="artist-spotlight py-12 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold text-center mb-6">Artist Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <div className="artist-info bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold">Jane Doe</h3>
            <p className="mt-4 text-gray-300">
              Jane Doe is an abstract artist known for her vibrant use of colors and textures that explore the boundaries
              of emotion.
            </p>
            <button className="mt-4 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-white">
              Learn More
            </button>
          </div>
          <img
            src="/images/hero/ArtHeroImage1.jpg"
            alt="Jane Doe Art"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Social Feed */}
      <section ref={instagramRef} className="social-feed bg-gray-100 py-10">
        <h2 className="text-3xl font-bold text-center mb-4">
          Follow Us on Instagram
        </h2>
        <div className="instagram-feed grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {/* Mock Instagram posts with lazy loading */}
          <img
            data-src="/images/publicGallery/glowUp.jpg"
            alt="Instagram Post 1"
            className="rounded-lg"
          />
          <img
            data-src="/images/publicGallery/irridescentRiver.jpg"
            alt="Instagram Post 2"
            className="rounded-lg"
          />
          <img
            data-src="/images/publicGallery/theMilkeyWay.jpg"
            alt="Instagram Post 3"
            className="rounded-lg"
          />
          <img
            data-src="/images/publicGallery/glowUp.jpg"
            alt="Instagram Post 4"
            className="rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
