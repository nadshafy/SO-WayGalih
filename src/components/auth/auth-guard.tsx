"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/src/contexts/auth-context";

type AuthGuardProps = {
  children: ReactNode;
  adminOnly?: boolean;
  redirectIfAdmin?: string;
  fallback?: ReactNode;
};

const DEFAULT_FALLBACK = (
  <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500">
    Memuat data pengguna...
  </div>
);

const AuthGuard = ({
  children,
  adminOnly = false,
  redirectIfAdmin,
  fallback = DEFAULT_FALLBACK,
}: AuthGuardProps) => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (adminOnly && role !== "admin") {
      router.replace("/halaman-pengguna");
      return;
    }

    if (!adminOnly && redirectIfAdmin && role === "admin") {
      router.replace(redirectIfAdmin);
    }
  }, [adminOnly, redirectIfAdmin, loading, role, router, user]);

  if (loading) {
    return fallback;
  }

  if (!user) {
    return fallback;
  }

  if (adminOnly && role !== "admin") {
    return fallback;
  }

  if (!adminOnly && redirectIfAdmin && role === "admin") {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
