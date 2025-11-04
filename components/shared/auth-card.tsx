"use client";

import Image from "next/image";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app  from "@/src/firebaseConfig";
import { useState } from "react";

type AuthCardProps = {
  buttonLabel: string;
};

const AuthCard = ({ buttonLabel }: AuthCardProps) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Login berhasil:", user);

      // Misal redirect ke dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login gagal:", error);
      alert("Login gagal, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-10 text-center shadow-xl">
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo.png"
          alt="Logo Desa Way Galih"
          width={120}
          height={120}
          className="mb-6 h-28 w-28 rounded-full bg-white p-2 shadow-md"
          priority
        />
        <h1 className="text-2xl font-bold text-[#0a3d91] sm:text-3xl">
          Desa Way Galih
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Layanan Administrasi Desa Online
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className={`mt-10 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm transition ${
          loading
            ? "cursor-not-allowed opacity-70"
            : "hover:-translate-y-0.5 hover:border-[#0a3d91] hover:text-[#0a3d91]"
        }`}
      >
        <Image
          src="/images/google-icon.svg"
          alt="Google Icon"
          width={22}
          height={22}
        />
        {loading ? "Memproses..." : buttonLabel}
      </button>
    </div>
  );
};

export default AuthCard;
