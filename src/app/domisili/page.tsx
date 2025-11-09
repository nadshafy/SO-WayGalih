"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import DomisiliPageContent from "@/src/components/domisili/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";
import { db } from "@/src/lib/firebase/init"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function DomisiliPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const nik = data.nik as string;
    if (!/^[0-9]{16}$/.test(nik)) {
      alert("NIK tidak valid! NIK harus terdiri dari 16 digit angka.");
      return;
    }

    const ponsel = data.ponsel as string;
    if (!/^08[0-9]{9,11}$/.test(ponsel)) {
      alert("Nomor ponsel tidak valid! Format: 08xxxxxxxxxx");
      return;
    }

    try {
      await addDoc(collection(db, "surat_domisili"), {
        ...data,
        jenisSurat: "domisili",
        status: "diproses",
        tanggal_pengajuan: serverTimestamp(),
      });


      const response = await fetch("/api/surat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          suratType: "domisili",
          formData: data,
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data ke server (API)");

      const result = await response.json();
      console.log("Response:", result);

      alert("Form berhasil dikirim! Data Anda sedang diproses.");
      router.push("/status");
      
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  return (
    <>
      <Head>
        <title>Form Surat Keterangan Domisili - Desa Way Galih</title>
      </Head>

      <AuthGuard redirectIfAdmin="/dashboard">
        <DomisiliPageContent onSubmit={handleSubmit} />
        <Footer />
      </AuthGuard>
    </>
  );
}