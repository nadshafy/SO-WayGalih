"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider, db } from "@/src/lib/firebase/init";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
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
    getRedirectResult(auth).then(async (result) => {
      if (!result || !result.user) return;

      const user = result.user;
      console.log("Login (redirect) berhasil. UID:", user.uid);

      localStorage.setItem("uid", user.uid);

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email || "",
          role: "pengguna",
          createdAt: serverTimestamp(),
        });
      }

      const role = (await getDoc(userRef)).data()?.role || "pengguna";

      if (role === "admin") router.push("/dashboard");
      else router.push("/halaman-pengguna");
    });
  }, [router]);

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);

      const isSafari =
        typeof navigator !== "undefined" &&
        /safari/i.test(navigator.userAgent) &&
        !/chrome/i.test(navigator.userAgent);

      if (isSafari) {
        console.log("Safari terdeteksi, menggunakan signInWithRedirect...");
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Login berhasil. UID:", user.uid);

      localStorage.setItem("uid", user.uid);

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email || "",
          role: "pengguna",
          createdAt: serverTimestamp(),
        });
      }

      const role = (await getDoc(userRef)).data()?.role || "pengguna";

      if (role === "admin") router.push("/dashboard");
      else router.push("/halaman-pengguna");
    } catch (error: any) {
      console.error("Gagal login:", error.message);
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
