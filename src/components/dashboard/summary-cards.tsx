"use client";

import type { DashboardSummaryCard } from "@/src/lib/dashboard-data";

type SummaryCardsProps = {
  items: DashboardSummaryCard[];
};

const SummaryCards = ({ items }: SummaryCardsProps) => {
  return (
    <section className="mt-8 grid gap-5 md:grid-cols-3">
      {items.map((card) => (
        <div
          key={card.label}
          className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-md transition hover:-translate-y-1.5 hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#0a3d91]">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {card.value}
              </p>
              {card.trend && (
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {card.trend}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummaryCards;
