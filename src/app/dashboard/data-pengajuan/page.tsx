"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/src/components/dashboard";
import {
  FilterBar,
  PaginationControls,
  PengajuanTable,
  RejectModal,
  StatsOverview,
} from "@/src/components/dashboard/data-pengajuan";
import { useAuth } from "@/src/contexts/auth-context";
import {
  Pengajuan,
  PengajuanStatItem,
  PengajuanStatusFilter,
  getPengajuanData,
} from "@/src/lib/pengajuan";
import { db } from "@/src/lib/firebase/init";
import { doc, updateDoc } from "firebase/firestore";

const PAGE_SIZE = 10;

export default function DataPengajuan() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const [data, setData] = useState<Pengajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Pengajuan | null>(null);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<PengajuanStatusFilter>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPengajuanData();
        setData(result);
      } catch (error) {
        console.error("Gagal mengambil data pengajuan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirmLogout = useCallback(async () => {
    await logout();
    router.replace("/login");
  }, [logout, router]);

  const stats = useMemo<PengajuanStatItem[]>(() => {
    const selesai = data.filter((item) =>
      item.status.toLowerCase().includes("selesai")
    ).length;
    const ditolak = data.filter((item) =>
      item.status.toLowerCase().includes("ditolak")
    ).length;
    const menunggu = data.length - selesai - ditolak;

    return [
      { label: "Total Pengajuan", value: data.length },
      { label: "Selesai", value: selesai },
      { label: "Menunggu Verifikasi", value: menunggu },
      { label: "Ditolak", value: ditolak },
    ];
  }, [data]);

  const filteredData = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return data.filter((item) => {
      const status = item.status.toLowerCase();
      const matchesKeyword =
        keyword.length === 0 ||
        item.nama.toLowerCase().includes(keyword) ||
        item.jenisSurat.toLowerCase().includes(keyword);

      if (!matchesKeyword) return false;

      if (statusFilter === "all") return true;
      if (statusFilter === "selesai") return status.includes("selesai");
      if (statusFilter === "ditolak") return status.includes("ditolak");
      return !status.includes("selesai") && !status.includes("ditolak");
    });
  }, [data, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  const setStatus = (id: string, status: string) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const updateStatusInFirestore = async (id: string, status: string) => {
    try {
      const docRef = doc(db, "surat_pengajuan", id);
      await updateDoc(docRef, { status });
      console.log(`Status dokumen ${id} berhasil diupdate ke: ${status}`);
    } catch (error: any) {
      console.error("Gagal update status di Firestore:", error.code, error.message);
      alert("Terjadi kesalahan saat memperbarui status di Firestore! Pastikan akun Anda adalah admin.");
    }
  };

  const handleApprove = async (item: Pengajuan) => {
    const newStatus = "Selesai";
    setStatus(item.id, newStatus);
    await updateStatusInFirestore(item.id, newStatus);
  };

  const handleRejectSubmit = async () => {
    if (!reason.trim()) {
      setReasonError("Harap tuliskan alasan penolakan terlebih dahulu.");
      return;
    }

    if (selectedItem) {
      const newStatus = `Ditolak - ${reason.trim()}`;
      setStatus(selectedItem.id, newStatus);
      await updateStatusInFirestore(selectedItem.id, newStatus);
    }

    handleRejectModalClose();
  };

  const handleViewDetail = (item: Pengajuan) => {
    router.push(`/dashboard/data-pengajuan/${item.id}`);
  };

  const handleRejectModalOpen = (item: Pengajuan) => {
    setSelectedItem(item);
    setReason("");
    setReasonError("");
  };

  const handleRejectModalClose = () => {
    setSelectedItem(null);
    setReason("");
    setReasonError("");
  };

  const handleReasonChange = (value: string) => {
    setReason(value);
    if (reasonError) setReasonError("");
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusChange = (value: PengajuanStatusFilter) => {
    setStatusFilter(value);
    setPage(1);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">Memuat data pengajuan...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Data Pengajuan | Desa Way Galih</title>
      </Head>

      <div className="min-h-screen bg-[#f4f6f9] text-slate-800">
        <DashboardHeader
          onLogout={handleConfirmLogout}
          activeRoute="data-pengajuan"
        />

        <main className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#1a3491] sm:text-3xl">
                Data Pengajuan Surat
              </h1>
              <p className="text-sm text-slate-500">
                Kelola verifikasi pengajuan dan tindak lanjuti permohonan warga
              </p>
            </div>
            <a
              href="https://docs.google.com/spreadsheets/d/1DvJr-7kXkqcajrJ4YejBgTLTRQNcx4x9kvcwYHl45Hs/edit?gid=0#gid=0"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#0a3d91] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#082f74] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3d91]/50"
            >
              Buka Pengajuan Surat dengan Spreadsheet
            </a>
          </div>

          <StatsOverview items={stats} />

          <section className="mt-8 rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#0a3d91]">
                  Daftar Pengajuan Masuk
                </h2>
                <p className="text-sm text-slate-500">
                  Gunakan tombol aksi untuk menyetujui atau menolak pengajuan
                </p>
              </div>

              <FilterBar
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                onSearchChange={handleSearchChange}
                onStatusChange={handleStatusChange}
              />
            </div>

            <PengajuanTable
              items={paginatedData}
              onApprove={handleApprove}
              onReject={handleRejectModalOpen}
              onViewDetail={handleViewDetail}
            />

            <PaginationControls
              page={currentPage}
              totalPages={totalPages}
              pageSize={PAGE_SIZE}
              totalItems={filteredData.length}
              onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
              onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            />
          </section>
        </main>

        <RejectModal
          item={selectedItem}
          reason={reason}
          reasonError={reasonError}
          onReasonChange={handleReasonChange}
          onClose={handleRejectModalClose}
          onSubmit={handleRejectSubmit}
        />
      </div>
    </>
  );
}
