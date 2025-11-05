"use client";

import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#1a3491] to-[#0a3d91] text-white">
      <div className="pointer-events-none absolute inset-0 -translate-x-1/3 translate-y-1/4 scale-150 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)] opacity-80" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Logo Desa Way Galih"
            width={48}
            height={48}
            sizes="(max-width: 640px) 48px, 48px"
            className="h-10 w-10 rounded-full bg-white/10 p-1 sm:h-12 sm:w-12"
            priority
          />
          <div className="leading-tight">
            <span className="block text-xs font-normal text-white/90 sm:text-sm">
              Desa
            </span>
            <span className="block text-base font-semibold text-white sm:text-lg">
              Way Galih
            </span>
          </div>
        </div>

        <button
          type="button"
          className="flex h-5 w-7 flex-col justify-between md:hidden"
          aria-label="Buka menu navigasi"
        >
          <span className="block h-[3px] rounded-full bg-white transition-transform duration-300" />
          <span className="block h-[3px] rounded-full bg-white transition-transform duration-300" />
          <span className="block h-[3px] rounded-full bg-white transition-transform duration-300" />
        </button>
      </div>

      <div className="relative mx-auto mt-6 max-w-[900px] px-4 pb-12 text-center sm:mt-10 sm:px-6 sm:pb-16">
        <div className="pointer-events-none absolute -left-24 top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-56 w-56 rounded-full bg-[#072e6f]/40 blur-3xl" />
        <h1 className="text-2xl font-bold uppercase tracking-wide drop-shadow-sm sm:text-3xl md:text-4xl">
          Selamat Datang di Website Administrasi
        </h1>
        <p className="mt-3 text-sm text-white/95 sm:mt-4 sm:text-base md:text-lg">
          Layanan Pengurusan Surat Secara Online. Proses Lebih Mudah dan Cepat
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="w-full transform rounded-full bg-gradient-to-r from-white via-[#dbe7ff] to-white px-6 py-3 text-center text-sm font-semibold text-[#0a3d91] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-base"
          >
            Daftar Akun Sekarang
          </Link>
          <Link
            href="/login"
            className="w-full transform rounded-full border border-white/70 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-base"
          >
            Masuk ke Akun Anda
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
