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

type SKTMSPageContentProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const SKTMSPageContent = ({ onSubmit }: SKTMSPageContentProps) => {
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
                Surat Keterangan Tidak Mampu (SKTM) Sekolah
              </h1>
              <p className="py-2 text-sm text-white/90">
                Layanan pengurusan surat secara online - mudah & cepat.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto -mt-8 max-w-4xl px-6">
          <div className="rounded-2xl bg-white px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-[#0a3d91] shadow-lg">
            Formulir Surat Keterangan Tidak Mampu (SKTM) Sekolah
          </div>

          <div className="mt-6 rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <p className="text-sm font-semibold text-[#0a3d91]">
              Keperluan data diri yang harus disiapkan:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Kartu Tanda Penduduk (KTP)</li>
              <li>Kartu Keluarga (KK)</li>
              <li>Surat Pengantar RT/RW</li>
              <li>Surat Keterangan Gaji/Penghasilan/Belum Bekerja</li>
            </ul>

            <form className="mt-8 space-y-10" onSubmit={onSubmit}>
              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  I. Data Orang Tua / Wali
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ortu_nama">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ortu_nama"
                      name="ortu_nama"
                      placeholder="Masukkan nama wali"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ortu_nik">
                      NIK <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ortu_nik"
                      name="ortu_nik"
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
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ortu_tempat">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ortu_tempat"
                      name="ortu_tempat"
                      placeholder="Masukkan tempat lahir"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ortu_tanggal">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="ortu_tanggal"
                      name="ortu_tanggal"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ortu_jk">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </label>
                    <select id="ortu_jk" name="ortu_jk" required className={selectClasses}>
                      <option value="">-- Pilih Jenis Kelamin --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ortu_pekerjaan">
                      Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ortu_pekerjaan"
                      name="ortu_pekerjaan"
                      placeholder="Masukkan pekerjaan"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ortu_alamat">
                      Alamat KTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ortu_alamat"
                      name="ortu_alamat"
                      placeholder="Masukkan alamat lengkap"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
              </section>

              <hr className="border-slate-200" />

              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  II. Data Anak
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="nama_anak">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama_anak"
                      name="nama_anak"
                      placeholder="Masukkan nama anak"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="nik_anak">
                      NIK <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nik_anak"
                      name="nik_anak"
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
                      Hanya angka, tanpa spasi atau tanda.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tempat_anak">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tempat_anak"
                      name="tempat_anak"
                      placeholder="Masukkan tempat lahir"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tanggal_anak">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tanggal_anak"
                      name="tanggal_anak"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="anak_jk">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </label>
                    <select id="anak_jk" name="anak_jk" required className={selectClasses}>
                      <option value="">-- Pilih Jenis Kelamin --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="pekerjaan_anak">
                      Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pekerjaan_anak"
                      name="pekerjaan_anak"
                      placeholder="Masukkan pekerjaan anak"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="alamat_anak">
                      Alamat KTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="alamat_anak"
                      name="alamat_anak"
                      placeholder="Masukkan alamat lengkap"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
              </section>

              <hr className="border-slate-200" />

              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  III. Data Ekonomi
                </h2>
                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-[#0a3d91]"
                    htmlFor="ekonomi_penghasilan"
                  >
                    Penghasilan Rata-rata Per Bulan <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ekonomi_penghasilan"
                    name="ekonomi_penghasilan"
                    required
                    className={selectClasses}
                  >
                    <option value="">-- Pilih Rentang --</option>
                    <option value="0-500000">0 - Rp 500.000</option>
                    <option value="500000-1500000">Rp 500.000 - Rp 1.500.000</option>
                    <option value="1500000-2500000">Rp 1.500.000 - Rp 2.500.000</option>
                    <option value=">2500000">Rp 2.500.000 ke atas</option>
                  </select>
                </div>
              </section>

              <hr className="border-slate-200" />

              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  IV. Lampiran Persyaratan
                </h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="ktp">
                      Unggah KTP <span className="text-red-500">*</span>
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
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="pengantar_rt">
                      Unggah Surat Pengantar RT/RW <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="pengantar_rt"
                      name="pengantar_rt"
                      accept=".jpg,.jpeg,.png,.pdf"
                      required
                      className={fileInputClasses}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="file_gaji">
                      Unggah Surat Keterangan Belum Bekerja / Penghasilan{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="file_gaji"
                      name="file_gaji"
                      accept=".jpg,.jpeg,.png,.pdf"
                      required
                      className={fileInputClasses}
                    />
                  </div>

                  <div className="space-y-1.5">
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
                      Harus aktif untuk proses verifikasi petugas.
                    </p>
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

export default SKTMSPageContent;
