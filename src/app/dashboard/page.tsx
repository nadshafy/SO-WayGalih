"use client";

import { useState, useCallback, useEffect } from "react";
import {
  DASHBOARD_DATASET,
  DASHBOARD_SUMMARY,
  type DashboardTabKey,
} from "@/src/lib/dashboard-data";
import Head from "next/head";
import { useRouter } from "next/navigation";

import {
  DashboardHeader,
  StatsChart,
  SummaryCards,
} from "@/src/components/dashboard";
import { useAuth } from "@/src/contexts/auth-context";

const DEFAULT_TAB: DashboardTabKey = "harian";

// UID admin kamu
const ADMIN_UID = "CfLWcqwwaTb3zoC0oS0ckXh4sjV2";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTabKey>(DEFAULT_TAB);
  const router = useRouter();
  const { user, logout } = useAuth(); // ambil data user dari context

  // Cek role user setelah login
  useEffect(() => {
    if (!user) return; // kalau belum login, tunggu

    if (user.uid !== ADMIN_UID) {
      console.warn("⛔ Bukan admin, diarahkan ke halaman pengguna...");
      router.replace("/halaman-pengguna");
    } else {
      console.log("✅ Admin terdeteksi, tampilkan dashboard.");
    }
  }, [user, router]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace("/login");
  }, [logout, router]);

  // Kalau belum login, tampilkan loading sementara
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Memuat...</p>
      </div>
    );
  }

  // Kalau bukan admin, jangan render dashboard (biar tidak kedip)
  if (user.uid !== ADMIN_UID) return null;

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
              <h1 className="text-2xl font-semibold text-[#1a3491] sm:text-3xl">
                Ringkasan Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Statistik pengajuan surat Desa Way Galih
              </p>
            </div>
          </div>

          <SummaryCards items={DASHBOARD_SUMMARY} />

          <StatsChart
            activeTab={activeTab}
            onTabChange={setActiveTab}
            dataset={DASHBOARD_DATASET}
          />
        </main>
      </div>
    </>
  );
}
