export type TimelineStatus = "completed" | "current" | "upcoming" | "rejected";

export interface TimelineItemType {
  title: string;
  timestamp: string;
  status: TimelineStatus;
  completedDescription?: string;
}

export function generateTimeline(
  pengajuanStatus: string,
  tanggalPengajuan: string
): TimelineItemType[] {
  const tgl = tanggalPengajuan || "Belum tersedia";

  const step1: TimelineItemType = {
    title: "Surat berhasil diajukan",
    timestamp: tgl,
    status: "completed",
    completedDescription:
      "Sistem telah menerima permohonan surat Anda dan sedang menunggu verifikasi awal.",
  };

  const step2: TimelineItemType = {
    title: "Surat sedang diproses",
    timestamp: tgl,
    status: pengajuanStatus === "menunggu" ? "current" : "completed",
    completedDescription:
      "Permohonan sedang atau telah diverifikasi oleh petugas.",
  };

  let step3: TimelineItemType;

  if (pengajuanStatus === "selesai") {
    step3 = {
      title: "Surat disetujui",
      timestamp: tgl,
      status: "completed",
      completedDescription: "Surat telah disetujui oleh petugas desa.",
    };
  } else if (pengajuanStatus === "ditolak") {
    step3 = {
      title: "Surat ditolak",
      timestamp: tgl,
      status: "rejected",
      completedDescription:
        "Permohonan ditolak. Silakan hubungi operator desa untuk informasi lebih lanjut.",
    };
  } else {
    step3 = {
      title: "Surat disetujui/tidak disetujui",
      timestamp: "Menunggu proses",
      status: "current",
    };
  }

  const step4: TimelineItemType = {
    title: "Proses Pengajuan Selesai",
    timestamp: pengajuanStatus === "selesai" ? tgl : "Belum tersedia",
    status: pengajuanStatus === "selesai" ? "completed" : "upcoming",
    completedDescription:
      "Surat siap diambil di kantor desa pada jam kerja.",
  };

  return [step1, step2, step3, step4];
}

export const STATUS_DESCRIPTIONS: Record<TimelineStatus, string> = {
  completed: "Tahap ini telah selesai dan tervalidasi oleh petugas desa.",
  current: "Sedang diproses.",
  upcoming: "Tahap ini menunggu proses sebelumnya.",
  rejected:
    "Pengajuan ditolak. Silakan hubungi operator desa untuk informasi lebih lanjut.",
};
