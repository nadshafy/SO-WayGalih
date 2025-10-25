// src/pages/login-pengguna.js
"use client";

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPengguna() {
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()

  const handleGoogleAuth = () => {
    // Simulasi login dengan Google
    alert(isLogin ? 'Login berhasil!' : 'Registrasi berhasil!')
    router.push('/') // Redirect ke halaman utama setelah login
  }

  return (
    <>
      <Head>
        <title>{isLogin ? 'Login' : 'Daftar'} - Way Galih</title>
      </Head>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-content">
            <div className="auth-header">
              <h1 id="authTitle">
                {isLogin ? 'SELAMAT DATANG KEMBALI' : 'SELAMAT DATANG'}
              </h1>
              <Image
                src="/images/logo.png"
                alt="Logo Way Galih"
                width={100}
                height={100}
                className="auth-logo"
              />
              <p className="auth-subtitle" id="authSubtitle">
                {isLogin ? 'MASUK KE AKUN ANDA KEMBALI' : 'DAFTARKAN AKUN ANDA SEKARANG'}
              </p>
            </div>

            <div className="auth-divider">
              <span>Login atau Daftar dengan</span>
            </div>

            <button onClick={handleGoogleAuth} className="google-auth-btn">
              <Image
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
                width={24}
                height={24}
              />
              <span id="authButtonText">
                {isLogin ? 'Masuk dengan Google' : 'Daftar dengan Google'}
              </span>
            </button>

            <div className="auth-switch">
              <span id="switchMessage">
                {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
              </span>{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin) }} id="switchLink">
                {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}