const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');
const { getStorage } = require('firebase/storage');
//const { getAnalytics } = require('firebase/analytics'); // If needed for analytics

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv3kuTEb9WqneHe58nIRiyz3l23OwJPqE",
  authDomain: "digitalartgallery-a1c18.firebaseapp.com",
  projectId: "digitalartgallery-a1c18",
  storageBucket: "digitalartgallery-a1c18.appspot.com",
  messagingSenderId: "437521707307",
  appId: "1:437521707307:web:571c39aa032f7cd8b7556e",
  measurementId: "G-L5LPN106GN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Optional: Initialize analytics only if needed
// const analytics = getAnalytics(app);

// Export Firebase services for CommonJS
module.exports = { db, auth, storage }; // analytics
