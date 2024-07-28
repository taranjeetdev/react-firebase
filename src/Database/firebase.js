// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6HGNbVTR97rgBMiSM93OQAXasaMTVbwo",
  authDomain: "react-web-chat-6cc88.firebaseapp.com",
  projectId: "react-web-chat-6cc88",
  storageBucket: "react-web-chat-6cc88.appspot.com",
  messagingSenderId: "740672480844",
  appId: "1:740672480844:web:5eff390eef85617b79f6e9",
  measurementId: "G-H0VMLELPS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();