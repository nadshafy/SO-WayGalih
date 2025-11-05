"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  registerables,
} from "chart.js";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  DASHBOARD_TAB_ITEMS,
  type DashboardChartMap,
  type DashboardTabKey,
} from "@/src/lib/dashboard-data";

Chart.register(...registerables);

type StatsChartProps = {
  activeTab: DashboardTabKey;
  onTabChange: (tab: DashboardTabKey) => void;
  dataset: DashboardChartMap;
};

const StatsChart = ({ activeTab, onTabChange, dataset }: StatsChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<keyof ChartTypeRegistry> | null>(null);

  const tabItems = DASHBOARD_TAB_ITEMS;
  const activeLabel =
    tabItems.find((item) => item.key === activeTab)?.label ?? "Statistik";

  useEffect(() => {
    const context = chartRef.current?.getContext("2d");
    if (!context) {
      return undefined;
    }

    chartInstance.current?.destroy();

    const chartData = dataset[activeTab];

    const config: {
      type: "line";
      data: ChartData<"line">;
      options: ChartOptions<"line">;
    } = {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: activeLabel,
            data: chartData.data,
            borderColor: "#1a3491",
            backgroundColor: "rgba(26, 52, 145, 0.2)",
            tension: 0.35,
            fill: true,
            pointBackgroundColor: "#1a3491",
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: "#475569" },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { color: "#475569" },
            grid: { color: "rgba(148, 163, 184, 0.2)" },
          },
        },
      },
    };

    chartInstance.current = new Chart(context, config);

    return () => {
      chartInstance.current?.destroy();
    };
  }, [activeTab, activeLabel, dataset]);

  return (
    <section className="mt-8 rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#0a3d91]">
            Statistik Pengajuan
          </h2>
          <p className="text-sm text-slate-500">
            Pantau jumlah pengajuan berdasarkan periode tertentu
          </p>
        </div>

        <div className="block lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-xl border border-[#cdd9ff] bg-white px-4 py-2 text-sm font-semibold text-[#0a3d91] shadow-sm">
              {activeLabel}
              <ChevronDown className="h-4 w-4 opacity-80" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {tabItems.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <DropdownMenuItem
                    key={tab.key}
                    onSelect={(event) => {
                      event.preventDefault();
                      onTabChange(tab.key);
                    }}
                    className={isActive ? "font-semibold text-[#0a3d91]" : ""}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#0a3d91]" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden flex-wrap items-center gap-2 rounded-full bg-[#e2e9ff] p-1 lg:flex">
          {tabItems.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onTabChange(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-white text-[#0a3d91] shadow"
                    : "text-[#0a3d91]/70 hover:text-[#0a3d91]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 h-[320px]">
        <canvas ref={chartRef} aria-label="Grafik statistik pengajuan" />
      </div>
    </section>
  );
};

export default StatsChart;
