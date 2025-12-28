import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyAheRVaS-yZ2umWd-lD73ZUxFddk4PcSNQ",
  authDomain: "nexa-9d6d9.firebaseapp.com",
  projectId: "nexa-9d6d9",
  storageBucket: "nexa-9d6d9.firebasestorage.app",
  messagingSenderId: "800052701348",
  appId: "1:800052701348:web:7586ec410976f9657a5e31",
  measurementId: "G-RESDHFDSN3"
};

=======
  apiKey: "AIzaSyAaBARWjCewjWfq5Lfnkj4sQ9_A_NcgOiQ",
  authDomain: "exnode-e18d3.firebaseapp.com",
  projectId: "exnode-e18d3",
  storageBucket: "exnode-e18d3.firebasestorage.app",
  messagingSenderId: "569171954688",
  appId: "1:569171954688:web:99344f5c98a25d969adce5",
  measurementId: "G-R93LQ85ZBM"
};
>>>>>>> 6929679fe6c97bbec07cbf5cda0dbb08754215eb
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
export const auth = getAuth(app);
export default app;