"use client";

import Image from "next/image";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

type DashboardNavRoute = "dashboard" | "data-pengajuan";

type DashboardHeaderProps = {
  onLogout: () => void | Promise<void>;
  activeRoute?: DashboardNavRoute;
};

const DashboardHeader = ({
  onLogout,
  activeRoute = "dashboard",
}: DashboardHeaderProps) => {
  const isActive = (route: DashboardNavRoute) => activeRoute === route;

  const mobileLinkClass = (route: DashboardNavRoute) =>
    `rounded-xl px-4 py-2 transition ${isActive(route) ? "bg-white text-[#1a3491]" : "text-white hover:bg-white/20"}`;

  const desktopLinkClass = (route: DashboardNavRoute) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive(route)
        ? "bg-white text-[#1a3491] shadow hover:-translate-y-0.5 hover:shadow-lg"
        : "text-white hover:-translate-y-0.5 hover:bg-white/15"
    }`;

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#1a3491] via-[#0f2d7a] to-[#0a3d91] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Logo Desa Way Galih"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full bg-white/10 p-1"
            priority
          />
          <div className="leading-tight">
            <div className="text-sm text-white/80">Desa</div>
            <div className="text-lg font-semibold">Way Galih</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/30 sm:hidden">
              Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-br from-[#1a3491] via-[#0f2d7a] to-[#0a3d91] px-10 text-white">
            <SheetHeader>
              <SheetTitle className="text-left text-white">
                Navigasi Dashboard
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-3 text-sm font-semibold">
              <Link
                href="/dashboard"
                className={mobileLinkClass("dashboard")}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/data-pengajuan"
                className={mobileLinkClass("data-pengajuan")}
              >
                Data Pengajuan
              </Link>
                <AlertDialog>
                  <AlertDialogTrigger className="rounded-xl px-4 py-2 text-left text-white transition hover:bg-white/20">
                    Log Out
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-sm bg-white text-slate-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Keluar dari sesi?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Anda akan keluar dari dashboard admin dan diarahkan ke halaman login. Pastikan semua perubahan telah disimpan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-[#0a3d91] text-white hover:bg-[#072e6f]"
                        onClick={onLogout}
                      >
                        Keluar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </SheetContent>
          </Sheet>

          <nav className="hidden items-center gap-2 rounded-full bg-white/10 p-1 shadow-lg shadow-[#00000026] sm:flex">
            <Link
              href="/dashboard"
              className={desktopLinkClass("dashboard")}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/data-pengajuan"
              className={desktopLinkClass("data-pengajuan")}
            >
              Data Pengajuan
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Log Out
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Keluar dari sesi?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Anda akan keluar dari dashboard admin dan diarahkan ke halaman login. Pastikan semua perubahan telah disimpan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction className="bg-[#0a3d91]" onClick={onLogout}>
                    Keluar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
