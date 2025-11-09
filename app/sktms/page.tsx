"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import SKTMSPageContent from "@/components/sktms/page-content";

export default function SKTMSPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ambil semua data dari form
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // ✅ Kirim data ke route lokal Next.js
      const response = await fetch("/script/surat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          jenisSurat: "sktms", // penting agar Apps Script tahu ini SKTM Sekolah
        }),
      });

      if (!response.ok) throw new Error("Gagal mengirim data ke server");

      const result = await response.json();
      console.log("Response dari server:", result);

      alert("Form berhasil dikirim! Data Anda sedang diproses.");
      router.push("/status");
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi nanti.");
    }
  };

  return (
    <>
      <Head>
        <title>Form SKTM Sekolah - Desa Way Galih</title>
      </Head>

      <SKTMSPageContent onSubmit={handleSubmit} />
      <Footer />
    </>
  );
}
