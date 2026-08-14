import { HERO, LINKS } from "@/lib/content";
import { HeroPanel } from "./hero-panel";

export function Hero() {
  return (
    /* data-slab="dark" is what SiteHeader watches to know it is over a dark
       surface and should render its dark treatment. */
    <section
      data-slab="dark"
      className="hero-atmos relative overflow-hidden pt-8 pb-24 lg:pt-12 lg:pb-32"
    >
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          {/* Gold, not olive: this is a dark surface. Olive measures 3.31:1
              here and fails AA — see the accent rule in globals.css. */}
          <p
            className="seq-rise text-label text-gold inline-flex items-center gap-2 uppercase"
            style={{ animationDelay: "0ms" }}
          >
            <span aria-hidden="true" className="bg-gold size-1.5 rounded-full" />
            {HERO.eyebrow}
          </p>

          <h1
            className="seq-rise text-display text-panel-ink mt-5 text-balance"
            style={{ animationDelay: "80ms" }}
          >
            {HERO.heading}
          </h1>

          <p
            className="seq-rise text-lead text-panel-muted mx-auto mt-5 max-w-xl text-pretty"
            style={{ animationDelay: "160ms" }}
          >
            {HERO.subheading}
          </p>

          <div
            className="seq-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href={LINKS.vip}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-inverse w-full sm:w-auto"
            >
              {HERO.primaryCta}
            </a>
            <a
              href={LINKS.free}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-onpanel w-full sm:w-auto"
            >
              {HERO.secondaryCta}
            </a>
          </div>

          <p
            className="seq-fade text-panel-muted mx-auto mt-5 max-w-md text-[0.8125rem] leading-relaxed text-pretty"
            style={{ animationDelay: "360ms" }}
          >
            {HERO.microcopy}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl lg:mt-16">
          <HeroPanel />
          <p
            className="seq-fade text-panel-muted mt-4 text-center text-xs"
            style={{ animationDelay: "1900ms" }}
          >
            Illustrative example. Not a record of past trades.
          </p>
        </div>
      </div>

    </section>
  );
}
