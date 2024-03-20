// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2F8TPme08NYLf6c-qeie7zS9Ybee2WLw",
    authDomain: "netflix-5392f.firebaseapp.com",
    projectId: "netflix-5392f",
    storageBucket: "netflix-5392f.appspot.com",
    messagingSenderId: "506387438520",
    appId: "1:506387438520:web:4f1fa5a1c07acbd5044d4d"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)