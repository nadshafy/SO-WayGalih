import { 
  collection,
  getDocs,
  query,
  where,
  addDoc,
  orderBy,
  serverTimestamp,
  collectionGroup
} from "firebase/firestore";
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
  const pengajuanCollection = collectionGroup(db, "surat_pengajuan");
  const snapshot = await getDocs(pengajuanCollection);

  return snapshot.docs.map((doc) => {
    const d = doc.data() as any;
    const userId = doc.ref.parent.parent?.id || "";

    return {
      id: doc.id,
      userId: userId,
      nama: d.nama,
      nama_pendiri: d.nama_pendiri,
      jenisSurat: d.jenisSurat,
      tanggal_pengajuan: d.tanggal_pengajuan,
      status: d.status,
      nik: d.nik,
      alamat: d.alamat,
      alamat_lembaga: d.alamat_lembaga,
      kecamatan: d.kecamatan,
      catatan: d.catatan,
      lampiran: d.lampiran ?? [],
    };
  }) as Pengajuan[];
}

export async function tambahPengajuanSurat(uid: string, data: any) {
  return await addDoc(collection(db, "users", uid, "surat_pengajuan"), {
    userId: uid,
    jenisSurat: data.jenisSurat,
    nama: data.nama ?? "",
    nik: data.nik ?? "",
    alamat: data.alamat ?? "",
    alamat_lembaga: data.alamat_lembaga ?? "",
    kecamatan: data.kecamatan ?? "",
    nama_pendiri: data.nama_pendiri ?? "",
    lampiran: data.lampiran ?? [],
    status: "diproses",
    catatan: "",
    tanggal_pengajuan: serverTimestamp(),
  });
}

export async function getRiwayatPengajuan(uid: string) {
  const q = query(
    collection(db, "users", uid, "surat_pengajuan"),
    orderBy("tanggal_pengajuan", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const d = doc.data() as any;

    return {
      id: doc.id,
      jenisSurat: d.jenisSurat,
      status: d.status,
      catatan: d.catatan ?? "",
      jumlahPengajuan: 1,
      tanggal_pengajuan: d.tanggal_pengajuan,
    };
  });
}
