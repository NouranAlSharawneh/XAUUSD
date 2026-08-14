import { BRAND, BROKER, DISCLAIMER, LEGAL_ENTITY, LINKS, NAV_LINKS } from "@/lib/content";
import { BrokerLink } from "../signal/broker-note";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-line border-t">
      <div className="shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-sm">
            <Logo />
            <p className="text-muted mt-4 text-[0.9375rem] leading-relaxed text-pretty">
              {BRAND.tagline} Works with any broker that offers XAUUSD.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            <nav aria-labelledby="footer-nav">
              <h2 id="footer-nav" className="text-label text-muted uppercase">
                Page
              </h2>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ink hover:text-accent text-sm transition-colors duration-300 hover:duration-50"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-contact">
              <h2 id="footer-contact" className="text-label text-muted uppercase">
                Telegram
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={LINKS.free}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent text-sm transition-colors duration-300 hover:duration-50"
                  >
                    Free channel
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.vip}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent text-sm transition-colors duration-300 hover:duration-50"
                  >
                    Subscribe · {LINKS.handle}
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent text-sm transition-colors duration-300 hover:duration-50"
                  >
                    All links
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-broker">
              <h2 id="footer-broker" className="text-label text-muted uppercase">
                Broker
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <BrokerLink
                    label={BROKER.cta}
                    className="text-ink hover:text-accent text-sm transition-colors duration-300 hover:duration-50"
                  />
                </li>
              </ul>
              {/* Disclosure sits with the link, not only in the legal block. */}
              <p className="text-faint mt-3 max-w-[15rem] text-xs leading-relaxed text-pretty">
                {BROKER.disclosureShort}
              </p>
            </nav>
          </div>
        </div>

        <div className="border-line mt-12 border-t pt-8">
          <h2 className="text-label text-muted uppercase">Risk warning and disclaimer</h2>
          <div className="mt-5 grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {DISCLAIMER.map((part) => (
              <section key={part.title}>
                <h3 className="text-ink text-xs font-medium">{part.title}</h3>
                <p className="text-faint mt-1.5 text-xs leading-relaxed text-pretty">{part.body}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="border-line text-faint mt-8 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {LEGAL_ENTITY}. Not authorised or regulated by any
            financial services regulator.
          </p>
          <p>Price data: COMEX / LBMA reference, illustrative only.</p>
        </div>
      </div>
    </footer>
  );
}
