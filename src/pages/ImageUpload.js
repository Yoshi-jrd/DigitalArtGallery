import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/ImageUploadPage.css';
import { uploadImages } from '../components/Utils/bulkUploadImages_ImageUploadPage.js';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const ImageUploadPage = () => {
  const [files, setFiles] = useState([]); // Multiple files for bulk upload
  const [backgroundImage, setBackgroundImage] = useState(''); // Background image
  const [bulkUploading, setBulkUploading] = useState(false);
  const [title, setTitle] = useState(''); // Metadata fields
  const [artist, setArtist] = useState('Aetheric Canvas');
  const [style, setStyle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null); // Single image
  const [isBulkUpload, setIsBulkUpload] = useState(false); // Toggle for bulk upload

  // Fetch random background image for the form
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

  // Handle file input for bulk uploads
  const handleFileChange = (e) => {
    setFiles(e.target.files); // Store selected files
  };

  // Handle single image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Only one image file is set
  };

  // Reset form inputs after submission
  const resetForm = () => {
    setTitle('');
    setArtist('Aetheric Canvas');
    setStyle('');
    setDescription('');
    setTags('');
    setFiles([]);
    setImage(null);
  };

  // Handle bulk upload submission
  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please select images to upload');
      return;
    }

    setBulkUploading(true);
    try {
      // Pass metadata and files to the upload function
      await uploadImages(files, { title, artist, style, description, tags });
      alert('Bulk upload successful!');
      resetForm();
    } catch (error) {
      console.error('Bulk upload error:', error);
      alert('Bulk upload failed. Please try again.');
    } finally {
      setBulkUploading(false);
    }
  };

  // Handle single image upload submission
  const handleSingleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    setBulkUploading(true);
    try {
      await uploadImages([image], { title, artist, style, description, tags }); // Single image upload
      alert('Image upload successful!');
      resetForm();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setBulkUploading(false);
    }
  };

  return (
    <div className="upload-page" style={{ '--bg-image': `url(${backgroundImage})` }}>
      <div className="upload-form-wrapper">
        {/* Toggle for switching between single and bulk upload */}
        <div className="toggle-wrapper">
          <label>Bulk Upload:</label>
          <Toggle
            defaultChecked={isBulkUpload}
            icons={false}
            onChange={() => setIsBulkUpload(!isBulkUpload)}
          />
        </div>

        {/* Flip animation wrapper */}
        <div className={`upload-form-container ${isBulkUpload ? 'flip' : ''}`}>
          {/* Single Image Upload Form */}
          {!isBulkUpload && (
            <form onSubmit={handleSingleUpload}>
              <h2>Upload New Artwork</h2>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Artist:</label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Style:</label>
                <input
                  type="text"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tags (comma-separated):</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
              </div>
              <button type="submit" disabled={bulkUploading}>
                {bulkUploading ? 'Uploading...' : 'Upload Artwork'}
              </button>
            </form>
          )}

          {/* Bulk Upload Form */}
          {isBulkUpload && (
            <form onSubmit={handleBulkUpload}>
              <h2>Bulk Upload New Artworks</h2>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Artist:</label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Style:</label>
                <input
                  type="text"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tags (comma-separated):</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Select Images (for bulk upload):</label>
                <input type="file" accept="image/*" onChange={handleFileChange} multiple />
              </div>
              <button type="submit" disabled={bulkUploading}>
                {bulkUploading ? 'Uploading...' : 'Bulk Upload Images'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageUploadPage);
