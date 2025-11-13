"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Footer from "@/src/components/footer";
import StatusPageContent from "@/src/components/status/page-content";

import { STATUS_DESCRIPTIONS, generateTimeline } from "@/src/lib/status-data";
import { getPengajuanData } from "@/src/lib/pengajuan";
import type { TimelineItemType } from "@/src/lib/status-data";

export default function StatusPage() {
  const [timeline, setTimeline] = useState<TimelineItemType[]>([]);
  const id = ""; // nanti pakai dynamic route

  useEffect(() => {
    async function load() {
      if (!id) return;

      const semuaData = await getPengajuanData();
      const found = semuaData.find((item) => item.id === id);

      if (!found) return;

      const hasilTimeline = generateTimeline(
        found.status,
        found.tanggal_pengajuan
      );

      setTimeline(hasilTimeline);
    }

    load();
  }, [id]);

  return (
    <>
      <Head>
        <title>Status Pengajuan Surat - Desa Way Galih</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <StatusPageContent
        id={id}
        items={timeline}
        descriptions={STATUS_DESCRIPTIONS}
      />

      <Footer />
    </>
  );
}
