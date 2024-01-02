// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, } from "firebase/auth";
import { getFirestore, getDocs, collection, query, where, onSnapshot  } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBVtW-IrtZCk7EGEiTe6klmLxuiegMAsxE",
  authDomain: "recipeapp-494cd.firebaseapp.com",
  projectId: "recipeapp-494cd",
  storageBucket: "recipeapp-494cd.appspot.com",
  messagingSenderId: "464522009526",
  appId: "1:464522009526:web:79e9b5c87245409071bf17"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


export const FIREBASE_DB = getFirestore(FIREBASE_APP,)

export const recipeRef = collection(FIREBASE_DB, 'userSavedRecipes') 
// export const recipeRef = collection(FIREBASE_DB, 'savedrecipes') 