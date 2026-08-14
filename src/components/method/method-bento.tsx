import { METHOD } from "@/lib/content";
import { Reveal } from "../ui/reveal";
import { SectionHead } from "../ui/section-head";

export function MethodBento() {
  return (
    <section id="method" className="py-14 lg:py-24">
      <div className="shell">
        <SectionHead eyebrow={METHOD.eyebrow} heading={METHOD.heading} body={METHOD.body} />
      </div>

      {/* Hairline lattice: the container background is the line colour and the
          1px gap lets it show through. No borders, so no double-border seams. */}
      <div className="bento mt-10 lg:mt-14">
        {METHOD.rules.map((rule, i) => (
          <Reveal
            key={rule.title}
            delay={(i % 3) * 60}
            className={`bento-cell ${
              rule.span === 3 ? "bento-full" : rule.span === 2 ? "bento-wide" : ""
            }`}
          >
            <div className="flex h-full flex-col">
              {rule.metric ? (
                <p className="tnum text-accent text-lg font-medium tracking-tight">{rule.metric}</p>
              ) : null}
              <h3 className="text-h3 text-ink mt-3">{rule.title}</h3>
              <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed text-pretty">
                {rule.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
