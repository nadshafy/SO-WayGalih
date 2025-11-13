"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import DomisiliPageContent from "@/src/components/domisili/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";
import { db } from "@/src/lib/firebase/init"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toBase64 } from "@/src/lib/file";

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

    const file = formData.get("file") as File | null;
    const dataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (key !== "file") dataObj[key] = value.toString();
    });

    const base64File = file ? await toBase64(file) : null;

    const payload = {
      ...dataObj,
      jenisSurat: "domisili",
      fileName: file?.name || "",
      fileData: base64File,
    };

    try {
      await addDoc(collection(db, "surat_pengajuan"), {
        ...dataObj,
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
          formData: payload,
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
