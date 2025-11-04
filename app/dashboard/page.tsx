"use client";

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

import {
  DashboardHeader,
  StatsChart,
  SummaryCards,
} from "@/components/dashboard";
import {
  DASHBOARD_DATASET,
  DASHBOARD_SUMMARY,
  type DashboardTabKey,
} from "@/lib/dashboard-data";

const DEFAULT_TAB: DashboardTabKey = "harian";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTabKey>(DEFAULT_TAB);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

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
