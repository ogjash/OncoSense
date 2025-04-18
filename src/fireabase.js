// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALFKmVn4GtpVR_ByV6gSZsD3quex79OZQ",
  authDomain: "qmedix-40d60.firebaseapp.com",
  databaseURL: "https://qmedix-40d60-default-rtdb.firebaseio.com",
  projectId: "qmedix-40d60",
  storageBucket: "qmedix-40d60.firebasestorage.app",
  messagingSenderId: "921259371673",
  appId: "1:921259371673:web:ed03eefdbd8be937949c08",
  measurementId: "G-FFK3WV4HN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services conditionally to avoid issues
let analytics = null;
try {
  // Only initialize analytics if not in development mode or if window is defined
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error("Analytics initialization failed:", error);
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
export default app;
