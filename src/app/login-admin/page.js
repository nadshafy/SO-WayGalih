// src/pages/login-admin.js
"use client";

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginAdmin() {
  return (
    <>
      <Head>
        <title>Login Admin - Way Galih</title>
      </Head>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-content">
            <div className="auth-header">
              <h1>SELAMAT DATANG</h1>
              <Image
                src="/images/logo.png"
                alt="Logo Way Galih"
                width={100}
                height={100}
                className="auth-logo"
              />
              <p className="auth-subtitle">MASUK KE AKUN ADMIN</p>
            </div>

            <div className="auth-divider">
              <span>Login dengan</span>
            </div>

            <Link href="/dashboard" className="google-auth-btn">
              <Image
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
                width={24}
                height={24}
              />
              <span>Masuk dengan Google</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}