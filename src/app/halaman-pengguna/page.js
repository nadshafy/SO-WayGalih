// src/pages/halaman-pengguna.js
"use client";

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function HalamanPengguna() {
  return (
    <>
      <Head>
        <title>Halaman Pengguna - Desa Way Galih</title>
        <meta name="description" content="Layanan Pengurusan Surat Secara Online" />
      </Head>

      <div className="pengguna-page">
        {/* HEADER */}
        <header>
          <div className="top-bar">
            <div className="logo-area">
              <Image src="/images/logo.png" alt="Logo Desa" width={50} height={50} />
              <div className="logo-text">
                <span className="desa">Desa</span>
                <span className="way-galih">Way Galih</span>
              </div>
            </div>

            <div className="menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="hero">
            <h1>SELAMAT DATANG DI WEBSITE ADMINISTRASI</h1>
            <p>
              Layanan Pengurusan Surat Secara Online.<br />
              Proses Lebih Mudah Dan Cepat
            </p>
          </div>
        </header>

        {/* BUTTONS */}
        <div className="buttons">
          <Link href="/login-pengguna" className="btn primary">
            DAFTAR AKUN SEKARANG
          </Link>
          <Link href="/login-pengguna" className="btn secondary">
            MASUK KE AKUN ANDA
          </Link>
        </div>

        {/* MEKANISME */}
        <section>
          <h2>MEKANISME PENGAJUAN SURAT ONLINE</h2>
          <div className="steps">
            <div className="step">
              <div className="icon">
                <Image src="/images/tentukansurat.png" alt="Ikon Tentukan Surat" width={50} height={50} />
              </div>
              <h4>Menentukan Surat</h4>
              <p>Memilih Surat Online yang ingin diajukan</p>
            </div>
            <div className="step">
              <div className="icon">
                <Image src="/images/isi.png" alt="Ikon Isi Formulir" width={50} height={50} />
              </div>
              <h4>Mengisi Formulir</h4>
              <p>Mengisi data diri dan unggahan lampiran persyaratan sesuai dengan surat yang diajukan</p>
            </div>
            <div className="step">
              <div className="icon">
                <Image src="/images/verifikasi.png" alt="Ikon Verifikasi" width={50} height={50} />
              </div>
              <h4>Menunggu Verifikasi</h4>
              <p>Menunggu verifikasi oleh operator mengenai surat yang diajukan</p>
            </div>
            <div className="step">
              <div className="icon">
                <Image src="/images/selesai.png" alt="Ikon Selesai" width={50} height={50} />
              </div>
              <h4>Proses Pengajuan Selesai</h4>
              <p>Pengajuan surat berhasil atau valid, surat akan diterbitkan</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
