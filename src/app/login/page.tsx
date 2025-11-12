"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/src/lib/firebase/init";
import AuthCard from "@/src/components/shared/auth-card";
import { useAuth } from "@/src/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, role, loading: authLoading } = useAuth();

  const ADMIN_UID = "CfLWcqwwaTb3zoC0oS0ckXh4sjV2";

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;

    if (user.uid === ADMIN_UID || role === "admin") {
      router.replace("/dashboard");
    } else {
      router.replace("/halaman-pengguna");
    }
  }, [authLoading, role, router, user]);

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("Login berhasil. UID:", user.uid);

      if (user.uid === ADMIN_UID) {
        console.log("Role terdeteksi: ADMIN");
        router.push("/dashboard");
      } else {
        console.log("Role terdeteksi: USER");
        router.push("/halaman-pengguna");
      }

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
