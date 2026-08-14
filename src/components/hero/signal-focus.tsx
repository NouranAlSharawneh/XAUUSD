"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Level = "stop" | "entry" | "target";

type SignalFocusValue = {
  /** Hovered or keyboard-focused. */
  readonly level: Level | null;
  /** Clicked, and so held until dismissed. */
  readonly locked: Level | null;
  /** What should actually render highlighted — a lock outranks a passing hover. */
  readonly active: Level | null;
  readonly setLevel: (level: Level | null) => void;
  readonly toggleLock: (level: Level) => void;
  readonly clear: () => void;
};

const INERT: SignalFocusValue = {
  level: null,
  locked: null,
  active: null,
  setLevel: () => {},
  toggleLock: () => {},
  clear: () => {},
};

const SignalFocusContext = createContext<SignalFocusValue>(INERT);

/**
 * Lets the chart and the signal card highlight each other — hovering the SL
 * line lights up the Stop loss row, and vice versa. They are siblings, so the
 * state has to live above both.
 *
 * The provider takes `children` rather than rendering the pair itself, which
 * keeps HeroPanel and everything it passes through server-rendered.
 */
export function SignalFocusProvider({ children }: { readonly children: ReactNode }) {
  const [level, setLevel] = useState<Level | null>(null);
  const [locked, setLocked] = useState<Level | null>(null);

  const toggleLock = useCallback((next: Level) => {
    setLocked((current) => (current === next ? null : next));
    setLevel(next);
  }, []);

  const clear = useCallback(() => {
    setLocked(null);
    setLevel(null);
  }, []);

  const value = useMemo<SignalFocusValue>(
    () => ({ level, locked, active: locked ?? level, setLevel, toggleLock, clear }),
    [level, locked, toggleLock, clear],
  );

  return <SignalFocusContext.Provider value={value}>{children}</SignalFocusContext.Provider>;
}

/**
 * Falls back to an inert value rather than throwing, so either component can be
 * rendered outside the provider and simply not cross-highlight.
 */
export function useSignalFocus(): SignalFocusValue {
  return useContext(SignalFocusContext);
}
