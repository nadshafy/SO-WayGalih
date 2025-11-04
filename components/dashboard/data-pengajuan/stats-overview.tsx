"use client";

import type { PengajuanStatItem } from "@/lib/pengajuan";

type StatsOverviewProps = {
  items: PengajuanStatItem[];
};

const StatsOverview = ({ items }: StatsOverviewProps) => {
  return (
    <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md transition hover:-translate-y-1.5 hover:shadow-lg"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-[#0a3d91]/80">
            {item.label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
};

export default StatsOverview;
