import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWJo-AfzcHrQ1wfWOQynuXkIQjbnBMU10",
  authDomain: "pickeball-yody.firebaseapp.com",
  projectId: "pickeball-yody",
  storageBucket: "pickeball-yody.firebasestorage.app",
  messagingSenderId: "1020066153184",
  appId: "1:1020066153184:web:ffcf3ffd01a99744a48685"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
