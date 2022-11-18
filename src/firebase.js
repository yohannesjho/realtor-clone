 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRCyD0D9Ng3y-MSUcUiJfC-0aC1EkfcoE",
  authDomain: "realtor-clone-91c57.firebaseapp.com",
  projectId: "realtor-clone-91c57",
  storageBucket: "realtor-clone-91c57.appspot.com",
  messagingSenderId: "505107942898",
  appId: "1:505107942898:web:173c71f927b867b0c02f6b"
};

// Initialize Firebase
  initializeApp(firebaseConfig)
  export const db = getFirestore()