import { initializeApp, FirebaseError } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, addDoc, collection, query, where, getDocs, doc, serverTimestamp, onSnapshot, orderBy, deleteDoc, updateDoc, limit, getDoc, arrayUnion, documentId } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "look-for-18287.firebaseapp.com",
  projectId: "look-for-18287",
  storageBucket: "look-for-18287.appspot.com",
  messagingSenderId: "82998813518",
  appId: "1:82998813518:web:900b551de81ef3928cb41f",
  measurementId: "G-NWZ20S0HYQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  onAuthStateChanged,
  signOut,
  serverTimestamp,
  onSnapshot,
  orderBy,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithPopup,
  provider,
  GoogleAuthProvider,
  FirebaseError,
  deleteDoc,
  updateDoc,
  limit,
  getDoc,
  arrayUnion,
  documentId,
};
