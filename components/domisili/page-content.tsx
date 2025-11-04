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
            <p className="text-sm font-semibold text-[#0a3d91]">
              Keperluan data diri yang harus disiapkan:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Kartu Tanda Penduduk (KTP)</li>
              <li>Kartu Keluarga (KK)</li>
              <li>Surat Pengantar RT/RW</li>
            </ul>

            <form className="mt-8 space-y-10" onSubmit={onSubmit}>
              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  I. Data Diri Pemohon
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="nama">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      placeholder="Masukkan nama lengkap"
                      autoComplete="name"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="nik">
                      NIK <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nik"
                      name="nik"
                      placeholder="16 digit NIK"
                      inputMode="numeric"
                      autoComplete="off"
                      required
                      pattern="[0-9]{16}"
                      maxLength={16}
                      title="NIK harus terdiri dari 16 angka"
                      className={inputClasses}
                    />
                    <p className="text-xs text-slate-500">
                      Contoh: 1203XXXXXXXXXXXX
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tempat_lahir">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tempat_lahir"
                      name="tempat_lahir"
                      placeholder="Masukkan tempat lahir"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tanggal_lahir">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="jenis_kelamin">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </label>
                    <select id="jenis_kelamin" name="jenis_kelamin" required className={selectClasses}>
                      <option value="">-- Pilih Jenis Kelamin --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="warga_negara">
                      Warga Negara <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="warga_negara"
                      name="warga_negara"
                      placeholder="Contoh: Indonesia"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="agama">
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
                    <label
                      className="text-sm font-semibold text-[#0a3d91]"
                      htmlFor="status_perkawinan"
                    >
                      Status Perkawinan <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="status_perkawinan"
                      name="status_perkawinan"
                      required
                      className={selectClasses}
                    >
                      <option value="">-- Pilih Status --</option>
                      <option value="Kawin">Kawin</option>
                      <option value="Belum Kawin">Belum Kawin</option>
                      <option value="Cerai Hidup">Cerai Hidup</option>
                      <option value="Cerai Mati">Cerai Mati</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="pekerjaan">
                      Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pekerjaan"
                      name="pekerjaan"
                      placeholder="Masukkan pekerjaan saat ini"
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ponsel">
                      Alamat <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="alammt"
                      name="ponsel"
                      inputMode="text"
                      autoComplete="alamat"
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ponsel">
                      Nomor Ponsel <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="ponsel"
                      name="ponsel"
                      placeholder="Contoh: 08123456789"
                      inputMode="numeric"
                      autoComplete="tel"
                      required
                      pattern="08[0-9]{9,11}"
                      title="Nomor ponsel harus diawali 08 dan terdiri dari 11-13 angka"
                      className={inputClasses}
                    />
                    <p className="text-xs text-slate-500">
                      Harus diawali 08 • 11-13 digit angka.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-slate-200" />

              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  II. Lampiran Persyaratan
                </h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="pengantar_rt">
                      Unggah KTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="pengantar_rt"
                      name="pengantar_rt"
                      accept=".jpg,.jpeg,.png,.pdf"
                      required
                      className={fileInputClasses}
                    />
                    <p className="text-xs text-slate-500">
                      Format: JPG/PNG/PDF • Pastikan dokumen terbaca jelas.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="kk">
                      Unggah Kartu Keluarga (KK) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="kk"
                      name="kk"
                      accept=".jpg,.jpeg,.png,.pdf"
                      required
                      className={fileInputClasses}
                    />
                    <p className="text-xs text-slate-500">
                      Gunakan foto dokumen yang terang dan tidak blur.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ktp">
                      Unggah Pengantar RT/RW <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="ktp"
                      name="ktp"
                      accept=".jpg,.jpeg,.png,.pdf"
                      required
                      className={fileInputClasses}
                    />
                  </div>
                </div>
              </section>

              <div className="mt-2 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
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
