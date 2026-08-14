"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSnapshot = (): boolean => window.matchMedia(QUERY).matches;

/* The server can't know the preference, so it assumes "animate" and the client
   corrects on hydration. */
const getServerSnapshot = (): boolean => false;

/**
 * Only needed for things CSS can't gate — requestAnimationFrame loops.
 * Anything expressible as a transition should use Tailwind's `motion-safe:`
 * variant instead.
 *
 * useSyncExternalStore rather than useState+useEffect: matchMedia is an
 * external store, and this is the pattern that reads it without a synchronous
 * setState inside an effect.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
