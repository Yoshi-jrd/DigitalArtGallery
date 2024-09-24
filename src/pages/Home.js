import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-gallery bg-gray-900 text-white flex flex-col items-center justify-center h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/ArtHeroImage2.jpg)', filter: 'brightness(0.5)' }}
        ></div>
        <div className="relative z-10 text-center flex flex-col items-center space-y-4 px-4">
          <h1 className="text-5xl font-bold mb-4">Discover Unique Artworks</h1>
          <p className="max-w-lg mx-auto text-lg mb-6">
            Explore the world through art from the comfort of your home.
          </p>
          <Link
            to="/gallery"
            className="bg-white text-black py-2 px-6 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="text-center py-12">
        <h2 className="text-4xl text-gray-800 font-semibold mb-3">About Our Gallery</h2>
        <p className="text-gray-600 max-w-4xl mx-auto">
          Our digital art gallery curates high-quality, exclusive artworks from emerging and established artists around the globe.
        </p>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-12 bg-gray-900">
        <h3 className="text-3xl text-white font-semibold text-center mb-3">Featured Artworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          <ArtworkPreview title="Abstract Dreamscape" artist="Jane Doe" imgUrl="/images/ArtHeroImage1.jpeg" />
          <ArtworkPreview title="Modern Geometry" artist="John Smith" imgUrl="/images/ArtHeroImage2.jpeg" />
          <ArtworkPreview title="Futuristic Visions" artist="Anna Lee" imgUrl="/images/ArtHeroImage3.jpeg" />
        </div>
      </section>
    </div>
  );
}

// Reusable Artwork Preview Component with Props
const ArtworkPreview = ({ title, artist, imgUrl }) => (
  <div className="artwork bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <img src={imgUrl} alt={title} className="w-full h-64 object-cover" />
    <div className="p-4">
      <h4 className="text-lg font-bold text-white">{title}</h4>
      <p className="text-gray-500">By {artist}</p>
    </div>
  </div>
);

export default Home;
