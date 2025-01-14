// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxCYn9VlC6dRNu8ifa-g2uRacE-xSe6xg",
    authDomain: "postify-3a39d.firebaseapp.com",
    projectId: "postify-3a39d",
    storageBucket: "postify-3a39d.firebasestorage.app",
    messagingSenderId: "291353874453",
    appId: "1:291353874453:web:5e08ec1bcf3315fe9e7e1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;