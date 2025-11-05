"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

type StepItem = {
  src: string;
  alt: string;
  title: string;
  desc: string;
};

type StepsGridProps = {
  steps: StepItem[];
  heading?: string;
};

const StepsGrid = ({
  steps,
  heading = "MEKANISME PENGAJUAN SURAT ONLINE",
}: StepsGridProps) => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-xl font-bold uppercase tracking-wide text-[#0a3d91] sm:text-2xl md:text-3xl">
          {heading}
        </h2>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <Card
            key={step.title}
            className="group relative w-[90%] max-w-[250px] rounded-xl border border-slate-200/70 bg-white text-center shadow-sm ring-1 ring-transparent transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[#0a3d91]/30 sm:w-full sm:max-w-none sm:rounded-2xl"
          >
            <div className="absolute -top-3 right-3 rounded-full bg-[#0a3d91] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm sm:text-xs">
              {idx + 1}
            </div>

            <CardHeader className="flex flex-col items-center justify-center gap-2 pb-1 pt-5 sm:gap-3 sm:pt-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-b from-indigo-50 to-white ring-1 ring-[#0a3d91]/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] sm:h-16 sm:w-16 sm:rounded-2xl">
                <Image
                  src={step.src}
                  alt={step.alt}
                  width={44}
                  height={44}
                  className="h-10 w-10 sm:h-11 sm:w-11"
                />
              </div>
              <CardTitle className="text-center text-sm font-semibold text-[#0a3d91] sm:text-base">
                {step.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-5 sm:px-6 sm:pb-8">
              <p className="mx-auto max-w-[28ch] text-[13px] leading-relaxed text-slate-600 sm:max-w-[26ch] sm:text-sm">
                {step.desc}
              </p>
            </CardContent>

            <div
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-2xl"
              style={{ boxShadow: "0 0 0 6px rgba(10,61,145,0.06) inset" }}
            />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StepsGrid;
