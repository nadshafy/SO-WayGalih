"use client";

import type { FormEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Footer from "@/src/components/footer";
import SKTMPageContent from "@/src/components/sktm/page-content";
import AuthGuard from "@/src/components/auth/auth-guard";

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

      <AuthGuard redirectIfAdmin="/dashboard">
        <SKTMPageContent onSubmit={handleSubmit} />
        <Footer />
      </AuthGuard>
    </>
  );
}
