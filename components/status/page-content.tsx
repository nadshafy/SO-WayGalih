"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import type { TimelineItemType, TimelineStatus } from "@/lib/status-data";

type StatusPageContentProps = {
  items: TimelineItemType[];
  descriptions: Record<TimelineStatus, string>;
};

type TimelineComponentProps = {
  items: TimelineItemType[];
  descriptions: Record<TimelineStatus, string>;
};

const RATING_VALUES = [1, 2, 3, 4, 5];


const StatusPageContent = ({ items, descriptions }: StatusPageContentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const allCompleted = useMemo(
    () =>
      items.length > 0 && items.every((item) => item.status === "completed"),
    [items],
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetFeedbackState = () => {
    setSelectedRating(null);
    setHoveredRating(null);
    setFeedbackNotes("");
    setFormError(null);
    setIsSubmitted(false);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      resetFeedbackState();
    }
  };

  const handleSubmitFeedback = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedRating === null) {
      setFormError("Silakan pilih jumlah bintang terlebih dahulu.");
      return;
    }
    setFormError(null);
    setIsSubmitted(true);
    // TODO: Integrate with API endpoint when available.
    console.info("Status feedback submitted", {
      rating: selectedRating,
      notes: feedbackNotes,
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] pb-16 text-slate-800">
        {/* Back button */}
        <Link
          href="/halaman-pengguna"
          aria-label="Kembali"
          className="fixed left-3 top-3 z-50 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-[#0a3d91] shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40 sm:left-6 sm:top-6"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="-ml-0.5">
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
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-6 sm:py-10">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Logo Desa Way Galih"
                width={56}
                height={56}
                className="h-12 w-12 rounded-full bg-white/10 p-1 sm:h-14 sm:w-14"
                priority
              />
              <div className="leading-tight">
                <span className="block text-xs sm:text-sm text-white/90">Desa</span>
                <span className="block text-base sm:text-lg font-semibold text-white">
                  Way Galih
                </span>
              </div>
            </div>

            <div className="text-center sm:max-w-xl sm:text-right px-2">
              <h1 className="text-base sm:text-xl font-semibold uppercase tracking-wide">
                Status Pengajuan Surat Online
              </h1>
              <p className="py-1.5 sm:py-2 text-xs sm:text-sm text-white/90">
                Layanan pengurusan surat secara online - mudah & cepat.
              </p>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="mx-auto -mt-6 sm:-mt-8 max-w-4xl px-3 sm:px-6">
          <div className="rounded-2xl bg-white px-4 py-3 sm:px-6 sm:py-5 text-center text-xs sm:text-sm font-bold uppercase tracking-wide text-[#0a3d91] shadow-lg">
            Riwayat Proses Pengajuan
          </div>

          <section className="mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-xl">
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500" /> Selesai
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#0a3d91]" /> Sedang Berjalan
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-slate-300" /> Berikutnya
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-500" /> Ditolak
              </span>
            </div>

            {/* SWITCH HERE */}
            {isMobile ? (
              <MobileTimeline items={items} descriptions={descriptions} />
            ) : (
              <DesktopTimeline items={items} descriptions={descriptions} />
            )}
            <Box sx={{ height: { xs: 8, sm: 0 } }} />
          </section>

          {allCompleted ? (
            <div className="mt-6 sm:mt-8">
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-lg sm:px-6">
                <h2 className="text-base font-semibold text-[#0a3d91] sm:text-lg">
                  Pengajuan selesai ✔️
                </h2>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  Bantu kami meningkatkan layanan dengan memberikan penilaian pada proses pengajuan surat.
                </p>

                <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#0a3d91] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#082f74] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3d91]/50"
                    >
                      Beri Feedback
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-lg rounded-3xl border-0 bg-white p-6 shadow-2xl sm:p-8">
                    <form className="space-y-6" onSubmit={handleSubmitFeedback}>
                      <DialogHeader>
                        <DialogTitle className="text-[#0a3d91]">
                          Bagaimana pengalaman Anda?
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                          Pilih jumlah bintang dan tulis masukan untuk membantu kami menyempurnakan layanan.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="flex items-center gap-2">
                        {RATING_VALUES.map((value) => {
                          const isActive =
                            value <= (hoveredRating ?? selectedRating ?? 0);
                          return (
                            <button
                              key={value}
                              type="button"
                              onMouseEnter={() => setHoveredRating(value)}
                              onMouseLeave={() => setHoveredRating(null)}
                              onFocus={() => setHoveredRating(value)}
                              onBlur={() => setHoveredRating(null)}
                              onClick={() => setSelectedRating(value)}
                              className="rounded-full p-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3d91]/40"
                              aria-label={`Beri rating ${value} bintang`}
                              aria-pressed={selectedRating === value}
                            >
                              <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill={isActive ? "#facc15" : "none"}
                                stroke={isActive ? "#eab308" : "#cbd5f5"}
                                strokeWidth="1.5"
                              >
                                <path
                                  d="M12 17.3 6.91 20l1-5.82-4.23-4.12 5.85-.85L12 4l2.47 5.18 5.85.85-4.23 4.12 1 5.82z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          );
                        })}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-semibold text-[#0a3d91]"
                          htmlFor="feedback-notes"
                        >
                          Ceritakan lebih lanjut (opsional)
                        </label>
                        <textarea
                          id="feedback-notes"
                          value={feedbackNotes}
                          onChange={(event) => setFeedbackNotes(event.target.value)}
                          placeholder="Apa yang berjalan baik? Apa yang bisa ditingkatkan?"
                          rows={4}
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-[#0a3d91] focus:outline-none focus:ring-2 focus:ring-[#0a3d91]/40"
                        />
                      </div>

                      {formError ? (
                        <p className="text-sm font-semibold text-rose-500">{formError}</p>
                      ) : null}

                      {isSubmitted ? (
                        <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700 ring-1 ring-emerald-200">
                          Terima kasih! Feedback Anda sudah kami terima.
                        </div>
                      ) : null}

                      <DialogFooter>
                        <DialogClose asChild>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3d91]/40"
                          >
                            Tutup
                          </button>
                        </DialogClose>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-xl bg-[#0a3d91] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#082f74] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3d91]/50 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-white/80"
                          disabled={isSubmitted}
                        >
                          {isSubmitted ? "Terkirim" : "Kirim Feedback"}
                        </button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    
  );
};

/** -- DESKTOP: your original layout -- */
function DesktopTimeline({ items, descriptions }: TimelineComponentProps) {
  return (
    <Timeline
      sx={{
        mt: 3,
        px: { xs: 0, sm: 1 },
        "& .MuiTimelineItem-root:before": { flex: 0, padding: 0 },
      }}
    >
      {items.map((item, index) => {
        const isCompleted = item.status === "completed";
        const isCurrent = item.status === "current";
        const isUpcoming = item.status === "upcoming";
        const isRejected = item.status === "rejected";
        const isLast = index === items.length - 1;
        const desc =
          item.status === "completed" && item.completedDescription
            ? item.completedDescription
            : descriptions[item.status];

        const dotBgColor = isCompleted
          ? "#10b981"
          : isCurrent
          ? "#0a3d91"
          : isRejected
          ? "#f43f5e"
          : "#e2e8f0";
        const dotTextColor =
          isCompleted || isCurrent || isRejected ? "#fff" : "#475569";
        const connectorColor = isCompleted
          ? "linear-gradient(to bottom, rgba(16,185,129,0.7), rgba(16,185,129,0.05))"
          : isRejected
          ? "linear-gradient(to bottom, rgba(244,63,94,0.7), rgba(244,63,94,0.05))"
          : "linear-gradient(to bottom, rgba(148,163,184,0.8), rgba(148,163,184,0.05))";

        return (
          <TimelineItem key={item.title}>
            <TimelineOppositeContent
              sx={{
                flex: 0.3,
                textAlign: "right",
                pr: { sm: 2.5, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: isCompleted ? "#059669" : isCurrent ? "#0a3d91" : "#97a6c4",
                }}
              >
                {item.timestamp}
              </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: dotBgColor,
                  color: dotTextColor,
                  boxShadow: "0 8px 14px rgba(15, 23, 42, 0.16)",
                  fontWeight: 600,
                  width: 42,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  border: isUpcoming ? "2px solid #cbd5f5" : "none",
                }}
              >
                {isCompleted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : isCurrent ? (
                  <CircularProgress
                    size={18}
                    thickness={5}
                    sx={{
                      color: "#ffffff",
                      "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
                    }}
                  />
                ) : isRejected ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 9l-6 6m0-6l6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </TimelineDot>

              {!isLast && (
                <TimelineConnector
                  sx={{ backgroundImage: connectorColor, width: 3 }}
                />
              )}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 2, pl: { xs: 1, sm: 3 } }}>
              <div className="space-y-1.5 rounded-xl bg-slate-50/60 p-4 ring-1 ring-slate-200/70 shadow-sm sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#1f2937" }}
                  >
                    {item.title}
                  </Typography>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : isCurrent
                        ? "bg-[#e2e9ff] text-[#0a3d91] ring-[#cdd9ff]"
                        : isRejected
                        ? "bg-rose-50 text-rose-600 ring-rose-200"
                        : "bg-slate-100 text-slate-600 ring-slate-200"
                    }`}
                  >
                    {isCompleted
                      ? "Selesai"
                      : isCurrent
                      ? "Sedang Berjalan"
                      : isRejected
                      ? "Ditolak"
                      : "Berikutnya"}
                  </span>
                </div>

                {desc ? (
                  <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.6 }}>
                    {desc}
                  </Typography>
                ) : null}
              </div>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

/** -- MOBILE: compact version you liked -- */
function MobileTimeline({ items, descriptions }: TimelineComponentProps) {
  return (
    <Timeline
      position="right"
      sx={{
        mt: 2.5,
        px: { xs: 0, sm: 1 },
        "& .MuiTimelineItem-root:before": { flex: 0, padding: 0 },
      }}
    >
      {items.map((item, index) => {
        const isCompleted = item.status === "completed";
        const isCurrent = item.status === "current";
        const isUpcoming = item.status === "upcoming";
        const isRejected = item.status === "rejected";
        const isLast = index === items.length - 1;

        const dotBgColor = isCompleted
          ? "#10b981"
          : isCurrent
          ? "#0a3d91"
          : isRejected
          ? "#f43f5e"
          : "#e2e8f0";
        const dotTextColor =
          isCompleted || isCurrent || isRejected ? "#fff" : "#475569";
        const connectorColor = isCompleted
          ? "linear-gradient(to bottom, rgba(16,185,129,0.7), rgba(16,185,129,0.05))"
          : isRejected
          ? "linear-gradient(to bottom, rgba(244,63,94,0.7), rgba(244,63,94,0.05))"
          : "linear-gradient(to bottom, rgba(148,163,184,0.8), rgba(148,163,184,0.05))";

        const desc =
          item.status === "completed" && item.completedDescription
            ? item.completedDescription
            : descriptions[item.status];

        return (
          <TimelineItem key={item.title}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: dotBgColor,
                  color: dotTextColor,
                  boxShadow: "0 8px 14px rgba(15, 23, 42, 0.16)",
                  fontWeight: 600,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  border: isUpcoming ? "2px solid #cbd5f5" : "none",
                }}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : isCurrent ? (
                  <CircularProgress
                    size={16}
                    thickness={5}
                    sx={{
                      color: "#ffffff",
                      "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
                    }}
                  />
                ) : isRejected ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 9l-6 6m0-6l6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </TimelineDot>

              {!isLast && (
                <TimelineConnector
                  sx={{
                    backgroundImage: connectorColor,
                    width: 2,
                    minHeight: 22,
                  }}
                />
              )}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 1, pl: 1 }}>
              <div className="space-y-1.5 rounded-xl bg-slate-50/60 p-3 ring-1 ring-slate-200/70 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#1f2937", fontSize: "0.95rem" }}
                  >
                    {item.title}
                  </Typography>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : isCurrent
                        ? "bg-[#e2e9ff] text-[#0a3d91] ring-[#cdd9ff]"
                        : isRejected
                        ? "bg-rose-50 text-rose-600 ring-rose-200"
                        : "bg-slate-100 text-slate-600 ring-slate-200"
                    }`}
                  >
                    {isCompleted
                      ? "Selesai"
                      : isCurrent
                      ? "Sedang Berjalan"
                      : isRejected
                      ? "Ditolak"
                      : "Berikutnya"}
                  </span>
                </div>

                {/* Mobile timestamp under title */}
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    color: isCompleted ? "#059669" : isCurrent ? "#0a3d91" : "#97a6c4",
                    mb: 0.5,
                  }}
                >
                  {item.timestamp}
                </Typography>

                {desc && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#475569", lineHeight: 1.6, fontSize: "0.84rem" }}
                  >
                    {desc}
                  </Typography>
                )}
              </div>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

export default StatusPageContent;
