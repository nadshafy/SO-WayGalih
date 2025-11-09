"use client";

import { Button } from "@/src/components/ui/button";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
};

const PaginationControls = ({
  page,
  totalPages,
  pageSize,
  totalItems,
  onPrevious,
  onNext,
}: PaginationControlsProps) => {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = totalItems === 0 ? 0 : Math.min(page * pageSize, totalItems);

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="text-xs text-slate-500">
        {totalItems === 0 ? (
          "0 data"
        ) : (
          <>
            Menampilkan{" "}
            <span className="font-semibold text-slate-700">{start}</span> -{" "}
            <span className="font-semibold text-slate-700">{end}</span> dari{" "}
            <span className="font-semibold text-slate-700">
              {totalItems}
            </span>{" "}
            data
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={onPrevious}>
          Sebelumnya
        </Button>

        <span className="text-xs text-slate-600">
          Halaman <b>{page}</b> / {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={onNext}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
