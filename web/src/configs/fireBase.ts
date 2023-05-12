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
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
projectId: process.env.NEXT_PUBLIC_PROJECT_ID ,
storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
appId: process.env.NEXT_PUBLIC_APP_ID,
measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID

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


