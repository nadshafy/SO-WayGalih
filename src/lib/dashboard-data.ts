"use client";

import {
  collectionGroup,
  onSnapshot,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase/init";

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

export const DASHBOARD_TAB_ITEMS: DashboardTabItem[] = [
  { key: "harian", label: "Statistik Harian" },
  { key: "mingguan", label: "Statistik Mingguan" },
  { key: "tahunan", label: "Statistik Tahunan" },
];

export const DASHBOARD_SUMMARY: DashboardSummaryCard[] = [
  { label: "Pengajuan Baru", value: 0, trend: "" },
  { label: "Pengajuan Selesai", value: 0, trend: "" },
  { label: "Menunggu Verifikasi", value: 0, trend: "" },
];

export function subscribeDashboardSummary(
  callback: (data: DashboardSummaryCard[]) => void
) {
  const q = collectionGroup(db, "surat_pengajuan");

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      let totalBaru = 0;
      let totalSelesai = 0;
      let totalMenunggu = 0;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const status = (data.status || "").toLowerCase();

        if (status.includes("selesai")) {
          totalSelesai++;
        } else if (status.includes("ditolak")) {
          totalMenunggu++;
        } else {
          totalMenunggu++; 
        }
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

export async function getDashboardDataset(): Promise<DashboardChartMap> {
  const snapshot = await getDocs(collectionGroup(db, "surat_pengajuan"));
  const docs = snapshot.docs.map((d) => d.data());

  const hariLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const harian = new Array(7).fill(0);

  docs.forEach((d) => {
    const t = d.tanggal_pengajuan;
    if (t instanceof Timestamp) {
      const date = t.toDate();
      const day = date.getDay();
      const index = day === 0 ? 6 : day - 1;
      harian[index]++;
    }
  });

  const mingguan = [harian.reduce((a, b) => a + b, 0)];
  while (mingguan.length < 4) mingguan.push(0);

  const tahunan = [docs.length];
  while (tahunan.length < 5) tahunan.push(0);

  return {
    harian: { labels: hariLabels, data: harian },
    mingguan: {
      labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
      data: mingguan,
    },
    tahunan: {
      labels: ["2021", "2022", "2023", "2024", "2025"],
      data: tahunan,
    },
  };
}
