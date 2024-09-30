const fs = require('fs');
const path = require('path');
const { db, auth, storage } = require('../src/firebaseConfigCommonJS'); // Import db, auth, and storage
const { ref, uploadBytes, getDownloadURL, getMetadata } = require('firebase/storage');
const { collection, addDoc, serverTimestamp } = require('firebase/firestore');
const { exiftool } = require('exiftool-vendored'); // Import exiftool

// Directory containing your images to be uploaded
const imagesDirectory = path.join(__dirname, '../public/images/uploadCorral');

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

// Function to upload a single image to Firebase Storage and retrieve its metadata
const uploadImageToFirebase = async (filePath, fileName) => {
  try {
    // Create a reference to Firebase Storage
    const imageRef = ref(storage, `gallery-artworks/${fileName}`);

    // Read the image file
    const imageBuffer = fs.readFileSync(filePath);

    // Upload the image to Firebase Storage
    const uploadResult = await uploadBytes(imageRef, imageBuffer);
    console.log(`Uploaded ${fileName} to Firebase Storage`);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);
    console.log(`Download URL: ${downloadURL}`);

    // Get additional file metadata from Firebase Storage
    const fileMetadata = await getMetadata(imageRef);

    return { downloadURL, fileMetadata };
  } catch (error) {
    console.error(`Failed to upload ${fileName}:`, error);
    throw error;
  }
};

// Function to upload image metadata (including EXIF) to Firestore
const uploadMetadataToFirestore = async (fileName, downloadURL, fileMetadata, exifMetadata) => {
  try {
    const user = auth.currentUser; // Get the currently authenticated user
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Define the metadata to be stored in Firestore
    const metadata = {
      fileName: fileName,
      downloadURL: downloadURL,
      userId: user.uid, // Associate the uploaded image with the user's ID
      uploadedAt: serverTimestamp(),
      contentType: fileMetadata.contentType, // MIME type
      size: fileMetadata.size, // File size in bytes
      fullPath: fileMetadata.fullPath, // Full path in Firebase Storage
      timeCreated: fileMetadata.timeCreated, // Creation time
      updated: fileMetadata.updated, // Last updated time
      exifData: exifMetadata, // Include the EXIF data extracted by exiftool
    };

    // Save the metadata to Firestore under a 'gallery-artworks' collection
    await addDoc(collection(db, 'gallery-artworks'), metadata);
    console.log(`Metadata for ${fileName} uploaded to Firestore`);
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

      // Upload image to Firebase Storage and retrieve metadata
      const { downloadURL, fileMetadata } = await uploadImageToFirebase(filePath, file);

      // Upload metadata to Firestore (including EXIF)
      await uploadMetadataToFirestore(file, downloadURL, fileMetadata, exifMetadata);
    }

    console.log('All images and metadata uploaded successfully.');
  } catch (error) {
    console.error('Error during bulk upload:', error);
  }
};

// Run the bulk upload process
bulkUploadImages();
