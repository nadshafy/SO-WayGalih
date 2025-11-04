export type TimelineStatus = "completed" | "current" | "upcoming" | "rejected";

export type TimelineItemType = {
  title: string;
  timestamp: string;
  status: TimelineStatus;
  completedDescription?: string;
};

export const TIMELINE_ITEMS: TimelineItemType[] = [
  {
    title: "Surat berhasil diajukan",
    timestamp: "12 Oktober 2025 - 08:34 WIB",
    status: "completed",
    completedDescription:
      "Sistem telah menerima permohonan surat Anda dan sedang menunggu verifikasi awal.",
  },
  {
    title: "Surat sedang diproses",
    timestamp: "12 Oktober 2025 - 10:12 WIB",
    status: "completed",
    completedDescription:
      "Sedang dalam proses verifikasi. Kepala Urusan (Kaur) sedang meninjau dan memvalidasi kelengkapan data.",
  },
  {
    title: "Surat disetujui/tidak disetujui",
    timestamp: "Menunggu proses",
    status: "current",
  },
  {
    title: "Proses Pengajuan Selesai",
    timestamp: "Belum tersedia",
    status: "upcoming",
    completedDescription:
      "Selesai dan siap diambil! Surat Anda dapat diambil di kantor desa pada jam kerja.",
  },
];

export const STATUS_DESCRIPTIONS: Record<TimelineStatus, string> = {
  completed: "Tahap ini telah selesai dan tervalidasi oleh petugas desa.",
  current: "Sedang diproses.",
  upcoming: "",
  rejected:
    "Pengajuan ditolak. Silakan hubungi operator desa untuk informasi lebih lanjut.",
};
