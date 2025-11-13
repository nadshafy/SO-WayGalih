import PengajuanDetail from "@/src/components/PengajuanDetail";
import { getPengajuanById } from "@/src/lib/pengajuan";

function formatTanggal(tanggal: string): string {
  return new Date(tanggal).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }) + " WIB";
}

export default async function Page({ params }: { params: { id: string } }) {
  const detail = await getPengajuanById(params.id);

  if (!detail) {
    return <div className="p-6">Data tidak ditemukan</div>;
  }

  const statusLabelMap: Record<string, string> = {
    menunggu: "Menunggu Diproses",
    ditolak: "Ditolak",
    selesai: "Selesai",
  };

  const statusLabel = statusLabelMap[detail.status] ?? "Tidak diketahui";

  // 🔥 injeksi tanggal pengajuan rebased dari Firestore
  const tanggalPengajuanFormatted = formatTanggal(detail.tanggal_pengajuan);

  return (
    <PengajuanDetail
      detail={{ ...detail, tanggal: tanggalPengajuanFormatted }}
      statusLabel={statusLabel}
    />
  );
}
