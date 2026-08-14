"use client";

import { useMemo } from "react";
import { buildPaths } from "@/lib/build-path";
import { INTRADAY_DOMAIN, INTRADAY_SERIES } from "@/lib/gold-series";
import { SAMPLE_SIGNAL } from "@/lib/content";
import { pipsFrom, timeAtIndex } from "@/lib/signal-math";
import { useChartScrub } from "@/hooks/use-chart-scrub";
import { useSignalFocus, type Level } from "./signal-focus";

const VIEW_W = 600;
const VIEW_H = 320;
/** Plot stops short of the right edge to leave room for the price labels. */
const PLOT_W = 486;
const PAD = 14;

/** Tooltip box, in viewBox units. Wide enough for "09:35 GMT" at 11px beside
    "4415.40" at 13px without the two colliding — Plex Mono advances 0.6em, so
    that pair needs 114 plus the 10 of padding either side. */
const TIP_W = 152;
const TIP_H = 46;
const TIP_GAP = 12;

type Marker = {
  readonly level: Level;
  readonly value: number;
  readonly label: string;
  readonly colour: string;
  readonly delay: number;
};

const MARKERS: readonly Marker[] = [
  {
    level: "stop",
    value: SAMPLE_SIGNAL.stopLoss,
    label: "SL",
    colour: "var(--color-loss)",
    delay: 1500,
  },
  {
    level: "entry",
    value: SAMPLE_SIGNAL.entry,
    label: "Entry",
    colour: "var(--color-gold)",
    delay: 1350,
  },
  {
    level: "target",
    value: SAMPLE_SIGNAL.takeProfit,
    label: "TP",
    colour: "var(--color-gain)",
    delay: 1650,
  },
];

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

/** Real minus sign, not a hyphen — these sit in tabular figures. */
const pipLabel = (pips: number): string =>
  pips === 0 ? "at entry" : `${pips > 0 ? "+" : "−"}${Math.abs(pips)} pips`;

const pipColour = (pips: number): string =>
  pips === 0 ? "var(--color-panel-muted)" : pips > 0 ? "var(--color-gain)" : "var(--color-loss)";

/**
 * The hero chart. Illustrative, not a trade record — the caption beside it
 * says so, and that is a requirement rather than a nicety.
 *
 * Scrub it to read price, M5 timestamp and running P&L against the entry;
 * click to pin that readout; hover a level to light it and its row in the
 * signal card. Pointer, touch and keyboard all drive the same one index.
 *
 * The load-in is still pure CSS keyframes, so it renders on the server, plays
 * before hydration, and snaps to its final frame under prefers-reduced-motion.
 */
export function GoldChart() {
  const { line, area, points, yFor } = useMemo(
    () =>
      buildPaths(INTRADAY_SERIES, {
        width: PLOT_W,
        height: VIEW_H,
        padding: PAD,
        domain: INTRADAY_DOMAIN,
      }),
    [],
  );

  const focus = useSignalFocus();
  const scrub = useChartScrub({
    count: INTRADAY_SERIES.length,
    plotWidth: PLOT_W,
    padding: PAD,
    onDismiss: focus.clear,
  });

  const { index } = scrub;
  const last = points[points.length - 1];
  const value = index === null ? null : INTRADAY_SERIES[index];
  const point = index === null ? null : points[index];
  const pips = value === null ? 0 : pipsFrom(value);

  /* Flip the tooltip to the left of the crosshair near the right edge, where
     there is no longer room for it. */
  const flip = point !== null && point.x > PLOT_W - (TIP_W + TIP_GAP + PAD);
  const tipX = point === null ? 0 : flip ? point.x - TIP_GAP - TIP_W : point.x + TIP_GAP;
  const tipY = point === null ? 0 : clamp(point.y - TIP_H / 2, PAD, VIEW_H - PAD - TIP_H);

  return (
    <div
      role="group"
      aria-label={`Illustrative XAUUSD intraday chart. A sell entry at ${SAMPLE_SIGNAL.entry}, stop loss at ${SAMPLE_SIGNAL.stopLoss}, take profit at ${SAMPLE_SIGNAL.takeProfit}. Use the arrow keys to step through prices.`}
      className="chart-focus-panel rounded-lg"
      {...scrub.containerProps}
    >
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="gold-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Faint band between stop and target — the trade's risk envelope. */}
        <rect
          x={PAD}
          y={yFor(SAMPLE_SIGNAL.stopLoss)}
          width={PLOT_W - PAD * 2}
          height={yFor(SAMPLE_SIGNAL.takeProfit) - yFor(SAMPLE_SIGNAL.stopLoss)}
          fill="var(--color-panel-ink)"
          /* fill-opacity, not opacity — the seq-fade keyframes animate `opacity`
             to 1 and would otherwise clobber a presentation attribute of the
             same name, leaving a solid white block. */
          fillOpacity={0.03}
          className="seq-fade"
          style={{ animationDelay: "1200ms" }}
        />

        <path
          d={area}
          fill="url(#gold-fade)"
          className="seq-fade"
          style={{ animationDelay: "500ms" }}
        />

        {/* pathLength={1} normalises dash units to 0–1, so no getTotalLength(),
            no measuring effect, and no hydration mismatch. */}
        <path
          d={line}
          pathLength={1}
          fill="none"
          stroke="var(--color-gold-bright)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          className="seq-draw"
        />

        {MARKERS.map((marker) => {
          const y = yFor(marker.value);
          const on = focus.active === marker.level;
          const dimmed = focus.active !== null && !on;
          return (
            /* The highlight opacity goes on an inner <g>: seq-wipe ends at
               opacity 1 with fill-mode `both`, so it would keep overriding any
               opacity set on the animated element itself. */
            <g
              key={marker.label}
              className="seq-wipe"
              style={{ animationDelay: `${marker.delay}ms` }}
            >
              <g
                className="motion-safe:transition-opacity motion-safe:duration-200"
                style={{ opacity: dimmed ? 0.25 : 1 }}
              >
                <line
                  x1={PAD}
                  y1={y}
                  x2={PLOT_W - PAD}
                  y2={y}
                  stroke={marker.colour}
                  strokeWidth={on ? 1.5 : 1}
                  strokeDasharray="3 4"
                  opacity={on ? 1 : 0.7}
                />
                <text
                  x={PLOT_W + 2}
                  y={y + 4}
                  fill={marker.colour}
                  className="font-mono text-[13px] font-medium"
                >
                  {marker.label}
                </text>
                <text
                  x={VIEW_W - 4}
                  y={y + 4}
                  textAnchor="end"
                  fill={on ? "var(--color-panel-ink)" : "var(--color-panel-muted)"}
                  className="font-mono text-[13px] tabular-nums"
                >
                  {marker.value.toFixed(2)}
                </text>
              </g>

              {/* The label column is the level control; the plot to its left
                  belongs to the scrub surface. Keeping them disjoint means a
                  click is never ambiguous between "pin this price" and "hold
                  this level" — and the card rows offer a second way in. */}
              <rect
                x={PLOT_W}
                y={y - 11}
                width={VIEW_W - PLOT_W}
                height={22}
                fill="transparent"
                className="cursor-pointer"
                style={{ touchAction: "pan-y" }}
                onPointerEnter={() => focus.setLevel(marker.level)}
                onPointerLeave={() => focus.setLevel(null)}
                onClick={() => focus.toggleLock(marker.level)}
              />
            </g>
          );
        })}

        {last ? (
          <g className="seq-fade" style={{ animationDelay: "1800ms" }}>
            <circle cx={last.x} cy={last.y} r={7} fill="var(--color-gain)" opacity="0.2" />
            <circle cx={last.x} cy={last.y} r={3.5} fill="var(--color-gain)" />
          </g>
        ) : null}

        {point && value !== null && index !== null ? (
          <g>
            <line
              x1={point.x}
              y1={PAD}
              x2={point.x}
              y2={VIEW_H - PAD}
              stroke="var(--color-panel-muted)"
              strokeWidth={1}
              opacity={0.35}
            />
            <circle cx={point.x} cy={point.y} r={7} fill="var(--color-gold-bright)" opacity={0.2} />
            <circle cx={point.x} cy={point.y} r={3.5} fill="var(--color-gold-bright)" />

            <rect
              x={tipX}
              y={tipY}
              width={TIP_W}
              height={TIP_H}
              rx={8}
              fill="var(--color-panel)"
              stroke={scrub.isPinned ? "var(--color-gold-bright)" : "var(--color-panel-line)"}
              strokeWidth={1}
            />
            <text
              x={tipX + 10}
              y={tipY + 19}
              fill="var(--color-panel-muted)"
              className="font-mono text-[11px]"
            >
              {timeAtIndex(index)} GMT
            </text>
            <text
              x={tipX + TIP_W - 10}
              y={tipY + 19}
              textAnchor="end"
              fill="var(--color-panel-ink)"
              className="font-mono text-[13px] font-medium tabular-nums"
            >
              {value.toFixed(2)}
            </text>
            <text
              x={tipX + 10}
              y={tipY + 36}
              fill={pipColour(pips)}
              className="font-mono text-[11px] tabular-nums"
            >
              {pipLabel(pips)}
            </text>
            {scrub.isPinned ? (
              <circle
                cx={tipX + TIP_W - 14}
                cy={tipY + 32}
                r={2.5}
                fill="var(--color-gold-bright)"
              />
            ) : null}
          </g>
        ) : null}

        {/* Scrub surface, last so it sits above everything. Stops at PLOT_W —
            the strip to its right belongs to the marker hit bands. */}
        <rect
          x={0}
          y={0}
          width={PLOT_W}
          height={VIEW_H}
          fill="transparent"
          className="cursor-crosshair"
          {...scrub.surfaceProps}
        />
      </svg>

      <p className="sr-only" aria-live="polite">
        {index === null || value === null
          ? ""
          : `${timeAtIndex(index)} GMT, ${value.toFixed(2)}, ${pipLabel(pips)}`}
      </p>
    </div>
  );
}
