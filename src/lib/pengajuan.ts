import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase/init";

export interface Lampiran {
  label: string;
  url: string;
}

export interface Pengajuan {
  id: string;
  userId: string;
  nama: string;
  nama_pendiri: string;
  jenisSurat: string;
  tanggal_pengajuan: string;
  status: string;
  nik: string;
  alamat: string;
  alamat_lembaga: string;
  kecamatan: string;
  catatan: string;
  lampiran: Lampiran[];
}

export type PengajuanStatusFilter = "all" | "selesai" | "ditolak" | "menunggu";

export interface PengajuanStatItem {
  label: string;
  value: number;
}

export async function getPengajuanData(): Promise<Pengajuan[]> {
  const pengajuanCollection = collection(db, "surat_pengajuan");
  const snapshot = await getDocs(pengajuanCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Pengajuan[];
}
