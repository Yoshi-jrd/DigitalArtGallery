// src/components/ImageUpload.js
import { useState } from 'react';
import { storage } from '../../firebaseConfig';  // Ensure correct path to your Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    const storageRef = ref(storage, `artworks/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Track progress
      },
      (error) => {
        console.error('Upload error: ', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          alert('Upload successful!');
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;
