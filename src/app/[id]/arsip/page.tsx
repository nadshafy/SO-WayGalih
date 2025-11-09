"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/src/components/footer";
import AuthGuard from "@/src/components/auth/auth-guard";

type ArchiveItem = {
  id: string;
  tanggal: string;
  jenisSurat: string;
  jumlahPengajuan: number;
  statusPengajuan: "diproses" | "ditolak" | "selesai";
  catatan?: string;
};

const MOCK_ARCHIVE: ArchiveItem[] = [
  {
    id: "1",
    tanggal: "12 Agustus 2024",
    jenisSurat: "Surat Keterangan Domisili",
    jumlahPengajuan: 1,
    statusPengajuan: "selesai",
    catatan: "Dokumen sudah dapat diambil di kantor desa.",
  },
  {
    id: "2",
    tanggal: "03 September 2024",
    jenisSurat: "Surat Keterangan Tidak Mampu (SKTM)",
    jumlahPengajuan: 2,
    statusPengajuan: "diproses",
    catatan: "Menunggu verifikasi RT / RW.",
  },
  {
    id: "3",
    tanggal: "15 Oktober 2024",
    jenisSurat: "Surat Keterangan Usaha",
    jumlahPengajuan: 1,
    statusPengajuan: "ditolak",
    catatan: "Lampiran foto tempat usaha belum lengkap.",
  },
];

const STATUS_CONFIG: Record<
  ArchiveItem["statusPengajuan"],
  { label: string; bg: string; text: string }
> = {
  diproses: {
    label: "Sedang Diproses",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  ditolak: {
    label: "Ditolak",
    bg: "bg-rose-100",
    text: "text-rose-700",
  },
  selesai: {
    label: "Selesai",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
};

type ArchivePageProps = {
  params: { id: string };
};

export default function ArchivePage({ params: _params }: ArchivePageProps) {
  return (
    <>
      <Head>
        <title>Arsip Dokumen - Desa Way Galih</title>
        <meta
          name="description"
          content="Riwayat pengajuan surat warga Desa Way Galih."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthGuard redirectIfAdmin="/dashboard">
        <div className="flex min-h-screen flex-col bg-[#f4f6f9] text-slate-800">
          {/* Back button */}
          <Link
            href="/halaman-pengguna"
            aria-label="Kembali"
            className="fixed left-3 top-3 z-50 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-[#0a3d91] shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40 sm:left-6 sm:top-6"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              className="-ml-0.5"
            >
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Kembali</span>
          </Link>

          {/* Header */}
          <header className="bg-gradient-to-br from-[#1a3491] to-[#0a3d91] text-white">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-6 sm:py-10">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="Logo Desa Way Galih"
                  width={56}
                  height={56}
                  className="h-12 w-12 rounded-full bg-white/10 p-1 sm:h-14 sm:w-14"
                  priority
                />
                <div className="leading-tight">
                  <span className="block text-xs text-white/90 sm:text-sm">Desa</span>
                  <span className="block text-base font-semibold text-white sm:text-lg">
                    Way Galih
                  </span>
                </div>
              </div>

              <div className="px-2 text-center sm:max-w-xl sm:text-right">
                <h1 className="text-base font-semibold uppercase tracking-wide sm:text-xl">
                  Data Riwayat Pengajuan Surat
                </h1>
                <p className="py-1.5 text-xs text-white/90 sm:py-2 sm:text-sm">
                  Layanan pengurusan surat secara online - mudah &amp; cepat.
                </p>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="mx-auto mt-6 flex w-full flex-1 justify-center px-4 sm:px-6">
            <div className="my-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
              <div className="px-5 pb-4 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Riwayat Pengajuan Terbaru
                  </h2>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Data ditampilkan berdasarkan pengajuan terakhir Anda.
                  </p>
                </div>
              </div>

              <div className="custom-scrollbar w-full overflow-x-auto border-t border-slate-100">
                <table className="w-full min-w-[720px] table-auto border-collapse text-left text-sm text-slate-700 sm:text-base">
                  <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                    <tr>
                      <th className="px-6 py-4 sm:py-5">Tanggal</th>
                      <th className="px-6 py-4 sm:py-5">Jenis Surat</th>
                      <th className="px-6 py-4 sm:py-5 text-center">Jumlah</th>
                      <th className="px-6 py-4 sm:py-5">Status</th>
                      <th className="px-6 py-4 sm:py-5">Catatan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_ARCHIVE.map((item) => (
                      <tr key={item.id} className="align-top hover:bg-slate-50/60">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900 sm:py-5 sm:text-base">
                          {item.tanggal}
                        </td>
                        <td className="px-6 py-4 text-sm sm:py-5 sm:text-base">
                          {item.jenisSurat}
                        </td>
                        <td className="px-6 py-4 text-center text-sm sm:py-5 sm:text-base">
                          {item.jumlahPengajuan}
                        </td>
                        <td className="px-6 py-4 sm:py-5">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_CONFIG[item.statusPengajuan].bg} ${STATUS_CONFIG[item.statusPengajuan].text}`}
                          >
                            {STATUS_CONFIG[item.statusPengajuan].label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 sm:py-5 sm:text-base">
                          {item.catatan ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </AuthGuard>
    </>
  );
}
