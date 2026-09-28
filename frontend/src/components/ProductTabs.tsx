"use client";

import { useState } from "react";
import type { FragranceNotes } from "@/lib/catalog";

type Tab = "opis" | "note";

/**
 * "Deskripcija / Mirisne note" panel under the buy box.
 *
 * The description arrives as one string; blank lines split it into paragraphs.
 * Notes are optional — the API does not return them yet, so the tab shows a
 * placeholder rather than an empty panel.
 */
export default function ProductTabs({
  description,
  notes,
}: {
  description: string | null;
  notes?: FragranceNotes | null;
}) {
  const [tab, setTab] = useState<Tab>("opis");

  const paragraphs = (description ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const pyramid = [
    { label: "Gornje note", values: notes?.top },
    { label: "Srednje note", values: notes?.heart },
    { label: "Bazne note", values: notes?.base },
  ].filter((row) => row.values?.length);

  return (
    <div className="mt-12">
      <div role="tablist" className="flex gap-10 border-b border-black/10">
        {(
          [
            ["opis", "Deskripcija"],
            ["note", "Mirisne note"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={`tab-${value}`}
            aria-selected={tab === value}
            aria-controls={`panel-${value}`}
            onClick={() => setTab(value)}
            className={`-mb-px border-b pb-3 text-[13px] uppercase tracking-[0.16em] transition-colors ${
              tab === value
                ? "border-black text-black"
                : "border-transparent text-black/40 hover:text-black/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "opis" ? (
        <div
          role="tabpanel"
          id="panel-opis"
          aria-labelledby="tab-opis"
          className="mt-8 space-y-5 text-sm leading-[1.9] text-black/65"
        >
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>Opis za ovaj parfem uskoro.</p>
          )}
        </div>
      ) : (
        <div
          role="tabpanel"
          id="panel-note"
          aria-labelledby="tab-note"
          className="mt-8 text-sm leading-[1.9] text-black/65"
        >
          {pyramid.length > 0 ? (
            <dl className="space-y-5">
              {pyramid.map((row) => (
                <div key={row.label}>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-black/40">
                    {row.label}
                  </dt>
                  <dd className="mt-1">{row.values!.join(", ")}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p>Mirisne note za ovaj parfem uskoro.</p>
          )}
        </div>
      )}
    </div>
  );
}
