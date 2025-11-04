"use client";

import Head from "next/head";
import Footer from "@/components/footer";
import LoggedInHero from "@/components/halaman-pengguna/hero-section";
import LetterLinks from "@/components/halaman-pengguna/letter-links";
import StepsGrid from "@/components/shared/steps-grid";
import { HOME_STEPS } from "@/lib/home-data";

const LETTER_LINKS = [
  { href: "/domisili", label: "Surat Keterangan Domisili" },
  { href: "/perusahaan", label: "Surat Keterangan Domisili Perusahaan" },
  { href: "/sktm", label: "Surat Keterangan Tidak Mampu (SKTM)" },
  {
    href: "/sktms",
    label: "Surat Keterangan Tidak Mampu (SKTM) Sekolah",
  },
  {
    href: "/asal-usul",
    label: "Surat Keterangan Asal-Usul Keluarga",
  },
];

export default function LoggedIn() {
  return (
    <>
      <Head>
        <title>Website Administrasi Desa Way Galih</title>
        <meta
          name="description"
          content="Layanan administrasi surat menyurat Desa Way Galih secara online."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#f4f6f9] text-slate-800">
        <LoggedInHero />
        <main>
          <StepsGrid steps={HOME_STEPS} />
          <LetterLinks items={LETTER_LINKS} />
        </main>
        <Footer />
      </div>
    </>
  );
}
