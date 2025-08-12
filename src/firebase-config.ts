// src/firebase-config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBx0fKKoUHERgsKMNqUQnpyG-m3fE9vLIk",
  authDomain: "push-noti-125b3.firebaseapp.com",
  projectId: "push-noti-125b3",
  storageBucket: "push-noti-125b3.firebasestorage.app",
  messagingSenderId: "433204968631",
  appId: "1:433204968631:web:d80a04c9dbdaa163c62132",
  measurementId: "G-YF47JX3PHE",
};

const app = initializeApp(firebaseConfig);

export { app };
