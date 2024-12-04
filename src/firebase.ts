// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByAAE-HjVM_nifjGllp8otSb3gGNxl3LE",
  authDomain: "prueba-f5a0c.firebaseapp.com",
  projectId: "prueba-f5a0c",
  storageBucket: "prueba-f5a0c.firebasestorage.app",
  messagingSenderId: "1089328155630",
  appId: "1:1089328155630:web:8f49f80db4e607d1ee5cff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
