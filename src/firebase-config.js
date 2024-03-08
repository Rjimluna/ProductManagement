import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyChElCJCnDdEyJUk84gcEaW6MVunxsWzKE",
    authDomain: "utak-firebase.firebaseapp.com",
    projectId: "utak-firebase",
    storageBucket: "utak-firebase.appspot.com",
    messagingSenderId: "989735499672",
    appId: "1:989735499672:web:bf610314c1826371845ded",
    measurementId: "G-VXZJRPSFHY"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);