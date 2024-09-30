import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics'; // If needed for analytics

// Your web app's Firebase configuration
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

// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app); // For future use

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
