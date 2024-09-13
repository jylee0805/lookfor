import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore,addDoc,collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIhZaGrGf8t_OH6i-GLiXlqmoUdXcHE4g",
  authDomain: "look-for-18287.firebaseapp.com",
  projectId: "look-for-18287",
  storageBucket: "look-for-18287.appspot.com",
  messagingSenderId: "82998813518",
  appId: "1:82998813518:web:900b551de81ef3928cb41f",
  measurementId: "G-NWZ20S0HYQ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,db,addDoc,collection}