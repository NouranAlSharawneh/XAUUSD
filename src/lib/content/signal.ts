/** The example signal and its annotated breakdown. */

/* -------------------------------------------------------------------------- */
/* The signal itself                                                           */
/* -------------------------------------------------------------------------- */

/**
 * An illustrative signal, not a past trade. Prices sit in gold's mid-2026
 * range so the example reads as plausible. The hero chart is drawn from the
 * same numbers so the two halves of the composition agree.
 */
export const SAMPLE_SIGNAL = {
  pair: "XAUUSD",
  direction: "SELL",
  entry: 4412.5,
  stopLoss: 4416.8,
  takeProfit: 4404.2,
  stopPips: 43,
  targetPips: 83,
  session: "London",
  time: "09:42 GMT",
} as const;

export const SIGNAL_ANATOMY = {
  eyebrow: "What you actually receive",
  heading: "No paragraphs. No maybe. Just the trade.",
  body: "Every alert carries the four things you need and nothing you don't. One target, so there is nothing to manage after entry. If a call hits its stop, that stays in the channel too.",
  annotations: [
    {
      term: "Direction and pair",
      detail: "Always XAUUSD. We don't trade anything else, so there is never a pair to look up.",
    },
    {
      term: "Entry",
      detail:
        "The price the setup was calculated from. If the market has moved well past it by the time you see the alert, skip the trade rather than chase it.",
    },
    {
      term: "Stop loss",
      detail:
        "Set before entry, never moved, and capped at 20–60 pips. Slippage during news can exceed the stated stop — no signal service can prevent that.",
    },
    {
      term: "Take-profit",
      detail: "One level. No TP2 or TP3, no partial closes, no moving goalposts.",
    },
  ],
  brokerLead: "You place the trade yourself, so you will need an account that offers XAUUSD.",
} as const;
