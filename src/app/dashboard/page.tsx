"use client";

import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/auth-context";
import { DashboardHeader, SummaryCards, StatsChart } from "@/src/components/dashboard";
import { type DashboardTabKey, type DashboardSummaryCard, type DashboardChartMap } from "@/src/lib/dashboard-data";
import { db } from "@/src/lib/firebase/init";
import { doc, getDoc, collection, onSnapshot, Timestamp } from "firebase/firestore";

const DEFAULT_TAB: DashboardTabKey = "harian";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTabKey>(DEFAULT_TAB);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [summaryData, setSummaryData] = useState<DashboardSummaryCard[]>([]);
  const [chartData, setChartData] = useState<DashboardChartMap>({
    harian: { labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"], data: [0, 0, 0, 0, 0, 0, 0] },
    mingguan: { labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"], data: [0, 0, 0, 0] },
    tahunan: { labels: ["2021", "2022", "2023", "2024", "2025"], data: [0, 0, 0, 0, 0] },
  });

  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().role === "admin") setIsAdmin(true);
        else {
          setIsAdmin(false);
          router.replace("/halaman-pengguna");
        }
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdminRole();
  }, [user, router]);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubscribe = onSnapshot(collection(db, "surat_pengajuan"), (snapshot) => {
      let totalBaru = 0;
      let totalSelesai = 0;
      let totalMenunggu = 0;

      const harian = [0, 0, 0, 0, 0, 0, 0];
      const mingguan = [0, 0, 0, 0];
      const tahunan = [0, 0, 0, 0, 0];
      const tahunLabels = [2021, 2022, 2023, 2024, 2025];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const status = data.status?.toLowerCase();

        if (status === "selesai") totalSelesai++;
        else if (status === "ditolak" || status === "diproses") totalMenunggu++;
        else totalBaru++;

        const t = data.tanggal_pengajuan;
        let date: Date | null = null;
        if (t instanceof Timestamp) date = t.toDate();
        else if (typeof t === "string") date = new Date(t);

        if (date) {
          const day = date.getDay();
          const index = day === 0 ? 6 : day - 1;
          harian[index]++;

          const week = Math.ceil(date.getDate() / 7) - 1;
          if (week >= 0 && week < 4) mingguan[week]++;

          const yearIdx = tahunLabels.indexOf(date.getFullYear());
          if (yearIdx !== -1) tahunan[yearIdx]++;
        }
      });

      setSummaryData([
        { label: "Pengajuan Baru", value: totalBaru, trend: "+update realtime" },
        { label: "Pengajuan Selesai", value: totalSelesai, trend: "+update realtime" },
        { label: "Menunggu Verifikasi", value: totalMenunggu, trend: "Perlu tindak lanjut" },
      ]);

      setChartData({
        harian: { labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"], data: harian },
        mingguan: { labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"], data: mingguan },
        tahunan: { labels: tahunLabels.map(String), data: tahunan },
      });
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace("/login");
  }, [logout, router]);

  if (!user)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Memuat akun...</p>
      </div>
    );

  if (isAdmin === null)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Memeriksa hak akses...</p>
      </div>
    );

  if (!isAdmin) return null;

  return (
    <>
      <Head>
        <title>Dashboard Admin | Desa Way Galih</title>
      </Head>
      <div className="min-h-screen bg-[#f4f6f9] text-slate-800">
        <DashboardHeader onLogout={handleLogout} />
        <main className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#1a3491] sm:text-3xl">Ringkasan Dashboard</h1>
              <p className="text-sm text-slate-500">Statistik pengajuan surat Desa Way Galih (Realtime)</p>
            </div>
          </div>
          <SummaryCards items={summaryData} />
          <StatsChart activeTab={activeTab} onTabChange={setActiveTab} dataset={chartData} />
        </main>
      </div>
    </>
  );
}
