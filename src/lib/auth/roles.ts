"use client";

const adminList = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((entry) => entry.trim().toLowerCase())
  .filter(Boolean);

export const isAdminEmail = (email: string | null | undefined) => {
  if (!email) return false;
  return adminList.includes(email.toLowerCase());
};

export const getDeclaredAdminEmails = () => [...adminList];
