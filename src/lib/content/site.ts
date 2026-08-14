/** Brand, links, navigation and the broker placement. */

/**
 * TODO(deploy): BLOCKING — replace with the real domain before going live.
 *
 * This one constant feeds metadataBase, the canonical tag, the OG and Twitter
 * card URLs, robots.txt, sitemap.xml and llms.txt. Deploying with the
 * placeholder is worse than having no SEO at all: the canonical would point
 * search engines at a domain you do not own.
 */
export const SITE_URL = "https://goldsignals.example.com";

export const BRAND = {
  name: "Gold Signals",
  /** Split so the wordmark can weight the two halves differently. */
  wordmark: { lead: "Gold", tail: "Signals" },
  tagline: "XAUUSD signals, sent to Telegram.",
} as const;

export const LINKS = {
  /** Paid VIP access is granted manually — you message the operator to subscribe. */
  vip: "https://t.me/GGD12",
  /** The free channel. Open to anyone, no payment. */
  free: "https://t.me/Xauusdsignals2",
  /** Source text.txt has this typo'd as "ttps://". Fixed. */
  linktree: "https://linktr.ee/xaussdsignals",
  handle: "@GGD12",
  /**
   * XM affiliate link. This pays a commission on sign-ups, which is why every
   * place it appears carries a visible disclosure and why the page no longer
   * claims broker neutrality — see BROKER below. Always link it with
   * rel="sponsored".
   */
  broker: "https://clicks.pipaffiliates.com/c?c=585362&l=en&p=0",
} as const;

/**
 * Broker recommendation. Paid placement, so the disclosure is not optional:
 * the FTC's Endorsement Guides (16 CFR 255.5) and the UK CAP Code both require
 * a material connection to be disclosed clearly and next to the link, not
 * buried in the footer. `disclosure` therefore renders adjacent to every
 * instance of the link.
 */
export const BROKER = {
  name: "XM",
  blurb: "Forex and CFD trading on gold, indices, stocks and oil.",
  cta: "Open an account with XM",
  shortCta: "Open an XM account",
  disclosure:
    "Affiliate link — we earn a commission if you open an account through it, at no extra cost to you. Any broker offering XAUUSD will work just as well.",
  /** Shorter form for tight spots like the footer. */
  disclosureShort: "Affiliate link — we earn a commission.",
} as const;

export const NAV_LINKS: readonly { readonly href: string; readonly label: string }[] = [
  { href: "#method", label: "Method" },
  { href: "#pricing", label: "Pricing" },
  { href: "#risk", label: "Risk" },
  { href: "#managed", label: "Managed" },
  { href: "#faq", label: "FAQ" },
] as const;

/**
 * Answers may contain the token `{{XM}}`, which renders as a link to the
 * broker affiliate URL. Structured data and any other plain-text consumer
 * should run answers through this first.
 */
export const BROKER_TOKEN = "{{XM}}";
export const plainText = (s: string): string => s.split(BROKER_TOKEN).join(BROKER.name);
