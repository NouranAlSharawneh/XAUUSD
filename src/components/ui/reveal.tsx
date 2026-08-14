"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

type RevealProps = {
  readonly children: ReactNode;
  /** Stagger, in ms. Keep runs short — past ~6 items the tail feels slow. */
  readonly delay?: number;
  readonly className?: string;
  /** Set to "li" inside a list so the reveal is itself the valid child. */
  readonly as?: "div" | "li" | "section";
};

/**
 * Fade-and-lift on first scroll into view. 20px travel over 400ms.
 *
 * The hidden state lives behind a `prefers-reduced-motion: no-preference`
 * query in globals.css rather than being applied here, so a reduced-motion
 * user sees the content from the very first paint and never depends on this
 * component hydrating for it to appear.
 */
export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const { ref, inView } = useInView();
  const Tag: ElementType = as;

  return (
    <Tag
      ref={ref}
      data-visible={inView}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
