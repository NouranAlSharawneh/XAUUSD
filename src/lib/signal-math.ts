import { INTRADAY_START } from "./gold-series";
import { SAMPLE_SIGNAL } from "./content";

/** One pip on XAUUSD is 0.10 — the figure SAMPLE_SIGNAL's 43 and 83 both imply. */
const PIP = 0.1;
const MINUTES_PER_STEP = 5;

const [START_H, START_M] = INTRADAY_START.split(":").map(Number);
const START_MINUTES = START_H * 60 + START_M;

const pad2 = (n: number): string => String(n).padStart(2, "0");

/**
 * Clock label for a point in INTRADAY_SERIES. The series is M5, so each index
 * is five minutes on from the last.
 */
export function timeAtIndex(index: number): string {
  const total = START_MINUTES + index * MINUTES_PER_STEP;
  return `${pad2(Math.floor(total / 60) % 24)}:${pad2(total % 60)}`;
}

/**
 * Pips of profit against the sample entry. Positive is good: SAMPLE_SIGNAL is a
 * SELL, so the trade gains as price falls below the entry.
 *
 * Rounded because the arithmetic is on floats — (4412.5 - 4404.2) * 10 is
 * 82.99999999999997, and the card next to this says 83.
 */
export function pipsFrom(price: number): number {
  return Math.round((SAMPLE_SIGNAL.entry - price) / PIP);
}
