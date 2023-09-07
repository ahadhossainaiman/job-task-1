/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

export const UserContext = createContext(null);

const auth = getAuth(app);
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, ustLoading] = useState(true);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      ustLoading(false);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userSignOut = () => {
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    setProfile(profile);
    return updateProfile(auth.currentUser, profile);
  };

  const userValue = {
    user,
    createUser,
    signInUser,
    userSignOut,
    loading,
    updateUserProfile,
    profile,
  };
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export default AuthProviders;
