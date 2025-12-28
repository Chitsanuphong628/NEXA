import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAheRVaS-yZ2umWd-lD73ZUxFddk4PcSNQ",
  authDomain: "nexa-9d6d9.firebaseapp.com",
  projectId: "nexa-9d6d9",
  storageBucket: "nexa-9d6d9.firebasestorage.app",
  messagingSenderId: "800052701348",
  appId: "1:800052701348:web:7586ec410976f9657a5e31",
  measurementId: "G-RESDHFDSN3"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
export const auth = getAuth(app);
export default app;