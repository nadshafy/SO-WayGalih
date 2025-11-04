"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import SKTMPageContent from "@/components/sktm/page-content";

export default function SKTMPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form berhasil dikirim! Data Anda sedang diproses.");
    router.push("/status");
  };

  return (
    <>
      <Head>
        <title>Form SKTM - Desa Way Galih</title>
      </Head>

      <SKTMPageContent onSubmit={handleSubmit} />
      <Footer />
    </>
  );
}
