/** Why the service trades one instrument. */

/* -------------------------------------------------------------------------- */
/* Why gold                                                                    */
/* -------------------------------------------------------------------------- */

export const WHY_GOLD = {
  eyebrow: "Why one market",
  heading: "Fifteen pairs is a hobby. One pair is a craft.",
  body: "Gold is volatile enough to trade every session and liquid enough to get filled. That volatility is the point — it is what a short-term strategy feeds on, and it is why the chart below is not a straight line.",
  cards: [
    {
      title: "Range, every session",
      body: "Gold moves enough intraday to make short-term trades worth taking, and it moves in both directions — so there is no waiting around for a bull market.",
    },
    {
      title: "One chart, ten years",
      body: "We are not splitting attention across majors, indices and crypto. We watch a single instrument, and we have watched it a long time.",
    },
    {
      title: "A repeatable playbook",
      body: "Same sessions, same setups, same risk cap. Consistency comes from narrowing focus, not widening it.",
    },
  ],
  chartCaption:
    "XAU/USD, month-end close. Derived from COMEX front-month settlements, cross-checked against GLD NAV-implied spot. Past performance is not a reliable indicator of future results.",
} as const;
