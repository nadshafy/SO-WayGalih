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
    const dataObj: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (!(value instanceof File)) {
        dataObj[key] = value.toString();
      }
    });

    const file = formData.get("file") as File | null;

    if (file && file.name) {
      const base64File = await toBase64(file);
      const cleanBase64 = base64File.includes(",")
        ? base64File.split(",")[1]
        : base64File;

      const fieldName = "pengantar_rt";

      dataObj[`${fieldName}FileName`] = file.name;
      dataObj[`${fieldName}FileData`] = cleanBase64;
    }

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
          formData: dataObj,
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