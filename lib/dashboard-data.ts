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
  { label: "Pengajuan Baru", value: 38, trend: "+6.4% dari minggu lalu" },
  { label: "Pengajuan Selesai", value: 27, trend: "+3 kasus terselesaikan" },
  { label: "Menunggu Verifikasi", value: 11, trend: "Perlu tindak lanjut" },
];
