export type PengajuanStatusFilter =
  | "all"
  | "selesai"
  | "menunggu"
  | "ditolak";

export type Pengajuan = {
  id: number;
  nama: string;
  jenis:
    | "Surat Keterangan Domisili"
    | "Surat Keterangan Domisili Lembaga"
    | "Surat Keterangan Tidak Mampu (SKTM)"
    | "Surat Keterangan Asal-Usul Keluarga"
    | "Surat Keterangan Tidak Mampu (SKTM) Sekolah";
  tanggal: string;
  status: string;
  nik: string;
  alamat: string;
  catatan?: string;
  lampiran: Array<{
    label: string;
    url: string;
  }>;
};

export type PengajuanStatItem = {
  label: string;
  value: number;
};
