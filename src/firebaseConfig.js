// firebase integration
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const app = firebase.initializeApp({
    apiKey: "AIzaSyCaBInpvfxrqGf2KGZKJPZz_fShPNQ8QTc",
    authDomain: "baby-buyer.firebaseapp.com",
    projectId: "baby-buyer",
    storageBucket: "baby-buyer.appspot.com",
    messagingSenderId: "42092723486",
    appId: "1:42092723486:web:f2089dee96c1206bed9d0f",
    measurementId: "G-9VTWLZS392"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;