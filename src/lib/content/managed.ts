/** Managed accounts and the qualifier band. */

/* -------------------------------------------------------------------------- */
/* Managed accounts                                                            */
/* -------------------------------------------------------------------------- */

export const MANAGED = {
  eyebrow: "Managed accounts",
  heading: "Prefer we place the trades? By application.",
  body: "For traders who want the strategy applied to their account without watching charts. Your money stays in your own broker account, in your own name — we take trading authority only, never custody.",
  points: [
    {
      title: "You keep 70% of net profit",
      body: "Our share is 30%, charged only on net new profit. If a period ends in a loss, no share is taken and that loss must be recovered before any further share applies.",
    },
    {
      title: "$150 one-time setup",
      body: "Covers the dedicated VPS that keeps execution running 24/5 without depending on your home connection. Charged once, not a management fee, non-refundable once the server is provisioned.",
    },
    {
      title: "No monthly fee",
      body: "If the account doesn't make money, we don't get paid a share.",
    },
    {
      title: "You keep control",
      body: "We never hold, receive or have withdrawal rights over your funds. Trading authority is granted by you and can be revoked by you at any time.",
    },
  ],
  cta: "Apply for a managed account",
  legalNote:
    "Managed trading carries the risk of substantial loss, including your entire deposit. No return is guaranteed, projected or implied. Applications are reviewed individually and this service is not available in every jurisdiction.",
} as const;

/* -------------------------------------------------------------------------- */
/* Qualifier                                                                   */
/* -------------------------------------------------------------------------- */

export const WHO_ITS_FOR = {
  eyebrow: "Before you pay",
  heading: "Be honest with yourself first.",
  yes: {
    title: "This works if you",
    items: [
      "Have a funded broker account and can place trades yourself",
      "Can act on an alert within a few minutes during London or New York hours",
      "Already understand lot sizing and leverage",
      "Treat losing trades as a normal part of the process",
    ],
  },
  no: {
    title: "This isn't for you if you",
    items: [
      "Are looking for guaranteed or fixed monthly income",
      "Are trading money you cannot afford to lose",
      "Want someone to promise you a win rate",
      "Expect to copy every signal at maximum size and never see a red day",
    ],
  },
} as const;
