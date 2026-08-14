import { SPEC_STATS } from "@/lib/content";
import { Reveal } from "../ui/reveal";

/**
 * Operational facts, not performance claims. Three of the four are ranges,
 * which is why nothing here counts up — animating "20–60" would be nonsense.
 */
export function SpecStrip() {
  return (
    <section className="border-line border-y">
      <div className="shell">
        <dl className="divide-line grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {SPEC_STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 60}
              className="sm:border-line py-7 sm:not-first:border-l sm:py-8 sm:not-first:pl-6 lg:py-9"
            >
              <dd className="tnum text-ink text-2xl font-medium tracking-tight lg:text-[1.75rem]">
                {stat.display}
              </dd>
              <dt className="text-ink mt-2 text-sm font-medium">{stat.label}</dt>
              <p className="text-muted mt-0.5 text-[0.8125rem]">{stat.detail}</p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
