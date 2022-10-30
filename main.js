import { handleAuth } from './auth'
import { handleTodos } from "./todos"

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhAX_3HkWi-XUEeKoj01RDmTP874J208I",
  authDomain: "fir-cc-1c956.firebaseapp.com",
  projectId: "fir-cc-1c956",
  storageBucket: "fir-cc-1c956.appspot.com",
  messagingSenderId: "214334751744",
  appId: "1:214334751744:web:1995e7b8e01b7f1ddc04e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

handleAuth(app)
handleTodos(db)