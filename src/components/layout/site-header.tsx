"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "./logo";
import { LINKS, NAV_LINKS } from "@/lib/content";

/* Matches the nav's h-16 — the depth of the strip the bar occupies. */
const HEADER_HEIGHT = 64;

/* The bar is sticky and therefore in flow, so at the top of the page nothing is
   underneath it — the hero begins exactly where it ends, at y=64. Testing the
   band itself would sit right on that boundary and resolve either way on a
   fractional layout. Probe a couple of pixels below the bar instead: that is
   the surface it is actually reading as its ground. */
const PROBE_Y = HEADER_HEIGHT + 2;

export function SiteHeader() {
  /* Starts true: the page always loads at the top, which is the dark hero. */
  const [onDark, setOnDark] = useState(true);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  /* The header is dark whenever it is over a dark slab and light otherwise, so
     what it actually tracks is "what is underneath me right now" — not how far
     the page has scrolled. The old 1px marker at the top of the page answered a
     different question, and once the hero went black it gave the wrong answer
     twice: it turned the bar white after a single pixel of scroll, and it knew
     nothing about any dark section further down.

     So every dark slab is tagged data-slab="dark" and the header simply asks
     whether one of them currently spans the strip it occupies. Adding another
     dark section needs no change here — only the attribute.

     A rect check rather than IntersectionObserver: the question is about a
     64px-tall band at a fixed viewport offset, which an observer can only
     express as a rootMargin recomputed on every resize. rAF-throttled on a
     passive listener, this is a handful of reads per frame while scrolling. */
  useEffect(() => {
    const slabs = Array.from(document.querySelectorAll<HTMLElement>('[data-slab="dark"]'));
    if (slabs.length === 0) return;

    let frame = 0;

    const update = (): void => {
      frame = 0;
      setOnDark(
        slabs.some((el) => {
          /* A slab that turns dark on scroll (.section-dark) is only actually
             dark once its own data-dark is true. Without this the bar goes dark
             over a section still rendering light, and its light text lands on a
             light ground. Slabs that are always dark carry no data-dark at all,
             so the check has to treat "absent" as dark. */
          if (el.dataset.dark === "false") return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= PROBE_Y && rect.bottom >= PROBE_Y;
        }),
      );
    };

    const schedule = (): void => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    /* A .section-dark flips its own data-dark when it scrolls into view, and
       that flip is not a scroll event of its own — so without watching for it
       the bar can be a frame behind, or permanently stale if the page opens
       deep-linked to a dark section that is already under the header. */
    const attributes = new MutationObserver(schedule);
    for (const el of slabs) {
      attributes.observe(el, { attributes: true, attributeFilter: ["data-dark"] });
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      attributes.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panel.current?.querySelectorAll<HTMLElement>("a, button");
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent): void => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (panel.current?.contains(target) || trigger.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <>
      {/* Every colour in here flips on data-dark, which tracks the slab under
          the bar rather than scroll depth. The `group` class is what lets the
          descendants read that state. data-dark starts true, matching SSR —
          the page always loads at the top, which is the dark hero. */}
      <header
        data-dark={onDark}
        /* border-hero, not border-transparent. The background layer below is
           absolute inset-0, which resolves to the padding box and so does not
           extend under the border — a transparent border therefore shows the
           light body background through it as a 1px line across the bottom of
           the bar. Invisible back when the header lived on a light page,
           glaring against the dark slab. */
        className="group border-hero data-[dark=false]:border-line sticky top-0 z-[90] border-b transition-[border-color,background-color] duration-[250ms] ease-[var(--ease-emphasized)]"
      >
        {/* Blur lives on its own layer so the header never becomes a containing
            block — otherwise it would trap any fixed-position descendant.
            Opaque hero colour at rest so the header and hero read as one slab;
            the sticky bar is in flow above the hero, so leaving it transparent
            would show the light body behind it instead. */}
        <div
          aria-hidden="true"
          /* panel-striped carries the hero's pinstripe texture up through the
             bar, so the two read as one continuous slab instead of a flat
             header sitting on a textured hero. The stripes are white at 2.2%,
             so they simply vanish against the light canvas — no need to
             switch them off on the light side. */
          className="bg-hero panel-striped group-data-[dark=false]:bg-canvas/95 absolute inset-0 -z-10 backdrop-blur-md transition-colors duration-[250ms] ease-[var(--ease-emphasized)]"
        />

        <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-4">
          <a href="#top" className="rounded-sm" aria-label="Gold Signals, back to top">
            <Logo onPanel={onDark} />
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-panel-muted hover:text-panel-ink group-data-[dark=false]:text-muted group-data-[dark=false]:hover:text-ink text-sm transition-colors duration-300 hover:duration-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={LINKS.free}
              target="_blank"
              rel="noopener noreferrer"
              className="text-panel-muted hover:text-panel-ink group-data-[dark=false]:text-muted group-data-[dark=false]:hover:text-ink px-2 text-sm transition-colors duration-300 hover:duration-50"
            >
              Free channel
            </a>
            {/* White over the hero, black over the light page — primary stays
                the highest-contrast button on whichever ground it is on. */}
            <a
              href={LINKS.vip}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${onDark ? "btn-inverse" : "btn-primary"}`}
            >
              Get VIP access
            </a>
          </div>

          <button
            ref={trigger}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            className="border-panel-line text-panel-ink group-data-[dark=false]:border-line group-data-[dark=false]:text-ink inline-flex size-10 items-center justify-center rounded-lg border transition-colors duration-[250ms] md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 20 20" className="size-4.5" aria-hidden="true" fill="none">
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 13h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Always mounted and absolutely positioned. Mounting it in flow would
            change document height as it opens, which shifts every anchor
            target and makes nav links land in the wrong place. `inert` keeps
            it out of the tab order and the a11y tree while closed. */}
        <div
          ref={panel}
          id={menuId}
          data-open={open}
          inert={!open}
          /* Follows the bar it hangs off: dark over the hero, light once the
             header is over the page. A permanently light sheet dropping onto
             the dark slab was the giveaway that this had been missed. */
          className="border-panel-line bg-hero group-data-[dark=false]:border-line group-data-[dark=false]:bg-canvas absolute inset-x-0 top-full border-b transition-[opacity,transform,background-color,border-color] duration-200 ease-[var(--ease-emphasized)] data-[open=false]:pointer-events-none data-[open=false]:-translate-y-1 data-[open=false]:opacity-0 md:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-panel-ink group-data-[dark=false]:text-ink block py-3 text-[0.9375rem] transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Same swap as the desktop CTA. The sheet follows the bar, so over
              the hero these sit on dark — where btn-primary is a black button
              on black and btn-secondary is a white one loud enough to outrank
              the actual primary. */}
          <div className="shell flex flex-col gap-2 pt-2 pb-5">
            <a
              href={LINKS.vip}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn w-full ${onDark ? "btn-inverse" : "btn-primary"}`}
            >
              Get VIP access
            </a>
            <a
              href={LINKS.free}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn w-full ${onDark ? "btn-onpanel" : "btn-secondary"}`}
            >
              Watch the free channel
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
