// Import the functions you need from the SDKs you need
import {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseFirebaseAppId,
  firebaseMessagingSenderId,
  firebaseProjectId,
  firebaseRealtimeDatabase,
  firebaseStorageBucket,
} from "@/constants/environment";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  databaseURL: firebaseRealtimeDatabase,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseFirebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const rdb = getDatabase(app);
export const auth = getAuth(app);
