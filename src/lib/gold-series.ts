/**
 * Price data for the two charts on the page.
 *
 * The macro series is real. The intraday series is not — it is a designed
 * asset illustrating what a signal looks like on a chart, and it is captioned
 * as such wherever it appears. That distinction matters: an unlabelled chart
 * with entry and target markers reads as a performance claim.
 */

export type GoldPoint = { readonly month: string; readonly close: number };

/**
 * XAU/USD month-end closes, Aug 2023 – Aug 2026.
 *
 * Derived from COMEX front-month (GC=F) month-end settlements, cross-checked
 * against GLD NAV-implied spot; the two sources agree within 1–2% across the
 * window. Jan 2026 is the one approximate point — that month contained both
 * the spike to ~$5,600 and a violent reversal, plus a contract roll, so the
 * sources diverge there.
 *
 * The shape is deliberately not smoothed. Gold ran from $1,938 to a ~$5,600
 * peak in Jan 2026, fell 24% to $3,963 by June, then recovered. That drawdown
 * is the argument for a short-term strategy that trades both directions, and a
 * trading audience would spot a flattered curve immediately.
 */
export const GOLD_MONTHLY: readonly GoldPoint[] = [
  { month: "2023-08", close: 1938 },
  { month: "2023-09", close: 1848 },
  { month: "2023-10", close: 1985 },
  { month: "2023-11", close: 2038 },
  { month: "2023-12", close: 2062 },
  { month: "2024-01", close: 2048 },
  { month: "2024-02", close: 2046 },
  { month: "2024-03", close: 2217 },
  { month: "2024-04", close: 2291 },
  { month: "2024-05", close: 2323 },
  { month: "2024-06", close: 2328 },
  { month: "2024-07", close: 2427 },
  { month: "2024-08", close: 2494 },
  { month: "2024-09", close: 2636 },
  { month: "2024-10", close: 2738 },
  { month: "2024-11", close: 2657 },
  { month: "2024-12", close: 2629 },
  { month: "2025-01", close: 2813 },
  { month: "2025-02", close: 2837 },
  { month: "2025-03", close: 3123 },
  { month: "2025-04", close: 3305 },
  { month: "2025-05", close: 3289 },
  { month: "2025-06", close: 3294 },
  { month: "2025-07", close: 3293 },
  { month: "2025-08", close: 3474 },
  { month: "2025-09", close: 3841 },
  { month: "2025-10", close: 3982 },
  { month: "2025-11", close: 4218 },
  { month: "2025-12", close: 4326 },
  { month: "2026-01", close: 4800 },
  { month: "2026-02", close: 5255 },
  { month: "2026-03", close: 4670 },
  { month: "2026-04", close: 4619 },
  { month: "2026-05", close: 4556 },
  { month: "2026-06", close: 4022 },
  { month: "2026-07", close: 4046 },
  { month: "2026-08", close: 4372 },
] as const;

export const GOLD_MACRO_SUMMARY = {
  from: "Aug 2023",
  to: "Aug 2026",
  startClose: 1938,
  endClose: 4372,
  changePercent: 126,
  peakClose: 5255,
  troughAfterPeak: 4022,
} as const;

/**
 * An illustrative intraday session for the hero. Hand-authored so the trade in
 * SAMPLE_SIGNAL actually plays out on it: price grinds up toward the entry,
 * probes to 4416.2 — just under the 4416.8 stop, which is where the tension is
 * — then rolls over and reaches the 4404.2 target.
 */
export const INTRADAY_SERIES: readonly number[] = [
  4406.2, 4405.1, 4407.8, 4409.4, 4408.2, 4410.6, 4409.1, 4411.3, 4413.0, 4412.1, 4414.2, 4415.4,
  4414.1, 4412.5, 4413.8, 4415.9, 4416.2, 4414.7, 4413.1, 4411.8, 4412.6, 4410.4, 4408.9, 4409.7,
  4407.5, 4406.1, 4407.2, 4405.4, 4403.9, 4404.8, 4402.6, 4403.5, 4401.9, 4403.1, 4402.2, 4404.2,
] as const;

/** Fixed so the stop-loss marker sits inside the frame even though price never reaches it. */
export const INTRADAY_DOMAIN: readonly [number, number] = [4400.5, 4418.5];

/**
 * Clock time of the first point, GMT. Chosen so index 13 — the candle that
 * closes at exactly the 4412.50 entry — lands on 09:40, two minutes before the
 * 09:42 send time on the signal card. The last point is then 11:30.
 */
export const INTRADAY_START = "08:35";
