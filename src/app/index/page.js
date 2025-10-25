// src/pages/index.js
"use client";

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'


export default function Home() {
  return (
    <>
      <Head>
        <title>Website Administrasi Desa Way Galih</title>
        <meta name="description" content="Layanan Pengurusan Surat Secara Online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="index-page">
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

        {/* JENIS SURAT */}
        <section>
          <h2>JENIS SURAT ONLINE</h2>
          <div className="surat-list">
            <Link href="/domisili" className="surat-item">
              Surat Keterangan Domisili
              <Image src="/images/arrow.png" alt="arrow" width={20} height={20} />
            </Link>
            <Link href="/perusahaan" className="surat-item">
              Surat Keterangan Domisili Perusahaan
              <Image src="/images/arrow.png" alt="arrow" width={20} height={20} />
            </Link>
            <Link href="/sktm" className="surat-item">
              Surat Keterangan Tidak Mampu (BPJS)
              <Image src="/images/arrow.png" alt="arrow" width={20} height={20} />
            </Link>
            <Link href="/sktms" className="surat-item">
              Surat Keterangan Tidak Mampu (Sekolah)
              <Image src="/images/arrow.png" alt="arrow" width={20} height={20} />
            </Link>
            <Link href="/asal-usul" className="surat-item">
              Surat Keterangan Asal-Usul
              <Image src="/images/arrow.png" alt="arrow" width={20} height={20} />
            </Link>
            <Link href="/status" className="surat-item">
              Lihat Status Pengajuan
              <Image src="/images/arrow.png" alt="arrow" width={20} height={20} />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}