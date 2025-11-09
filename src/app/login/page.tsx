"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Head from "next/head";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/src/lib/firebase/init";
import AuthCard from "@/src/components/shared/auth-card";
import { useAuth } from "@/src/contexts/auth-context";
import { isAdminEmail } from "@/src/lib/auth/roles";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, role, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;

    if (role === "admin") {
      router.replace("/dashboard");
    } else {
      router.replace("/halaman-pengguna");
    }
  }, [authLoading, role, router, user]);

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);
      const credential = await signInWithPopup(auth, googleProvider);
      const destination = isAdminEmail(credential.user.email)
        ? "/dashboard"
        : "/halaman-pengguna";
      router.push(destination);
    } catch (error) {
      console.error("Gagal masuk dengan Google:", error);
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
          buttonLabel="Masuk dengan Google"
          loading={loading}
          onButtonClick={handleLogin}
        />
      </div>
    </>
  );
}
