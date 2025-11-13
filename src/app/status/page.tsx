"use client"; // 1. WAJIB ditambahkan karena menggunakan hooks

import { useState, useEffect } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation"; // 2. Impor useSearchParams
import Footer from "@/src/components/footer";
import StatusPageContent from "@/src/components/status/page-content";

import {
  generateTimeline,
  STATUS_DESCRIPTIONS,
  type TimelineItemType,
} from "@/src/lib/status-data";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase/init";

// 3. Hapus searchParams dari props
export default function StatusPage() {
  // 4. Gunakan hook untuk mendapatkan searchParams
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || ""; // 5. Ambil 'id' dari hook

  const [items, setItems] = useState<TimelineItemType[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert Firestore Timestamp → tanggal string
  const formatTanggal = (timestamp: any) => {
    if (!timestamp || typeof timestamp.toDate !== "function") {
      return "Belum tersedia";
    }
    const date = timestamp.toDate();
    return (
      date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    );
  };

  // Fetch Firestore
  useEffect(() => {
    async function fetchData() {
      if (!id) {
        setItems(generateTimeline("menunggu", ""));
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, "surat_pengajuan", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setItems(generateTimeline("menunggu", ""));
          setLoading(false);
          return;
        }

        const data = snap.data();

        const tanggal = formatTanggal(data.tanggal_pengajuan);
        const status = data.status ?? "menunggu";

        const timeline = generateTimeline(status, tanggal);
        setItems(timeline);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        // Pindahkan setLoading(false) ke 'finally' agar selalu tereksekusi
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f9]">
        <div className="p-6 text-center text-slate-500">Memuat Status…</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Status Pengajuan Surat - Desa Way Galih</title>
      </Head>

      <StatusPageContent
        id={id}
        items={items}
        descriptions={STATUS_DESCRIPTIONS}
      />

      <Footer />
    </>
  );
}