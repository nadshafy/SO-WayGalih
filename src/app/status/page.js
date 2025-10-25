// src/pages/status.js
"use client";

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Status() {
  const [nik, setNik] = useState('')
  const [statusData, setStatusData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock data untuk testing
  const mockData = {
    '1234567890123456': {
      verifikasi: 1,
      nama: 'Ahmad Pratama',
      jenisSurat: 'Surat Keterangan Domisili',
      tanggalPengajuan: '20 Oktober 2025'
    },
    '1234567890123457': {
      verifikasi: 2,
      nama: 'Siti Nurhaliza',
      jenisSurat: 'Surat Keterangan Tidak Mampu',
      tanggalPengajuan: '19 Oktober 2025'
    },
    '1234567890123458': {
      verifikasi: 3,
      nama: 'Budi Santoso',
      jenisSurat: 'Surat Domisili Perusahaan',
      tanggalPengajuan: '18 Oktober 2025'
    },
    '1234567890123459': {
      verifikasi: 4,
      nama: 'Dewi Lestari',
      jenisSurat: 'Surat Keterangan Asal Usul',
      tanggalPengajuan: '15 Oktober 2025',
      alasanTolak: 'Data alamat tidak sesuai dengan KK'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!/^[0-9]{16}$/.test(nik)) {
      setError('NIK harus 16 digit angka')
      return
    }

    setLoading(true)
    setTimeout(() => {
      if (mockData[nik]) {
        setStatusData(mockData[nik])
      } else {
        setError('NIK tidak ditemukan')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <>
      <Head>
        <title>Status Pengajuan - Desa Way Galih</title>
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: '#1e40af', 
          color: 'white',
          padding: '20px 16px'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '12px'
            }}>
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={40} 
                height={40}
              />
              <div style={{ fontSize: '13px', lineHeight: '1.2' }}>
                Desa<br/>
                <strong style={{ fontSize: '15px' }}>Way Galih</strong>
              </div>
            </div>
            <h1 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '8px 0 4px 0'
            }}>
              STATUS PENGAJUAN SURAT ONLINE
            </h1>
            <p style={{ 
              fontSize: '12px', 
              textAlign: 'center',
              margin: '3px 0',
              opacity: 0.95
            }}>
              Layanan Pengurusan Surat Secara Online
            </p>
            <p style={{ 
              fontSize: '12px', 
              textAlign: 'center',
              margin: '3px 0',
              opacity: 0.95
            }}>
              Proses Lebih Mudah dan Cepat
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          padding: '24px 16px'
        }}>
          {!statusData ? (
            /* Form */
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                fontSize: '22px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#333'
              }}>
                Cek Status Pengajuan
              </h2>
              <p style={{ 
                color: '#666',
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                Masukkan NIK untuk melihat status pengajuan surat Anda
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block',
                    fontWeight: '600',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                    NIK <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={nik}
                    onChange={(e) => {
                      setNik(e.target.value)
                      setError('')
                    }}
                    maxLength="16"
                    placeholder="Masukkan 16 digit NIK"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: error ? '2px solid #dc2626' : '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {error && (
                    <p style={{ 
                      color: '#dc2626',
                      fontSize: '13px',
                      marginTop: '6px'
                    }}>
                      {error}
                    </p>
                  )}
                  <small style={{ 
                    display: 'block',
                    color: '#999',
                    fontSize: '12px',
                    marginTop: '6px'
                  }}>
                    Contoh: 1234567890123456, 1234567890123457, 1234567890123458, 1234567890123459
                  </small>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: loading ? '#9ca3af' : '#1e40af',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Memuat...' : 'Cek Status'}
                  </button>
                  <Link
                    href="/"
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}
                  >
                    Kembali
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            /* Status Display - PERSIS FIGMA */
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              {/* Timeline Container */}
              <div style={{ position: 'relative' }}>
                {/* Garis Vertikal - PERSIS FIGMA */}
                <div style={{
                  position: 'absolute',
                  left: '14px',
                  top: '14px',
                  bottom: '0',
                  width: '2px',
                  backgroundColor: '#1e40af'
                }}></div>

                {/* Steps */}
                {(() => {
                  const steps = [
                    { 
                      id: 1, 
                      title: 'Surat berhasil diajukan',
                      desc: 'Pengajuan Berhasil! Surat Anda telah terekam dalam sistem dan sedang menunggu verifikasi awal.'
                    },
                    { 
                      id: 2, 
                      title: 'Surat sedang diproses',
                      desc: 'Sedang Dalam Proses Verifikasi. Kepala Urusan (Kaur) sedang meninjau dan memvalidasi kelengkapan data surat Anda.'
                    },
                    { 
                      id: 3, 
                      title: 'Surat disetujui / tidak disetujui',
                      desc: 'Menunggu keputusan akhir dari Kepala Desa'
                    },
                    { 
                      id: 4, 
                      title: 'Proses pengajuan selesai',
                      desc: 'Menunggu penyelesaian proses'
                    }
                  ]

                  return steps.map((step, index) => {
                    let status = 'pending'
                    let customTitle = step.title
                    let customDesc = step.desc

                    // Logika if-else
                    if (statusData.verifikasi === 1) {
                      if (step.id === 1) status = 'success'
                    } else if (statusData.verifikasi === 2) {
                      if (step.id <= 2) status = 'success'
                    } else if (statusData.verifikasi === 3) {
                      if (step.id <= 3) status = 'success'
                      if (step.id === 3) {
                        customTitle = 'Surat disetujui'
                        customDesc = 'Selesai dan Siap Diambil! Surat Anda sudah jadi dan dapat diambil di Kantor Desa pada jam kerja.'
                      }
                    } else if (statusData.verifikasi === 4) {
                      if (step.id <= 2) status = 'success'
                      if (step.id === 3) {
                        status = 'rejected'
                        customTitle = 'Surat tidak disetujui'
                        customDesc = `Terdapat Kendala. Pengajuan Anda ditolak/perlu revisi. ${statusData.alasanTolak || ''}`
                      }
                    }

                    return (
                      <div
                        key={step.id}
                        style={{
                          position: 'relative',
                          paddingLeft: '50px',
                          marginBottom: index < steps.length - 1 ? '32px' : '0',
                          opacity: status === 'pending' ? 0.3 : 1
                        }}
                      >
                        {/* Circle - TEPAT DI TENGAH GARIS */}
                        <div style={{
                          position: 'absolute',
                          left: '0',
                          top: '2px',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: 
                            status === 'rejected' ? '#ef4444' :
                            status === 'success' ? '#22c55e' : '#e5e7eb',
                          border: status === 'pending' ? '4px solid #1e40af' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          zIndex: 2
                        }}>
                          {status === 'success' && '✓'}
                          {status === 'rejected' && '✕'}
                        </div>

                        {/* Badge */}
                        <div style={{
                          display: 'inline-block',
                          backgroundColor: status === 'rejected' ? '#fecaca' : '#bfdbfe',
                          color: status === 'rejected' ? '#dc2626' : '#1e40af',
                          padding: '6px 14px',
                          borderRadius: '16px',
                          fontSize: '13px',
                          fontWeight: '600',
                          marginBottom: '8px'
                        }}>
                          {customTitle}
                        </div>

                        {/* Description */}
                        <p style={{
                          margin: '0',
                          fontSize: '14px',
                          color: '#6b7280',
                          lineHeight: '1.6'
                        }}>
                          {customDesc}
                        </p>

                        {/* Button for rejected */}
                        {status === 'rejected' && (
                          <button
                            onClick={() => alert('Detail penolakan')}
                            style={{
                              marginTop: '10px',
                              padding: '8px 16px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Lihat Detail Penolakan
                          </button>
                        )}
                      </div>
                    )
                  })
                })()}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button
                  onClick={() => {
                    setStatusData(null)
                    setNik('')
                  }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#1e40af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cek NIK Lain
                </button>
                <Link
                  href="/"
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}
                >
                  Kembali
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#1e40af',
          color: 'white',
          padding: '24px 16px',
          marginTop: '40px'
        }}>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px'
            }}>
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={35} 
                height={35}
              />
              <div style={{ fontSize: '13px', lineHeight: '1.2' }}>
                Desa<br/>
                <strong>Way Galih</strong>
              </div>
            </div>
            <p style={{ 
              fontSize: '13px',
              margin: '6px 0',
              fontWeight: '600'
            }}>
              Mekanisme Pengajuan Surat
            </p>
            <p style={{ 
              fontSize: '13px',
              margin: '6px 0'
            }}>
              Jenis Surat Online
            </p>
            <p style={{ 
              fontSize: '11px',
              marginTop: '16px',
              opacity: 0.8
            }}>
              © 2025 Pemerintah Desa Way Galih, dan seluruh hak cipta.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}