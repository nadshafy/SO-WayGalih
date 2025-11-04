"use client";

import Image from "next/image";
import Link from "next/link";

type LetterLink = {
  href: string;
  label: string;
};

type LetterLinksProps = {
  items: LetterLink[];
};

const LetterLinks = ({ items }: LetterLinksProps) => {
  return (
    <section
      className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6"
      id="surat"
    >
      <h2 className="text-center text-2xl font-bold text-[#0a3d91] md:text-3xl">
        JENIS SURAT ONLINE
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between rounded-2xl bg-[#0a3d91] px-5 py-4 text-sm font-semibold text-white ring-1 ring-slate-200/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#0a3d91]/40 sm:text-base"
          >
            <span className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full bg-white transition"
                aria-hidden="true"
              />
              {item.label}
            </span>
            <Image
              src="/images/landing/arrow.webp"
              alt=""
              width={20}
              height={20}
              sizes="(max-width:640px) 20px, 20px"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LetterLinks;
