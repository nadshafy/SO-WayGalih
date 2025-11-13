"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import AsalUsulPageContent from "@/src/components/asal-usul/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";
import { db } from "@/src/lib/firebase/init"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toBase64 } from "@/src/lib/file";

export default function AsalUsulPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File | null;
    const dataObj: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (key !== "file") dataObj[key] = value.toString();
    });

    const base64File = file ? await toBase64(file) : null;

    const payload = {
      ...dataObj,
      jenisSurat: "asal-usul",
      fileName: file?.name || "",
      fileData: base64File,
    };

    try {
      await addDoc(collection(db, "surat_pengajuan"), { 
        ...dataObj,
        jenisSurat: "asal-usul", 
        status: "diproses",
        tanggal_pengajuan: serverTimestamp(),
      });

      const response = await fetch("/api/surat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suratType: "asal-usul", 
          formData: payload,   
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim data ke server (API).");
      }

      const result = await response.json();
      console.log("Response dari server:", result);

      alert("Form berhasil dikirim! Data Anda sedang diproses.");
      router.push("/status");

    } catch (err) {
      console.error("Gagal mengirim data:", err);
      alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi nanti.");
    }
  };

  return (
    <>
      <Head>
        <title>Form Surat Asal-Usul Keluarga - Desa Way Galih</title>
      </Head>

      <AuthGuard redirectIfAdmin="/dashboard">
        <AsalUsulPageContent onSubmit={handleSubmit} />
        <Footer />
      </AuthGuard>
    </>
  );
}