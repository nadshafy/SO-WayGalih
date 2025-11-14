"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, db } from "@/src/lib/firebase/init";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import AuthCard from "@/src/components/shared/auth-card";
import { useAuth } from "@/src/contexts/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, role, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
    if (role === "admin") router.replace("/dashboard");
    else router.replace("/halaman-pengguna");
  }, [authLoading, role, router, user]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const existing = await getDoc(userRef);

      if (!existing.exists()) {
        await setDoc(userRef, {
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          role: "user",
          createdAt: serverTimestamp(),
        });
      }

      router.replace("/halaman-pengguna");
    });

    getRedirectResult(auth);
    return () => unsub();
  }, [router]);

  const handleRegister = useCallback(async () => {
    try {
      setLoading(true);

      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/i.test(ua);
      const isWebkit = /WebKit/i.test(ua);
      const isChromeIOS = /CriOS/i.test(ua);
      const isFirefoxIOS = /FxiOS/i.test(ua);
      const isIOSOrSafari = isIOS || (isWebkit && !isChromeIOS && !isFirefoxIOS);

      if (isIOSOrSafari) {
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      const result = await signInWithPopup(auth, googleProvider);
      const newUser = result.user;

      const userRef = doc(db, "users", newUser.uid);
      const existing = await getDoc(userRef);

      if (!existing.exists()) {
        await setDoc(userRef, {
          uid: newUser.uid,
          name: newUser.displayName,
          email: newUser.email,
          role: "user",
          createdAt: serverTimestamp(),
        });
      }

      router.push("/halaman-pengguna");
    } catch (error: any) {
      alert("Pendaftaran gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Daftar - Desa Way Galih</title>
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f9] px-6">
        <AuthCard
          buttonLabel={loading ? "Memproses..." : "Daftar dengan Google"}
          loading={loading}
          onButtonClick={handleRegister}
        />
      </div>
    </>
  );
}
