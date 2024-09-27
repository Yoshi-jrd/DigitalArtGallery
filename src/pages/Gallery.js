// Gallery.js
import React, { useEffect, useRef, useState, useMemo } from 'react';
import SidebarFilter from '../components/Carousel/SidebarFilter'; // Import the SidebarFilter component
import ImageCarousel from '../components/Carousel/ImageCarousel'; // Main carousel showcasing artworks

function GalleryPage() {
  const instagramRef = useRef(null);
  const [filterOptions, setFilterOptions] = useState({ style: 'All', artist: 'All' }); // State for filter options
  const [filteredArtworks, setFilteredArtworks] = useState([]); // State to manage filtered artworks

  // Mock artwork data
  const artworks = useMemo(() => [
    { id: 1, title: 'Abstract Dreamscape', artist: 'Jane Doe', style: 'Abstract', imgUrl: '/images/hero/ArtHeroImage1.jpg' },
    { id: 2, title: 'Modern Geometry', artist: 'John Smith', style: 'Modern', imgUrl: '/images/hero/ArtHeroImage2.jpg' },
    { id: 3, title: 'Futuristic Visions', artist: 'Anna Lee', style: 'Surreal', imgUrl: '/images/hero/ArtHeroImage3.jpg' },
  ], []); // Memoizing the artworks to prevent unnecessary re-renders

  useEffect(() => {
    // Filter artworks based on filter options
    let filtered = [...artworks];
    if (filterOptions.style !== 'All') {
      filtered = filtered.filter((art) => art.style === filterOptions.style);
    }
    if (filterOptions.artist !== 'All') {
      filtered = filtered.filter((art) => art.artist === filterOptions.artist);
    }
    setFilteredArtworks(filtered);
  }, [filterOptions, artworks]); // Include artworks as a dependency

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

  return (
    <div className="gallery-page">
      {/* Sidebar Filter */}
      <SidebarFilter filterOptions={filterOptions} setFilterOptions={setFilterOptions} />

      {/* Hero Section */}
      <section className="hero-gallery bg-gray-900 text-white flex flex-col items-center justify-center h-screen relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero/ArtHeroImage2.jpg)', filter: 'brightness(0.5)' }}></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Curated Collection</h1>
          <p className="max-w-lg mx-auto text-lg">Explore exclusive artworks that tell a story beyond the canvas.</p>
          <button className="mt-6 bg-white text-black py-2 px-6 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300">Start Your Journey</button>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="feature-highlight py-12 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Featured Artworks</h2>
          <p className="mb-8 text-lg">Discover a selection of curated masterpieces that stand out for their creativity, technique, and story.</p>
          <ImageCarousel />
        </div>
      </section>

      {/* Filtered Artwork Display */}
      <section className="filtered-artworks py-12 bg-white text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-6">Explore More Artworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {filteredArtworks.map((art) => (
            <ArtworkPreview key={art.id} title={art.title} artist={art.artist} imgUrl={art.imgUrl} />
          ))}
        </div>
      </section>

      {/* Artist Spotlight */}
      <section className="artist-spotlight py-12 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold text-center mb-6">Artist Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <div className="artist-info bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold">Jane Doe</h3>
            <p className="mt-4 text-gray-300">Jane Doe is an abstract artist known for her vibrant use of colors and textures that explore the boundaries of emotion.</p>
            <button className="mt-4 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-white">Learn More</button>
          </div>
          <img src="/images/hero/ArtHeroImage1.jpg" alt="Jane Doe Art" className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Social Feed */}
      <section ref={instagramRef} className="social-feed bg-gray-100 py-10">
        <h2 className="text-3xl font-bold text-center mb-4">Follow Us on Instagram</h2>
        <div className="instagram-feed grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {/* Mock Instagram posts with lazy loading */}
          <img data-src="/images/publicGallery/glowUp.jpg" alt="Instagram Post 1" className="rounded-lg" />
          <img data-src="/images/publicGallery/irridescentRiver.jpg" alt="Instagram Post 2" className="rounded-lg" />
          <img data-src="/images/publicGallery/theMilkeyWay.jpg" alt="Instagram Post 3" className="rounded-lg" />
          <img data-src="/images/publicGallery/glowUp.jpg" alt="Instagram Post 4" className="rounded-lg" />
        </div>
      </section>
    </div>
  );
}

// Reusable Artwork Preview Component
const ArtworkPreview = ({ title, artist, imgUrl }) => (
  <div className="artwork bg-white rounded-lg shadow-lg overflow-hidden">
    <img src={imgUrl} alt={title} className="w-full h-64 object-cover" />
    <div className="p-4">
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-gray-600">By {artist}</p>
    </div>
  </div>
);

export default GalleryPage;
