// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDApXagu0ykv813QbWuTOf6rFjymM6bNkw",
  authDomain: "operating-ally-435718-h7.firebaseapp.com",
  projectId: "operating-ally-435718-h7",
  storageBucket: "operating-ally-435718-h7.appspot.com",
  messagingSenderId: "1058668251983",
  appId: "1:1058668251983:web:c6812fe7c5f14b4f1f933a",
  measurementId: "G-HSS2RC44BS"
};


export const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)


