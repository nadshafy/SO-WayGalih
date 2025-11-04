"use client";

import type { ChangeEventHandler } from "react";

import type { Pengajuan } from "@/lib/pengajuan";

type RejectModalProps = {
  item: Pengajuan | null;
  reason: string;
  reasonError: string;
  onReasonChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

const RejectModal = ({
  item,
  reason,
  reasonError,
  onReasonChange,
  onClose,
  onSubmit,
}: RejectModalProps) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onReasonChange(event.target.value);
  };

  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-[#0a3d91]">
          Alasan Penolakan
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Tambahkan catatan untuk pemohon tiket{" "}
          <span className="font-semibold text-slate-700">{item.nama}</span>.
        </p>

        <textarea
          className="mt-4 h-28 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-[#0a3d91] focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40"
          placeholder="Contoh: Lampiran tidak sesuai persyaratan."
          value={reason}
          onChange={handleChange}
        />
        {reasonError && (
          <p className="mt-2 text-xs font-semibold text-rose-600">{reasonError}</p>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-xl bg-gradient-to-br from-[#1a3491] to-[#0a3d91] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
          >
            Kirim Alasan
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
