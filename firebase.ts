// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAqeTrhpehwWGHrn-L6XPaFzVV_88FXer0",
  authDomain: "my-video-98eee.firebaseapp.com",
  projectId: "my-video-98eee",
  storageBucket: "my-video-98eee.appspot.com",
  messagingSenderId: "94727029885",
  appId: "1:94727029885:web:ac0c05dada495cd45a9d14"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }