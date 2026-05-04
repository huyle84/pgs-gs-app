import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCU0EzDOiQXz1qHKsB2zsIr5vJfbieTjcY",
  authDomain: "gs-pgs-app.firebaseapp.com",
  projectId: "gs-pgs-app",
  storageBucket: "gs-pgs-app.firebasestorage.app",
  messagingSenderId: "418417388781",
  appId: "1:418417388781:web:4fd0602a11792f0eda30e4",
  measurementId: "G-HYDKF02SZ4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
