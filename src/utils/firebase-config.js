// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
    authDomain: "coal-chatterman.firebaseapp.com",
    projectId: "coal-chatterman",
    storageBucket: "coal-chatterman.appspot.com",
    messagingSenderId: "287117042137",
    appId: "1:287117042137:web:e4b35a2a443bbbdab439c8",
    measurementId: "G-BB69PQ4F4W"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const db = getFirestore(app)
