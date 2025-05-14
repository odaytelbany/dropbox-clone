import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZDUIchF7NDA1ak2tRPL7qGU33wNx1yZs",
  authDomain: "dropbox-clone-1fbd4.firebaseapp.com",
  projectId: "dropbox-clone-1fbd4",
  storageBucket: "dropbox-clone-1fbd4.appspot.com",
  messagingSenderId: "327014552721",
  appId: "1:327014552721:web:a17e2cad9e70924c7e1b30"
};

const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};