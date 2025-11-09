"use client";

import type { ChangeEventHandler } from "react";

import type { PengajuanStatusFilter } from "@/src/lib/pengajuan";

type FilterBarProps = {
  searchTerm: string;
  statusFilter: PengajuanStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: PengajuanStatusFilter) => void;
};

const FilterBar = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: FilterBarProps) => {
  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    onSearchChange(event.target.value);
  };

  const handleStatus: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onStatusChange(event.target.value as PengajuanStatusFilter);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        type="search"
        placeholder="Cari nama pemohon atau jenis surat..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition focus:border-[#0a3d91] focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40 sm:w-64"
      />
      <select
        value={statusFilter}
        onChange={handleStatus}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition focus:border-[#0a3d91] focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40 sm:w-48"
      >
        <option value="all">Semua Status</option>
        <option value="selesai">Selesai</option>
        <option value="menunggu">Menunggu</option>
        <option value="ditolak">Ditolak</option>
      </select>
    </div>
  );
};

export default FilterBar;
