import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

let config: any = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const app = firebase.initializeApp(config);
export const auth = firebase.auth(app);
export const db = firebase.firestore(app);
export const functions = firebase.functions(app);
export const storage = firebase.storage(app);

if (process.env.NODE_ENV === 'development') {
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', 8080);
  functions.useEmulator('localhost', 5001);
  storage.useEmulator('localhost', 9199);
}
