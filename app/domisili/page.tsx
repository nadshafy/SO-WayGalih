"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import DomisiliPageContent from "@/components/domisili/page-content";

export default function DomisiliPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const nik = formData.get("nik") as string;
    if (!/^[0-9]{16}$/.test(nik)) {
      alert("NIK tidak valid! NIK harus terdiri dari 16 digit angka.");
      return;
    }

    const ponsel = formData.get("ponsel") as string;
    if (!/^08[0-9]{9,11}$/.test(ponsel)) {
      alert("Nomor ponsel tidak valid! Format: 08xxxxxxxxxx");
      return;
    }

    alert("Form berhasil dikirim! Data Anda sedang diproses.");
    router.push("/status");
  };

  return (
    <>
      <Head>
        <title>Form Surat Keterangan Domisili - Desa Way Galih</title>
      </Head>

      <DomisiliPageContent onSubmit={handleSubmit} />
      <Footer />
    </>
  );
}
