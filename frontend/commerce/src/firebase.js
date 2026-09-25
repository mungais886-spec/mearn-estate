// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "oauth-62c3f.firebaseapp.com",
  projectId: "oauth-62c3f",
  storageBucket: "oauth-62c3f.firebasestorage.app",
  messagingSenderId: "309489416790",
  appId: "1:309489416790:web:075bb9503ac8c6e94819f7"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);