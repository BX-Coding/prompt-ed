// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import nextConfig from "../next.config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: nextConfig.API_KEY,
  authDomain: nextConfig.AUTH_DOMAIN,
  projectId: nextConfig.PROJECT_ID,
  storageBucket: nextConfig.STORAGE_BUCKET,
  messagingSenderId: nextConfig.MESSAGING_SENDER_ID,
  appId: nextConfig.APP_ID,
  measurementId: nextConfig.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export default app;