import { FAQ } from "@/lib/content";
import { withBrokerLinks } from "../signal/broker-note";
import { Reveal } from "../ui/reveal";
import { SectionHead } from "../ui/section-head";

/**
 * Native <details>/<summary>: correct keyboard and screen-reader behaviour for
 * free, and it works before hydration and with JS disabled.
 */
export function Faq() {
  return (
    <section id="faq" className="bg-sunken border-line border-y py-14 lg:py-24">
      <div className="shell">
        <SectionHead eyebrow="Questions" heading="The things people ask before subscribing." />

        <div className="mt-10 lg:mt-12">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 5) * 40}>
              <details className="border-line group border-b">
                <summary className="flex items-start justify-between gap-6 py-5 text-left">
                  <span className="text-ink text-[0.9375rem] font-medium text-pretty">
                    {item.q}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="text-muted mt-1 size-4 shrink-0 transition-transform duration-300 group-open:rotate-45"
                    fill="none"
                  >
                    <path
                      d="M8 3v10M3 8h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <p className="text-muted max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-pretty">
                  {withBrokerLinks(item.a)}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
