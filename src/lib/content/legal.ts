/** Final CTA, risk disclaimer and entity name. */

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                   */
/* -------------------------------------------------------------------------- */

export const FINAL_CTA = {
  heading: "Two weeks in the free channel costs you nothing.",
  body: "See how we call gold before you pay for it. Every signal goes up before the outcome is known, and the losing ones stay up. When you're ready, VIP starts at $25 a month on the annual plan.",
} as const;

/* -------------------------------------------------------------------------- */
/* Legal                                                                       */
/* -------------------------------------------------------------------------- */

export type DisclaimerSection = { readonly title: string; readonly body: string };

export const DISCLAIMER: readonly DisclaimerSection[] = [
  {
    title: "General risk warning",
    body: "Trading foreign exchange, gold and other commodities, contracts for difference and other leveraged instruments carries a high level of risk and is not suitable for every investor. Leverage magnifies losses as readily as gains. You may lose some or all of your deposited funds, and with some products you may lose more than your initial deposit. Only trade with money you can afford to lose entirely. If you are in any doubt, seek advice from an independent, appropriately licensed financial adviser.",
  },
  {
    title: "No financial or investment advice",
    body: "Gold Signals provides general market information and trade ideas only. Nothing on this website, in our Telegram channels, or in any other communication from us constitutes financial advice, a personal recommendation, or an offer or solicitation to buy or sell any instrument. Our signals are not tailored to your circumstances, objectives or risk tolerance, and we make no assessment of their suitability for you. Every trading decision you make is your own, and you accept sole responsibility for the outcome of every trade you place.",
  },
  {
    title: "Past performance and targets",
    body: "Past performance is not a reliable indicator of, and does not guarantee, future results. Any figure, pip count, target, example or illustration shown here is provided for illustration only and may not reflect the results of any particular subscriber. Results shown may not account for spreads, commissions, swap charges, slippage or differences between brokers, all of which affect your actual results. Any monthly pip target we describe is an internal goal we manage the strategy against — a target, not a forecast, projection or guarantee. There will be periods in which it is not met, and periods of loss.",
  },
  {
    title: "No guarantee of profit",
    body: "We do not guarantee profits, income, a specific win rate, or any particular trading outcome. Individual results vary widely depending on your broker, account size, leverage, execution speed, position sizing and discipline. Some subscribers will lose money.",
  },
  {
    title: "Managed accounts",
    body: "Where we provide account management, funds remain at all times in a brokerage account opened in your own name at a broker of your choosing. We do not take custody of, hold, receive or have withdrawal rights over client funds. Trading authority is granted by you and may be revoked by you at any time. Managed trading carries the risk of substantial loss, including total loss of your deposit. No return is guaranteed, projected or implied, and profit-sharing does not reduce your exposure to loss. This service is offered by application only and is not available in every jurisdiction.",
  },
  {
    title: "Jurisdiction and eligibility",
    body: "Gold Signals is not a licensed broker, dealer, investment adviser or financial institution, and is not authorised or regulated by any financial services regulator. Our services are not directed at any person in any jurisdiction where such distribution or use would be contrary to local law, or would require a licence we do not hold. It is your responsibility to ensure your use of this site complies with the laws applicable to you. Because we are not regulated, you will not have access to a financial ombudsman or investor compensation scheme in relation to our services.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, Gold Signals, its owners, employees and affiliates accept no liability for any loss or damage, whether direct, indirect, incidental or consequential, arising from your use of or reliance on any information, signal, analysis or service we provide, or from any act or omission on your part in response to it.",
  },
  {
    title: "Subscriptions and payments",
    body: "Subscriptions grant access to a digital information service for a fixed term. Payments are accepted in cryptocurrency and, once confirmed on-chain, are irreversible. Digital access services cannot be returned and are non-refundable except where required by law. Cryptocurrency is volatile and its value may change between the time you send payment and the time it is received. By subscribing you confirm that you have read, understood and accepted this risk warning.",
  },
] as const;

/**
 * The trading name the site operates under. Deliberately not styled as "Ltd",
 * "LLC" or "Inc" anywhere: claiming a corporate form that does not exist is
 * its own problem, and a plain trading name claims nothing. Change this only
 * if the business is actually registered under a different name.
 */
export const LEGAL_ENTITY = "Gold Signals";
