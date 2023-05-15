// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyBLfG3xBwJVX53pAfPYLznOWiI7y21Sc",
  authDomain: "chatapp-75db5.firebaseapp.com",
  projectId: "chatapp-75db5",
  storageBucket: "chatapp-75db5.appspot.com",
  messagingSenderId: "1088800576666",
  appId: "1:1088800576666:web:3d9ea2e4ea5def0e1abb23",
  measurementId: "G-LS4PHP7PS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);