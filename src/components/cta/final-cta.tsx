import { FINAL_CTA, LINKS } from "@/lib/content";
import { Reveal } from "../ui/reveal";

export function FinalCta() {
  return (
    <section className="py-16 lg:py-28">
      <div className="shell">
        <Reveal className="panel-wrap mx-auto max-w-3xl">
          <div className="panel-screen panel-striped px-6 py-12 text-center sm:px-12 lg:py-16">
            <h2 className="text-h2 text-panel-ink text-balance">{FINAL_CTA.heading}</h2>
            <p className="text-panel-muted mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-pretty">
              {FINAL_CTA.body}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={LINKS.free}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-onpanel w-full sm:w-auto"
              >
                Watch the free channel
              </a>
              {/* Inverse, not primary: primary is black, and this panel is
                  dark — the black button was invisible on it. */}
              <a
                href={LINKS.vip}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-inverse w-full sm:w-auto"
              >
                Get VIP access
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
