// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvXT54cI3PPDJIk5OO_1aGhm1A-zfXejg",
  authDomain: "vue-3-proyecto-4.firebaseapp.com",
  projectId: "vue-3-proyecto-4",
  storageBucket: "vue-3-proyecto-4.appspot.com",
  messagingSenderId: "1021680799385",
  appId: "1:1021680799385:web:8652b96c74772c7fc3f208"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };