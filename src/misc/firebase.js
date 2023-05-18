import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCh0RG7l6szwN_xPNxHp2F966FYCm3LSNs",
  authDomain: "chat-app-68cee.firebaseapp.com",
  projectId: "chat-app-68cee",
  databaseURL: "https://chat-app-68cee-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "chat-app-68cee.appspot.com",
  messagingSenderId: "204293684184",
  appId: "1:204293684184:web:72df6ecc7d8428d0d190ad",
  measurementId: "G-6P02BQ3PZS"
};

// Initialize Firebase
const app = firebase.initializeApp(config);
export const database = app.database();
export const auth = app.auth();