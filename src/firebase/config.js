import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgGNO8nAbFcea2qXtw3w2F6PWgzafO4bs",
  authDomain: "bookshelf-339f8.firebaseapp.com",
  projectId: "bookshelf-339f8",
  storageBucket: "bookshelf-339f8.appspot.com",
  messagingSenderId: "510696473067",
  appId: "1:510696473067:web:0ff09e98e5816ed6e719ae",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
