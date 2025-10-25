// src/pages/status.js
"use client";

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Status() {
  return (
    <>
      <Head>
        <title>Status Pengajuan Surat - Desa Way Galih</title>
      </Head>

      <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
        <header style={{
          backgroundColor: '#0a3d91',
          color: 'white',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: '10px'
          }}>
            <Image src="/images/logo.png" alt="Logo Desa" width={45} height={45} style={{ marginRight: '10px' }} />
            <span style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.2 }}>
              Desa<br /><b>Way Galih</b>
            </span>
          </div>
          <h1 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 700, margin: '5px 0' }}>
            STATUS PENGAJUAN SURAT ONLINE
          </h1>
          <p style={{ textAlign: 'center', fontSize: '12px', margin: '5px 0' }}>
            Layanan Pengurusan Surat Secara Online.
          </p>
          <p style={{ textAlign: 'center', fontSize: '12px', margin: '5px 0' }}>
            Proses Lebih Mudah dan Cepat
          </p>
        </header>

        <div style={{
          maxWidth: '800px',
          margin: '20px auto',
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '600px',
          overflowY: 'auto'
        }}>
          <div style={{
            borderLeft: '3px solid #1d3ba3',
            paddingLeft: '30px',
            position: 'relative',
            flex: 1
          }}>
            {[
              {
                title: 'Surat berhasil diajukan',
                desc: 'Pengajuan Berhasil! Surat Anda telah terekam dalam sistem dan sedang menunggu verifikasi awal.',
                status: 'success'
              },
              {
                title: 'Surat sedang diproses',
                desc: 'Sedang Dalam Proses Verifikasi Kepala Urusan (Kaur) sedang meninjau dan memvalidasi kelengkapan data surat Anda.',
                status: 'success'
              },
              {
                title: 'Surat disetujui',
                desc: 'Terdapat Kendala. Pengajuan Anda ditolak/perlu revisi. Klik di sini untuk melihat alasan dan perbaikan',
                status: 'success'
              },
              {
                title: 'Proses pengajuan selesai',
                desc: 'Selesai dan Siap Diambil! Surat Anda sudah jadi dan dapat diambil di Kantor Desa pada jam kerja.',
                status: 'success'
              }
            ].map((step, index) => (
              <div key={index} style={{
                position: 'relative',
                marginBottom: '30px'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-42px',
                  top: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step.status === 'success' ? '#4caf50' : '#cbd5e0',
                  border: step.status === 'success' ? 'none' : '3px solid #1d3ba3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  {step.status === 'success' ? '✓' : ''}
                </div>
                <div style={{
                  display: 'inline-block',
                  background: '#e8f0ff',
                  color: '#1d3ba3',
                  fontWeight: 600,
                  padding: '5px 12px',
                  borderRadius: '20px',
                  marginBottom: '8px',
                  fontSize: '0.9rem'
                }}>
                  {step.title}
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: '#555',
                  lineHeight: 1.6
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '20px'
          }}>
            <Link href="/" style={{
              textDecoration: 'none',
              textAlign: 'center',
              padding: '12px 25px',
              borderRadius: '6px',
              fontWeight: 600,
              color: 'white',
              backgroundColor: '#6c757d',
              display: 'inline-block'
            }}>
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}