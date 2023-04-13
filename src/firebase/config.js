import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgGNO8nAbFcea2qXtw3w2F6PWgzafO4bs",
  authDomain: "bookshelf-339f8.firebaseapp.com",
  projectId: "bookshelf-339f8",
  storageBucket: "bookshelf-339f8.appspot.com",
  messagingSenderId: "510696473067",
  appId: "1:510696473067:web:0ff09e98e5816ed6e719ae",
};

initializeApp(firebaseConfig);

// Set the FIRESTORE_EMULATOR_HOST environment variable
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

const db = getFirestore();

const auth = getAuth();

const storage = getStorage();

export { db, auth, storage };
