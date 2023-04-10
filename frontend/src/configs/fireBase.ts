// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp} from "firebase/app";
import firebase from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
authDomain: process.env.AUTH_DOMAIN,
databaseURL: process.env.DATABASE_URL,
projectId: process.env.PROJECT_ID ,
storageBucket: process.env.STORAGE_BUCKET,
messagingSenderId: process.env.MESSAGING_SENDER_ID,
appId: process.env.APP_ID,
measurementId: process.env.MEASUREMENT_ID

};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}


// Initialize Firebase
// Initialize Firebase
const firestore = getFirestore(app!)


export const getFirestoreInstance = () => {
  return firestore;
};


