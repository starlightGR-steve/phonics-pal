import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload an audio blob to Firebase Storage
 * @param {string} id - Unique identifier for the audio (e.g., card ID)
 * @param {Blob} blob - Audio blob to upload
 * @returns {Promise<string>} Download URL of the uploaded file
 */
export const uploadAudioToFirebase = async (id, blob) => {
  try {
    const storageRef = ref(storage, `audio/${id}.webm`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading audio to Firebase:", error);
    throw error;
  }
};

/**
 * Get the download URL for an audio file from Firebase Storage
 * @param {string} id - Unique identifier for the audio
 * @returns {Promise<string|null>} Download URL or null if not found
 */
export const getAudioURLFromFirebase = async (id) => {
  try {
    const storageRef = ref(storage, `audio/${id}.webm`);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      return null; // File doesn't exist
    }
    console.error("Error getting audio URL from Firebase:", error);
    throw error;
  }
};

/**
 * Delete an audio file from Firebase Storage
 * @param {string} id - Unique identifier for the audio
 * @returns {Promise<void>}
 */
export const deleteAudioFromFirebase = async (id) => {
  try {
    const storageRef = ref(storage, `audio/${id}.webm`);
    await deleteObject(storageRef);
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.warn(`Audio file ${id} not found in Firebase Storage`);
      return; // File doesn't exist, no need to throw error
    }
    console.error("Error deleting audio from Firebase:", error);
    throw error;
  }
};

/**
 * List all audio files in Firebase Storage
 * @returns {Promise<string[]>} Array of audio file IDs
 */
export const listAllAudioFiles = async () => {
  try {
    const listRef = ref(storage, 'audio/');
    const result = await listAll(listRef);

    // Extract IDs from file names (remove .webm extension)
    const fileIds = result.items.map(itemRef =>
      itemRef.name.replace('.webm', '')
    );

    return fileIds;
  } catch (error) {
    console.error("Error listing audio files from Firebase:", error);
    throw error;
  }
};

/**
 * Check if an audio file exists in Firebase Storage
 * @param {string} id - Unique identifier for the audio
 * @returns {Promise<boolean>}
 */
export const audioExistsInFirebase = async (id) => {
  try {
    const url = await getAudioURLFromFirebase(id);
    return url !== null;
  } catch (error) {
    return false;
  }
};
