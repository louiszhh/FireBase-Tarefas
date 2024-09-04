import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyCtk2MYf8Q2H-Xw1B6ly2UrWL6OTFRIfKs",
    authDomain: "fir-tarefas-fc788.firebaseapp.com",
    projectId: "fir-tarefas-fc788",
    storageBucket: "fir-tarefas-fc788.appspot.com",
    messagingSenderId: "406205455800",
    appId: "1:406205455800:web:139b113b16af115929434d"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };