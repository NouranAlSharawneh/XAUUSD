"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `target` once `active` becomes true. Linear count-ups feel
 * mechanical, so this eases out. Render the result in `tabular-nums` or the
 * number visibly shivers as glyph widths change.
 *
 * Reduced motion is handled by returning the target rather than by setting
 * state — there is no animation to skip, so there is nothing to synchronise.
 */
export function useCountUp(target: number, active: boolean, duration = 1200): number {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;

    let start: number | null = null;

    const tick = (now: number): void => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      setValue(target * easeOutCubic(progress));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [target, active, duration, reduced]);

  return reduced ? target : value;
}
