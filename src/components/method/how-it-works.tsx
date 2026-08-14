import { HOW_IT_WORKS } from "@/lib/content";
import { Reveal } from "../ui/reveal";
import { SectionHead } from "../ui/section-head";

/**
 * Numbered markers are used here because this genuinely is a sequence — the
 * order carries information the reader needs. They are not used anywhere else
 * on the page.
 */
export function HowItWorks() {
  return (
    <section className="bg-sunken border-line border-y py-14 lg:py-24">
      <div className="shell">
        <SectionHead
          eyebrow={HOW_IT_WORKS.eyebrow}
          heading={HOW_IT_WORKS.heading}
          body={HOW_IT_WORKS.body}
        />

        <ol className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 60}>
              <span className="tnum border-line bg-surface text-accent flex size-8 items-center justify-center rounded-full border text-[0.8125rem] font-medium">
                {i + 1}
              </span>
              <h3 className="text-h3 text-ink mt-4">{step.title}</h3>
              <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed text-pretty">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
