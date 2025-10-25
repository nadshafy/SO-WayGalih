// src/pages/dashboard.js
"use client";

import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('harian')
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const router = useRouter()

  const dataSet = {
    harian: {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      data: [80, 65, 100, 75, 90, 55, 70]
    },
    mingguan: {
      labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      data: [350, 420, 480, 520]
    },
    tahunan: {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      data: [400, 460, 530, 590, 640]
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const chartData = dataSet[activeTab]
      
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: `Data ${activeTab}`,
            data: chartData.data,
            borderColor: '#003399',
            backgroundColor: 'rgba(0, 51, 153, 0.2)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#003399',
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [activeTab])

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin log out?')) {
      alert('Anda telah keluar dari akun.')
      router.push('/login-admin')
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard | Desa Way Galih</title>
      </Head>

      <div style={{ backgroundColor: '#f4f6fb', minHeight: '100vh' }}>
        {/* HEADER */}
        <header style={{
          backgroundColor: '#003399',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 25px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/images/logo.png" alt="Logo Desa" width={45} height={45} style={{ borderRadius: '50%' }} />
            <div>
              <div style={{ fontSize: '14px', color: '#dce4ff' }}>Desa</div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>Way Galih</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '15px' }}>
            <Link href="/dashboard" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '8px 15px',
              borderRadius: '20px',
              backgroundColor: 'white',
              color: '#003399',
              fontWeight: 500
            }}>
              Dashboard
            </Link>
            <Link href="/data-pengajuan" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '8px 15px',
              borderRadius: '20px',
              fontWeight: 500
            }}>
              Data Pengajuan
            </Link>
            <a href="#" onClick={handleLogout} style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '8px 15px',
              borderRadius: '20px',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              Log Out
            </a>
          </nav>
        </header>

        {/* MAIN */}
        <main style={{ padding: '25px', maxWidth: '1200px', margin: 'auto' }}>
          <div style={{ 
            fontSize: '26px', 
            fontWeight: 600, 
            color: '#003399',
            marginBottom: '20px'
          }}>
            📊 Dashboard
          </div>

          {/* TABS */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: '#dce4ff',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '25px',
            flexWrap: 'wrap'
          }}>
            {['harian', 'mingguan', 'tahunan'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: activeTab === tab ? 'white' : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 600 : 500,
                  color: '#003399',
                  boxShadow: activeTab === tab ? '0 3px 8px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Statistik {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* CHART */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ 
              fontSize: '16px',
              fontWeight: 600,
              color: '#003399',
              marginBottom: '10px'
            }}>
              📈 Statistik
            </h3>
            <div style={{ height: '350px' }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}