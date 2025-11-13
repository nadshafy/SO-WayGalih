import Image from "next/image";
import Link from "next/link";
import type { Pengajuan } from "@/src/lib/pengajuan";

type PengajuanDetailProps = {
  detail: Pengajuan;
  statusLabel: string;
};

const PengajuanDetail = ({ detail, statusLabel }: PengajuanDetailProps) => {
  return (
    <div className="min-h-screen bg-[#f4f6f9] pb-16 text-slate-800">
      {/* Tombol Kembali (floating) */}
      <Link
        href="/dashboard/data-pengajuan"
        aria-label="Kembali"
        className="fixed left-3 top-3 z-50 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-[#0a3d91] shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40 sm:left-6 sm:top-6"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="-ml-0.5">
          <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline">Kembali</span>
      </Link>

      {/* Header tanpa badge */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1a3491] via-[#0f2d7a] to-[#0a3d91] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
          <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="Logo Desa Way Galih"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full bg-white/10 p-1"
                priority
              />
              <div className="leading-tight">
                <div className="text-sm text-white/80">Desa</div>
                <div className="text-lg font-semibold">Way Galih</div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2 p-1">
              <div className="flex flex-col items-center gap-1 sm:items-end">
                {/* badge “Detail Pengajuan” DIHAPUS */}
                <h1 className="text-center text-lg font-semibold sm:text-2xl sm:text-right">
                  {detail.jenisSurat}
                </h1>
              </div>
            </nav>
          </div>
        </header>


      {/* Main — card tidak overlap (pakai margin top positif) */}
      <main className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="rounded-3xl border border-slate-100 bg-white/95 p-5 shadow-xl sm:p-8">
          {/* Header info row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 sm:text-sm">Nama Pemohon</p>
              <h2 className="text-xl font-semibold text-[#0a3d91] sm:text-2xl">{detail.nama ?? detail.nama_pendiri}</h2>
              <p className="mt-2 text-sm text-slate-500">
                NIK: <span className="font-semibold">{detail.nik}</span>
              </p>
            </div>

            {/* Status jadi teks biasa (bukan badge) */}
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <span className="text-xs uppercase tracking-wide text-slate-400 sm:text-sm">Status Pengajuan</span>
              <span className="text-sm font-semibold text-[#0a3d91]">{statusLabel}</span>
            </div>
          </div>

          {/* Info sections */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
              <h3 className="text-base font-semibold text-[#0a3d91]">Alamat Domisili</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail.alamat ?? detail.alamat_lembaga ?? detail.kecamatan}</p>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
              <h3 className="text-base font-semibold text-[#0a3d91]">Catatan Pemohon</h3>
              {detail.catatan ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail.catatan}</p>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-slate-500">Tidak ada catatan tambahan.</p>
              )}
            </section>
          </div>

          {/* Lampiran */}
          <section className="mt-6">
            <h3 className="text-base font-semibold text-[#0a3d91]">Lampiran Berkas</h3>
            {detail.lampiran?.length ? (
              <ul className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                {detail.lampiran.map((lampiran) => (
                  <li
                    key={lampiran.label}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <span className="truncate pr-4">{lampiran.label}</span>
                    <a
                      href={lampiran.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#0a3d91] underline-offset-4 hover:underline"
                    >
                      Lihat
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Lampiran ada di spreadsheet.</p>
            )}
          </section>

          {/* Footer actions — tanggal juga tanpa badge */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/dashboard/data-pengajuan"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Kembali ke Data Pengajuan
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wide text-slate-400 sm:text-xs">
                Tanggal Pengajuan
              </span>
              <span className="text-sm font-semibold text-[#0a3d91]">{detail.tanggal_pengajuan}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PengajuanDetail;
