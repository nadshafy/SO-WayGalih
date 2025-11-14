"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import PerusahaanPageContent from "@/src/components/perusahaan/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";
import { db } from "@/src/lib/firebase/init";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toBase64 } from "@/src/lib/file";

export default function PerusahaanPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const dataObj: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (value instanceof File) return;
      dataObj[key] = value.toString();
    });

    const ktpFile = formData.get("ktp_pendirian") as File | null;
    const aktaFile = formData.get("akta_pendirian") as File | null;

    if (ktpFile && ktpFile.name) {
      const base64 = await toBase64(ktpFile);
      const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
      
      dataObj["ktp_pendiriFileName"] = ktpFile.name;
      dataObj["ktp_pendiriFileData"] = cleanBase64;
    }

    if (aktaFile && aktaFile.name) {
      const base64 = await toBase64(aktaFile);
      const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
      
      dataObj["akta_lembagaFileName"] = aktaFile.name;
      dataObj["akta_lembagaFileData"] = cleanBase64;
    }
    
    
    try {
      await addDoc(collection(db, "surat_pengajuan"), {
        ...dataObj,
        jenisSurat: "perusahaan",
        status: "diproses",
        tanggal_pengajuan: serverTimestamp(),
      });

      const response = await fetch("/api/surat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suratType: "perusahaan",
          formData: dataObj, 
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data ke server.");

      alert("Form berhasil dikirim!");
      // router.push("/status");
      router.push("/halaman-pengguna");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan, coba lagi nanti.");
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