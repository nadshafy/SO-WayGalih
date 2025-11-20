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
import { useAuth } from "@/src/contexts/auth-context";

export default function PerusahaanPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      alert("Anda harus login terlebih dahulu sebelum mengajukan surat.");
      router.push("/login");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const dataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (!(value instanceof File)) {
        dataObj[key] = value.toString();
      }
    });

    const fileFields = ["ktp_pendiri", "akta_lembaga"];

    for (const field of fileFields) {
      const file = formData.get(field) as File | null;

      if (file && file.name) {
        const base64 = await toBase64(file);
        const cleanBase64 =
          base64.includes(",") ? base64.split(",")[1] : base64;

        dataObj[`${field}FileData`] = cleanBase64;
        dataObj[`${field}FileName`] = file.name;
      }
    }

    dataObj["jenisSurat"] = "perusahaan";

    try {
  
      await addDoc(collection(db, "users", user.uid, "surat_pengajuan"), {
        uid: user.uid,
        jenisSurat: "Surat Domisili Perusahaan",
        status: "diproses",
        tanggal_pengajuan: serverTimestamp(),
        jumlahPengajuan: 1,
        catatan: "",

        lampiran: [
          {
            label: "KTP Pendiri",
            url: dataObj["ktp_pendiriFileData"] || "",
            fileName: dataObj["ktp_pendiriFileName"] || "",
          },
          {
            label: "Akta Lembaga",
            url: dataObj["akta_lembagaFileData"] || "",
            fileName: dataObj["akta_lembagaFileName"] || "",
          },
        ],

        ...dataObj,
      });

      const response = await fetch("/api/surat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suratType: "perusahaan",
          formData: dataObj,
          uid: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim data ke API");
      }

      alert("Form berhasil dikirim! Data Anda sedang diproses.");
      router.push("/halaman-pengguna");
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
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
