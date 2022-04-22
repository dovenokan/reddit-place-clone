import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  // apiKey: process.env.REACT_APP_APIKEY,
  // authDomain: process.env.REACT_APP_AUTHDOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASEURL,
  // projectId: process.env.REACT_APP_PROJECTID,
  // storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  // appId: process.env.REACT_APP_APPID,
  apiKey: "AIzaSyD_rqs-5yJBq_o9KaD--JWHwDa11iqdgdQ",
  authDomain: "place-firebase.firebaseapp.com",
  databaseURL: "https://place-firebase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "place-firebase",
  storageBucket: "place-firebase.appspot.com",
  messagingSenderId: "1046026137375",
  appId: "1:1046026137375:web:5080272e083cc04af58a2a"
});

const realtime = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);
export default realtime;


