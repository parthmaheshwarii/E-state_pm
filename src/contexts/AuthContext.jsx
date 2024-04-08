"use client";
import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  currentUser: null,
  getUser: () => {},
  login: async () => {},
  signOut: () => {},
  signUp: async () => {},
  isAdmin: async () => {},
});
export function useAuth() {
  return useContext(AuthContext);
}
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  function signOut() {
    return auth.signOut();
  }

  async function signUp(email, password, name) {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      name,
      email,
      bookings: [],
      repairs: [],
    });
  }

  function getUser() {
    console.log("in getUser", auth.currentUser);
    return auth.currentUser;
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function isAdmin() {
    return auth.currentUser.getIdTokenResult().then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        return true;
      } else {
        return false;
      }
    });
  }
  const value = {
    currentUser,
    getUser,
    login,
    signOut,
    signUp,
    isAdmin,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
