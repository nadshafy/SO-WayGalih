"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import SKTMPageContent from "@/src/components/sktm/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";
import { db } from "@/src/lib/firebase/init";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function SKTMPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await addDoc(collection(db, "surat_sktm"), {
        ...data,
        jenisSurat: "sktm",
        status: "diproses",
        tanggal_pengajuan: serverTimestamp(),
      });

      const response = await fetch("/api/surat", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          suratType: "sktm",
          formData: data,
        }),
      });

      if (!response.ok) throw new Error("Gagal mengirim data ke server (API).");

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
        <title>Form SKTM - Desa Way Galih</title>
      </Head>

      <AuthGuard redirectIfAdmin="/dashboard">
        <SKTMPageContent onSubmit={handleSubmit} />
        <Footer />
      </AuthGuard>
    </>
  );
}