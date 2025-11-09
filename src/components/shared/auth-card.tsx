"use client";

import Image from "next/image";
import { useMemo } from "react";

type AuthCardProps = {
  buttonLabel: string;
  loading?: boolean;
  onButtonClick?: () => void;
};

const AuthCard = ({
  buttonLabel,
  loading = false,
  onButtonClick
}: AuthCardProps) => {
  const label = useMemo(
    () => (loading ? "Sedang memproses..." : buttonLabel),
    [buttonLabel, loading]
  );

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
        onClick={onButtonClick}
        disabled={loading}
        className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0a3d91] hover:text-[#0a3d91]"
        aria-busy={loading}
      >
        <Image
          src="/images/google-icon.svg"
          alt="Google Icon"
          width={22}
          height={22}
        />
        {label}
      </button>
    </div>
  );
};

export default AuthCard;
