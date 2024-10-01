const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin'); // Use Firebase Admin SDK
const { exiftool } = require('exiftool-vendored');
const { db, storage } = require('../../firebaseConfigCommonJS');

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
    const sanitizedFileName = sanitizeFileName(fileName);
    const fileUploadPath = `gallery-artworks/${sanitizedFileName}`;

    // Upload the image to Firebase Storage
    await storage.upload(filePath, {
      destination: fileUploadPath,
      metadata: {
        contentType: 'image/png', // or any other appropriate MIME type
      },
    });

    // Get the download URL of the uploaded image
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/digitalartgallery-a1c18.appspot.com/o/${encodeURIComponent(fileUploadPath)}?alt=media`;

    return downloadURL;
  } catch (error) {
    console.error(`Failed to upload ${fileName}:`, error);
    throw error;
  }
};

// Function to upload image metadata (including EXIF) to Firestore
const uploadMetadataToFirestore = async (sanitizedFileName, downloadURL, fileMetadata = {}, exifMetadata = {}) => {
  try {
    const metadata = {
      fileName: sanitizedFileName,
      downloadURL: downloadURL,
      uploadedAt: admin.firestore.FieldValue.serverTimestamp(),
      contentType: fileMetadata.contentType || 'unknown',
      size: fileMetadata.size || 0,
      exifData: exifMetadata, // Include the EXIF metadata
    };

    await db.collection('gallery-artworks').add(metadata);
    console.log(`Metadata for ${sanitizedFileName} uploaded to Firestore`);
  } catch (error) {
    console.error('Failed to upload metadata:', error);
    throw error;
  }
};

// Function to handle either a single file or multiple files for upload
const uploadImages = async (filePaths) => {
  try {
    for (const filePath of filePaths) {
      const fileName = path.basename(filePath);

      // Extract EXIF metadata
      const exifMetadata = await extractExifMetadata(filePath);

      // Upload image to Firebase Storage and retrieve the download URL
      const downloadURL = await uploadImageToFirebase(filePath, fileName);

      // Upload metadata to Firestore
      await uploadMetadataToFirestore(fileName, downloadURL, {}, exifMetadata);
    }

    console.log('All images and metadata uploaded successfully.');
  } catch (error) {
    console.error('Error during image upload:', error);
  }
};

// Function to upload a single image from a form
const uploadSingleImage = async (file) => {
  const filePath = path.resolve(file.path);
  await uploadImages([filePath]);
};

// Function to bulk upload images from a directory
const bulkUploadImages = async (imagesDirectory) => {
  const files = fs.readdirSync(imagesDirectory);
  const filePaths = files.map(file => path.join(imagesDirectory, file));

  if (filePaths.length === 0) {
    console.log('No images found in the uploadCorral directory.');
    return;
  }

  await uploadImages(filePaths);
};

module.exports = { uploadSingleImage, bulkUploadImages };
