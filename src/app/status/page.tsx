"use client";

import Head from "next/head";
import Footer from "@/src/components/footer";
import StatusPageContent from "@/src/components/status/page-content";
import { STATUS_DESCRIPTIONS, TIMELINE_ITEMS } from "@/src/lib/status-data";

export default function StatusPage() {
  // Jika belum ada ID (misalnya ini halaman utama /status tanpa ID)
  const id = ""; // atau bisa null

  return (
    <>
      <Head>
        <title>Status Pengajuan Surat - Desa Way Galih</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Kirim id agar props lengkap */}
      <StatusPageContent
        id={id}
        items={TIMELINE_ITEMS}
        descriptions={STATUS_DESCRIPTIONS}
      />

      <Footer />
    </>
  );
}
