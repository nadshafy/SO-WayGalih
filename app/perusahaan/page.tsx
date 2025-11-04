"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import PerusahaanPageContent from "@/components/perusahaan/page-content";

export default function PerusahaanPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form berhasil dikirim! Data Anda sedang diproses.");
    router.push("/status");
  };

  return (
    <>
      <Head>
        <title>Form Surat Domisili Perusahaan - Desa Way Galih</title>
      </Head>

      <PerusahaanPageContent onSubmit={handleSubmit} />
      <Footer />
    </>
  );
}
