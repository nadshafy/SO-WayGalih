"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, db } from "@/src/lib/firebase/init";
import { doc, getDoc } from "firebase/firestore";
import AuthCard from "@/src/components/shared/auth-card";
import { useAuth } from "@/src/contexts/auth-context";

export default function LoginPage() {
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
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === "admin") router.replace("/dashboard");
        else router.replace("/halaman-pengguna");
      } else {
        router.replace("/register");
      }
    });

    getRedirectResult(auth);
    return () => unsub();
  }, [router]);

  const handleLogin = useCallback(async () => {
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
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === "admin") router.push("/dashboard");
        else router.push("/halaman-pengguna");
      } else {
        router.push("/register");
      }
    } catch (error: any) {
      alert("Login gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Masuk - Desa Way Galih</title>
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f9] px-6">
        <AuthCard
          buttonLabel={loading ? "Memproses..." : "Masuk dengan Google"}
          loading={loading}
          onButtonClick={handleLogin}
        />
      </div>
    </>
  );
}
