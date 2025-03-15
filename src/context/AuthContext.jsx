import React, { useState, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../fireabase";
import { AuthContext } from "./UseAuth";



// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      initializeUser(user);
    });

    return () => unsubscribe();
  }, []);

  const initializeUser = (user) => {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  };

  const signup = async (userData) => {
    const { email, password, ...additionalData } = userData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    // Save user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      ...additionalData,
    });
  
    setCurrentUser(user);
    setUserLoggedIn(true);
  };
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user details from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setCurrentUser({ ...user, ...userData });
    } else {
      throw Error("No such document!");
    }

    setUserLoggedIn(true);
  };

  const value = {
    currentUser,
    userLoggedIn,
    setCurrentUser,
    signup,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};