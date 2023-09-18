// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAky9Ex6Bv0Gntt02ZvlkwmtlILtPQIbbo",
  authDomain: "lea-y-fede.firebaseapp.com",
  projectId: "lea-y-fede",
  storageBucket: "lea-y-fede.appspot.com",
  messagingSenderId: "7688160496",
  appId: "1:7688160496:web:eb79c6a1a1d497c6dc6e35",
  measurementId: "G-2VSV09YP62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
    app,
    analytics,
    db
}