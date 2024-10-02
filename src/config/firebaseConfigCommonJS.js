const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path as necessary

// Check if Firebase Admin has already been initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'digitalartgallery-a1c18.appspot.com', // Your storage bucket
  });
}

// Firebase Admin services
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage().bucket(); // Default bucket

module.exports = { db, auth, storage };
