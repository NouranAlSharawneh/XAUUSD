"use client";

import { SAMPLE_SIGNAL } from "@/lib/content";
import { useSignalFocus, type Level } from "./signal-focus";

type Row = {
  readonly level: Level;
  readonly label: string;
  readonly value: string;
  readonly note?: string;
  readonly tone?: "loss" | "gain";
};

const price = (n: number): string =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const RULE: Record<Level, string> = {
  entry: "var(--color-gold)",
  stop: "var(--color-loss)",
  target: "var(--color-gain)",
};

/**
 * The product, rendered rather than screenshotted. This is the Telegram
 * message a subscriber receives — building it as real DOM keeps it crisp at
 * any density, themeable, and readable by a screen reader.
 *
 * Each row is also a control: hovering it lights the matching level on the
 * chart, clicking holds that highlight until dismissed. That rules out a
 * description list — dt/dd cannot live inside a button — so the label/value
 * pairing rides on each button's accessible name instead.
 */
export function SignalCard() {
  const focus = useSignalFocus();

  const rows: readonly Row[] = [
    { level: "entry", label: "Entry", value: price(SAMPLE_SIGNAL.entry) },
    {
      level: "stop",
      label: "Stop loss",
      value: price(SAMPLE_SIGNAL.stopLoss),
      note: `${SAMPLE_SIGNAL.stopPips} pips`,
      tone: "loss",
    },
    {
      level: "target",
      label: "Take profit",
      value: price(SAMPLE_SIGNAL.takeProfit),
      note: `${SAMPLE_SIGNAL.targetPips} pips`,
      tone: "gain",
    },
  ];

  return (
    <div
      className="seq-rise border-panel-line/80 bg-panel-line/25 w-full rounded-xl border p-4 backdrop-blur-sm"
      style={{ animationDelay: "900ms" }}
    >
      <div className="border-panel-line/70 flex items-center justify-between border-b pb-3">
        <span className="tnum text-panel-ink text-[0.9375rem] font-medium tracking-tight">
          {SAMPLE_SIGNAL.pair}
        </span>
        <span className="text-loss bg-loss/12 rounded-md px-2 py-0.5 font-mono text-[0.6875rem] font-semibold tracking-[0.08em]">
          {SAMPLE_SIGNAL.direction}
        </span>
      </div>

      <div className="mt-3 space-y-1">
        {rows.map((row, i) => {
          const on = focus.active === row.level;
          return (
            <div
              key={row.label}
              className="seq-rise"
              style={{ animationDelay: `${1150 + i * 150}ms` }}
            >
              <button
                type="button"
                aria-pressed={focus.locked === row.level}
                aria-label={`${row.label} ${row.value}${row.note ? `, ${row.note}` : ""}. Highlight on chart.`}
                onPointerEnter={() => focus.setLevel(row.level)}
                onPointerLeave={() => focus.setLevel(null)}
                onFocus={() => focus.setLevel(row.level)}
                onBlur={() => focus.setLevel(null)}
                onClick={() => focus.toggleLock(row.level)}
                /* Negative inline margin with matching padding: the highlight
                   gains a background and a left rule without shifting the row
                   or the numbers off their shared right edge. */
                className={`chart-focus-panel -mx-2 flex w-[calc(100%+1rem)] items-baseline justify-between gap-3 rounded-md border-l-2 px-2 py-1.5 text-left motion-safe:transition-colors motion-safe:duration-200 ${
                  on ? "bg-panel-line/45" : "border-l-transparent"
                }`}
                style={on ? { borderLeftColor: RULE[row.level] } : undefined}
              >
                <span
                  aria-hidden
                  className={`text-[0.8125rem] motion-safe:transition-colors ${
                    on ? "text-panel-ink" : "text-panel-muted"
                  }`}
                >
                  {row.label}
                </span>
                <span aria-hidden className="flex items-baseline gap-2">
                  {row.note ? (
                    <span
                      className={`font-mono text-[0.6875rem] ${
                        row.tone === "loss" ? "text-loss/80" : "text-gain/80"
                      }`}
                    >
                      {row.note}
                    </span>
                  ) : null}
                  <span className="tnum text-panel-ink text-sm font-medium">{row.value}</span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <p
        className="seq-fade border-panel-line/70 text-panel-muted mt-3 border-t pt-3 font-mono text-[0.6875rem]"
        style={{ animationDelay: "1700ms" }}
      >
        {SAMPLE_SIGNAL.session} · {SAMPLE_SIGNAL.time}
      </p>
    </div>
  );
}
