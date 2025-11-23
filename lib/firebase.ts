import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAaBARWjCewjWfq5Lfnkj4sQ9_A_NcgOiQ",
  authDomain: "exnode-e18d3.firebaseapp.com",
  projectId: "exnode-e18d3",
  storageBucket: "exnode-e18d3.firebasestorage.app",
  messagingSenderId: "569171954688",
  appId: "1:569171954688:web:99344f5c98a25d969adce5",
  measurementId: "G-R93LQ85ZBM"
};
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
export const auth = getAuth(app);
export default app;