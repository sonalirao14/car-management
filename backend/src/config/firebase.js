import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    // Your Firebase configuration goes here
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };