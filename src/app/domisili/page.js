// src/pages/domisili.js
"use client";

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Domisili() {
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    // Validasi NIK
    const nik = formData.get('nik')
    if (!/^[0-9]{16}$/.test(nik)) {
      alert('NIK tidak valid! NIK harus terdiri dari 16 digit angka.')
      return
    }

    // Validasi nomor ponsel
    const ponsel = formData.get('ponsel')
    if (!/^08[0-9]{9,11}$/.test(ponsel)) {
      alert('Nomor ponsel tidak valid! Format: 08xxxxxxxxxx')
      return
    }

    alert('Form berhasil dikirim! Data Anda sedang diproses.')
    router.push('/status')
  }

  return (
    <>
      <Head>
        <title>Form Surat Keterangan Domisili - Desa Way Galih</title>
      </Head>

      <div className="form-page">
        <header>
          <div className="logo">
            <Image src="/images/logo.png" alt="Logo Desa" width={50} height={50} />
            <span>Desa<br /><b>Way Galih</b></span>
          </div>
          <h1>SURAT KETERANGAN DOMISILI (PENDUDUK KTP WAY GALIH)</h1>
          <p>Layanan Pengurusan Surat Secara Online.</p>
          <p>Proses Lebih Mudah dan Cepat</p>
        </header>

        <div className="sub-header">
          FORMULIR SURAT KETERANGAN DOMISILI (PENDUDUK KTP WAY GALIH)
        </div>

        <div className="container">
          <p>Keperluan Data Diri yang Harus Disiapkan :</p>
          <ul>
            <li>Kartu Tanda Penduduk (KTP)</li>
            <li>Kartu Keluarga (KK)</li>
            <li>Surat Pengantar RT/RW</li>
          </ul>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nama">Nama Lengkap <span>*</span></label>
              <input type="text" id="nama" name="nama" placeholder="Masukkan nama lengkap" required />
            </div>

            <div className="form-group">
              <label htmlFor="nik">NIK <span>*</span></label>
              <input 
                type="text" 
                id="nik" 
                name="nik" 
                placeholder="Masukkan NIK" 
                required 
                pattern="[0-9]{16}" 
                maxLength="16"
                title="NIK harus terdiri dari 16 angka"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tempat_lahir">Tempat Lahir <span>*</span></label>
              <input type="text" id="tempat_lahir" name="tempat_lahir" placeholder="Masukkan tempat lahir" required />
            </div>

            <div className="form-group">
              <label htmlFor="tanggal_lahir">Tanggal Lahir <span>*</span></label>
              <input type="date" id="tanggal_lahir" name="tanggal_lahir" required />
            </div>

            <div className="form-group">
              <label htmlFor="jenis_kelamin">Jenis Kelamin <span>*</span></label>
              <select id="jenis_kelamin" name="jenis_kelamin" required>
                <option value="">-- Pilih Jenis Kelamin --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="warga_negara">Warga Negara <span>*</span></label>
              <input type="text" id="warga_negara" name="warga_negara" placeholder="Contoh: Indonesia" required />
            </div>

            <div className="form-group">
              <label htmlFor="agama">Agama <span>*</span></label>
              <select id="agama" name="agama" required>
                <option value="">-- Pilih Agama --</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status_perkawinan">Status Perkawinan <span>*</span></label>
              <select id="status_perkawinan" name="status_perkawinan" required>
                <option value="">-- Pilih Status --</option>
                <option value="Kawin">Kawin</option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pekerjaan">Pekerjaan <span>*</span></label>
              <input type="text" id="pekerjaan" name="pekerjaan" placeholder="Masukkan pekerjaan anda saat ini" required />
            </div>

            <h2>Alamat KTP</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dusun">Dusun <span>*</span></label>
                <select id="dusun" name="dusun" required>
                  <option value="">-- Pilih Dusun --</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rt_rw">RT/RW <span>*</span></label>
                <input type="text" id="rt_rw" name="rt_rw" placeholder="Contoh: 001/001" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="kecamatan">Kecamatan <span>*</span></label>
                <input type="text" id="kecamatan" name="kecamatan" placeholder="Contoh: Tanjung Bintang" required />
              </div>
              <div className="form-group">
                <label htmlFor="kabupaten">Kabupaten/Kota <span>*</span></label>
                <input type="text" id="kabupaten" name="kabupaten" placeholder="Contoh: Lampung Selatan" required />
              </div>
            </div>

            <h2>II. LAMPIRAN PERSYARATAN</h2>
            <div className="upload-box">
              <label htmlFor="pengantar_rt">Unggah Pengantar RT <span>*</span></label>
              <input type="file" id="pengantar_rt" name="pengantar_rt" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>

            <div className="upload-box">
              <label htmlFor="kk">Unggah Kartu Keluarga (KK) <span>*</span></label>
              <input type="file" id="kk" name="kk" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>

            <div className="upload-box">
              <label htmlFor="ktp">Unggah KTP <span>*</span></label>
              <input type="file" id="ktp" name="ktp" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>

            <div className="upload-box">
              <label htmlFor="ponsel">Nomor Ponsel <span>*</span></label>
              <input type="tel" id="ponsel" name="ponsel" placeholder="Contoh: 08123456789" required />
            </div>

            <div className="btn-group">
              <Link href="/" className="btn-secondary">Kembali</Link>
              <button type="submit">Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}