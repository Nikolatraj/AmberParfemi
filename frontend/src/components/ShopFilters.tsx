"use client";

/**
 * Filters live in a left drawer instead of a sidebar: the grid gets the full
 * width on load, and the panel slides over it from a "Filteri (n)" trigger.
 *
 * Selection is local state only — checking a box updates the count but does not
 * filter the grid yet. Swap the hardcoded groups for API data and lift the
 * selection into the URL (searchParams, like `sort`) when the backend can
 * filter on notes and sizes.
 */

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { ListFilter, X } from "lucide-react";

type Group = {
  label: string;
  options: string[];
};

const groups: Group[] = [
  { label: "Kategorija", options: ["Muški", "Ženski", "Unisex"] },
  {
    label: "Brend",
    options: ["Lattafa", "Armaf", "Afnan", "Rasasi", "French Avenue"],
  },
  {
    label: "Note",
    options: ["Cvetne", "Drvenaste", "Citrusne", "Kožne", "Slatke"],
  },
  { label: "Pakovanje", options: ["30 ml", "50 ml", "100 ml"] },
];

const checkboxClass =
  "h-3.5 w-3.5 shrink-0 appearance-none border border-black/25 transition-colors checked:border-amber checked:bg-amber";

type Selection = Record<string, string[]>;

export default function ShopFilters() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Selection>({});
  const [inStockOnly, setInStockOnly] = useState(false);
  const lenis = useLenis();

  const count =
    Object.values(selected).reduce((n, v) => n + v.length, 0) +
    (inStockOnly ? 1 : 0);

  function toggle(group: string, option: string) {
    setSelected((prev) => {
      const current = prev[group] ?? [];
      return {
        ...prev,
        [group]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  }

  function reset() {
    setSelected({});
    setInStockOnly(false);
  }

  // Escape closes the drawer; Lenis keeps scrolling the page behind it unless
  // we stop it while the panel is open.
  useEffect(() => {
    if (!open) return;

    lenis?.stop();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="group flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-black/60 transition-colors hover:text-black"
      >
        <ListFilter
          className="h-3.5 w-3.5 text-black/45 transition-colors group-hover:text-black"
          strokeWidth={1.5}
        />
        Filteri
        <span className="text-black/35">({count})</span>
      </button>

      {/* Scrim. Rendered always so the panel can transition both ways. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filteri"
        data-lenis-prevent
        className={`fixed left-0 top-0 z-50 h-dvh w-full overflow-y-auto bg-white transition-transform duration-500 ease-out sm:w-[420px] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 pb-10 pt-8 sm:px-10">
          <h2 className="text-lg font-light uppercase tracking-[0.22em]">
            Filteri
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Zatvori filtere"
            className="text-black/50 transition-colors hover:text-black"
          >
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        <div className="space-y-9 px-8 pb-16 sm:px-10">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-black/40">
                {group.label}
              </h3>
              {/* Two columns, like the reference — long option lists stay
                  scannable without a tall panel. */}
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                {group.options.map((o) => (
                  <li key={o}>
                    <label className="flex cursor-pointer items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-black/75 transition-colors hover:text-black">
                      <input
                        type="checkbox"
                        checked={(selected[group.label] ?? []).includes(o)}
                        onChange={() => toggle(group.label, o)}
                        className={checkboxClass}
                      />
                      {o}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-black/40">
              Cena
            </h3>
            <div className="mt-5 flex items-center gap-3">
              <input
                type="number"
                inputMode="numeric"
                placeholder="od"
                aria-label="Cena od"
                className="w-full border-b border-black/20 bg-transparent pb-2 text-sm placeholder:text-black/35 focus:border-amber focus:outline-none"
              />
              <span className="text-black/30">—</span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="do"
                aria-label="Cena do"
                className="w-full border-b border-black/20 bg-transparent pb-2 text-sm placeholder:text-black/35 focus:border-amber focus:outline-none"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-black/75">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly((v) => !v)}
              className={checkboxClass}
            />
            Samo dostupno
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={reset}
              className="flex-1 border border-black/15 py-3.5 text-[11px] uppercase tracking-[0.2em] text-black/60 transition-colors hover:border-black hover:text-black"
            >
              Poništi
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-black py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80"
            >
              Prikaži
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
