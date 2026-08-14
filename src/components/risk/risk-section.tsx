"use client";

import { LOT_LADDER, RISK } from "@/lib/content";
import { useInView } from "@/hooks/use-in-view";
import { Reveal } from "../ui/reveal";
import { RiskCalculator } from "./risk-calculator";
import { SectionHead } from "../ui/section-head";

/**
 * The page's second dark slab. This was already the one section set apart from
 * the rest — grey fill, rules top and bottom — so it is the natural place to
 * break the light run properly.
 *
 * The background turns dark on scroll rather than being dark from the start;
 * see .section-dark. Threshold 0 with a positive bottom rootMargin fires the
 * change while the section is still a quarter of a viewport below the fold, so
 * the colour has settled before any of it is on screen. data-slab="dark" is
 * what SiteHeader watches to know it should go dark over this section too.
 *
 * Everything inside adapts by itself: .section-dark remaps --color-ink and
 * friends for the whole subtree, so SectionHead, RiskCalculator and the table
 * need no changes.
 */
export function RiskSection() {
  const { ref, inView } = useInView(0, "0px 0px 25% 0px");

  return (
    <section
      id="risk"
      ref={ref}
      data-slab="dark"
      data-dark={inView}
      className="section-dark py-14 lg:py-24"
    >
      <div className="shell">
        <SectionHead eyebrow={RISK.eyebrow} heading={RISK.heading} body={RISK.body} />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <Reveal>
            <RiskCalculator />
          </Reveal>

          <Reveal delay={80} className="border-line bg-surface rounded-2xl border">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <caption className="text-muted px-6 pt-6 text-left text-[0.8125rem]">
                  {RISK.tableCaption}
                </caption>
                <thead>
                  <tr className="border-line border-b">
                    <th
                      scope="col"
                      className="text-label text-muted px-6 pt-4 pb-3 uppercase"
                    >
                      Balance
                    </th>
                    <th
                      scope="col"
                      className="text-label text-muted px-6 pt-4 pb-3 text-right uppercase"
                    >
                      Max lot
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-line divide-y">
                  {LOT_LADDER.map((r) => (
                    <tr key={r.balance}>
                      <td className="tnum text-ink px-6 py-2.5 text-sm">
                        ${r.balance.toLocaleString("en-US")}
                      </td>
                      <td className="tnum text-muted px-6 py-2.5 text-right text-sm">
                        {r.lot.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
