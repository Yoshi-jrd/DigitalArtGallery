// scripts/uploadArtworks.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const fs = require('fs');
const path = require('path');

// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyCv3kuTEb9WqneHe58nIRiyz3l23OwJPqE",
  authDomain: "digitalartgallery-a1c18.firebaseapp.com",
  projectId: "digitalartgallery-a1c18",
  storageBucket: "digitalartgallery-a1c18.appspot.com",
  messagingSenderId: "437521707307",
  appId: "1:437521707307:web:571c39aa032f7cd8b7556e",
  measurementId: "G-L5LPN106GN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Base directory containing all image subdirectories
const baseDirectory = path.join(__dirname, '../public/images');

// Artist and year constants
const artist = 'Aetheric Canvas';
const currentYear = new Date().getFullYear();

// Function to generate unique titles and descriptions for artworks
const generateArtworkMetadata = (filename) => {
  const artTitles = [
    'Eternal Symphony', 'Nebula Dreams', 'Mystic Realms', 'Veil of Silence',
    'Echoes of Time', 'Chromatic Pulse', 'Celestial Tide', 'Waves of Serenity',
    'Fragments of Infinity', 'Phantom Reflections',
  ];

  const artDescriptions = [
    'A vibrant exploration of boundless imagination.',
    'An abstract interpretation of cosmic energies.',
    'A mesmerizing journey into unknown realms.',
    'The quiet calm between the past and future.',
    'Resonances of forgotten memories and distant echoes.',
    'A rhythmic dance of colors and light.',
    'A tidal flow of celestial bodies and cosmic forces.',
    'Tranquil moments captured in a sea of colors.',
    'Fragments of space and time blended in art.',
    'Ghostly reflections from another world.',
  ];

  // Randomly select title and description
  const randomIndex = Math.floor(Math.random() * artTitles.length);
  const title = artTitles[randomIndex];
  const description = artDescriptions[randomIndex];

  // Suggested tags and style category
  const tags = ['abstract', 'modern', 'digital', 'conceptual', 'ethereal', 'vibrant'];
  const style = 'Abstract';

  return { title, description, tags, style };
};

// Recursive function to find all image files in nested directories
const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};

// Upload function
const uploadArtworks = async () => {
  try {
    const artworksCollectionRef = collection(db, 'artworks');
    const files = getAllFiles(baseDirectory);

    for (const filePath of files) {
      const fileName = path.basename(filePath);
      const { title, description, tags, style } = generateArtworkMetadata(fileName);

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `gallery-artworks/${fileName}`);
      const fileData = fs.readFileSync(filePath);
      await uploadBytes(imageRef, fileData);

      // Get the download URL
      const imageUrl = await getDownloadURL(imageRef);

      // Add artwork metadata to Firestore
      await addDoc(artworksCollectionRef, {
        title: title,
        artist: artist,
        style: style,
        description: description,
        imageUrl: imageUrl,
        dateAdded: serverTimestamp(),
        popularity: 0, // Set initial popularity to 0
        tags: tags,
        status: 'Active',
      });

      console.log(`Successfully uploaded ${title}`);
    }
  } catch (error) {
    console.error('Error uploading artworks:', error);
  }
};

// Run the upload function
uploadArtworks();
