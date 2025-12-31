import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLLxVTW3iD9ejGY1tKU9Y4M8VldxE7jU4",
  authDomain: "phonicspal-tcb.firebaseapp.com",
  projectId: "phonicspal-tcb",
  storageBucket: "phonicspal-tcb.firebasestorage.app",
  messagingSenderId: "143159830132",
  appId: "1:143159830132:web:34f0670433f3e8c7299321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
export default app;
