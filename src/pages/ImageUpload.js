import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig.js'; // No need for storage handling here
import { collection, getDocs } from 'firebase/firestore';
import '../styles/ImageUploadPage.css';
import { uploadSingleImage, bulkUploadImages } from '../components/Utils/bulkUploadImages_ImageUploadPage.js'; // Import the updated bulk upload logic

const ImageUploadPage = () => {
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [bulkUploading, setBulkUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchRandomBackground = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'artworks'));
        const artworks = querySnapshot.docs.map((doc) => doc.data());
        if (isMounted && artworks.length > 0) {
          const randomImage = artworks[Math.floor(Math.random() * artworks.length)];
          setBackgroundImage(randomImage.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchRandomBackground();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSingleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    try {
      await uploadSingleImage(image); // Use bulk upload logic for single image upload
      alert('Single image upload successful!');
    } catch (error) {
      console.error('Single upload error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  const handleBulkUpload = async () => {
    setBulkUploading(true);
    try {
      const imagesDirectory = '../public/images/uploadCorral'; // Your bulk upload directory
      await bulkUploadImages(imagesDirectory); // Call the bulk upload function
      alert('Bulk upload successful!');
    } catch (error) {
      console.error('Bulk upload error:', error);
      alert('Bulk upload failed. Please try again.');
    } finally {
      setBulkUploading(false);
    }
  };

  return (
    <div className="upload-page" style={{ '--bg-image': `url(${backgroundImage})` }}>
      <div className="upload-form-wrapper">
        <div className="upload-form-container">
          <h2>Upload New Artwork</h2>
          <form onSubmit={handleSingleUpload}>
            <div className="form-group">
              <label>Upload Image:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} required />
            </div>
            <button type="submit">Upload Single Image</button>
          </form>

          {/* Bulk Upload Button */}
          <button
            onClick={handleBulkUpload}
            disabled={bulkUploading}
            className="bulk-upload-button"
          >
            {bulkUploading ? 'Uploading...' : 'Bulk Upload Images'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageUploadPage);
