import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgOtz0UoXRvNCVBJgx7aGX6a9P1x5G_a0",
  authDomain: "gigapp-8cc4b.firebaseapp.com",
  projectId: "gigapp-8cc4b",
  storageBucket: "gigapp-8cc4b.appspot.com",
  messagingSenderId: "721616286294",
  appId: "1:721616286294:web:81fc8959d8577a14ce41f7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, getDoc };