"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/src/lib/firebase/init";
import Footer from "@/src/components/footer";
import AuthGuard from "@/src/components/auth/auth-guard";
import { useAuth } from "@/src/components/auth/useAuth"; 

type ArchiveItem = {
  id: string;
  tanggal: string;
  jenisSurat: string;
  jumlahPengajuan: number;
  statusPengajuan: "diproses" | "ditolak" | "selesai";
  catatan?: string;
};

const STATUS_CONFIG: Record<
  ArchiveItem["statusPengajuan"],
  { label: string; bg: string; text: string }
> = {
  diproses: {
    label: "Sedang Diproses",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  ditolak: {
    label: "Ditolak",
    bg: "bg-rose-100",
    text: "text-rose-700",
  },
  selesai: {
    label: "Selesai",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
};

export default function ArchivePage() {
  const { user } = useAuth();
  const [archive, setArchive] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "pengajuanSurat"),
          where("userId", "==", user.uid),
          orderBy("tanggal", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data: ArchiveItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ArchiveItem, "id">),
        }));
        setArchive(data);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <Head>
        <title>Arsip Dokumen - Desa Way Galih</title>
      </Head>

      <AuthGuard redirectIfAdmin="/dashboard">
        <div className="flex min-h-screen flex-col bg-[#f4f6f9] text-slate-800">
          <Link
            href="/halaman-pengguna"
            aria-label="Kembali"
            className="fixed left-3 top-3 z-50 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-[#0a3d91] shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40 sm:left-6 sm:top-6"
          >
            ← <span className="hidden sm:inline">Kembali</span>
          </Link>

          <header className="bg-gradient-to-br from-[#1a3491] to-[#0a3d91] text-white">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
              <h1 className="text-xl font-semibold">Riwayat Pengajuan Surat</h1>
              <p className="text-sm text-white/90">
                Layanan pengurusan surat secara online - mudah & cepat.
              </p>
            </div>
          </header>

          <main className="mx-auto mt-6 flex w-full flex-1 justify-center px-4 sm:px-6">
            <div className="my-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
              <div className="px-5 pb-4 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Riwayat Pengajuan Terbaru
                </h2>
              </div>

              {loading ? (
                <div className="p-8 text-center text-slate-500">Memuat data...</div>
              ) : archive.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  Belum ada riwayat pengajuan surat.
                </div>
              ) : (
                <div className="custom-scrollbar w-full overflow-x-auto border-t border-slate-100">
                  <table className="w-full min-w-[720px] table-auto border-collapse text-left text-sm text-slate-700 sm:text-base">
                    <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                      <tr>
                        <th className="px-6 py-4">Tanggal</th>
                        <th className="px-6 py-4">Jenis Surat</th>
                        <th className="px-6 py-4 text-center">Jumlah</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Catatan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {archive.map((item) => (
                        <tr key={item.id} className="align-top hover:bg-slate-50/60">
                          <td className="px-6 py-4">{item.tanggal}</td>
                          <td className="px-6 py-4">{item.jenisSurat}</td>
                          <td className="px-6 py-4 text-center">{item.jumlahPengajuan}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_CONFIG[item.statusPengajuan].bg} ${STATUS_CONFIG[item.statusPengajuan].text}`}
                            >
                              {STATUS_CONFIG[item.statusPengajuan].label}
                            </span>
                          </td>
                          <td className="px-6 py-4">{item.catatan ?? "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>

          <Footer />
        </div>
      </AuthGuard>
    </>
  );
}
