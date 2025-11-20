"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import SKTMSPageContent from "@/src/components/sktms/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";
import { db } from "@/src/lib/firebase/init";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toBase64 } from "@/src/lib/file";
import { useAuth } from "@/src/contexts/auth-context";

export default function SKTMSPage() {
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

    const fileFields = ["ktp", "kk", "pengantar_rt", "surat_keterangan"];

    for (const field of fileFields) {
      const file = formData.get(field) as File | null;
      if (file && file.name) {
        const base64 = await toBase64(file);
        const cleanBase64 = base64.includes(",")
          ? base64.split(",")[1]
          : base64;

        dataObj[`${field}FileData`] = cleanBase64;
        dataObj[`${field}FileName`] = file.name;
      }
    }

    try {

      await addDoc(collection(db, "users", user.uid, "surat_pengajuan"), {
        uid: user.uid,
        jenisSurat: "Surat Keterangan Tidak Mampu (SKTM) Sekolah",
        status: "diproses",
        tanggal_pengajuan: serverTimestamp(),
        jumlahPengajuan: 1,
        catatan: "",

        lampiran: [
          {
            label: "KTP",
            url: dataObj["ktpFileData"] || "",
            fileName: dataObj["ktpFileName"] || "",
          },
          {
            label: "KK",
            url: dataObj["kkFileData"] || "",
            fileName: dataObj["kkFileName"] || "",
          },
          {
            label: "Pengantar RT",
            url: dataObj["pengantar_rtFileData"] || "",
            fileName: dataObj["pengantar_rtFileName"] || "",
          },
          {
            label: "Surat Keterangan Sekolah",
            url: dataObj["surat_keteranganFileData"] || "",
            fileName: dataObj["surat_keteranganFileName"] || "",
          },
        ],

        ...dataObj,
      });

      const response = await fetch("/api/surat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suratType: "sktms",
          formData: dataObj,
          uid: user.uid,
        }),
      });

      if (!response.ok) throw new Error("Gagal mengirim data ke server");

      await response.json();

      alert("Form berhasil dikirim! Data Anda sedang diproses.");
      router.push("/halaman-pengguna");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi nanti.");
    }
  };

  return (
    <>
      <Head>
        <title>Form SKTM Sekolah - Desa Way Galih</title>
      </Head>

      <AuthGuard redirectIfAdmin="/dashboard">
        <SKTMSPageContent onSubmit={handleSubmit} />
        <Footer />
      </AuthGuard>
    </>
  );
}
