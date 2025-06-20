// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXIre6E7Smr85rEffjRU6uVLxzOw2SY4s",
  authDomain: "property-management-syst-478b4.firebaseapp.com",
  projectId: "property-management-syst-478b4",
  storageBucket: "property-management-syst-478b4.firebasestorage.app",
  messagingSenderId: "196962905355",
  appId: "1:196962905355:web:69a94a36e63c4d03a2060e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
