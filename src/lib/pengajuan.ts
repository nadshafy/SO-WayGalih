import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase/init";

export interface Lampiran {
  label: string;
  url: string;
}

export interface Pengajuan {
  id: string;
  nama: string;
  jenis: string;
  tanggal: string;
  status: string;
  nik: string;
  alamat: string;
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
