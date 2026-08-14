import { LINKS, MANAGED } from "@/lib/content";
import { Reveal } from "../ui/reveal";
import { SectionHead } from "../ui/section-head";

export function ManagedAccounts() {
  return (
    <section id="managed" className="py-14 lg:py-24">
      <div className="shell">
        <SectionHead eyebrow={MANAGED.eyebrow} heading={MANAGED.heading} body={MANAGED.body} />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1fr_20rem] lg:gap-12">
          <ul className="divide-line border-line grid divide-y border-t">
            {MANAGED.points.map((point, i) => (
              <Reveal as="li" key={point.title} delay={i * 60} className="py-5 lg:py-6">
                <h3 className="text-h3 text-ink">{point.title}</h3>
                <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed text-pretty">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal
            delay={80}
            className="border-line bg-surface h-fit rounded-2xl border p-6 lg:sticky lg:top-24"
          >
            <p className="flex items-baseline gap-2">
              <span className="tnum text-ink text-[2rem] leading-none font-medium tracking-tight">
                70/30
              </span>
            </p>
            <p className="text-muted mt-2 text-[0.8125rem]">
              Your share / ours, on net new profit only
            </p>

            <dl className="border-line mt-5 space-y-2 border-t pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">VPS setup</dt>
                <dd className="tnum text-ink">$150 once</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Management fee</dt>
                <dd className="tnum text-ink">None</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Custody of funds</dt>
                <dd className="text-ink">Yours</dd>
              </div>
            </dl>

            <a
              href={LINKS.vip}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6 w-full"
            >
              {MANAGED.cta}
            </a>

            <p className="text-faint mt-4 text-xs leading-relaxed text-pretty">
              {MANAGED.legalNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
