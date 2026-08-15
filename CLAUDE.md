@AGENTS.md

# Gold Signals — project guide

Single-page marketing site for a XAUUSD (spot gold) trading-signal service sold through Telegram. Static, no backend, no API routes, no environment variables. See `README.md` for stack and structure.

Verify with all three before claiming anything works:

```bash
npx tsc --noEmit     # strict; must be clean
npm run lint         # bare `eslint` — `next lint` was removed in Next 16
npm run build
```

## Rules that are load-bearing

These look like style preferences and are not. Each one is here because breaking it caused a real bug or a real compliance problem.

### Content

- **All copy and data live in `src/lib/content/`**, split by section behind a barrel. Import from `@/lib/content`, never from a leaf module. Nothing user-visible should be hardcoded in JSX.
- FAQ answers may contain a `{{XM}}` token that renders as a broker link. Any plain-text consumer (structured data, `llms.txt`) must run the string through `plainText()` first.

### Claims policy — non-negotiable

This is a financial service. The page deliberately publishes **no win rate, no accuracy percentage, no equity curve, no track record, and no testimonials**, because none could be substantiated from the source material. Do not add any of them, and do not infer or estimate them.

- The 2,000-pip figure is a **monthly target**, never a result, and is never converted into a money figure.
- "Ten years on gold" is stated experience, not a claim of ten years of profitability.
- Never add `aggregateRating` or `review` to the structured data. Fabricated ratings are a Google structured-data violation and an FTC problem.
- If real, verifiable numbers ever arrive, they can be added — with the source named.

### Affiliate disclosure

The broker recommendation is a paid placement. Every instance of the link needs a **visible disclosure adjacent to it** (not only in the footer) and `rel="sponsored"`. Use the helpers in `src/components/signal/broker-note.tsx`; don't hand-roll a new `<a>` to `LINKS.broker`.

### Colour — the accent follows the surface

Documented in full at the top of `globals.css`. Two directions, both enforced by contrast, not taste:

- **Gold is dark-surface only.** `#C9A227` measures 2.36:1 on the light canvas — it fails even the 3:1 floor for graphical objects.
- **Olive is light-surface only.** It measures 3.31:1 on the dark slab and fails AA.

The single exception is the raster brand mark, which WCAG 1.4.11 exempts as a logotype. **Contrast-check any new colour pairing before committing it** and record the ratio in a comment next to the token, as every existing token does.

### Motion

- `motion-safe:` goes on the **hidden** state, never the visible one — `motion-safe:opacity-0`, not `motion-safe:opacity-100`. Written the other way round, a reduced-motion user gets permanently invisible content, and it is invisible in testing too.
- The reduced-motion backstop zeroes **`animation-delay` and `transition-delay` as well as durations**. The hero sequence sets delays up to 1900ms inline; without that, reduced-motion users watch the hero stagger in over two seconds.
- Scroll reveals are gated on `@media (scripting: enabled)` so the page renders fully when JS fails. Don't replace this with a class set by an inline script — that mutates `<html>` before hydration and causes a mismatch.
- **No animation, charting or smooth-scroll libraries.** Everything is hand-rolled and the page ships 0 kB of added JS. Lenis specifically was evaluated and rejected: it caps at 60fps on Safari, and this audience is disproportionately on 120Hz hardware.

### Anchor scrolling

`scroll-padding-top: 5rem` on `html`, plus a **negative** `scroll-margin-top` on `section[id]` to absorb each section's own top padding. Do not add a positive `scroll-mt-*` to a section — it stacks with the padding and the anchor lands on empty space with the heading far below.

The mobile menu panel must stay **absolutely positioned**. Rendering it in flow changes document height when it opens, which shifts every anchor target.

### SVG charts

- Draw-in animations use `pathLength={1}` with `stroke-dashoffset`, never `getTotalLength()`. No measuring effect, no hydration mismatch, works server-rendered.
- Path coordinates are rounded with `toFixed(2)` in `build-path.ts`. Float formatting drift between server and client is a real hydration-mismatch source in `d` attributes.
- On any element carrying a `seq-*` keyframe class, use **`fill-opacity`**, not `opacity`. The keyframes animate `opacity` to 1 and will clobber an `opacity` presentation attribute — this rendered the chart's risk band as a solid white block once already.

### Server vs client

The page is a Server Component. Only components that genuinely need state or effects carry `"use client"`. The whole hero — chart included — is server-rendered, because its load sequence is CSS keyframes rather than state. Keep it that way.

## Domain

The production origin is `https://xauusdsignals.net`, set once as `SITE_URL` in `src/lib/content/site.ts`. It feeds `metadataBase`, the canonical tag, OG/Twitter URLs, `robots.txt`, `sitemap.xml` and `llms.txt` — never hardcode the domain anywhere else, and keep the apex/https/no-trailing-slash form.

Only one origin should serve the site. If `www` is also reachable it must 301 to the apex at the host, not in the code — two live origins split the ranking signal and contradict the canonical tag.

## Source material

`content/` holds the originals the site was built from — the operator's copy dump, the subscription-plan and risk-management graphics, the logo, and the branded WhatsApp images used for the social card. Treat it as an archive: the transcribed values in `src/lib/content/` are the source of truth for the site, and any discrepancy should be resolved against the images before changing the data.
