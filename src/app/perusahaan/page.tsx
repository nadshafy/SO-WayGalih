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
    if (value instanceof File) return; // ← filter semua file!
    dataObj[key] = value.toString();
  });

  const ktpFile = formData.get("ktp_pendirian") as File | null;
  const aktaFile = formData.get("akta_pendirian") as File | null;

  const ktpBase64 = ktpFile ? await toBase64(ktpFile) : null;
  const aktaBase64 = aktaFile ? await toBase64(aktaFile) : null;

  const payload = {
    ...dataObj,
    jenisSurat: "perusahaan",
    ktpFileName: ktpFile?.name || "",
    aktaFileName: aktaFile?.name || "",
    ktpFileData: ktpBase64,
    aktaFileData: aktaBase64,
  };

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
        formData: payload,
      }),
    });

    if (!response.ok) throw new Error("Gagal menyimpan data ke server.");

    alert("Form berhasil dikirim!");
    router.push("/status");
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
