"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

type Options = {
  /** Number of points in the series. */
  readonly count: number;
  /**
   * The width passed to buildPaths — how far the points span in viewBox units.
   * The scrub <rect> must start at x=0 and be exactly this wide, so its client
   * box maps straight onto the point range.
   */
  readonly plotWidth: number;
  /** The padding passed to buildPaths. */
  readonly padding: number;
  /** Called on Escape and on a pointer press outside the chart, after clearing. */
  readonly onDismiss?: () => void;
};

export type ChartScrub = {
  /** The point being read, or null when nothing is. */
  readonly index: number | null;
  /** True when the readout is held rather than following the pointer. */
  readonly isPinned: boolean;
  /** Spread onto the focusable wrapper around the SVG. */
  readonly containerProps: {
    readonly tabIndex: number;
    readonly "data-chart-scrub": string;
    readonly onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    readonly onBlur: (event: FocusEvent<HTMLDivElement>) => void;
  };
  /** Spread onto the transparent <rect> covering the plot. */
  readonly surfaceProps: {
    readonly onPointerMove: (event: PointerEvent<SVGRectElement>) => void;
    readonly onPointerDown: (event: PointerEvent<SVGRectElement>) => void;
    readonly onPointerLeave: () => void;
    readonly style: { readonly touchAction: "pan-y" };
  };
  /** Jump to a point and hold it — for controls like "peak" and "trough". */
  readonly pinTo: (index: number) => void;
  /** Move to a point without holding it. */
  readonly previewAt: (index: number | null) => void;
  readonly clear: () => void;
};

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

/**
 * Pointer, touch and keyboard scrubbing over an evenly spaced series, shared by
 * both charts on the page.
 *
 * One index of state drives everything: hover sets it, click holds it, arrow
 * keys step it, Escape drops it. Keeping it in one hook is what stops the two
 * charts drifting apart in behaviour.
 *
 * Deliberately holds no refs. Geometry comes from the event's own currentTarget
 * and the outside-click test from a data attribute, which keeps the returned
 * object free of anything the compiler treats as a ref — a hook that hands one
 * back makes every field beside it unreadable during render.
 */
export function useChartScrub({ count, plotWidth, padding, onDismiss }: Options): ChartScrub {
  const id = useId();
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);

  const lastIndex = count - 1;

  /* The SVG scales to its container, so client x has to go through the surface's
     bounding box — treating viewBox units as CSS pixels is right at exactly one
     width. The surface spans 0..plotWidth, so its box maps onto that range. */
  const indexAt = useCallback(
    (target: SVGRectElement, clientX: number): number => {
      const box = target.getBoundingClientRect();
      if (box.width === 0) return 0;
      const x = ((clientX - box.left) / box.width) * plotWidth;
      const t = (x - padding) / (plotWidth - padding * 2);
      return clamp(Math.round(t * lastIndex), 0, lastIndex);
    },
    [plotWidth, padding, lastIndex],
  );

  const step = useCallback(
    (delta: number) => {
      setHovered((current) => clamp((current ?? lastIndex) + delta, 0, lastIndex));
      setPinned(null);
    },
    [lastIndex],
  );

  const clear = useCallback(() => {
    setHovered(null);
    setPinned(null);
  }, []);

  const pinTo = useCallback((next: number) => {
    setHovered(next);
    setPinned(next);
  }, []);

  const previewAt = useCallback((next: number | null) => {
    setHovered(next);
  }, []);

  /* A press anywhere else releases the pin — otherwise it reads as a stuck
     tooltip the first time someone clicks the chart and scrolls on. */
  useEffect(() => {
    if (pinned === null) return;
    const onDown = (event: globalThis.PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(`[data-chart-scrub="${id}"]`)) return;
      clear();
      onDismiss?.();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [pinned, clear, onDismiss, id]);

  return {
    index: pinned ?? hovered,
    isPinned: pinned !== null,
    pinTo,
    previewAt,
    clear,
    containerProps: {
      tabIndex: 0,
      "data-chart-scrub": id,
      onKeyDown: (event) => {
        switch (event.key) {
          case "ArrowRight":
            step(event.shiftKey ? 5 : 1);
            break;
          case "ArrowLeft":
            step(event.shiftKey ? -5 : -1);
            break;
          case "Home":
            setPinned(null);
            setHovered(0);
            break;
          case "End":
            setPinned(null);
            setHovered(lastIndex);
            break;
          case "Enter":
          case " ":
            setHovered((current) => current ?? lastIndex);
            setPinned((current) => (current === null ? (hovered ?? lastIndex) : null));
            break;
          case "Escape":
            clear();
            onDismiss?.();
            break;
          default:
            /* Return before preventDefault so Tab and browser shortcuts still
               reach the page. */
            return;
        }
        event.preventDefault();
      },
      onBlur: (event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        if (pinned === null) setHovered(null);
      },
    },
    surfaceProps: {
      onPointerMove: (event) => setHovered(indexAt(event.currentTarget, event.clientX)),
      onPointerDown: (event) => {
        const next = indexAt(event.currentTarget, event.clientX);
        /* Capture so a drag that leaves the rect keeps scrubbing rather than
           stranding the readout where the pointer crossed the edge. */
        event.currentTarget.setPointerCapture(event.pointerId);
        setHovered(next);
        setPinned((current) => (current === next ? null : next));
      },
      onPointerLeave: () => setHovered(null),
      /* pan-y, not none: a vertical swipe over the chart still scrolls the
         page, only a horizontal drag scrubs. */
      style: { touchAction: "pan-y" },
    },
  };
}
