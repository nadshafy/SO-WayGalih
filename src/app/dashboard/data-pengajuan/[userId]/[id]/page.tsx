"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase/init";
import PengajuanDetail from "@/src/components/dashboard/data-pengajuan/detail-page";

export default function PengajuanDetailPage() {
  const { userId, id } = useParams() as { userId: string; id: string };

  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const ref = doc(db, "users", userId, "surat_pengajuan", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setDetail({ id: snap.id, ...snap.data() });
        } else {
          setError("Data tidak ditemukan");
        }
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId && id) fetchDetail();
  }, [userId, id]);

  if (loading) return <p className="text-center p-8">Memuat data...</p>;
  if (error) return <p className="text-center text-red-500 p-8">{error}</p>;
  if (!detail) return <p className="text-center p-8">Data tidak ditemukan.</p>;

  const statusLabel = detail.status || "Menunggu verifikasi";

  return <PengajuanDetail detail={detail} statusLabel={statusLabel} />;
}
