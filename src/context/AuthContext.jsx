import React, { useContext, useState, useEffect, createContext } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../fireabase";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
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

      // Check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Check if the auth provider is Google
      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === "google.com"
      );
      setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setIsEmailUser(false);
      setIsGoogleUser(false);
    }

    setLoading(false);
  };

  const signup = async (email, password, firstName, lastName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email: user.email,
    });

    setCurrentUser(user);
    setUserLoggedIn(true);
    setIsEmailUser(true);
    setIsGoogleUser(false);
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    setCurrentUser(user);
    setUserLoggedIn(true);
    setIsEmailUser(true);
    setIsGoogleUser(false);
  };

  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

    if (isNewUser) {
      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        email: user.email,
      });
    }

    setCurrentUser(user);
    setUserLoggedIn(true);
    setIsEmailUser(false);
    setIsGoogleUser(true);
  };

  const value = {
    currentUser,
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    setCurrentUser,
    signup,
    login,
    googleAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};