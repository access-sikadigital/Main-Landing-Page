# Demo Bros — Landing Page

A single-page version of the Demo Bros site: one route (`/`), one goal — a lead
into the quote form.

It is a **separate project** from `../demo-bros`. Nothing here is shared or
symlinked; the main site is untouched.

## What was carried over

- **Theme** — `src/styles.css` verbatim: charcoal `#1A1A1A`, bone `#F2F1EF`,
  green `#2D9D3A`, `--radius: 0.25rem`, the same OKLCH token set and utilities
  (`container-wide`, `eyebrow`, `font-heading`, `animate-marquee`, …).
- **Fonts** — Akira Expanded (headings) and Albert Sans variable (body). Only the
  two font files actually used are shipped; the 19 unused static Albert Sans
  weights were left behind.
- **Logo** — `logo-light.svg` in the header and footer. The favicon is now the
  20 KB `favicon.ico` instead of the 320 KB traced SVG the main site links.
- **Media** — only the images and clips this page renders (~20 MB, versus 91 MB
  in the main site). Same folder names, so files are easy to trace back.
- **Components** — `CtaButton`, `Reveal`, `SectionHeading`, `Counter`,
  `FaqList`, `BeforeAfter`, `SmoothScroll` (Lenis) and the Radix accordion.
- **Lead capture** — the GoHighLevel server function, phone normalisation, spam
  honeypot and UTM/click-id attribution, unchanged.

## What was dropped

All other routes, the 40+ unused shadcn/ui components, and the dependencies that
only those components needed (recharts, embla, cmdk, vaul, sonner, date-fns,
gsap, react-day-picker, resizable panels, input-otp and the unused Radix
packages).

## Content

Copy comes from the two approved reference builds:

- <https://demo-bros-strip-out.vercel.app/>
- <https://demo-bros-melbourne-strip-outs.madebyvicky.chatgpt.site/>

Section order: hero → credentials → **quote form** → the part nobody explains →
recent jobs → what we take out → why the date matters → how it works → what it
costs → why builders keep calling → who we work with → guarantees → reviews →
where we work → FAQs → final CTA.

## Running it

```bash
npm install
npm run dev
```

## Before publish

- Set `GHL_WEBHOOK_URL` in the environment, or the quote form throws and no lead
  is sent. The handler logs the full lead when the variable is missing, so
  nothing is silently lost.
- Confirm the spelling of the three reviewer names — the two reference builds
  disagree (Toubia/Toulis, Manara/Monaro). Flagged with a TODO in
  `src/lib/site-data.ts`.
# Main-Landing-Page
