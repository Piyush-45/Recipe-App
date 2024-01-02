import React, { createContext, useEffect, useState } from "react";
import { FIREBASE_AUTH, recipeRef } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithCredential, // Import signOut from firebase/auth
} from "firebase/auth";

import Toast from "react-native-toast-message";


export const AppAuthenticationContext = createContext();

export const AppAuthenticationProvider = ({ children }) => {

  const auth = FIREBASE_AUTH;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);
      if (authUser) {
        setUser(authUser);


      } else {
        setUser(null);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const signUp = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      // navigation.navigate('homescreen');
      Toast.show({
        type: 'success',
        text1: 'Sign Up Successful',
        visibilityTime: 3000, // 3 seconds
        autoHide: true,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: error.message,
        visibilityTime: 3000, // 3 seconds
        autoHide: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("logged in ")
      // Toast.show({
      //   type: 'success',
      //   text1: 'Sign In Successful',
      //   visibilityTime: 3000, // 3 seconds
      //   autoHide: true,
      // });
    } catch (err) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Sign In Failed',
      //   text2: err.message,
      //   visibilityTime: 3000, // 3 seconds
      //   autoHide: true,
      // });
      // alert(err);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth); // Use signOut from firebase/auth
      console.log("Signed out");
      // Optionally navigate to the login screen or perform cleanup
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  return (
    <AppAuthenticationContext.Provider
      value={{ email, setEmail, username, password, setUsername, setPassword, signUp, signIn, signOut, loading, user, favorites, setFavorites }}
    >
      {children}
    </AppAuthenticationContext.Provider>
  );
};
