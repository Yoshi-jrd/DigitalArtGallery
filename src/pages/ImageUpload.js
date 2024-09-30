import React, { useState, useEffect } from 'react';
import { storage, db } from '../firebaseConfig.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import '../styles/ImageUploadPage.css'; // Import the CSS file

const ImageUploadPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('Aetheric Canvas');
  const [style, setStyle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(''); // State for background image
  
  useEffect(() => {
    let isMounted = true;

    const fetchRandomBackground = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'artworks'));
        const artworks = querySnapshot.docs.map((doc) => doc.data());
        if (isMounted && artworks.length > 0) {
          const randomImage = artworks[Math.floor(Math.random() * artworks.length)];
          console.log("Random Image URL:", randomImage.imageUrl); // Log for debugging
          setBackgroundImage(randomImage.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching background image: ", error);
      }
    };

    fetchRandomBackground();

    return () => {
      isMounted = false; // Prevent updating state if component unmounts
    };
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    const storageRef = ref(storage, `galleryArtworks/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Update progress bar
      },
      (error) => {
        console.error('Upload error:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await saveArtworkData(downloadURL); // Save metadata to Firestore
        alert('Upload successful!');
      }
    );
  };

  const saveArtworkData = async (downloadURL) => {
    try {
      await addDoc(collection(db, 'artworks'), {
        title: title,
        artist: artist,
        style: style,
        description: description,
        imageUrl: downloadURL,
        dateAdded: Timestamp.now(),
        tags: tags.split(',').map((tag) => tag.trim()),
        popularity: 0,
        status: 'Active',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="upload-page" style={{ '--bg-image': `url(${backgroundImage})` }}>
      <div className="upload-form-wrapper">
        <div className="upload-form-container">
          <h2>Upload New Artwork</h2>
          <form onSubmit={handleUpload}>
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
            {uploadProgress > 0 && (
              <div className="progress-container">
                <progress value={uploadProgress} max="100"></progress>
                <span>{uploadProgress}%</span>
              </div>
            )}
            <button type="submit">Upload Artwork</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageUploadPage);
