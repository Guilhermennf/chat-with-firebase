// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXOeYAnnSRmwRyJpa1f87BV1qLnGGIlUw",
    authDomain: "chatinrealtime-a1fab.firebaseapp.com",
    projectId: "chatinrealtime-a1fab",
    storageBucket: "chatinrealtime-a1fab.appspot.com",
    messagingSenderId: "881563380221",
    appId: "1:881563380221:web:46a7f79913336f27cc5194",
    measurementId: "G-5RZ9M0C9TS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
