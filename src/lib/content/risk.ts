/** Lot-size ladder and risk copy. */

/* -------------------------------------------------------------------------- */
/* Risk management                                                             */
/* -------------------------------------------------------------------------- */

export type LotRow = { readonly balance: number; readonly lot: number };

/**
 * From risk_man.jpeg, reproduced verbatim with one exception: the source's
 * 50,000 → 0.29 row is omitted as a transcription error. It fell below the
 * 20,000 row (0.45) and duplicated the 10,000 value, which cannot be intended.
 * The plateaus at 1500/2000 and 4000/5000 are in the source and are kept.
 */
export const LOT_LADDER: readonly LotRow[] = [
  { balance: 100, lot: 0.01 },
  { balance: 500, lot: 0.02 },
  { balance: 1000, lot: 0.03 },
  { balance: 1500, lot: 0.06 },
  { balance: 2000, lot: 0.06 },
  { balance: 3000, lot: 0.09 },
  { balance: 4000, lot: 0.13 },
  { balance: 5000, lot: 0.13 },
  { balance: 6000, lot: 0.15 },
  { balance: 8000, lot: 0.24 },
  { balance: 10000, lot: 0.29 },
  { balance: 20000, lot: 0.45 },
  { balance: 70000, lot: 1.5 },
] as const;

export const RISK = {
  eyebrow: "Risk management",
  heading: "The part most signal services leave out.",
  body: "Position size decides whether a losing streak is survivable. It is the single biggest determinant of whether following signals works for you, and it is entirely your call — so here is the ladder we publish to members.",
  calculatorLabel: "Your account balance",
  resultLabel: "Recommended maximum lot size, per trade",
  tableCaption: "Maximum lot size per trade, by account balance.",
  note: "A guideline, not advice. Your broker's leverage, margin requirements and contract size all affect what is appropriate for you. Never size a position you could not afford to see hit its stop.",
} as const;
