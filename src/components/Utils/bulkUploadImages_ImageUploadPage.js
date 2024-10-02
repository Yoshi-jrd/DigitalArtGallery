import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, storage } from '../../firebaseConfig';

// Function to upload multiple images to Firebase with metadata
export const uploadImages = async (files, metadata) => {
  const { title, artist, style, description, tags } = metadata;

  try {
    for (const file of files) {
      const storageRef = ref(storage, `gallery-artworks/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Upload error:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Set default metadata values if fields are missing
          await addDoc(collection(db, 'artworks'), {
            fileName: file.name,
            downloadURL: downloadURL,
            title: title || 'Untitled',
            artist: artist || 'Unknown Artist',
            style: style || 'Abstract',
            description: description || 'No Description Provided',
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            uploadedAt: Timestamp.now(),
            popularity: 0,
            status: 'Active',
          });

          console.log(`File ${file.name} uploaded successfully`);
        }
      );
    }
  } catch (error) {
    console.error('Error during file upload:', error);
  }
};
