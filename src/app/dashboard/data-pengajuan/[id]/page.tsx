import { notFound } from "next/navigation";
import PengajuanDetail from "@/src/components/dashboard/data-pengajuan/detail-page";
import { pengajuanData } from "../data";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PengajuanDetailPage({
  params,
}: DetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  const detail = pengajuanData.find((item) => item.id === numericId);

  if (!detail) {
    notFound();
  }

  const statusLabel = detail.status || "Menunggu verifikasi";

  return <PengajuanDetail detail={detail} statusLabel={statusLabel} />;
}
