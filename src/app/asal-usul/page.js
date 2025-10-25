// src/pages/asal-usul.js
"use client";

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AsalUsul() {
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('✅ Form berhasil dikirim!')
    router.push('/status')
  }

  return (
    <>
      <Head>
        <title>Form Surat Asal-Usul - Desa Way Galih</title>
      </Head>

      <div className="form-page">
        <header>
          <div className="logo">
            <Image src="/images/logo.png" alt="Logo Desa" width={50} height={50} />
            <span>Desa<br /><b>Way Galih</b></span>
          </div>
          <h1>SURAT KETERANGAN ASAL-USUL</h1>
          <p>Layanan Pengurusan Surat Secara Online.</p>
        </header>

        <div className="sub-header">
          FORMULIR SURAT KETERANGAN ASAL-USUL
        </div>

        <div className="container">
          <p>Keperluan Data Diri yang Harus Disiapkan :</p>
          <ul>
            <li>Kartu Tanda Penduduk (KTP)</li>
          </ul>

          <form onSubmit={handleSubmit}>
            <h2>I. DATA DIRI PEMOHON</h2>
            <div className="form-group">
              <label htmlFor="nama_anak">Nama Lengkap <span>*</span></label>
              <input type="text" id="nama_anak" name="nama_anak" placeholder="Masukkan nama anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="nik_anak">NIK <span>*</span></label>
              <input type="text" id="nik_anak" name="nik_anak" pattern="[0-9]{16}" maxLength="16" placeholder="Masukkan NIK anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="tempat_lahir_anak">Tempat Lahir <span>*</span></label>
              <input type="text" id="tempat_lahir_anak" name="tempat_lahir_anak" placeholder="Masukkan tempat lahir anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="tanggal_lahir_anak">Tanggal Lahir <span>*</span></label>
              <input type="date" id="tanggal_lahir_anak" name="tanggal_lahir_anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="WN_anak">Warga Negara <span>*</span></label>
              <input type="text" id="WN_anak" name="WN_anak" placeholder="Masukkan warga negara anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="agama_anak">Agama <span>*</span></label>
              <input type="text" id="agama_anak" name="agama_anak" placeholder="Masukkan agama anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="pekerjaan_anak">Pekerjaan <span>*</span></label>
              <input type="text" id="pekerjaan_anak" name="pekerjaan_anak" placeholder="Masukkan pekerjaan anak" required />
            </div>

            <div className="form-group">
              <label htmlFor="tempat_tinggal_anak">Tempat Tinggal <span>*</span></label>
              <input type="text" id="tempat_tinggal_anak" name="tempat_tinggal_anak" placeholder="Masukkan tempat tinggal lengkap" required />
            </div>

            <h2>II. DATA AYAH KANDUNG</h2>
            <div className="form-group">
              <label htmlFor="nama_ayah">Nama Lengkap <span>*</span></label>
              <input type="text" id="nama_ayah" name="nama_ayah" placeholder="Masukkan nama lengkap ayah" required />
            </div>

            <div className="form-group">
              <label htmlFor="nik_ayah">NIK <span>*</span></label>
              <input type="text" id="nik_ayah" name="nik_ayah" pattern="[0-9]{16}" maxLength="16" placeholder="Masukkan NIK ayah" required />
            </div>

            <div className="form-group">
              <label htmlFor="tempat_lahir_ayah">Tempat Lahir <span>*</span></label>
              <input type="text" id="tempat_lahir_ayah" name="tempat_lahir_ayah" placeholder="Masukkan tempat lahir ayah" required />
            </div>

            <div className="form-group">
              <label htmlFor="tanggal_lahir_ayah">Tanggal Lahir <span>*</span></label>
              <input type="date" id="tanggal_lahir_ayah" name="tanggal_lahir_ayah" required />
            </div>

            <div className="form-group">
              <label htmlFor="WN_ayah">Warga Negara <span>*</span></label>
              <input type="text" id="WN_ayah" name="WN_ayah" placeholder="Masukkan warga negara ayah" required />
            </div>

            <div className="form-group">
              <label htmlFor="agama_ayah">Agama <span>*</span></label>
              <input type="text" id="agama_ayah" name="agama_ayah" placeholder="Masukkan agama ayah" required />
            </div>

            <div className="form-group">
              <label htmlFor="pekerjaan_ayah">Pekerjaan <span>*</span></label>
              <input type="text" id="pekerjaan_ayah" name="pekerjaan_ayah" placeholder="Masukkan pekerjaan ayah" required />
            </div>

            <div className="form-group">
              <label htmlFor="tempat_tinggal_ayah">Tempat Tinggal <span>*</span></label>
              <input type="text" id="tempat_tinggal_ayah" name="tempat_tinggal_ayah" placeholder="Masukkan tempat tinggal lengkap" required />
            </div>

            <h2>III. DATA IBU KANDUNG</h2>
            <div className="form-group">
              <label htmlFor="nama_ibu">Nama Lengkap <span>*</span></label>
              <input type="text" id="nama_ibu" name="nama_ibu" placeholder="Masukkan nama lengkap ibu" required />
            </div>

            <div className="form-group">
              <label htmlFor="nik_ibu">NIK <span>*</span></label>
              <input type="text" id="nik_ibu" name="nik_ibu" placeholder="Masukkan NIK ibu" pattern="[0-9]{16}" title="NIK harus terdiri dari 16 angka" maxLength="16" required />
            </div>

            <div className="form-group">
              <label htmlFor="tempat_lahir_ibu">Tempat Lahir <span>*</span></label>
              <input type="text" id="tempat_lahir_ibu" name="tempat_lahir_ibu" placeholder="Masukkan tempat lahir ibu" required />
            </div>

            <div className="form-group">
              <label htmlFor="tanggal_lahir_ibu">Tanggal Lahir <span>*</span></label>
              <input type="date" id="tanggal_lahir_ibu" name="tanggal_lahir_ibu" required />
            </div>

            <div className="form-group">
              <label htmlFor="WN_ibu">Warga Negara <span>*</span></label>
              <input type="text" id="WN_ibu" name="WN_ibu" placeholder="Masukkan warga negara ibu" required />
            </div>

            <div className="form-group">
              <label htmlFor="agama_ibu">Agama <span>*</span></label>
              <input type="text" id="agama_ibu" name="agama_ibu" placeholder="Masukkan agama ibu" required />
            </div>

            <div className="form-group">
              <label htmlFor="pekerjaan_ibu">Pekerjaan <span>*</span></label>
              <input type="text" id="pekerjaan_ibu" name="pekerjaan_ibu" placeholder="Masukkan pekerjaan ibu" required />
            </div>

            <div className="form-group">
              <label htmlFor="tempat_tinggal_ibu">Tempat Tinggal <span>*</span></label>
              <input type="text" id="tempat_tinggal_ibu" name="tempat_tinggal_ibu" placeholder="Masukkan tempat tinggal lengkap" required />
            </div>

            <h2>IV. LAMPIRAN PERSYARATAN</h2>
            <div className="upload-box">
              <label htmlFor="file_kk">Unggah KK <span>*</span></label>
              <input type="file" id="file_kk" name="kk" required />
            </div>

            <div className="upload-box">
              <label htmlFor="file_pengantar_rt">Unggah Surat Pengantar RT <span>*</span></label>
              <input type="file" id="file_pengantar_rt" name="pengantar_rt" required />
            </div>

            <div className="upload-box">
              <label htmlFor="ponsel">Nomor Ponsel <span>*</span></label>
              <input type="tel" id="ponsel" name="ponsel" placeholder="08123456789" required />
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
