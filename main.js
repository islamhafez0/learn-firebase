import { handleAuth } from './auth'
import { handleTodos } from "./todos"

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {                             
  apiKey: "AIzaSyD3NcPvuzwC8zIYNGf_RLuhYQugqENqQnA", 
  authDomain: "learn-firebase-77f6d.firebaseapp.com",
  projectId: "learn-firebase-77f6d",                 
  storageBucket: "learn-firebase-77f6d.appspot.com", 
  messagingSenderId: "26130315847",                  
  appId: "1:26130315847:web:410041253d67e3119a0f62"  
};                                                   

const app = initializeApp(firebaseConfig);
const database = getFirestore();
console.log(database)

handleAuth(app)
handleTodos(database)