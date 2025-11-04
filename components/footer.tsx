"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t border-slate-200 bg-[#0a3d91]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
        {/* LEFT SECTION - BRAND WITH LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 text-white transition hover:opacity-80"
          aria-label="Desa Way Galih"
        >
          <Image
            src="/images/logo.png"
            alt="Logo Desa Way Galih"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-white/10 p-1"
          />
          <span className="text-lg font-semibold">Desa Way Galih</span>
        </Link>

        {/* RIGHT SECTION - COPYRIGHT */}
        <p className="text-xs text-slate-300 text-center sm:text-right">
          © {year} Pemerintahan Desa Way Galih. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
