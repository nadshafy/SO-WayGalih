export const ADMIN_EMAILS = [
  "admin@gmail.com",      
  "kepaladesa@gmail.com",
];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
}
