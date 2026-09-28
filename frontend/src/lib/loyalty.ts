// "Amber klub" — the loyalty programme's rules in one place, so the numbers are
// not scattered through JSX. Pure functions with no React, so they can move
// behind the API unchanged once orders exist.

/** Spend needed to earn a single point. */
export const RSD_PER_POINT = 100;

/** What one point is worth when redeemed, in RSD. */
export const RSD_PER_REDEEMED_POINT = 5;

/** Points must be redeemed in blocks of this size. */
export const REDEEM_BLOCK = 100;

export type Tier = {
  slug: string;
  name: string;
  /** Lifetime spend in RSD at which this tier starts, inclusive. */
  threshold: number;
  /** Standing discount, as a percentage. */
  discount: number;
};

/** Ascending by threshold — `tierFor` and `nextTier` rely on that order. */
export const TIERS: Tier[] = [
  { slug: "srebrni", name: "Srebrni", threshold: 0, discount: 5 },
  { slug: "zlatni", name: "Zlatni", threshold: 20000, discount: 10 },
  { slug: "platinasti", name: "Platinasti", threshold: 50000, discount: 15 },
];

/** Points earned by spending `rsd`. Partial points are not awarded. */
export function pointsForSpend(rsd: number): number {
  return Math.floor(rsd / RSD_PER_POINT);
}

/**
 * Value of `points` in RSD. Only whole blocks count, so 149 points redeem the
 * same as 100 — the UI shows this rather than implying the remainder is usable.
 */
export function redeemValue(points: number): number {
  const blocks = Math.floor(points / REDEEM_BLOCK);
  return blocks * REDEEM_BLOCK * RSD_PER_REDEEMED_POINT;
}

/**
 * Current tier for a lifetime spend. Driven by spend rather than the points
 * balance so that redeeming points never demotes anyone.
 */
export function tierFor(lifetimeSpend: number): Tier {
  let current = TIERS[0];
  for (const tier of TIERS) {
    if (lifetimeSpend >= tier.threshold) current = tier;
  }
  return current;
}

/** The tier above the current one, or `null` at the top. */
export function nextTier(lifetimeSpend: number): Tier | null {
  return TIERS.find((tier) => lifetimeSpend < tier.threshold) ?? null;
}

export type TierProgress = {
  /** Spend so far, counted from the current tier's threshold. */
  spent: number;
  /** Spend needed to reach the next tier, from the same baseline. */
  target: number;
  /** 0–100, for the bar width. */
  percent: number;
  next: Tier;
};

/**
 * Progress towards the next tier, or `null` at the top tier — the caller shows
 * a "highest tier" line instead of a bar.
 *
 * Measured from the current tier's threshold, not from zero, so the bar fills
 * across each tier rather than crawling for the whole of a customer's life.
 */
export function progressToNext(lifetimeSpend: number): TierProgress | null {
  const next = nextTier(lifetimeSpend);
  if (!next) return null;

  const floor = tierFor(lifetimeSpend).threshold;
  const spent = lifetimeSpend - floor;
  const target = next.threshold - floor;

  return {
    spent,
    target,
    // Floored, not rounded: one RSD short of the next tier should not read as
    // a full bar. At the threshold itself this function returns the *next*
    // tier's progress at 0%, so 100% is never a legitimate value here.
    percent: Math.min(99, Math.floor((spent / target) * 100)),
    next,
  };
}

/** Thousands-separated points, e.g. 1240 → "1.240". */
export function formatPoints(points: number): string {
  return new Intl.NumberFormat("sr-RS").format(points);
}
