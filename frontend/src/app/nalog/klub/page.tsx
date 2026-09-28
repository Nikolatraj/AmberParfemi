import type { Metadata } from "next";
import { Gift, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountShell from "@/components/account/AccountShell";
import { formatPrice } from "@/lib/catalog";
import {
  REDEEM_BLOCK,
  RSD_PER_POINT,
  RSD_PER_REDEEMED_POINT,
  TIERS,
  formatPoints,
  progressToNext,
  redeemValue,
  tierFor,
} from "@/lib/loyalty";

export const metadata: Metadata = {
  title: "Amber klub | Amber Parfemi",
  description: "Sakupljajte poene i otključavajte popuste.",
};

// Placeholder membership — no auth or orders yet, so this stands in for the
// signed-in user, exactly as `account` does on /nalog/profil.
const account = {
  points: 1240,
  lifetimeSpend: 12400,
  history: [
    { id: 1, date: "12.07.2026.", label: "Porudžbina #1042", points: 69 },
    { id: 2, date: "28.06.2026.", label: "Iskorišćeno — 500 RSD", points: -100 },
    { id: 3, date: "14.06.2026.", label: "Porudžbina #1017", points: 82 },
    { id: 4, date: "02.05.2026.", label: "Dobrodošlica u klub", points: 100 },
  ],
};

export default function KlubPage() {
  const tier = tierFor(account.lifetimeSpend);
  const progress = progressToNext(account.lifetimeSpend);
  const redeemable = redeemValue(account.points);

  return (
    <>
      <Header />
      <AccountShell>
        {/* Balance — the points are the headline number on this page. */}
        <section className="rounded-lg border border-black/10 px-8 py-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/40">
                Stanje poena
              </p>
              <p className="mt-2 text-5xl tracking-tight">
                {formatPoints(account.points)}
                <span className="ml-2 text-base text-black/45">poena</span>
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-amber px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-amber">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
              {tier.name} — {tier.discount}%
            </span>
          </div>

          {/* Progress to the next tier, or a note that there is none. */}
          {progress ? (
            <div className="mt-8">
              <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.16em]">
                <span className="text-black/40">
                  Do nivoa {progress.next.name}
                </span>
                <span className="text-black/60">
                  {formatPrice(progress.spent)} / {formatPrice(progress.target)}
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={progress.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Napredak do nivoa ${progress.next.name}`}
                className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.07]"
              >
                <div
                  className="h-full rounded-full bg-amber"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-black/50">
                Još {formatPrice(progress.target - progress.spent)} do{" "}
                {progress.next.discount}% popusta.
              </p>
            </div>
          ) : (
            <p className="mt-8 text-sm text-black/50">
              Dostigli ste najviši nivo. Hvala na poverenju.
            </p>
          )}
        </section>

        {/* Tiers */}
        <section className="mt-12">
          <h2 className="text-xl font-medium">Nivoi</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TIERS.map((t) => {
              const current = t.slug === tier.slug;
              return (
                <div
                  key={t.slug}
                  aria-current={current ? "true" : undefined}
                  className={`rounded-lg border px-5 py-6 ${
                    current ? "border-amber" : "border-black/10"
                  }`}
                >
                  <p
                    className={`text-[11px] uppercase tracking-[0.18em] ${
                      current ? "text-amber" : "text-black/45"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p className="mt-3 text-2xl">{t.discount}%</p>
                  <p className="mt-2 text-[12px] text-black/50">
                    {t.threshold === 0
                      ? "Od prve kupovine"
                      : `Od ${formatPrice(t.threshold)} ukupno`}
                  </p>
                  {current && (
                    <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-amber">
                      Vaš nivo
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Redeem */}
        <section className="mt-12">
          <h2 className="text-xl font-medium">Iskoristi poene</h2>
          <div className="mt-4 flex flex-col items-start gap-5 rounded-lg border border-black/10 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-black/40">
                <Gift className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-sm text-black/80">
                  {redeemable > 0
                    ? `Dostupno ${formatPrice(redeemable)} popusta`
                    : `Skupite još ${REDEEM_BLOCK - (account.points % REDEEM_BLOCK)} poena za prvi popust`}
                </p>
                <p className="mt-1 text-[12px] text-black/45">
                  {REDEEM_BLOCK} poena ={" "}
                  {formatPrice(REDEEM_BLOCK * RSD_PER_REDEEMED_POINT)} · 1 poen
                  na svakih {formatPrice(RSD_PER_POINT)}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={redeemable === 0}
              className="rounded-md border border-black/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-black/60 transition-colors hover:border-black hover:text-black disabled:pointer-events-none disabled:opacity-40"
            >
              Iskoristi
            </button>
          </div>
        </section>

        {/* Activity */}
        <section className="mt-12">
          <h2 className="text-xl font-medium">Aktivnost</h2>
          {account.history.length > 0 ? (
            <ul className="mt-4 rounded-lg border border-black/10 px-5">
              {account.history.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between gap-4 border-b border-black/8 py-4 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-black/80">
                      {entry.label}
                    </p>
                    <p className="mt-0.5 text-[12px] text-black/40">
                      {entry.date}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm tabular-nums ${
                      entry.points < 0 ? "text-black/45" : "text-amber"
                    }`}
                  >
                    {entry.points > 0 ? "+" : ""}
                    {formatPoints(entry.points)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-lg border border-black/10 px-5 py-6">
              <p className="text-sm text-black/45">Još nema aktivnosti.</p>
            </div>
          )}
        </section>
      </AccountShell>
      <Footer />
    </>
  );
}
