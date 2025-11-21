"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase/init";
import PengajuanDetail from "@/src/components/dashboard/data-pengajuan/detail-page";

export default function PengajuanDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const userId = params?.userId as string;

  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const docRef = doc(db, "users", userId, "surat_pengajuan", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetail({ id: docSnap.id, ...docSnap.data() });
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

    if (id && userId) fetchDetail();
  }, [id, userId]);

  if (loading) return <p className="text-center p-8">Memuat data...</p>;
  if (error) return <p className="text-center text-red-500 p-8">{error}</p>;
  if (!detail) return <p className="text-center p-8">Data tidak ditemukan.</p>;

  const statusLabel = detail.status || "Menunggu verifikasi";

  return <PengajuanDetail detail={detail} statusLabel={statusLabel} />;
}
