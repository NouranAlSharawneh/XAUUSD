import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { BRAND, LINKS, SITE_URL } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* IBM Plex Mono is not a variable font, so weights are explicit. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* ~155 chars, front-loaded with the terms people actually type, and it names
   the free channel because "free" is what earns the click in this category. */
const DESCRIPTION =
  "XAUUSD gold trading signals on Telegram — entry, stop loss and one take-profit on every call, 3–14 a day. Free channel, no payment details. Capital at risk.";

const TITLE = "XAUUSD Gold Trading Signals on Telegram";

export const metadata: Metadata = {
  /* Required — relative OG URLs fail the build without it. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TITLE} | ${BRAND.name}`,
    template: `%s · ${BRAND.name}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND.name,
  keywords: [
    "XAUUSD signals",
    "gold trading signals",
    "Telegram forex signals",
    "gold signals",
    "XAU/USD",
    "forex signals",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: BRAND.name,
    title: `${TITLE} | ${BRAND.name}`,
    description: DESCRIPTION,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${BRAND.name}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "finance",
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: SITE_URL,
  description: DESCRIPTION,
  sameAs: [LINKS.free, LINKS.linktree],
} as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          // Static object, no user input — safe to serialise directly.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
      </body>
    </html>
  );
}
