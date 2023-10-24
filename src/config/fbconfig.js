// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxX98ZxNczF4OH5oxNIoochInxPWQKa2k",
  authDomain: "scp-crud-app-final.firebaseapp.com",
  projectId: "scp-crud-app-final",
  storageBucket: "scp-crud-app-final.appspot.com",
  messagingSenderId: "213113067191",
  appId: "1:213113067191:web:fa29cb0de19c7a44bedf32",
  measurementId: "G-J64PLREZTB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
