// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import nextConfig from "../next.config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: nextConfig.REACT_APP_API_KEY,
  authDomain: nextConfig.REACT_APP_AUTH_DOMAIN,
  projectId: nextConfig.REACT_APP_PROJECT_ID,
  storageBucket: nextConfig.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: nextConfig.REACT_APP_MESSAGING_SENDER_ID,
  appId: nextConfig.REACT_APP_APP_ID,
  measurementId: nextConfig.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export default app;