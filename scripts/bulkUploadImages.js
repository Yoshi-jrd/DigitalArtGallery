const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin'); // Use Firebase Admin SDK
const { exiftool } = require('exiftool-vendored');
const { auth } = require('../src/firebaseConfigCommonJS')

// Path to your Firebase service account key (adjust the path as needed)
const serviceAccount = require('../serviceAccountKey.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'digitalartgallery-a1c18.appspot.com', // Your Firebase storage bucket
});

const db = admin.firestore();
const storage = admin.storage().bucket();

// Directory containing your images to be uploaded
const imagesDirectory = path.join(__dirname, '../public/images/uploadCorral');

// Function to sanitize the file name
const sanitizeFileName = (fileName) => {
  return fileName.replace(/[^a-zA-Z0-9.]/g, '_'); // Replace special characters with underscores
};

// Function to extract metadata using exiftool
const extractExifMetadata = async (filePath) => {
  try {
    const metadata = await exiftool.read(filePath);
    console.log(`Extracted EXIF metadata for ${filePath}:`, metadata);
    return metadata;
  } catch (error) {
    console.error(`Failed to extract EXIF metadata for ${filePath}:`, error);
    return {}; // Return empty metadata on error
  }
};

// Function to upload a single image to Firebase Storage and return its URL
const uploadImageToFirebase = async (filePath, fileName) => {
  try {
    const sanitizedFileName = sanitizeFileName(fileName); // Sanitize the file name
    const fileUploadPath = `gallery-artworks/${sanitizedFileName}`;

    // Upload the image to Firebase Storage
    await storage.upload(filePath, {
      destination: fileUploadPath,
      metadata: {
        contentType: 'image/png', // or whatever MIME type the file has
      },
    });
    console.log(`Uploaded ${sanitizedFileName} to Firebase Storage`);

    // Get the download URL of the uploaded image
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/${encodeURIComponent(fileUploadPath)}?alt=media`;
    console.log(`Download URL: ${downloadURL}`);

    return downloadURL;
  } catch (error) {
    console.error(`Failed to upload ${fileName}:`, error);
    throw error;
  }
};

// Function to upload image metadata (including EXIF) to Firestore
const uploadMetadataToFirestore = async (sanitizedFileName, downloadURL, fileMetadata, exifMetadata) => {
    try {
      const user = auth.currentUser; // Get the currently authenticated user
      if (!user) {
        throw new Error('User not authenticated');
      }
  
      // Helper function to serialize ExifDateTime or similar objects into a string
      const serializeExifDateTime = (dateTime) => {
        return dateTime ? dateTime.toString() : null;
      };
  
      // Serialize EXIF metadata to ensure no custom objects are sent to Firestore
      const serializedExifMetadata = {
        ...exifMetadata,
        FileModifyDate: serializeExifDateTime(exifMetadata.FileModifyDate),
        FileAccessDate: serializeExifDateTime(exifMetadata.FileAccessDate),
        FileCreateDate: serializeExifDateTime(exifMetadata.FileCreateDate),
      };
  
      // Define the metadata to be stored in Firestore
      const metadata = {
        fileName: sanitizedFileName, // Use the sanitized file name
        downloadURL: downloadURL,
        userId: user.uid, // Associate the uploaded image with the user's ID
        uploadedAt: serverTimestamp(),
        contentType: fileMetadata.contentType, // MIME type
        size: fileMetadata.size, // File size in bytes
        fullPath: fileMetadata.fullPath, // Full path in Firebase Storage
        timeCreated: fileMetadata.timeCreated, // Creation time
        updated: fileMetadata.updated, // Last updated time
        exifData: serializedExifMetadata, // Include the serialized EXIF data
      };
  
      // Save the metadata to Firestore under a 'gallery-artworks' collection
      await addDoc(collection(db, 'gallery-artworks'), metadata);
      console.log(`Metadata for ${sanitizedFileName} uploaded to Firestore`);
    } catch (error) {
      console.error('Failed to upload metadata:', error);
      throw error;
    }
  };
  

// Function to bulk upload images from a directory and save metadata to Firestore
const bulkUploadImages = async () => {
  try {
    const files = fs.readdirSync(imagesDirectory);

    if (files.length === 0) {
      console.log('No images found in the uploadCorral directory.');
      return;
    }

    for (const file of files) {
      const filePath = path.join(imagesDirectory, file);

      // Extract EXIF metadata from the image file
      const exifMetadata = await extractExifMetadata(filePath);

      // Upload image to Firebase Storage and retrieve the download URL
      const downloadURL = await uploadImageToFirebase(filePath, file);

      // Upload metadata to Firestore (including EXIF)
      await uploadMetadataToFirestore(file, downloadURL, exifMetadata);
    }

    console.log('All images and metadata uploaded successfully.');
  } catch (error) {
    console.error('Error during bulk upload:', error);
  }
};

// Run the bulk upload process
bulkUploadImages();
