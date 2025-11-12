// src/lib/dashboard-data.ts
"use client";

import {
  collection,
  onSnapshot,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase/init";

/* ---------------------- types ---------------------- */
export type DashboardTabKey = "harian" | "mingguan" | "tahunan";

export type DashboardTabItem = {
  key: DashboardTabKey;
  label: string;
};

export type DashboardChartSlice = {
  labels: string[];
  data: number[];
};

export type DashboardChartMap = Record<DashboardTabKey, DashboardChartSlice>;

export type DashboardSummaryCard = {
  label: string;
  value: number;
  trend?: string;
};

/* ---------------------- static (backwards compatible) ---------------------- */
/**
 * Supaya import lama seperti `DASHBOARD_DATASET` tetap valid,
 * kita pertahankan konstanta statis ini. Kamu boleh pakai ini
 * sebagai fallback jika belum ada dataset realtime.
 */
export const DASHBOARD_TAB_ITEMS: DashboardTabItem[] = [
  { key: "harian", label: "Statistik Harian" },
  { key: "mingguan", label: "Statistik Mingguan" },
  { key: "tahunan", label: "Statistik Tahunan" },
];

export const DASHBOARD_DATASET: DashboardChartMap = {
  harian: {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    data: [80, 65, 100, 75, 90, 55, 70],
  },
  mingguan: {
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    data: [350, 420, 480, 520],
  },
  tahunan: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    data: [400, 460, 530, 590, 640],
  },
};

export const DASHBOARD_SUMMARY: DashboardSummaryCard[] = [
  { label: "Pengajuan Baru", value: 0, trend: "" },
  { label: "Pengajuan Selesai", value: 0, trend: "" },
  { label: "Menunggu Verifikasi", value: 0, trend: "" },
];

/* ---------------------- firestore helpers ---------------------- */

/**
 * Subscribe to realtime summary counts in `surat_pengajuan`.
 * callback will receive DashboardSummaryCard[] on every change.
 * Returns unsubscribe function.
 */
export function subscribeDashboardSummary(
  callback: (data: DashboardSummaryCard[]) => void
) {
  const q = collection(db, "surat_pengajuan");

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      let totalBaru = 0;
      let totalSelesai = 0;
      let totalMenunggu = 0;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const status = (data.status || "").toString().toLowerCase();

        if (status === "selesai") totalSelesai++;
        else if (status === "ditolak") totalMenunggu++;
        else if (status === "diproses" || status === "menunggu") totalMenunggu++;
        else totalBaru++;
      });

      const payload: DashboardSummaryCard[] = [
        { label: "Pengajuan Baru", value: totalBaru, trend: "+ realtime" },
        { label: "Pengajuan Selesai", value: totalSelesai, trend: "+ realtime" },
        { label: "Menunggu Verifikasi", value: totalMenunggu, trend: "+ realtime" },
      ];

      callback(payload);
    },
    (err) => {
      console.error("subscribeDashboardSummary error:", err);
    }
  );

  return unsubscribe;
}

/**
 * One-time fetch for chart dataset. Converts tanggal_pengajuan timestamps
 * into counts per weekday for 'harian'. You can call this on mount.
 */
export async function getDashboardDataset(): Promise<DashboardChartMap> {
  const snapshot = await getDocs(collection(db, "surat_pengajuan"));
  const docs = snapshot.docs.map((d) => d.data());

  // prepare harian
  const hariLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const harian = new Array(7).fill(0);

  docs.forEach((d) => {
    const t = d.tanggal_pengajuan;
    if (t instanceof Timestamp) {
      const date = t.toDate();
      const day = date.getDay(); // 0 = Sun, 1 = Mon, ...
      const index = day === 0 ? 6 : day - 1; // make Monday index 0
      harian[index] = (harian[index] || 0) + 1;
    }
  });

  // Simple placeholder for mingguan/tahunan — bisa di-improve
  const mingguan = [harian.reduce((a, b) => a + b, 0)];
  while (mingguan.length < 4) mingguan.push(0);

  const tahunan = [docs.length];
  while (tahunan.length < 5) tahunan.push(0);

  return {
    harian: { labels: hariLabels, data: harian },
    mingguan: { labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"], data: mingguan },
    tahunan: { labels: ["2021", "2022", "2023", "2024", "2025"], data: tahunan },
  };
}
