"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import SKTMSPageContent from "@/src/components/sktms/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";

export default function SKTMSPage() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form berhasil dikirim! Data Anda sedang diproses.");
    router.push("/status");
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
