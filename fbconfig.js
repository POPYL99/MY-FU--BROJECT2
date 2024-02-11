import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import{getStorage} from"firebase/storage";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCRZ4K_qswEr6M2Pz5x3IwIL12n3C9EJr0",
  authDomain: "gadgetapp-58074.firebaseapp.com",
  projectId: "gadgetapp-58074",
  storageBucket: "gadgetapp-58074.appspot.com",
  messagingSenderId: "1052628431236",
  appId: "1:1052628431236:web:448fd9bb1ba972038eadd1"
};

const app = initializeApp(firebaseConfig);
export const database =getFirestore(app);
export const storage=getStorage(app);
export const auth = getAuth(app);