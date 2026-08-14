/** Subscription plans and payment copy. */

/* -------------------------------------------------------------------------- */
/* Pricing                                                                     */
/* -------------------------------------------------------------------------- */

export type Plan = {
  readonly id: string;
  readonly name: string;
  readonly months: number;
  readonly price: number;
  readonly perMonth: string;
  readonly saving: string | null;
  readonly badge: string | null;
};

export const PLANS: readonly Plan[] = [
  { id: "m1", name: "1 month", months: 1, price: 75, perMonth: "$75", saving: null, badge: null },
  { id: "m2", name: "2 months", months: 2, price: 100, perMonth: "$50", saving: "Save 33%", badge: null },
  { id: "m3", name: "3 months", months: 3, price: 130, perMonth: "$43", saving: "Save 42%", badge: null },
  { id: "y1", name: "1 year", months: 12, price: 300, perMonth: "$25", saving: "Save 67%", badge: "Best value" },
] as const;

/** Lifted from sub_plans.jpeg. Identical across every tier — only the term differs. */
export const PLAN_INCLUDES: readonly string[] = [
  "Daily XAUUSD signals",
  "Entry, stop loss and a single take-profit on every call",
  "Three to fourteen setups a day, London and New York",
  "Direct support in Telegram",
  "Works with any broker that offers XAUUSD",
] as const;

export const PRICING = {
  eyebrow: "Pricing",
  heading: "Same signals on every plan. Only the term changes.",
  body: "No upsells, and no tiers that hold back the good calls.",
  paymentNote:
    "Paid in crypto via Binance — USDT (TRC20 or BEP20), BTC and other major coins. Message @GGD12 and we'll send wallet details and confirm your access.",
  legalNote:
    "A subscription grants access to a digital information service for a fixed term. Profits are not guaranteed. Crypto payments are irreversible once confirmed on-chain.",
} as const;
