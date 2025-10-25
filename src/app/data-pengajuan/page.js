// src/pages/data-pengajuan.js
"use client";

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function DataPengajuan() {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [currentRow, setCurrentRow] = useState(null)
  const [alasan, setAlasan] = useState('')
  const [statusData, setStatusData] = useState([
    { id: 1, nomor: '0000000xxxxx', jenis: 'Surat Keterangan Domisili', tanggal: '06-09-2025', status: '' },
    { id: 2, nomor: '0000001xxxxx', jenis: 'Surat Pengantar RT/RW', tanggal: '07-09-2025', status: '' },
    { id: 3, nomor: '0000002xxxxx', jenis: 'Surat Keterangan Tidak Mampu', tanggal: '08-09-2025', status: '' },
    { id: 4, nomor: '0000003xxxxx', jenis: 'Surat Keterangan Usaha', tanggal: '09-09-2025', status: '' },
    { id: 5, nomor: '0000004xxxxx', jenis: 'Surat Keterangan Pindah', tanggal: '10-09-2025', status: '' }
  ])

  const ubahStatus = (id, diterima) => {
    setStatusData(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: diterima ? 'Selesai' : 'Ditolak' }
        : item
    ))
  }

  const bukaPopup = (id) => {
    setCurrentRow(id)
    setShowPopup(true)
    setAlasan('')
  }

  const tutupPopup = () => {
    setShowPopup(false)
    setCurrentRow(null)
    setAlasan('')
  }

  const kirimAlasan = () => {
    if (!alasan.trim()) {
      alert('Harap tuliskan alasan terlebih dahulu.')
      return
    }
    
    setStatusData(prev => prev.map(item => 
      item.id === currentRow 
        ? { ...item, status: `Ditolak - ${alasan}` }
        : item
    ))
    tutupPopup()
  }

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin log out?')) {
      router.push('/login-admin')
    }
  }

  return (
    <>
      <Head>
        <title>Data Pengajuan - Desa Way Galih</title>
      </Head>

      <div style={{ backgroundColor: '#f5f8ff', minHeight: '100vh', color: '#1a1a1a' }}>
        <header style={{
          backgroundColor: '#003399',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 30px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Image src="/images/logo.png" alt="Logo Desa" width={40} height={40} />
            <div>
              <strong>Desa</strong><br />Way Galih
            </div>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: 500,
              padding: '8px 15px',
              borderRadius: '20px'
            }}>
              Dashboard
            </Link>
            <Link href="/data-pengajuan" style={{ 
              color: 'white',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '8px 15px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              color: '#003399'
            }}>
              Data Pengajuan
            </Link>
            <a href="#" onClick={handleLogout} style={{ 
              color: 'white',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '8px 15px',
              borderRadius: '20px',
              cursor: 'pointer'
            }}>
              Log Out
            </a>
          </nav>
        </header>

        <div style={{ padding: '30px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#003399',
            fontSize: '24px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            🧾 Data Pengajuan
          </div>

          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            overflowX: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '700px'
            }}>
              <thead>
                <tr>
                  <th style={{
                    textAlign: 'left',
                    backgroundColor: '#e7edff',
                    color: '#003399',
                    padding: '10px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>
                    <input type="checkbox" id="checkAll" />
                    <label htmlFor="checkAll" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
                      Pilih semua
                    </label>
                  </th>
                  <th style={{
                    textAlign: 'left',
                    backgroundColor: '#e7edff',
                    color: '#003399',
                    padding: '10px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>Nomor Pengajuan</th>
                  <th style={{
                    textAlign: 'left',
                    backgroundColor: '#e7edff',
                    color: '#003399',
                    padding: '10px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>Jenis Surat</th>
                  <th style={{
                    textAlign: 'left',
                    backgroundColor: '#e7edff',
                    color: '#003399',
                    padding: '10px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>Tanggal Pengajuan</th>
                  <th style={{
                    textAlign: 'left',
                    backgroundColor: '#e7edff',
                    color: '#003399',
                    padding: '10px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>Verifikasi</th>
                  <th style={{
                    textAlign: 'left',
                    backgroundColor: '#e7edff',
                    color: '#003399',
                    padding: '10px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>Status</th>
                  <th style={{
                    textAlign: 'left',
                    backgroundColor: '#e7edff',
                    color: '#003399',
                    padding: '10px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}></th>
                </tr>
              </thead>
              <tbody>
                {statusData.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      whiteSpace: 'nowrap'
                    }}>
                      <input type="checkbox" id={`cek${index + 1}`} />
                    </td>
                    <td style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      whiteSpace: 'nowrap'
                    }}>{item.nomor}</td>
                    <td style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      whiteSpace: 'nowrap'
                    }}>{item.jenis}</td>
                    <td style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      whiteSpace: 'nowrap'
                    }}>{item.tanggal}</td>
                    <td style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      whiteSpace: 'nowrap'
                    }}>
                      <button 
                        onClick={() => ubahStatus(item.id, true)}
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          background: 'none',
                          fontSize: '18px',
                          marginRight: '10px'
                        }}
                      >
                        ✓
                      </button>
                      <button 
                        onClick={() => ubahStatus(item.id, false)}
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          background: 'none',
                          fontSize: '18px'
                        }}
                      >
                        ✖
                      </button>
                    </td>
                    <td style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      whiteSpace: 'normal',
                      maxWidth: '150px',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: item.status.includes('Selesai') ? '#0f9d58' : item.status.includes('Ditolak') ? '#db4437' : '#333'
                    }}>
                      {item.status}
                    </td>
                    <td style={{
                      padding: '10px',
                      borderBottom: '1px solid #eee',
                      whiteSpace: 'nowrap'
                    }}>
                      <button 
                        onClick={() => bukaPopup(item.id)}
                        style={{
                          backgroundColor: '#003399',
                          color: 'white',
                          padding: '5px 10px',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popup */}
        {showPopup && (
          <div style={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}>
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '20px',
              width: '90%',
              maxWidth: '400px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease-in-out'
            }}>
              <h3>Alasan Verifikasi</h3>
              <textarea
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                placeholder="Tuliskan alasan Anda di sini..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '10px',
                  marginTop: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  resize: 'none',
                  fontSize: '13px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
              <button 
                onClick={kirimAlasan}
                style={{
                  backgroundColor: '#003399',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '15px',
                  marginRight: '10px'
                }}
              >
                Kirim
              </button>
              <button 
                onClick={tutupPopup}
                style={{
                  backgroundColor: '#aaa',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '15px'
                }}
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}