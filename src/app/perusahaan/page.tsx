"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import PerusahaanPageContent from "@/src/components/perusahaan/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";
import { db } from "@/src/lib/firebase/init"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function PerusahaanPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await addDoc(collection(db, "surat_pengajuan"), {
        ...data,
        jenisSurat: "domisili",
        status: "diproses",
        tanggal_pengajuan: serverTimestamp(),
      });

      const response = await fetch("/script/surat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          jenisSurat: "perusahaan",
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data");

      const result = await response.json();
      console.log("Response:", result);

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
        <title>Form Surat Domisili Perusahaan - Desa Way Galih</title>
      </Head>

      <AuthGuard redirectIfAdmin="/dashboard">
        <PerusahaanPageContent onSubmit={handleSubmit} />
        <Footer />
      </AuthGuard>
    </>
  );
}
