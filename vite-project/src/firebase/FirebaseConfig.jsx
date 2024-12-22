import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6Vj6Ak7Erghi5lOhaKaG0pPnhtdOJII0",
  authDomain: "kudos-aa8ca.firebaseapp.com",
  projectId: "kudos-aa8ca",
  storageBucket: "kudos-aa8ca.firebasestorage.app",
  messagingSenderId: "527625274171",
  appId: "1:527625274171:web:bfe9a6df1dc3e2a6756d1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db, app};