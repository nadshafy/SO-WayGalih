"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/src/lib/firebase/init";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // UID admin kamu
  const ADMIN_UID = "CfLWcqwwaTb3zoC0oS0ckXh4sjV2";

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("✅ Login berhasil. UID:", user.uid);

      // Cek apakah UID cocok dengan admin
      if (user.uid === ADMIN_UID) {
        console.log("🧩 Role terdeteksi: ADMIN");
        router.push("/dashboard"); // halaman admin
      } else {
        console.log("🧩 Role terdeteksi: USER");
        router.push("/halaman-pengguna"); // halaman user biasa
      }

    } catch (error: any) {
      console.error("❌ Gagal login:", error.message);
      alert("Login gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <button
        onClick={handleLogin}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? "Memproses..." : "Login dengan Google"}
      </button>
    </div>
  );
}
