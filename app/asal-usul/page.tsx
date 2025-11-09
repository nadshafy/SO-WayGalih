"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import AsalUsulPageContent from "@/components/asal-usul/page-content";

export default function AsalUsulPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const dataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      dataObj[key] = value.toString();
    });

    try {
      const res = await fetch("/api/surat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suratType: "asal-usul", 
          formData: dataObj,   
        }),
      });

      const result = await res.json();

      if (result.status === "success") {
        alert("Data berhasil dikirim ke Spreadsheet!");
        router.push("/status");
      } else {
        alert("Gagal mengirim data: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <>
      <Head>
        <title>Form Surat Asal-Usul Keluarga - Desa Way Galih</title>
      </Head>

      <AsalUsulPageContent onSubmit={handleSubmit} />
      <Footer />
    </>
  );
}
