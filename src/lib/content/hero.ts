/** Hero and the spec strip beneath it. */

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: "XAUUSD · Gold only",
  heading: "One market. One team. Ten years on gold.",
  subheading:
    "Every call arrives in Telegram with an entry, a single take-profit, and a stop loss capped at 20–60 pips. Three to fourteen setups a day, traded through the London and New York sessions.",
  primaryCta: "Get VIP access",
  secondaryCta: "Watch the free channel",
  microcopy:
    "The free channel costs nothing and needs no payment details. Trading involves substantial risk of loss. Not financial advice.",
} as const;

/* -------------------------------------------------------------------------- */
/* Spec strip                                                                  */
/* -------------------------------------------------------------------------- */

export type SpecStat = {
  readonly value: number;
  readonly display: string;
  readonly label: string;
  readonly detail: string;
};

export const SPEC_STATS: readonly SpecStat[] = [
  { value: 10, display: "10", label: "Years on gold", detail: "One instrument, not fifteen" },
  { value: 14, display: "3–14", label: "Signals a day", detail: "London and New York sessions" },
  { value: 60, display: "20–60", label: "Pip stop, capped", detail: "On every single call" },
  { value: 1, display: "1", label: "Take-profit", detail: "No partial closes, ever" },
] as const;
