// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDO-9CTJITJ-m1ZDYaD_RisZ49su2r0TuA",
    authDomain: "longqing-announcements-2acf6.firebaseapp.com",
    projectId: "longqing-announcements-2acf6",
    storageBucket: "longqing-announcements-2acf6.firebasestorage.app",
    messagingSenderId: "667704774182",
    appId: "1:667704774182:web:ff3604a1294db50c8860e7",
    measurementId: "G-YP8RYW16QT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);