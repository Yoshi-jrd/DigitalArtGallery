import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import lightbox style
import '../styles/Gallery.css'; // Import your Gallery.css file

// Function to dynamically import all images from the 'src/assets/gallery' folder
const importAllImages = (requireContext) => {
    return requireContext.keys().map((key, index) => {
        const fileName = key.replace('./', '').replace(/\.[^/.]+$/, '');
        return {
            id: index,
            url: requireContext(key), // Ensure these paths are correct and accessible
            title: fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, ' '),
        };
    });
};

// Import images from the gallery folder
const images = importAllImages(require.context('../assets/gallery', false, /\.(png|jpe?g|svg)$/));

const GalleryPage = () => {
    const [artworks, setArtworks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        // Load the images when the component mounts
        setArtworks(images);
    }, []);

    // Logging the artworks array to confirm loading
    console.log('Artworks:', artworks);

    // Manage scroll behavior and aria-hidden settings when Lightbox is open
    useEffect(() => {
        if (isOpen && artworks.length > 0) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            document.body.setAttribute('aria-hidden', 'true'); // Prevent hidden body from assistive tech
        } else {
            document.body.style.overflow = ''; // Re-enable scrolling
            document.body.removeAttribute('aria-hidden'); // Remove aria-hidden to ensure accessibility
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = '';
            document.body.removeAttribute('aria-hidden');
        };
    }, [isOpen, artworks.length]);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    // Memoized function to handle image click and open Lightbox
    const handleOpenLightbox = useCallback((index) => {
        if (!isOpen) { // Ensure Lightbox is not already open
            console.log('Opening Lightbox for index:', index);
            console.log('URL of clicked image:', artworks[index]?.url); // Log the URL of the clicked image
            setCurrentImage(index); // Set the current image index to the clicked image
            setIsOpen(true); // Open the Lightbox
        }
    }, [isOpen, artworks]);

    // Memoized function to handle closing of the Lightbox
    const handleCloseLightbox = useCallback(() => {
        if (isOpen) { // Only close if Lightbox is open
            console.log('Closing Lightbox');
            setIsOpen(false); // Properly close the Lightbox and reset state
            document.body.removeAttribute('aria-hidden'); // Remove aria-hidden when Lightbox closes
        }
    }, [isOpen]);

    return (
        <div className="gallery-container">
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
                                loading="auto"
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
                    ariaHideApp={false} // Prevent hiding the entire body from assistive tech
                    mainSrc={artworks[currentImage]?.url}
                    nextSrc={artworks[(currentImage + 1) % artworks.length]?.url}
                    prevSrc={artworks[(currentImage + artworks.length - 1) % artworks.length]?.url}
                    onCloseRequest={handleCloseLightbox}
                    onMovePrevRequest={() =>
                        setCurrentImage((currentImage + artworks.length - 1) % artworks.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentImage((currentImage + 1) % artworks.length)
                    }
                    imageTitle={artworks[currentImage]?.title}
                />
            )}
        </div>
    );
};

export default GalleryPage;
