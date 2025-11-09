"use client";

import Head from "next/head";
import Footer from "@/src/components/footer";
import StatusPageContent from "@/src/components/status/page-content";
import { STATUS_DESCRIPTIONS, TIMELINE_ITEMS } from "@/src/lib/status-data";

export default function StatusPage() {
  return (
    <>
      <Head>
        <title>Status Pengajuan Surat - Desa Way Galih</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <StatusPageContent items={TIMELINE_ITEMS} descriptions={STATUS_DESCRIPTIONS} />
      <Footer />
    </>
  );
}
