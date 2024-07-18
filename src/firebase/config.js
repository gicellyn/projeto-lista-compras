import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_221FoUFv4-d1-TjcU2nycx5xPos-bOs",
  authDomain: "lista-compras-b930d.firebaseapp.com",
  projectId: "lista-compras-b930d",
  storageBucket: "lista-compras-b930d.appspot.com",
  messagingSenderId: "970797142898",
  appId: "1:970797142898:web:7b1f498d6fb174560d03eb"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
   