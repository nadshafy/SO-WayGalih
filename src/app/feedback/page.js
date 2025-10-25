// src/pages/feedback.js
"use client";

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';


export default function Feedback() {
  const router = useRouter()
  const { nama, jenisSurat, verifikasi } = router.query

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Mohon berikan rating terlebih dahulu')
      return
    }

    // Simulasi submit feedback - nanti ganti dengan API
    console.log({
      rating,
      feedback,
      nama,
      jenisSurat,
      verifikasi
    })

    setSubmitted(true)
    
    // Redirect ke homepage setelah 2 detik
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Feedback - Desa Way Galih</title>
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
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {!submitted ? (
              <>
                {/* Success Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                  <span style={{
                    backgroundColor: '#bfdbfe',
                    color: '#1e40af',
                    padding: '6px 14px',
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    Surat berhasil diajukan
                  </span>
                </div>

                {/* Info Text */}
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginBottom: '24px',
                  lineHeight: '1.6'
                }}>
                  Pengajuan Berhasil! Surat Anda telah terekam dalam sistem dan sedang menunggu verifikasi awal.
                </p>

                {/* Rating Section */}
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '24px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#333'
                  }}>
                    SEBERAPA PUAS ANDA ?
                  </h3>

                  {/* Star Rating */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '24px',
                    justifyContent: 'center'
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          fontSize: '36px',
                          color: star <= (hoveredRating || rating) ? '#1e40af' : '#d1d5db',
                          transition: 'color 0.2s'
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  {/* Feedback Form */}
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block',
                        fontWeight: '600',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: '#333'
                      }}>
                        Kritik dan Saran (Opsional)
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Berikan kritik dan saran untuk pelayanan kami..."
                        rows="4"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="submit"
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
                        Kirim Feedback
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
                        Lewati
                      </Link>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              /* Success Message */
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  margin: '0 auto 20px'
                }}>
                  ✓
                </div>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '12px'
                }}>
                  Terima Kasih!
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  Feedback Anda sangat membantu kami untuk meningkatkan pelayanan
                </p>
              </div>
            )}
          </div>
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