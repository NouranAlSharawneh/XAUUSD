"use client";

import { useEffect, useState } from "react";

type UseInViewResult = {
  /** Callback ref — assignable to any element, unlike a typed RefObject. */
  readonly ref: (node: Element | null) => void;
  readonly inView: boolean;
};

/**
 * Fires once when the element first crosses the threshold, then disconnects.
 * Reveals that replay on every scroll-up read as fidgety, so they don't.
 *
 * Threshold and rootMargin are primitives rather than an options object so the
 * effect dependency array stays stable without callers needing to memoise.
 *
 * There is no "IntersectionObserver missing" fallback: it has been baseline
 * since 2019, far below Next 16's floor of Chrome 111 / Safari 16.4. The case
 * that does need handling is JS being unavailable entirely, and that is
 * covered in CSS — the hidden state is scoped to `html.js`, so without
 * scripting the content is simply never hidden.
 */
export function useInView(threshold = 0.15, rootMargin = "0px 0px -10% 0px"): UseInViewResult {
  const [node, setNode] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, rootMargin]);

  return { ref: setNode, inView };
}
