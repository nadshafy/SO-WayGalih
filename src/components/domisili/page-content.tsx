"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-[#0a3d91] focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40";
const inputClasses = inputBase;
const selectClasses = inputBase;
const fileInputClasses =
  "w-full cursor-pointer rounded-xl border border-dashed border-[#0a3d91]/40 bg-[#e2e9ff]/40 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#1a3491] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-[#0a3d91]";

type DomisiliPageContentProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const DomisiliPageContent = ({ onSubmit }: DomisiliPageContentProps) => {
  return (
    <div className="min-h-screen bg-[#f4f6f9] pb-16 text-slate-800">
      <Link
        href="/halaman-pengguna"
        aria-label="Kembali"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-[#0a3d91] shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40 sm:left-6 sm:top-6"
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

      <header className="bg-gradient-to-br from-[#1a3491] to-[#0a3d91] text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo Desa Way Galih"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full bg-white/10 p-1"
              priority
            />
            <div className="leading-tight">
              <span className="block text-sm text-white/90">Desa</span>
              <span className="block text-lg font-semibold text-white">
                Way Galih
              </span>
            </div>
          </div>

          <div className="text-center sm:max-w-xl sm:text-right">
            <h1 className="text-lg font-semibold uppercase tracking-wide sm:text-xl">
              Surat Keterangan Domisili
            </h1>
            <p className="py-2 text-sm text-white/90">
              Layanan pengurusan surat secara online - mudah & cepat.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto -mt-8 max-w-4xl px-6">
        <div className="rounded-2xl bg-white px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-[#0a3d91] shadow-lg">
          Formulir Surat Keterangan Domisili
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-xl sm:p-8">
          <form className="space-y-10" onSubmit={onSubmit}>
            {}
            <section>
              <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                I. Data Diri Pemohon
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 space-y-2">
                  <label htmlFor="nama" className="text-sm font-semibold text-[#0a3d91]">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input id="nama" name="nama" required placeholder="Masukkan nama lengkap" className={inputClasses} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="nik" className="text-sm font-semibold text-[#0a3d91]">
                    NIK <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nik"
                    name="nik"
                    type="text"
                    maxLength={16}
                    required
                    pattern="[0-9]{16}"
                    placeholder="16 digit NIK"
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tempat_lahir" className="text-sm font-semibold text-[#0a3d91]">
                    Tempat Lahir <span className="text-red-500">*</span>
                  </label>
                  <input id="tempat_lahir" name="tempat_lahir" required className={inputClasses} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tanggal_lahir" className="text-sm font-semibold text-[#0a3d91]">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input id="tanggal_lahir" name="tanggal_lahir" type="date" required className={inputClasses} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="jenis_kelamin" className="text-sm font-semibold text-[#0a3d91]">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select id="jenis_kelamin" name="jenis_kelamin" required className={selectClasses}>
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="agama" className="text-sm font-semibold text-[#0a3d91]">
                    Agama <span className="text-red-500">*</span>
                  </label>
                  <select id="agama" name="agama" required className={selectClasses}>
                    <option value="">-- Pilih Agama --</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="status_perkawinan" className="text-sm font-semibold text-[#0a3d91]">
                    Status Perkawinan <span className="text-red-500">*</span>
                  </label>
                  <select id="status_perkawinan" name="status_perkawinan" required className={selectClasses}>
                    <option value="">-- Pilih Status --</option>
                    <option value="Kawin">Kawin</option>
                    <option value="Belum Kawin">Belum Kawin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="pekerjaan" className="text-sm font-semibold text-[#0a3d91]">
                    Pekerjaan <span className="text-red-500">*</span>
                  </label>
                  <input id="pekerjaan" name="pekerjaan" required placeholder="Masukkan pekerjaan" className={inputClasses} />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label htmlFor="ponsel" className="text-sm font-semibold text-[#0a3d91]">
                    Nomor Ponsel <span className="text-red-500">*</span>
                  </label>
                  <input id="ponsel" name="ponsel" type="tel" required placeholder="081234567890" className={inputClasses} />
                </div>
              </div>
            </section>

            {}
            <section>
              <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                II. Lampiran Persyaratan
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="ktp" className="text-sm font-semibold text-[#0a3d91]">
                    Unggah KTP <span className="text-red-500">*</span>
                  </label>
                  <input id="ktp" name="ktp" type="file" required accept=".jpg,.jpeg,.png,.pdf" className={fileInputClasses} />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="kk" className="text-sm font-semibold text-[#0a3d91]">
                    Unggah Kartu Keluarga (KK) <span className="text-red-500">*</span>
                  </label>
                  <input id="kk" name="kk" type="file" required accept=".jpg,.jpeg,.png,.pdf" className={fileInputClasses} />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="pengantar_rt" className="text-sm font-semibold text-[#0a3d91]">
                    Unggah Surat Pengantar RT/RW <span className="text-red-500">*</span>
                  </label>
                  <input id="pengantar_rt" name="pengantar_rt" type="file" required accept=".jpg,.jpeg,.png,.pdf" className={fileInputClasses} />
                </div>
              </div>
            </section>

            <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-br from-[#1a3491] to-[#0a3d91] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:from-[#0a3d91] hover:to-[#072e6f] hover:shadow-xl"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DomisiliPageContent;
