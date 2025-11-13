"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-[#0a3d91] focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40";
const inputClasses = inputBase;
const fileInputClasses =
  "w-full cursor-pointer rounded-xl border border-dashed border-[#0a3d91]/40 bg-[#e2e9ff]/40 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#1a3491] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-[#0a3d91]";


type AsalUsulPageContentProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const AsalUsulPageContent = ({ onSubmit }: AsalUsulPageContentProps) => {
  return (
    <div className="min-h-screen bg-[#f4f6f9] pb-16 text-slate-800">
        {/* FLOATING BACK BUTTON (upper-left) */}
        <Link
          href="/halaman-pengguna"
          aria-label="Kembali"
          className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-[#0a3d91] shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40 sm:left-6 sm:top-6"
        >
          {/* Arrow icon */}
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

        {/* HEADER */}
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
                Surat Keterangan Asal-Usul
              </h1>
              <p className="py-2 text-sm text-white/90">
                Layanan pengurusan surat secara online - mudah & cepat.
              </p>
            </div>
          </div>
        </header>

        {/* TITLE CARD */}
        <div className="mx-auto -mt-8 max-w-4xl px-6">
          <div className="rounded-2xl bg-white px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-[#0a3d91] shadow-lg">
            Formulir Surat Keterangan Asal-Usul Keluarga
          </div>

          {/* FORM CARD */}
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <p className="text-sm font-semibold text-[#0a3d91]">
              Keperluan data diri yang harus disiapkan:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Kartu Keluarga (KK)</li>
            </ul>

            <form className="mt-8 space-y-10" onSubmit={onSubmit}>
              {/* I. DATA DIRI */}
              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  I. Data Diri Pemohon
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
                      placeholder="Masukkan nama lengkap"
                      autoComplete="name"
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
                    <p className="text-xs text-slate-500">Contoh: 1203XXXXXXXXXXXX</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tempat_lahir_anak">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tempat_lahir_anak"
                      name="tempat_lahir_anak"
                      placeholder="Masukkan tempat lahir"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tanggal_lahir_anak">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tanggal_lahir_anak"
                      name="tanggal_lahir_anak"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="WN_anak">
                      Warga Negara <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="WN_anak"
                      name="WN_anak"
                      placeholder="Contoh: Indonesia"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="agama_anak">
                      Agama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="agama_anak"
                      name="agama_anak"
                      placeholder="Contoh: Islam"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="pekerjaan_anak">
                      Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pekerjaan_anak"
                      name="pekerjaan_anak"
                      placeholder="Contoh: Pelajar/Mahasiswa"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tempat_tinggal_anak">
                      Tempat Tinggal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tempat_tinggal_anak"
                      name="tempat_tinggal_anak"
                      placeholder="Alamat lengkap"
                      autoComplete="street-address"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* II. AYAH */}
              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  II. Data Ayah Kandung
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="nama_ayah">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama_ayah"
                      name="nama_ayah"
                      placeholder="Masukkan nama lengkap ayah"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="nik_ayah">
                      NIK <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nik_ayah"
                      name="nik_ayah"
                      placeholder="16 digit NIK"
                      inputMode="numeric"
                      autoComplete="off"
                      required
                      pattern="[0-9]{16}"
                      maxLength={16}
                      title="NIK harus terdiri dari 16 angka"
                      className={inputClasses}
                    />
                    <p className="text-xs text-slate-500">Hanya angka, tanpa spasi atau tanda.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tempat_lahir_ayah">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tempat_lahir_ayah"
                      name="tempat_lahir_ayah"
                      placeholder="Masukkan tempat lahir ayah"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tanggal_lahir_ayah">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tanggal_lahir_ayah"
                      name="tanggal_lahir_ayah"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="WN_ayah">
                      Warga Negara <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="WN_ayah"
                      name="WN_ayah"
                      placeholder="Contoh: Indonesia"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="agama_ayah">
                      Agama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="agama_ayah"
                      name="agama_ayah"
                      placeholder="Contoh: Islam"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="pekerjaan_ayah">
                      Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pekerjaan_ayah"
                      name="pekerjaan_ayah"
                      placeholder="Masukkan pekerjaan ayah"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tempat_tinggal_ayah">
                      Tempat Tinggal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tempat_tinggal_ayah"
                      name="tempat_tinggal_ayah"
                      placeholder="Alamat lengkap ayah"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* III. IBU */}
              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  III. Data Ibu Kandung
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="nama_ibu">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama_ibu"
                      name="nama_ibu"
                      placeholder="Masukkan nama lengkap ibu"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="nik_ibu">
                      NIK <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nik_ibu"
                      name="nik_ibu"
                      placeholder="16 digit NIK"
                      inputMode="numeric"
                      autoComplete="off"
                      required
                      pattern="[0-9]{16}"
                      maxLength={16}
                      title="NIK harus terdiri dari 16 angka"
                      className={inputClasses}
                    />
                    <p className="text-xs text-slate-500">Hanya angka, tanpa spasi atau tanda.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tempat_lahir_ibu">
                      Tempat Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tempat_lahir_ibu"
                      name="tempat_lahir_ibu"
                      placeholder="Masukkan tempat lahir ibu"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tanggal_lahir_ibu">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tanggal_lahir_ibu"
                      name="tanggal_lahir_ibu"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="WN_ibu">
                      Warga Negara <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="WN_ibu"
                      name="WN_ibu"
                      placeholder="Contoh: Indonesia"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="agama_ibu">
                      Agama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="agama_ibu"
                      name="agama_ibu"
                      placeholder="Contoh: Islam"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="pekerjaan_ibu">
                      Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pekerjaan_ibu"
                      name="pekerjaan_ibu"
                      placeholder="Masukkan pekerjaan ibu"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#0a3d91]" htmlFor="tempat_tinggal_ibu">
                      Tempat Tinggal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tempat_tinggal_ibu"
                      name="tempat_tinggal_ibu"
                      placeholder="Alamat lengkap ibu"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-[#0a3d91]">
                  IV. Lampiran Persyaratan
                </h2>
                  <div className="space-y-4">
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

              {/* ACTIONS */}
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

export default AsalUsulPageContent;
