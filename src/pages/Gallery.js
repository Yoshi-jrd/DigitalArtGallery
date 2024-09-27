import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import lightbox style
import '../styles/Gallery.css'; // Import your Gallery.css file

// Function to dynamically import all images from the 'src/assets/images' folder
const importAllImages = (requireContext) => {
    return requireContext.keys().map((key, index) => {
        // Extract filename from the key for title purposes
        const fileName = key.replace('./', '').replace(/\.[^/.]+$/, '');
        return {
            id: index,
            url: requireContext(key),
            title: fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, ' '),
        };
    });
};

// Adjusted path to match the new image location within src
const images = importAllImages(require.context('../assets/gallery', false, /\.(png|jpe?g|svg)$/));

const GalleryPage = () => {
    const [artworks, setArtworks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        setArtworks(images); // Set the dynamically imported images as artworks
    }, []);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    const handleOpenLightbox = (index) => {
        if (artworks.length > 0) {
            setCurrentImage(index);
            setIsOpen(true);
        }
    };

    return (
        <div>
            {artworks.length > 0 ? (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {artworks.map((art, index) => (
                        <div key={art.id} onClick={() => handleOpenLightbox(index)}>
                            <img
                                src={art.url}
                                alt={art.title || 'Artwork'}
                                style={{ width: '100%', display: 'block' }}
                            />
                            <p>{art.title}</p>
                        </div>
                    ))}
                </Masonry>
            ) : (
                <p>No artworks available.</p>
            )}

            {isOpen && artworks.length > 0 && (
                <Lightbox
                    mainSrc={artworks[currentImage].url}
                    nextSrc={artworks[(currentImage + 1) % artworks.length].url}
                    prevSrc={
                        artworks[(currentImage + artworks.length - 1) % artworks.length].url
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setCurrentImage((currentImage + artworks.length - 1) % artworks.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentImage((currentImage + 1) % artworks.length)
                    }
                    imageTitle={artworks[currentImage].title}
                />
            )}
        </div>
    );
};

export default GalleryPage;
