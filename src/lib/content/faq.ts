/** Frequently asked questions. */

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export type FaqItem = { readonly q: string; readonly a: string };


export const FAQ: readonly FaqItem[] = [
  {
    q: "What exactly do I get in each signal?",
    a: "Direction, entry price, one stop loss and one take-profit. Nothing to interpret. Every call gets a stop, capped at 20–60 pips. There are no partial closes and no second or third targets to manage.",
  },
  {
    q: "How many signals will I get per day?",
    a: "Typically between three and fourteen, concentrated around the London and New York sessions. Volume depends on what the market offers — on quiet days you get fewer. We would rather send three good setups than fourteen forced ones.",
  },
  {
    q: "How are signals delivered, and how fast?",
    a: "Straight to a private Telegram channel as a push notification. Because gold moves quickly on short-term setups, enter within a few minutes of the alert or skip the trade — chasing a moved entry changes the risk and reward of the whole setup.",
  },
  {
    q: "Do I need a specific broker?",
    a: "No. Any broker that offers XAUUSD will work, and the signals are identical whichever one you use. If you do not have an account yet, we trade on {{XM}} and you can open one through our link. To be clear about the incentive: that is an affiliate link and we earn a commission on sign-ups, at no extra cost to you. You are never required to use it.",
  },
  {
    q: "What if I'm asleep or at work when a signal goes out?",
    a: "You will miss some, and that is normal. Signals are timestamped so you can always see when a call was posted and at what price. Never enter at a materially different price just to catch up — the stop and target were calculated for the stated entry.",
  },
  {
    q: "How much money do I need to start?",
    a: "That depends on your broker's minimums, your leverage and what you can genuinely afford to lose. We do not set a minimum and we do not advise on position sizing — sizing is what determines whether a losing streak is survivable, so it has to be your decision. The lot-size ladder above is the guideline we publish.",
  },
  {
    q: "Why crypto only?",
    a: "Crypto lets us serve members in any country, settles within minutes, and avoids the card-processing restrictions that apply to trading-related services. Message @GGD12 and we will walk you through it if it is new to you. Always confirm the wallet address with us directly — never accept details from anyone who messages you first.",
  },
  {
    q: "How quickly do I get access after paying?",
    a: "Usually within minutes during trading hours. Send the transaction hash after payment; once it confirms on-chain we add you to the VIP channel and confirm your subscription end date in writing.",
  },
  {
    q: "Does it auto-renew? What about refunds?",
    a: "No auto-renewal — crypto payments are not recurring, so nothing is ever charged without you initiating it, and we will remind you before your access ends. Because this is a digital access service delivered immediately, subscriptions are non-refundable once access is granted, except where required by law. If you are unsure, spend two weeks in the free channel first.",
  },
  {
    q: "Who holds my money on a managed account?",
    a: "You do. The account is opened at a broker in your name, funded by you, and you keep the login and withdrawal rights. You grant us trading authority only, and you can revoke it at any time. We never hold, receive or withdraw client funds.",
  },
  {
    q: "How does the managed-account profit split work?",
    a: "You keep 70% of net profit; our share is 30%. It is charged on net new profit only — if a period ends in a loss, no share is taken, and that loss must be recovered before any further share applies. There is no monthly management fee, and a one-time $150 fee covers the dedicated VPS.",
  },
  {
    q: "Can you guarantee I'll make money?",
    a: "No, and anyone who tells you otherwise is either lying or breaking the law. We can guarantee the process: a defined entry, a stop capped at 20–60 pips, and a single target on every call, posted before the outcome is known, with losing trades left in the channel to scroll back through. Whether that turns into profit for you depends on your broker, your sizing, your discipline and market conditions. Some subscribers lose money.",
  },
] as const;
