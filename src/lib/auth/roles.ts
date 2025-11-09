// src/lib/auth/roles.ts

// Daftar email admin
export const ADMIN_EMAILS = [
  "admin@gmail.com",       // ubah sesuai email admin kamu
  "kepaladesa@gmail.com",
];

// Cek apakah email termasuk admin
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
}
