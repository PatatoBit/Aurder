import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBw90oBw_tdybtUIRsk1VSlDxAjuwudCZk",
  authDomain: "aurder-ff0aa.firebaseapp.com",
  projectId: "aurder-ff0aa",
  storageBucket: "aurder-ff0aa.appspot.com",
  messagingSenderId: "953214267457",
  appId: "1:953214267457:web:200651da8465c2b9aa96c0",
  measurementId: "G-P2BMC7WGWW"
};

const app = initializeApp(config);

export const auth = getAuth(app)
export const db = getFirestore(app)
