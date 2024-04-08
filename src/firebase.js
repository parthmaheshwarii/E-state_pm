import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxIqyHwRRitDCWWPep0gt4MiiZDwVjrMY",
  authDomain: "estate-292ba.firebaseapp.com",
  projectId: "estate-292ba",
  storageBucket: "estate-292ba.appspot.com",
  messagingSenderId: "74040646163",
  appId: "1:74040646163:web:3fc0d7f3f7d3f18077fde6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export default app;
