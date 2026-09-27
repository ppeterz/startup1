// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6KAkX2WbDTTfG6MewG9jqzIBxSJdTy7Y",
  authDomain: "studio-4817573865-6e1ad.firebaseapp.com",
  projectId: "studio-4817573865-6e1ad",
  storageBucket: "studio-4817573865-6e1ad.appspot.com",
  messagingSenderId: "874014451879",
  appId: "1:874014451879:web:09fccd50b302be60d69382",
  measurementId: ""
};

// Initialize Firebase only if not already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
