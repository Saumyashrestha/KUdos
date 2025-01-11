
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Importing getFirestore
import { collection, getDocs, getDoc,addDoc, updateDoc, setDoc,doc,query, where,deleteDoc ,serverTimestamp} from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app);

// Exporting all the necessary functions and variables
export { auth, db, app, storage,setDoc,serverTimestamp,collection,query,where, getDocs, getDoc,addDoc, updateDoc, doc, deleteDoc };
