"use client";

import type { Pengajuan } from "@/src/lib/pengajuan";

type PengajuanTableProps = {
  items: Pengajuan[];
  onApprove: (item: Pengajuan) => void;
  onReject: (item: Pengajuan) => void;
  onViewDetail: (item: Pengajuan) => void;
};

const statusStyles: Record<string, string> = {
  selesai: "bg-emerald-100 text-emerald-700",
  ditolak: "bg-rose-100 text-rose-700",
  default: "bg-slate-100 text-slate-600",
};

const PengajuanTable = ({ items, onApprove, onReject, onViewDetail }: PengajuanTableProps) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead>
          <tr className="text-left uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">Nama Pemohon</th>
            <th className="px-4 py-3">Jenis Surat</th>
            <th className="px-4 py-3">Tanggal</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => {
            const lowerStatus = item.status.toLowerCase();
            const badgeClass = lowerStatus.includes("selesai")
              ? statusStyles.selesai
              : lowerStatus.includes("ditolak")
              ? statusStyles.ditolak
              : statusStyles.default;

            const timestamp = item.tanggal_pengajuan as any;
            let formattedDate = "Data tanggal tidak valid";

            if (timestamp && typeof timestamp.toDate === "function") {
              formattedDate = timestamp.toDate().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
            }

            return (
              <tr key={item.id} className="text-slate-600">
                <td className="px-4 py-3 font-semibold text-slate-700">
                  {item.nama ?? item.nama_pendiri}
                </td>
                <td className="px-4 py-3">{item.jenisSurat}</td>
                <td className="px-4 py-3">{formattedDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                  >
                    {item.status || "Menunggu"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onApprove(item)}
                      className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-100"
                    >
                      Tandai Selesai
                    </button>
                    <button
                      type="button"
                      onClick={() => onReject(item)}
                      className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:bg-rose-100"
                    >
                      Tolak
                    </button>
                    <button
                      type="button"
                      onClick={() => onViewDetail(item)}
                      className="ml-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">
                Tidak ada pengajuan yang sesuai dengan filter saat ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PengajuanTable;
