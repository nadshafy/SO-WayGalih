"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/src/lib/firebase/init";
import AuthCard from "@/src/components/shared/auth-card";
import { useAuth } from "@/src/contexts/auth-context";

export default function RegisterPage() {
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

  const handleRegister = useCallback(async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("Pendaftaran berhasil. UID:", user.uid);

      if (user.uid === ADMIN_UID) {
        console.log("Role: ADMIN");
        router.push("/dashboard");
      } else {
        console.log("Role: USER");
        router.push("/halaman-pengguna");
      }

    } catch (error: any) {
      console.error("Gagal daftar:", error.message);
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
