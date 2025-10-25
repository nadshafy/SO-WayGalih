// src/pages/sktms.js
"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SKTMS() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Form berhasil dikirim!');
    router.push('/status');
  };

  return (
    <>
      <Head>
        <title>Form SKTM Sekolah - Desa Way Galih</title>
      </Head>

      <div className="form-page">
        <header>
          <div className="logo">
            <Image src="/images/logo.png" alt="Logo Desa" width={50} height={50} />
            <span>
              Desa<br />
              <b>Way Galih</b>
            </span>
          </div>
          <h1>SURAT KETERANGAN TIDAK MAMPU UNTUK SEKOLAH</h1>
          <p>Layanan Pengurusan Surat Secara Online.</p>
        </header>

        <div className="sub-header">
          FORMULIR SURAT KETERANGAN TIDAK MAMPU (SEKOLAH)
        </div>

        <div className="container">
          <p>Keperluan Data Diri yang Harus Disiapkan :</p>
          <ul>
            <li>Kartu Tanda Penduduk (KTP)</li>
            <li>Kartu Keluarga (KK)</li>
            <li>Surat Pengantar RT/RW</li>
            <li>Surat Keterangan Gaji/Penghasilan</li>
          </ul>

          <form onSubmit={handleSubmit}>
            <h2>I. DATA DIRI ORANG TUA/WALI</h2>

            <div className="form-group">
              <label htmlFor="ortu_nama">Nama Lengkap <span>*</span></label>
              <input type="text" id="ortu_nama" name="ortu_nama" required />
            </div>

            <div className="form-group">
              <label htmlFor="ortu_nik">NIK <span>*</span></label>
              <input type="text" id="ortu_nik" name="ortu_nik" pattern="[0-9]{16}" maxLength="16" required />
            </div>

            <div className="form-group">
              <label htmlFor="ortu_tempat">Tempat Lahir <span>*</span></label>
              <input type="text" id="ortu_tempat" name="ortu_tempat" placeholder="Masukkan tempat lahir wali" required />
            </div>

            <div className="form-group">
              <label htmlFor="ortu_tanggal">Tanggal Lahir <span>*</span></label>
              <input type="date" id="ortu_tanggal" name="ortu_tanggal" required />
            </div>

            <div className="form-group">
              <label htmlFor="ortu_jk">Jenis Kelamin <span>*</span></label>
              <select id="ortu_jk" name="ortu_jk" required>
                <option value="">-- Pilih Jenis Kelamin --</option>
                <option value="laki">Laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="ortu_pekerjaan">Pekerjaan <span>*</span></label>
              <input type="text" id="ortu_pekerjaan" name="ortu_pekerjaan" placeholder="Masukkan pekerjaan wali" required />
            </div>

            <div className="form-group">
              <label htmlFor="ortu_alamat">Alamat KTP <span>*</span></label>
              <input type="text" id="ortu_alamat" name="ortu_alamat" placeholder="Masukkan alamat lengkap wali" required />
            </div>

            <h2>II. DATA DIRI ANAK</h2>

            <div className="form-group">
              <label htmlFor="nama_anak">Nama Lengkap <span>*</span></label>
              <input type="text" id="nama_anak" name="nama_anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="nik_anak">NIK <span>*</span></label>
              <input type="text" id="nik_anak" name="nik_anak" pattern="[0-9]{16}" maxLength="16" required />
            </div>

            <div className="form-group">
              <label htmlFor="tempat_anak">Tempat Lahir <span>*</span></label>
              <input type="text" id="tempat_anak" name="tempat_anak" placeholder="Masukkan tempat lahir anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="tanggal_anak">Tanggal Lahir <span>*</span></label>
              <input type="date" id="tanggal_anak" name="tanggal_anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="anak_jk">Jenis Kelamin <span>*</span></label>
              <select id="anak_jk" name="anak_jk" required>
                <option value="">-- Pilih Jenis Kelamin --</option>
                <option value="laki">Laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pekerjaan_anak">Pekerjaan <span>*</span></label>
              <input type="text" id="pekerjaan_anak" name="pekerjaan_anak" placeholder="Masukkan pekerjaan anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="alamat_anak">Alamat KTP <span>*</span></label>
              <input type="text" id="alamat_anak" name="alamat_anak" placeholder="Masukkan alamat lengkap anak" required />
            </div>

            <h2>III. DATA EKONOMI</h2>

            <div className="form-group">
              <label htmlFor="ekonomi_penghasilan">Penghasilan Rata-Rata Per Bulan <span>*</span></label>
              <select id="ekonomi_penghasilan" name="ekonomi_penghasilan" required>
                <option value="">-- Pilih Rentang --</option>
                <option>0 - Rp 500.000</option>
                <option>Rp 500.000 - Rp 1.500.000</option>
                <option>Rp 1.500.000 - Rp 2.500.000</option>
              </select>
            </div>

            <h2>IV. LAMPIRAN PERSYARATAN</h2>

            <div className="upload-box">
              <label htmlFor="ktp">Unggah KTP <span>*</span></label>
              <input type="file" id="ktp" name="ktp" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>

            <div className="upload-box">
              <label htmlFor="kk">Unggah Kartu Keluarga (KK) <span>*</span></label>
              <input type="file" id="kk" name="kk" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>

            <div className="upload-box">
              <label htmlFor="pengantar_rt">Unggah Surat Pengantar RT/RW <span>*</span></label>
              <input type="file" id="pengantar_rt" name="pengantar_rt" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>

            <div className="upload-box">
              <label htmlFor="file_gaji">Unggah Surat Keterangan Belum Bekerja / Surat Keterangan Gaji / Perusahaan <span>*</span></label>
              <input type="file" id="file_gaji" name="file_gaji" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>

            <div className="upload-box">
              <label htmlFor="ponsel">Nomor Ponsel <span>*</span></label>
              <input
                type="tel"
                id="ponsel"
                name="ponsel"
                placeholder="Contoh: 08123456789"
                required
                pattern="[0-9]{10,13}"
                title="Nomor ponsel harus terdiri dari 10-13 angka"
              />
            </div>

            <div className="btn-group">
              <Link href="/index" className="btn-secondary">Kembali</Link>
              <button type="submit">Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
