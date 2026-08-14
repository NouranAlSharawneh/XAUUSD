import { Faq } from "@/components/faq/faq";
import { FinalCta } from "@/components/cta/final-cta";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/method/how-it-works";
import { ManagedAccounts } from "@/components/managed/managed-accounts";
import { MethodBento } from "@/components/method/method-bento";
import { Pricing } from "@/components/pricing/pricing";
import { RiskSection } from "@/components/risk/risk-section";
import { SignalAnatomy } from "@/components/signal/signal-anatomy";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SpecStrip } from "@/components/hero/spec-strip";
import { WhoItsFor } from "@/components/managed/who-its-for";
import { WhyGold } from "@/components/why-gold/why-gold";
import { BRAND, FAQ, PLANS, SITE_URL, plainText } from "@/lib/content";

/**
 * Service + offer catalog, built from the same PLANS array the pricing cards
 * render. Deliberately carries no aggregateRating or review: there are no real
 * reviews, and inventing them to chase a stars rich-result is both a Google
 * structured-data violation and an FTC problem.
 */
const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${BRAND.name} — XAUUSD trading signals`,
  serviceType: "Trading signal subscription",
  description:
    "Short-term XAUUSD (spot gold) trading signals delivered to Telegram, each with an entry, a single take-profit and a stop loss capped at 20–60 pips.",
  url: SITE_URL,
  provider: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
  areaServed: "Worldwide",
  audience: { "@type": "Audience", audienceType: "Retail forex and gold traders" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Subscription plans",
    itemListElement: PLANS.map((plan) => ({
      "@type": "Offer",
      name: `${BRAND.name} VIP — ${plan.name}`,
      price: plan.price.toFixed(2),
      priceCurrency: "USD",
      category: "Subscription",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#pricing`,
    })),
  },
} as const;

/* Built from the same array the accordion renders, so the two cannot drift. */
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    /* Strip the {{XM}} link token — structured data takes plain prose. */
    acceptedAnswer: { "@type": "Answer", text: plainText(item.a) },
  })),
} as const;

export default function Page() {
  return (
    <div id="top">
      <a
        href="#main"
        className="bg-surface text-ink border-line sr-only rounded-lg border px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <SpecStrip />
        <SignalAnatomy />
        <WhyGold />
        <MethodBento />
        <HowItWorks />
        <Pricing />
        <RiskSection />
        <ManagedAccounts />
        <WhoItsFor />
        <Faq />
        <FinalCta />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
    </div>
  );
}
