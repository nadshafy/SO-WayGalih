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

    // 🧩 Validate NIK
    const nik = data.nik as string;
    if (!/^[0-9]{16}$/.test(nik)) {
      alert("NIK tidak valid! NIK harus terdiri dari 16 digit angka.");
      return;
    }

    // 🧩 Validate phone number
    const ponsel = data.ponsel as string;
    if (!/^08[0-9]{9,11}$/.test(ponsel)) {
      alert("Nomor ponsel tidak valid! Format: 08xxxxxxxxxx");
      return;
    }

    // 🧩 Convert file to base64 helper
    async function toBase64(file: File) {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    }

    // 🧩 Collect non-file inputs
    const dataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (!(value instanceof File)) {
        dataObj[key] = value.toString();
      }
    });

    // 🧩 Convert each uploaded file
    const fileFields = ["ktp", "kk", "pengantar_rt"];
    for (const field of fileFields) {
      const file = formData.get(field) as File | null;
      if (file && file.name) {
        const base64 = await toBase64(file);
        // remove "data:application/pdf;base64," prefix
        const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
        dataObj[`${field}FileName`] = file.name;
        dataObj[`${field}FileData`] = cleanBase64;
      }
    }

    // 🧩 Add type of letter
    dataObj["jenisSurat"] = "domisili";

    try {
      // --- Save to Firestore
      await addDoc(collection(db, "surat_pengajuan"), {
        ...dataObj,
        jenisSurat: "domisili",
        status: "diproses",
        tanggal_pengajuan: serverTimestamp(),
      });

      // --- Send to backend API
      const response = await fetch("/api/surat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suratType: "domisili",
          formData: dataObj,
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data ke server (API)");

      const result = await response.json();
      console.log("Response dari Apps Script:", result);

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
