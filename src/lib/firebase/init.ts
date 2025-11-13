import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (typeof window === "undefined") {
  console.log("🧩 [SERVER] Firebase config loaded:", {
    apiKey: firebaseConfig.apiKey ? "SET" : "MISSING",
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    appId: firebaseConfig.appId,
  });
} else {
  console.log("🧩 [CLIENT] Firebase API key prefix:", firebaseConfig.apiKey?.slice(0, 8) || "MISSING");
}

if (!firebaseConfig.apiKey) {
  console.error("❌ Firebase API key tidak ditemukan! Pastikan .env.local sudah diisi dan server di-restart.");
  throw new Error("Missing Firebase API key in environment variables.");
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
export const db = getFirestore(app);