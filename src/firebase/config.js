import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCSfvHxPO8IC_k6_Q8kK6iLe535dlucqm0",
  authDomain: "buytwosmarikina.firebaseapp.com",
  projectId: "buytwosmarikina",
  storageBucket: "buytwosmarikina.firebasestorage.app",
  messagingSenderId: "1071235938485",
  appId: "1:1071235938485:web:84b200cd2e5bb1966466fc",
  measurementId: "G-EZ6L5QKYTS"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, firebaseConfig };