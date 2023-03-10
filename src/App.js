import './App.css';
import { Routes, Route } from "react-router-dom";

// firebase integration
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import LoginPage from './pages/LoginPage';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCaBInpvfxrqGf2KGZKJPZz_fShPNQ8QTc",
  authDomain: "baby-buyer.firebaseapp.com",
  projectId: "baby-buyer",
  storageBucket: "baby-buyer.appspot.com",
  messagingSenderId: "42092723486",
  appId: "1:42092723486:web:f2089dee96c1206bed9d0f",
  measurementId: "G-9VTWLZS392"
});

const auth = firebase.auth();

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
    </Routes>
  );
}

export default App;
