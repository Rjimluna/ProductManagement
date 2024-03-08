import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "utak-firebase.firebaseapp.com",
    projectId: "utak-firebase",
    storageBucket: "utak-firebase.appspot.com",
    messagingSenderId: "989735499672",
    appId: process.env.REACT_APP_APP_ID,
    measurementId: "G-VXZJRPSFHY"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);