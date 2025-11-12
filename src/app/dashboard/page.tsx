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

import { db } from "@/src/lib/firebase/init";
import { doc, getDoc } from "firebase/firestore";

const DEFAULT_TAB: DashboardTabKey = "harian";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTabKey>(DEFAULT_TAB);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.role === "admin") {
            console.log("Admin terdeteksi.");
            setIsAdmin(true);
          } else {
            console.warn("Bukan admin, diarahkan ke halaman pengguna...");
            setIsAdmin(false);
            router.replace("/halaman-pengguna");
          }
        } else {
          console.warn("Data user tidak ditemukan.");
          setIsAdmin(false);
          router.replace("/halaman-pengguna");
        }
      } catch (error) {
        console.error("Gagal memeriksa role admin:", error);
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, [user, router]);

  const handleLogout = useCallback(async () => {
    await logout();
    router.replace("/login");
  }, [logout, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Memuat akun...</p>
      </div>
    );
  }

  if (isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Memeriksa hak akses...</p>
      </div>
    );
  }

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
