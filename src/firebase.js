import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Debug: This should ALWAYS run
console.log('🔥 Firebase module loaded!');
console.log('🔥 Environment check:', {
  hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
  hasAuthDomain: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  hasProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
  hasStorageBucket: !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  apiKeyValue: import.meta.env.VITE_FIREBASE_API_KEY ? `${import.meta.env.VITE_FIREBASE_API_KEY.substring(0, 10)}...` : 'UNDEFINED',
  projectIdValue: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'UNDEFINED',
  allEnvKeys: Object.keys(import.meta.env).filter(k => k.startsWith('VITE_'))
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log('🔥 Firebase config created:', {
  hasAllValues: Object.values(firebaseConfig).every(v => !!v),
  configKeys: Object.keys(firebaseConfig)
});

// Initialize Firebase
let app, storage;

try {
  console.log('🔥 Attempting to initialize Firebase...');
  app = initializeApp(firebaseConfig);
  console.log('🔥 Firebase app initialized successfully!');

  storage = getStorage(app);
  console.log('🔥 Firebase Storage initialized successfully!');
} catch (error) {
  console.error('🔥 Firebase initialization FAILED:', error);
  console.error('🔥 Error details:', error.message);
}

export { storage };
export default app;
