import { WHO_ITS_FOR } from "@/lib/content";
import { Reveal } from "../ui/reveal";
import { SectionHead } from "../ui/section-head";

type ColumnProps = {
  readonly title: string;
  readonly items: readonly string[];
  readonly tone: "yes" | "no";
  readonly delay: number;
};

function Column({ title, items, tone, delay }: ColumnProps) {
  const yes = tone === "yes";
  return (
    <Reveal delay={delay} className="border-line bg-surface rounded-2xl border p-6 sm:p-7">
      <h3 className="text-ink text-[0.9375rem] font-medium">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="text-muted flex gap-3 text-[0.9375rem] leading-relaxed">
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className={`mt-1 size-3.5 shrink-0 ${yes ? "text-accent" : "text-faint"}`}
              fill="none"
            >
              {yes ? (
                <path
                  d="M3 8.5l3.2 3.2L13 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              )}
            </svg>
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function WhoItsFor() {
  return (
    <section className="py-14 lg:py-24">
      <div className="shell">
        <SectionHead eyebrow={WHO_ITS_FOR.eyebrow} heading={WHO_ITS_FOR.heading} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12">
          <Column
            title={WHO_ITS_FOR.yes.title}
            items={WHO_ITS_FOR.yes.items}
            tone="yes"
            delay={0}
          />
          <Column title={WHO_ITS_FOR.no.title} items={WHO_ITS_FOR.no.items} tone="no" delay={60} />
        </div>
      </div>
    </section>
  );
}
