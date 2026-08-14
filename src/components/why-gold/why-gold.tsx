import { WHY_GOLD } from "@/lib/content";
import { MacroSparkline } from "./macro-sparkline";
import { Reveal } from "../ui/reveal";
import { SectionHead } from "../ui/section-head";

export function WhyGold() {
  return (
    <section className="py-14 lg:py-24">
      <div className="shell">
        <SectionHead eyebrow={WHY_GOLD.eyebrow} heading={WHY_GOLD.heading} body={WHY_GOLD.body} />

        <Reveal
          delay={80}
          className="border-line bg-surface mt-10 rounded-2xl border p-5 sm:p-7 lg:mt-12"
        >
          <MacroSparkline />
          <p className="text-faint mt-5 text-xs leading-relaxed text-pretty">
            {WHY_GOLD.chartCaption}
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-3 lg:mt-12">
          {WHY_GOLD.cards.map((card, i) => (
            <Reveal as="li" key={card.title} delay={i * 60}>
              <h3 className="text-h3 text-ink">{card.title}</h3>
              <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed text-pretty">
                {card.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
