import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="hero-banner" style={{
        backgroundImage: `url(/images/ArtHeroImage2.jpg)`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '2px 2px 10px rgba(0,0,0,0.9)'  // Enhanced text shadow for better readability
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',  // More opaque backdrop for better text visibility
          padding: '20px',
          borderRadius: '10px',
          width: '80%',  // Ensures text block does not stretch too wide
          textAlign: 'center'  // Centers text inside the block
        }}>
          <h1 className="text-white text-5xl font-bold mb-6">Discover Unique Artworks</h1>
          <p className="text-white text-lg font-light mb-4" style={{ 
            textShadow: '2px 2px 8px rgba(0,0,0,1)'  // Strong shadow for subtitle
          }}>
            Explore the world through art from the comfort of your home.
          </p>
          <Link to="/gallery" className="bg-transparent border-2 border-white text-white py-2 px-6 hover:bg-white hover:text-gray-900 transition duration-300">
            View Gallery
          </Link>
        </div>
      </div>

      <section className="text-center py-12">
        <h2 className="text-4xl text-gray-800 font-semibold mb-3">About Our Gallery</h2>
        <p className="text-gray-600 max-w-4xl mx-auto">
          Our digital art gallery curates high-quality, exclusive artworks from emerging and established artists around the globe.
        </p>
      </section>

      <section className="py-12 bg-gray-900">
        <h3 className="text-3xl text-white font-semibold text-center mb-3">Featured Artworks</h3>
        <div className="grid grid-cols-3 gap-6 px-6">
          <ArtworkPreview />
          <ArtworkPreview />
          <ArtworkPreview />
        </div>
      </section>
    </div>
  );
}

const ArtworkPreview = () => (
  <div className="artwork bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <img src="/images/ArtHeroImage1.jpeg" alt="Artwork Name" className="w-full h-64 object-cover"/>
    <div className="p-4">
      <h4 className="text-lg font-bold text-white">Artwork Title</h4>
      <p className="text-gray-500">This piece represents...</p>
    </div>
  </div>
);

export default Home;
