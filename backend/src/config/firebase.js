// import firebase from 'firebase/app';
// import 'firebase/storage';
import {getStorage} from 'firebase/storage'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAtyuoKy2VAcdPOV6H1vlGsTuAWjCCdg04",
  authDomain: "car-management-3eacf.firebaseapp.com",
  projectId: "car-management-3eacf",
  storageBucket: "car-management-3eacf.firebasestorage.app",
  messagingSenderId: "847751425544",
  appId: "1:847751425544:web:d3ce85f40cec06c3f36bbd",
  measurementId: "G-JT9K4FM8Y9"
    // Your Firebase configuration goes here
};

const firebaseApp= initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// firebaseApp.initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage, firebaseApp as default };


