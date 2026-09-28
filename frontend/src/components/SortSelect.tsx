"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortValue } from "@/lib/catalog";

/**
 * Sort control for a product listing. A custom menu rather than a native
 * <select> so it matches the rest of the shop chrome — the native dropdown
 * can't be styled and looks out of place next to the filter drawer.
 *
 * The selection lives in the URL (`?sort=`) so it survives reloads and can be
 * shared; the page re-renders on the server with the new value. Other params
 * are preserved, so it keeps working once the filters move into the URL too.
 */
export default function SortSelect({ value }: { value: SortValue }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const active =
    SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  function select(next: string) {
    setOpen(false);
    if (next === value) return;

    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set("sort", next);
    else params.delete("sort");

    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/60 transition-colors hover:text-black ${
          isPending ? "opacity-50" : ""
        }`}
      >
        <span className="hidden text-black/40 sm:inline">Sortiraj:</span>
        <span className="text-black/80">{active.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-black/40 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>

      {/* Menu. Right-aligned so it opens under the control against the grid's
          right edge instead of spilling off-screen. */}
      <div
        role="listbox"
        className={`absolute right-0 top-full z-30 mt-3 min-w-[220px] origin-top-right border border-black/10 bg-white py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] transition duration-200 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {SORT_OPTIONS.map((o) => {
          const isActive = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => select(o.value)}
              className={`flex w-full items-center justify-between gap-4 px-5 py-2.5 text-left text-[12px] uppercase tracking-[0.12em] transition-colors ${
                isActive
                  ? "text-black"
                  : "text-black/55 hover:bg-black/[0.03] hover:text-black"
              }`}
            >
              {o.label}
              {isActive && (
                <Check className="h-3.5 w-3.5 text-amber" strokeWidth={2} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
