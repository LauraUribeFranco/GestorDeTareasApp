import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX20FwdM7IJZidfI6qHPinCXVXDXkWfBo",
  authDomain: "gestortareas-dbc8d.firebaseapp.com",
  projectId: "gestortareas-dbc8d",
  storageBucket: "gestortareas-dbc8d.firebasestorage.app",
  messagingSenderId: "77344640150",
  appId: "1:77344640150:web:c2371adb48a58367f306b7",
  measurementId: "G-0QCT0CEH6F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
