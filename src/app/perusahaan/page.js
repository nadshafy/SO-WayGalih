// src/pages/perusahaan.js
"use client";

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Perusahaan() {
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('✅ Form berhasil dikirim!')
    router.push('/status')
  }

  return (
    <>
      <Head>
        <title>Form Surat Domisili Perusahaan - Desa Way Galih</title>
      </Head>

      <div className="form-page">
        <header>
          <div className="logo">
            <Image src="/images/logo.png" alt="Logo Desa" width={50} height={50} />
            <span>Desa<br /><b>Way Galih</b></span>
          </div>
          <h1>SURAT KETERANGAN DOMISILI LEMBAGA (DAERAH WAY GALIH)</h1>
          <p>Layanan Pengurusan Surat Secara Online.</p>
        </header>

        <div className="sub-header">
          FORMULIR SURAT KETERANGAN DOMISILI LEMBAGA
        </div>

        <div className="container">
          <p>Keperluan Data Diri yang Harus Disiapkan :</p>
          <ul>
            <li>Kartu Tanda Penduduk (KTP)</li>
            <li>Akta Pendirian Lembaga/Surat Keterangan Pendirian</li>
          </ul>

          <form onSubmit={handleSubmit}>
            <h2>I. Data Lembaga / Organisasi</h2>

            <div className="form-group">
              <label htmlfor="nama_lembaga">Nama Lembaga <span>*</span></label>
              <input type="text" id="nama_lembaga" name="nama_lembaga" placeholder="Masukkan Nama Lembaga Lengkap" required/>
            </div>

            <div className="form-row">
              <div htmlclass="form-group">
                <label htmlfor="bidang_kegiatan">Bidang Kegiatan <span>*</span></label>
                <input type="text" id="bidang_kegiatan" name="bidang_kegiatan" placeholder="Masukkan Bidang Kegiatan Utama Lembaga" required/>
              </div>
              
              <div className="form-group">
                <label htmlfor="tahun_berdiri">Tahun Berdiri <span>*</span></label>
                <input type="number" id="tahun_berdiri" name="tahun_berdiri" placeholder="Contoh : 2019" pattern="[0-9]{4}" maxlength="4" required/>
              </div>
            </div>

            <h2>II. Keterangan Alamat Domisili Lembaga</h2>

            <div className="form-group">
              <label fhtmlor="alamat_lembaga">Alamat Lengkap Lembaga (Jalan dan Nomor) <span>*</span></label>
              <input type="text" id="alamat_lembaga" name="alamat_lembaga" placeholder="Masukkan Alamat Lengkap" required/>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlfor="rt_rw">RT/RW <span>*</span></label>
                <input type="text" id="rt_rw" name="rt_rw" placeholder="Contoh: 003/002" required/>
              </div>
              <div className="form-group">
                <label htmlfor="desa_lembaga">Kelurahan/Desa <span>*</span></label>
                <input type="text" id="desa_lembaga" name="desa_lembaga" placeholder="Masukkan Nama Desa/Kelurahan" required/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlfor="kecamatan_lembaga">Kecamatan <span>*</span></label>
                <input type="text" id="kecamatan_lembaga" name="kecamatan_lembaga" placeholder="Masukkan Nama Kecamatan" required/>
              </div>
              <div className="form-group">
                <label htmlfor="kabupaten_lembaga">Kabupaten/Kota <span>*</span></label>
                <input type="text" id="kabupaten_lembaga" name="kabupaten_lembaga" placeholder="Masukkan Nama Kabupaten/Kota" required/>
              </div>
            </div>

            <h2>II. Data Pendiri / Penanggung Jawab</h2>
            <div className="form-group">
              <label htmlFor="nama_pendiri">Nama Pendiri/Penanggung Jawab <span>*</span></label>
              <input type="text" id="nama_pendiri" name="nama_pendiri" required />
            </div>

            <h2>IV. Unggahan Persyaratan</h2>
            <div className="upload-box">
              <label htmlFor="ktp_pendiri">Unggah KTP Pendiri <span>*</span></label>
              <input type="file" id="ktp_pendiri" name="ktp_pendiri" required />
            </div>

            <div className="form-group">
              <label htmlfor="akta_lembaga">2. Unggah Akta Pendirian Lembaga/Badan Usaha <span>*</span></label>
              <input type="file" id="akta_lembaga" name="akta_lembaga" accept="image/*, application/pdf" required/>
            </div>

            <div className="form-group">
              <label htmlfor="pengantar_rt">3. Unggah Surat Pengantar RT/RW <span>*</span></label>
              <input type="file" id="pengantar_rt" name="pengantar_rt" accept="image/*, application/pdf" required/>
            </div>

            <div className="form-group">
              <label htmlfor="surat_pernyataan_domisili">4. Unggah Bukti Kepemilikan/Sewa Tempat <span>*</span></label>
              <input type="file" id="surat_pernyataan_domisili" name="surat_pernyataan_domisili" accept="image/*, application/pdf"/>
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