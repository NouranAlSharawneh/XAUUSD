"use client";

import { useMemo } from "react";
import { buildPaths } from "@/lib/build-path";
import { GOLD_MACRO_SUMMARY, GOLD_MONTHLY } from "@/lib/gold-series";
import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";
import { useChartScrub } from "@/hooks/use-chart-scrub";

const VIEW_W = 720;
const VIEW_H = 220;
const PAD = 10;

/** Tooltip box, in viewBox units. One line: "Feb 2026" beside "$5,255". */
const TIP_W = 132;
const TIP_H = 30;
const TIP_GAP = 12;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/* Formatted by hand rather than via Date: "2026-02" parses as UTC midnight and
   would render as January west of Greenwich, which is a hydration mismatch as
   well as wrong. */
const monthLabel = (iso: string): string => {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
};

const usd = (n: number): string => `$${n.toLocaleString("en-US")}`;

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

const START = GOLD_MACRO_SUMMARY.startClose;
const PEAK_INDEX = GOLD_MONTHLY.findIndex((d) => d.close === GOLD_MACRO_SUMMARY.peakClose);
const TROUGH_INDEX = GOLD_MONTHLY.findIndex((d) => d.close === GOLD_MACRO_SUMMARY.troughAfterPeak);

/**
 * Real XAU/USD month-end closes, drawn in green — gold would fail contrast on
 * the light canvas. The 2026 drawdown is left in: it is checkable against any
 * terminal, and volatility is the argument this section is making.
 *
 * Scrubbing retargets the headline rather than only filling a tooltip, so the
 * big number always answers "how much, over what window" for whatever point is
 * being read. The peak and trough chips jump straight to the two months that
 * matter.
 */
export function MacroSparkline() {
  const { ref, inView } = useInView(0.25);
  const change = useCountUp(GOLD_MACRO_SUMMARY.changePercent, inView, 1400);

  const { line, area, points } = useMemo(
    () =>
      buildPaths(
        GOLD_MONTHLY.map((d) => d.close),
        { width: VIEW_W, height: VIEW_H, padding: PAD },
      ),
    [],
  );

  const scrub = useChartScrub({
    count: GOLD_MONTHLY.length,
    plotWidth: VIEW_W,
    padding: PAD,
  });

  const { index } = scrub;
  const last = points[points.length - 1];
  const datum = index === null ? null : GOLD_MONTHLY[index];
  const point = index === null ? null : points[index];

  /* The headline reads the scrubbed point when there is one, so it always
     describes the window actually on screen. */
  const percent =
    datum === null ? Math.round(change) : Math.round(((datum.close - START) / START) * 100);
  const rangeEnd = datum === null ? GOLD_MACRO_SUMMARY.to : monthLabel(datum.month);

  const flip = point !== null && point.x > VIEW_W - (TIP_W + TIP_GAP + PAD);
  const tipX = point === null ? 0 : flip ? point.x - TIP_GAP - TIP_W : point.x + TIP_GAP;
  const tipY = point === null ? 0 : clamp(point.y - TIP_H - 12, PAD, VIEW_H - PAD - TIP_H);

  const chip = (label: string, target: number) => (
    <button
      type="button"
      aria-pressed={index === target}
      onPointerEnter={() => scrub.previewAt(target)}
      onPointerLeave={() => !scrub.isPinned && scrub.previewAt(null)}
      onFocus={() => scrub.previewAt(target)}
      onClick={() => scrub.pinTo(target)}
      className={`chart-focus rounded-md px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.04em] uppercase motion-safe:transition-colors ${
        index === target ? "bg-accent-tint text-accent-hover" : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div className="flex items-baseline gap-3">
          <span className="tnum text-ink text-2xl font-medium tracking-tight">
            {percent > 0 ? "+" : ""}
            {percent}%
          </span>
          <span className="text-muted text-sm">
            {GOLD_MACRO_SUMMARY.from} → {rangeEnd}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          {chip(`Peak ${usd(GOLD_MACRO_SUMMARY.peakClose)}`, PEAK_INDEX)}
          <span className="text-faint font-mono text-[0.6875rem]">·</span>
          {chip(`Trough ${usd(GOLD_MACRO_SUMMARY.troughAfterPeak)}`, TROUGH_INDEX)}
        </div>
      </div>

      <div
        role="group"
        aria-label={`XAU/USD month-end close from ${GOLD_MACRO_SUMMARY.from} to ${GOLD_MACRO_SUMMARY.to}, rising ${GOLD_MACRO_SUMMARY.changePercent} percent from $${GOLD_MACRO_SUMMARY.startClose} to $${GOLD_MACRO_SUMMARY.endClose}, including a peak of $${GOLD_MACRO_SUMMARY.peakClose} and a subsequent fall to $${GOLD_MACRO_SUMMARY.troughAfterPeak}. Use the arrow keys to step through months.`}
        className="chart-focus mt-5 rounded-lg"
        {...scrub.containerProps}
      >
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full" aria-hidden>
          <defs>
            <linearGradient id="macro-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={area}
            fill="url(#macro-fade)"
            className="motion-safe:transition-opacity motion-safe:delay-500 motion-safe:duration-1000"
            style={{ opacity: inView ? 1 : 0 }}
          />

          <path
            d={line}
            pathLength={1}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={inView ? 0 : 1}
            style={{ transition: "stroke-dashoffset 1800ms var(--ease-out-expo)" }}
          />

          {last ? (
            <circle
              cx={last.x}
              cy={last.y}
              r={3.5}
              fill="var(--color-accent)"
              className="motion-safe:transition-opacity motion-safe:delay-[1600ms] motion-safe:duration-500"
              style={{ opacity: inView ? 1 : 0 }}
            />
          ) : null}

          {point && datum ? (
            <g>
              <line
                x1={point.x}
                y1={PAD}
                x2={point.x}
                y2={VIEW_H - PAD}
                stroke="var(--color-line-strong)"
                strokeWidth={1}
              />
              <circle cx={point.x} cy={point.y} r={7} fill="var(--color-accent)" opacity={0.18} />
              <circle
                cx={point.x}
                cy={point.y}
                r={3.5}
                fill="var(--color-accent)"
                stroke="var(--color-surface)"
                strokeWidth={1.5}
              />

              <rect
                x={tipX}
                y={tipY}
                width={TIP_W}
                height={TIP_H}
                rx={7}
                fill="var(--color-surface)"
                stroke={scrub.isPinned ? "var(--color-accent)" : "var(--color-line-strong)"}
                strokeWidth={1}
              />
              <text
                x={tipX + 10}
                y={tipY + 20}
                fill="var(--color-muted)"
                className="font-mono text-[11px]"
              >
                {monthLabel(datum.month)}
              </text>
              <text
                x={tipX + TIP_W - 10}
                y={tipY + 20}
                textAnchor="end"
                fill="var(--color-ink)"
                className="font-mono text-[12px] font-medium tabular-nums"
              >
                {usd(datum.close)}
              </text>
            </g>
          ) : null}

          {/* Scrub surface, last so it sits above everything. */}
          <rect
            x={0}
            y={0}
            width={VIEW_W}
            height={VIEW_H}
            fill="transparent"
            className="cursor-crosshair"
            {...scrub.surfaceProps}
          />
        </svg>

        <p className="sr-only" aria-live="polite">
          {datum === null
            ? ""
            : `${monthLabel(datum.month)}, ${usd(datum.close)}, ${percent > 0 ? "up" : "down"} ${Math.abs(percent)} percent since ${GOLD_MACRO_SUMMARY.from}`}
        </p>
      </div>
    </div>
  );
}
