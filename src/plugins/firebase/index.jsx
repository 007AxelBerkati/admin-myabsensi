import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, rdb } from "@/services";
import { ref } from "firebase/database";

const authentication = auth;
export const login = (email, password) => {
  return signInWithEmailAndPassword(authentication, email, password);
};

export const logout = () => {
  return signOut(authentication);
};

export const forgetPass = (email) => {
  return sendPasswordResetEmail(authentication, email);
};

export const authState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const register = (email, password) => {
  return createUserWithEmailAndPassword(authentication, email, password);
};

export const databaseRef = (path) => {
  return ref(rdb, path);
};
