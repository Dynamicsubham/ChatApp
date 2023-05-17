import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDyBLfG3xBwJVX53pAfPYLznOWiI7y21Sc",
  authDomain: "chatapp-75db5.firebaseapp.com",
  projectId: "chatapp-75db5",
  storageBucket: "chatapp-75db5.appspot.com",
  messagingSenderId: "1088800576666",
  appId: "1:1088800576666:web:3d9ea2e4ea5def0e1abb23",
  measurementId: "G-LS4PHP7PS0"
};

// Initialize Firebase
const app = firebase.initializeApp(config);
export const database = app.database();
export const auth = app.auth();