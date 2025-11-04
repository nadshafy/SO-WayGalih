// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBN-dH4P5colMcy935-VDDq_-8N8WhlYD8",
  authDomain: "balaidesawaygalih.firebaseapp.com",
  projectId: "balaidesawaygalih",
  storageBucket: "balaidesawaygalih.firebasestorage.app",
  messagingSenderId: "909147633557",
  appId: "1:909147633557:web:a55fc8840a4b203314a89c",
  measurementId: "G-RG6TB50K3V"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Ekspor layanan yang akan dipakai di React
export const db = getFirestore(app);  // untuk database
export const auth = getAuth(app);     // untuk login user
export default app;
