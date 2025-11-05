"use client";

import Head from "next/head";
import Footer from "@/src/components/footer";
import HeroSection from "@/src/components/home/hero-section";
import StepsGrid from "@/src/components/shared/steps-grid";
import { HOME_STEPS } from "@/src/lib/home-data";

export default function Home() {
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

      <div className="min-h-screen bg-[#f4f6f9]">
        <HeroSection />
        <main>
          <StepsGrid steps={HOME_STEPS} />
        </main>
      </div>
      <Footer />
    </>
  );
}
