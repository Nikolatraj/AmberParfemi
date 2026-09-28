"use client";

/**
 * Size picker, quantity stepper and add-to-cart button.
 *
 * Sizes are hardcoded and the selection is local state only: the API has no
 * per-size variants (or prices) yet. Wire this to product variants once the
 * backend has them, and lift the selection into the cart payload.
 */

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const SIZES = ["75ml", "100ml", "150ml"];

export default function ProductBuyBox({
  name,
  inStock,
}: {
  name: string;
  inStock: boolean;
}) {
  const [size, setSize] = useState(SIZES[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-black/40">
        Veličina:
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SIZES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            aria-pressed={s === size}
            className={`border px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors ${
              s === size
                ? "border-amber text-amber"
                : "border-transparent bg-black/[0.05] text-black/55 hover:text-black"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Two equal columns sized to fit their content, so the stepper always
          matches the button's natural width — no magic number to re-tune when
          the label changes. `max-w-full` lets both shrink together on narrow
          screens rather than overflowing the column. */}
      <div className="mt-8 grid w-fit max-w-full grid-flow-col auto-cols-fr items-stretch gap-3">
        <div className="flex items-center border border-black/15">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty === 1}
            aria-label="Smanji količinu"
            className="flex h-12 w-12 shrink-0 items-center justify-center text-black/60 transition-colors hover:text-black disabled:opacity-30"
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
          <span
            aria-live="polite"
            className="flex-1 self-stretch border-x border-black/15 py-3.5 text-center text-sm"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Povećaj količinu"
            className="flex h-12 w-12 shrink-0 items-center justify-center text-black/60 transition-colors hover:text-black"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>

        <button
          type="button"
          disabled={!inStock}
          aria-label={`Dodaj u korpu: ${name}, ${size}`}
          className="border border-black/15 px-9 text-[11px] uppercase tracking-[0.2em] text-black/75 transition-colors hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-40"
        >
          Dodaj u korpu
        </button>
      </div>

      {!inStock && (
        <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-black/40">
          Trenutno nedostupno
        </p>
      )}
    </div>
  );
}
