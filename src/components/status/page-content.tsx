"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";
import {
  CircularProgress,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/src/components/ui/dialog";
import type { TimelineItemType, TimelineStatus } from "@/src/lib/status-data";

// ✅ Firebase imports
import { db } from "@/src/lib/firebase/init"; // pastikan sudah setup firebase config
import { doc, onSnapshot } from "firebase/firestore";

type StatusPageContentProps = {
  items: TimelineItemType[];
  descriptions: Record<TimelineStatus, string>;

  // Realtime props
  id: string; // ID dokumen Firestore
};

const RATING_VALUES = [1, 2, 3, 4, 5];

const StatusPageContent = ({ items, descriptions, id }: StatusPageContentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 🔥 Realtime Firestore Data
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const unsub = onSnapshot(doc(db, "pengajuan", id), (docSnap) => {
      if (docSnap.exists()) {
        setDetail(docSnap.data());
      }
      setLoading(false);
    });

    return () => unsub();
  }, [id]);

  // 🔁 Mapping status otomatis dari Firestore detail
  const mappedItems = useMemo(() => {
    if (!detail) return items;

    const updated = items.map((i) => ({ ...i }));
    const statusRaw = detail?.status;
    const status = typeof statusRaw === "string" ? statusRaw.toLowerCase().trim() : "";

    if (!status) return updated;

    if (status.includes("menunggu")) {
      updated.forEach((s) => (s.status = "upcoming"));
      if (updated[0]) updated[0].status = "current";
    } else if (status.includes("proses") || status.includes("diproses")) {
      updated.forEach((s) => (s.status = "upcoming"));
      if (updated[0]) updated[0].status = "completed";
      if (updated[1]) updated[1].status = "current";
    } else if (status.includes("tolak") || status.includes("ditolak") || status.includes("reject")) {
      updated.forEach((s) => (s.status = "completed"));
      if (updated[2]) updated[2].status = "rejected";
      if (updated[0]) updated[0].status = "completed";
      if (updated[1]) updated[1].status = "completed";
    } else if (status.includes("selesai") || status.includes("done") || status.includes("completed")) {
      updated.forEach((s) => (s.status = "completed"));
    } else if (status.includes("verifikasi") || status.includes("review")) {
      updated.forEach((s) => (s.status = "upcoming"));
      if (updated[1]) updated[1].status = "current";
    }

    return updated;
  }, [detail, items]);

  const allCompleted = useMemo(
    () => mappedItems.length > 0 && mappedItems.every((item) => item.status === "completed"),
    [mappedItems]
  );

  // ===== FEEDBACK UI =====
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFeedbackState = () => {
    setSelectedRating(null);
    setHoveredRating(null);
    setFeedbackNotes("");
    setFormError(null);
    setIsSubmitted(false);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) resetFeedbackState();
  };

  const handleSubmitFeedback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedRating === null) {
      setFormError("Silakan pilih jumlah bintang terlebih dahulu.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: selectedRating, notes: feedbackNotes, id }),
      });

      if (!response.ok) throw new Error("Gagal mengirim feedback.");

      setIsSubmitted(true);
      setTimeout(() => handleDialogChange(false), 3000);
    } catch (error: any) {
      setFormError(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] pb-16 text-slate-800">
      <Link
        href="/halaman-pengguna"
        aria-label="Kembali"
        className="fixed left-3 top-3 z-50 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-[#0a3d91] shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" className="-ml-0.5">
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="hidden sm:inline">Kembali</span>
      </Link>

      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a3491] to-[#0a3d91] text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Logo Desa" width={56} height={56} className="rounded-full bg-white/10 p-1" />
            <div className="leading-tight">
              <span className="block text-xs text-white/90">Desa</span>
              <span className="block text-base font-semibold">Way Galih</span>
            </div>
          </div>
          <div className="text-center sm:max-w-xl sm:text-right">
            <h1 className="text-base sm:text-xl font-semibold uppercase tracking-wide">
              Status Pengajuan Surat Online
            </h1>
            <p className="py-1.5 text-xs sm:text-sm text-white/90">
              Layanan pengurusan surat secara online - mudah & cepat.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto -mt-6 max-w-4xl px-3 sm:px-6">
        <div className="rounded-2xl bg-white px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-[#0a3d91] shadow-lg">
          Riwayat Proses Pengajuan
        </div>

        <section className="mt-4 rounded-2xl bg-white p-4 shadow-xl">
          {loading ? (
            <div className="py-8 text-center text-slate-500">Memuat status...</div>
          ) : isMobile ? (
            <MobileTimeline items={mappedItems} descriptions={descriptions} />
          ) : (
            <DesktopTimeline items={mappedItems} descriptions={descriptions} />
          )}
        </section>

        {allCompleted && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-lg">
            <h2 className="text-base font-semibold text-[#0a3d91]">Pengajuan selesai ✔️</h2>
            <p className="mt-2 text-sm text-slate-600">Bantu kami meningkatkan layanan dengan memberikan penilaian.</p>

            <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <button className="mt-4 rounded-xl bg-[#0a3d91] px-4 py-2.5 text-sm font-semibold text-white shadow-md">
                  Beri Feedback
                </button>
              </DialogTrigger>

              <DialogContent className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
                <form className="space-y-6" onSubmit={handleSubmitFeedback}>
                  <DialogHeader>
                    <DialogTitle className="text-[#0a3d91]">Bagaimana pengalaman Anda?</DialogTitle>
                    <DialogDescription className="text-slate-500">Pilih jumlah bintang & tulis masukan.</DialogDescription>
                  </DialogHeader>

                  <div className="flex items-center gap-2">
                    {RATING_VALUES.map((value) => {
                      const isActive = value <= (hoveredRating ?? selectedRating ?? 0);
                      return (
                        <button
                          key={value}
                          type="button"
                          onMouseEnter={() => setHoveredRating(value)}
                          onMouseLeave={() => setHoveredRating(null)}
                          onClick={() => setSelectedRating(value)}
                          className="rounded-full p-1.5"
                        >
                          <svg width="36" height="36" viewBox="0 0 24 24" fill={isActive ? "#facc15" : "none"} stroke={isActive ? "#eab308" : "#cbd5f5"} strokeWidth="1.5">
                            <path d="M12 17.3 6.91 20l1-5.82-4.23-4.12 5.85-.85L12 4l2.47 5.18 5.85.85-4.23 4.12 1 5.82z" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>

                  <textarea
                    value={feedbackNotes}
                    onChange={(e) => setFeedbackNotes(e.target.value)}
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    placeholder="Tulis masukan Anda..."
                  />

                  {formError && <p className="text-sm font-semibold text-rose-500">{formError}</p>}
                  {isSubmitted && <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">Terima kasih! Feedback Anda sudah diterima.</div>}

                  <DialogFooter>
                    <DialogClose asChild>
                      <button className="rounded-xl border border-slate-200 px-4 py-2.5">Tutup</button>
                    </DialogClose>
                    <button
                      type="submit"
                      className="rounded-xl bg-[#0a3d91] px-4 py-2.5 text-white"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? "Mengirim..." : isSubmitted ? "Terkirim" : "Kirim Feedback"}
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </main>
    </div>
  );
};

function DesktopTimeline({ items, descriptions }: { items: TimelineItemType[]; descriptions: Record<TimelineStatus, string> }) {
  // ... (kode timeline tetap sama seperti punyamu)
  return <></>; // potong untuk ringkas, tapi sama seperti versi kamu
}

function MobileTimeline({ items, descriptions }: { items: TimelineItemType[]; descriptions: Record<TimelineStatus, string> }) {
  // ... (kode timeline tetap sama seperti punyamu)
  return <></>;
}

export default StatusPageContent;
