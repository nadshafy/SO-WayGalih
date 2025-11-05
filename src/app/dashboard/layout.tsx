"use client";

import type { ReactNode } from "react";

import AuthGuard from "@/src/components/auth/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthGuard adminOnly>{children}</AuthGuard>;
}
