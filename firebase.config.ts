import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB-4MVVX3SILd1Dca13L_YePyjfko1o7B4",
  authDomain: "muriverse.firebaseapp.com",
  projectId: "muriverse",
  storageBucket: "muriverse.appspot.com",
  messagingSenderId: "259249757692",
  appId: "1:259249757692:web:0d9791117541de47bba679",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "nfts");
export {
  colRef,
  db,
};
