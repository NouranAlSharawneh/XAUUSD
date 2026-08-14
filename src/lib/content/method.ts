/** Trading rules and the subscribe flow. */

/* -------------------------------------------------------------------------- */
/* Method                                                                      */
/* -------------------------------------------------------------------------- */

export type MethodRule = {
  readonly title: string;
  readonly body: string;
  readonly metric?: string;
  /** Grid span at lg. 3 = full bleed, used to close the final row cleanly. */
  readonly span?: 2 | 3;
};

export const METHOD = {
  eyebrow: "How we trade",
  heading: "The rules we don't break.",
  body: "Anyone can print a win rate on a landing page. These are the constraints the strategy actually runs under — checkable against the channel, every day.",
  rules: [
    {
      title: "A stop on every call, capped",
      body: "Risk is defined before entry and never widened. Slippage during news can exceed the stated level; nothing can prevent that.",
      metric: "20–60 pips",
      span: 2,
    },
    {
      title: "One take-profit",
      body: "A single stated target. No partial closes, no scaling out, nothing to manage once you are in.",
      metric: "1 TP",
    },
    {
      title: "Short-term only",
      body: "Trades measured in minutes and hours. Nothing left running for weeks.",
      metric: "Intraday",
    },
    {
      title: "We post what the market gives",
      body: "Some days it is three setups. We don't force trades to hit a quota.",
      metric: "3–14 / day",
    },
    {
      title: "Sessions we know",
      body: "London and New York, where gold's liquidity and range actually are.",
      metric: "LDN · NY",
    },
    {
      title: "A target, not a promise",
      body: "We manage the strategy against a 2,000-pip monthly target. It is a goal we work toward — some months fall short, and some months are negative.",
      metric: "2,000 pips",
      span: 3,
    },
  ] satisfies readonly MethodRule[],
} as const;

/* -------------------------------------------------------------------------- */
/* How it works                                                                */
/* -------------------------------------------------------------------------- */

export const HOW_IT_WORKS = {
  eyebrow: "Getting started",
  heading: "From payment to your first signal in minutes.",
  body: "There is no checkout button on this page, and that is deliberate — access is granted by a person once your payment confirms, which is also how we answer your questions before you commit.",
  steps: [
    {
      title: "Watch the free channel",
      body: "Costs nothing, needs no payment details. See how calls are posted and how they resolve before you spend anything.",
    },
    {
      title: "Message @GGD12",
      body: "Tell us which plan you want. We send the wallet address and confirm the network before you send anything. Always confirm the address with us in the channel — never accept wallet details from someone who messages you first.",
    },
    {
      title: "Pay in crypto",
      body: "USDT, BTC and other major coins via Binance. Crypto settles in minutes and works everywhere our members live, which card processing does not for this category.",
    },
    {
      title: "Trade it your way",
      body: "You are added to the VIP channel, usually within minutes during trading hours. Use any broker you like, at your own position size. We never ask for your login and never handle your money.",
    },
  ],
} as const;
