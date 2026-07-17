import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBv57VIoblqOzOcEMgZtKft_bL8Zwbg2xg",
  authDomain: "kickout1.firebaseapp.com",
  projectId: "kickout1",
  storageBucket: "kickout1.firebasestorage.app",
  messagingSenderId: "1008891465684",
  appId: "1:1008891465684:web:703b1110c4e7b60b525041",
  measurementId: "G-821E1WXBYH"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);