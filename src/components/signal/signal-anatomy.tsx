import { SIGNAL_ANATOMY } from "@/lib/content";
import { BrokerNote } from "./broker-note";
import { Reveal } from "../ui/reveal";
import { SectionHead } from "../ui/section-head";

export function SignalAnatomy() {
  return (
    <section className="py-14 lg:py-24">
      <div className="shell">
        <SectionHead
          eyebrow={SIGNAL_ANATOMY.eyebrow}
          heading={SIGNAL_ANATOMY.heading}
          body={SIGNAL_ANATOMY.body}
        />

        <dl className="divide-line border-line mt-10 divide-y border-t lg:mt-12">
          {SIGNAL_ANATOMY.annotations.map((item, i) => (
            <Reveal
              key={item.term}
              delay={i * 60}
              className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8 lg:py-6"
            >
              <dt className="text-ink text-[0.9375rem] font-medium">{item.term}</dt>
              <dd className="text-muted text-[0.9375rem] leading-relaxed text-pretty">
                {item.detail}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={80}>
          <BrokerNote />
        </Reveal>
      </div>
    </section>
  );
}
