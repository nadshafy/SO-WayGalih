"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import AsalUsulPageContent from "@/components/asal-usul/page-content";

export default function AsalUsulPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form berhasil dikirim! Data Anda sedang diproses.");
    router.push("/status");
  };

  return (
    <>
      <Head>
        <title>Form Surat Asal-Usul Keluarga - Desa Way Galih</title>
      </Head>

      <AsalUsulPageContent onSubmit={handleSubmit} />
      <Footer />
    </>
  );
}
