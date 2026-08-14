import { LINKS, PLANS, PLAN_INCLUDES, PRICING } from "@/lib/content";
import { Reveal } from "../ui/reveal";
import { SectionHead } from "../ui/section-head";

/**
 * Only the annual plan carries a badge, and it says "Best value" because that
 * is verifiably true — it has the lowest cost per month. There is no "Most
 * popular" badge anywhere: there is no data behind one, and inventing it is
 * the same class of fabrication as inventing a win rate.
 */
export function Pricing() {
  return (
    <section id="pricing" className="py-14 lg:py-24">
      <div className="shell">
        <SectionHead eyebrow={PRICING.eyebrow} heading={PRICING.heading} body={PRICING.body} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {PLANS.map((plan, i) => {
            const featured = plan.badge !== null;
            return (
              <Reveal
                key={plan.id}
                delay={i * 60}
                className={`bg-surface relative flex flex-col rounded-2xl border p-6 ${
                  featured ? "border-accent/35 ring-accent/10 ring-1" : "border-line"
                }`}
              >
                {featured ? (
                  <span className="text-label bg-accent absolute -top-2.5 left-6 rounded-full px-2.5 py-1 text-white uppercase">
                    {plan.badge}
                  </span>
                ) : null}

                <h3 className="text-ink text-[0.9375rem] font-medium">{plan.name}</h3>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="tnum text-ink text-[2rem] leading-none font-medium tracking-tight">
                    ${plan.price}
                  </span>
                </p>

                <p className="text-muted mt-2 text-[0.8125rem]">
                  <span className="tnum">{plan.perMonth}</span> per month
                  {plan.saving ? (
                    <>
                      {" · "}
                      <span className="text-accent font-medium">{plan.saving}</span>
                    </>
                  ) : null}
                </p>

                <a
                  href={LINKS.vip}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn mt-6 w-full ${featured ? "btn-primary" : "btn-secondary"}`}
                >
                  Get {plan.name}
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={80}
          className="border-line bg-surface mt-6 grid gap-6 rounded-2xl border p-6 sm:p-7 lg:grid-cols-[1fr_20rem] lg:gap-10"
        >
          <div>
            <h3 className="text-ink text-[0.9375rem] font-medium">
              Every plan includes the same signals
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {PLAN_INCLUDES.map((item) => (
                <li key={item} className="text-muted flex gap-2.5 text-[0.9375rem]">
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="text-accent mt-1 size-3.5 shrink-0"
                    fill="none"
                  >
                    <path
                      d="M3 8.5l3.2 3.2L13 5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-line lg:border-l lg:pl-10">
            <h3 className="text-ink text-[0.9375rem] font-medium">Payment</h3>
            <p className="text-muted mt-3 text-[0.8125rem] leading-relaxed text-pretty">
              {PRICING.paymentNote}
            </p>
            <p className="text-faint mt-4 text-xs leading-relaxed text-pretty">
              {PRICING.legalNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
