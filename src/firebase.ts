// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx0fKKoUHERgsKMNqUQnpyG-m3fE9vLIk",
  authDomain: "push-noti-125b3.firebaseapp.com",
  projectId: "push-noti-125b3",
  storageBucket: "push-noti-125b3.firebasestorage.app",
  messagingSenderId: "433204968631",
  appId: "1:433204968631:web:d80a04c9dbdaa163c62132",
  measurementId: "G-YF47JX3PHE",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BHQ7-2BFlWsABSpTS0BZ1RGI3VqJ2_IfuYaCTvU0_I1fblB23QukQ6kEZnv3QXMTmUK1plDN6dLvJFSoXfz0HVo",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
      return currentToken;
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
