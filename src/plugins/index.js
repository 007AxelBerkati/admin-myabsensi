import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByQX3qj5jIWNkrlfOtSW9_FA1PqLuZsck",
  authDomain: "my-absensi-2.firebaseapp.com",
  databaseURL:
    "https://my-absensi-2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-absensi-2",
  storageBucket: "my-absensi-2.appspot.com",
  messagingSenderId: "1085352412967",
  appId: "1:1085352412967:web:48d96db842cbe902090b02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const rdb = getDatabase(app);
