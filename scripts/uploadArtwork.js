// scripts/uploadArtworks.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyCv3kuTEb9WqneHe58nIRiyz3l23OwJPqE",
  authDomain: "digitalartgallery-a1c18.firebaseapp.com",
  projectId: "digitalartgallery-a1c18",
  storageBucket: "digitalartgallery-a1c18.appspot.com",
  messagingSenderId: "437521707307",
  appId: "1:437521707307:web:571c39aa032f7cd8b7556e",
  measurementId: "G-L5LPN106GN",
};

// Initialize Firebase app, Firestore, and Storage
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Directory containing your images
const imagesDirectory = path.join(__dirname, '../public/images');

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

// Upload function
const uploadArtworks = async () => {
  try {
    const artworksCollectionRef = collection(db, 'artworks');
    const files = fs.readdirSync(imagesDirectory);

    for (const file of files) {
      const filePath = path.join(imagesDirectory, file);
      const { title, description, tags, style } = generateArtworkMetadata(file);

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `gallery-artworks/${file}`);
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
