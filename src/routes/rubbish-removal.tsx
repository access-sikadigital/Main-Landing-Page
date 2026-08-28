import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Clock,
  FileCheck,
  Hand,
  Handshake,
  HardHat,
  Leaf,
  MapPin,
  MessagesSquare,
  Phone,
  Recycle,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Weight,
} from "lucide-react";

/**
 * Hero background: a real Demo Bros crew member beside the truck, brick rubble
 * and timber at his feet — heavy material being cleared, not a tidy box of
 * household goods. Shot in daylight, so it carries the light theme.
 *
 * To swap it, change this one path. Other clearance shots that work:
 *   /images/services/household-hard-rubbish.jpg
 *   /images/services/heavy-concrete-brick-deck.jpg
 */
const HERO_IMAGE = "/images/rubbish-clearance/hero.jpg";
import { Reveal } from "@/services/rubbish-removal/components/site/Reveal";
import { SectionHeading } from "@/services/rubbish-removal/components/site/SectionHeading";
import { FaqList, faqJsonLd } from "@/services/rubbish-removal/components/site/FaqList";
import { CtaButton } from "@/services/rubbish-removal/components/site/CtaButton";
import { QuoteForm } from "@/services/rubbish-removal/components/site/QuoteForm";
import { QuoteModalProvider, useQuoteModal } from "@/services/rubbish-removal/components/site/QuoteModal";
import { FloatingContact } from "@/services/rubbish-removal/components/site/FloatingContact";
import { StickyMobileBar } from "@/services/rubbish-removal/components/site/StickyMobileBar";
import {
  GoogleG,
  GoogleRatingBadge,
  GoogleRatingSticky,
  GoogleStars,
} from "@/services/rubbish-removal/components/site/GoogleRating";

import {
  CTA_LABEL,
  PRICING,
  SITE,
  audiences,
  beforeAfterHeading,
  beforeAfterPairs,
  builders,
  faqHeading,
  faqs,
  finalCta,
  greenStripClaims,
  guaranteeHeading,
  guarantees,
  heavyStuff,
  hero,
  heroStats,
  hoarding,
  pricing,
  processHeading,
  processSteps,
  quoteForm,
  reviewsHeading,
  serviceArea,
  serviceRouter,
  services,
  testimonials,
} from "@/services/rubbish-removal/lib/site-data";

export const Route = createFileRoute("/rubbish-removal")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) }],
  }),
  component: LandingPage,
});

/**
 * Paid-traffic landing page for Campaign 3 (Rubbish Removal & Cleanups), built to
 * the deck's section order, top to bottom.
 *
 * Deliberately NOT a website: no nav links to leak clicks, no sitemap footer.
 * Every section either proves the offer or points back at the form. A CTA repeats
 * after sections 05, 07, 08, 09, 12 and 15.
 */
function LandingPage() {
  return (
    <QuoteModalProvider>
      <Hero />
      <TrustStrip />
      <TrustStats />
      <BeforeAfter />
      <Price />
      <ServiceRouter />
      <Audiences />
      <Process />
      <HeavyStuff />
      <Hoarding />
      <Builders />
      <Guarantee />
      <Reviews />
      <ServiceArea />
      <Faqs />
      <FinalCta />
      <GoogleRatingSticky />
      <FloatingContact />
      <StickyMobileBar />
    </QuoteModalProvider>
  );
}

/* ============================== 01 · HERO ============================== */

const HERO_ICONS: Record<string, typeof Tag> = {
  tag: Tag,
  weight: Weight,
  hand: Hand,
  leaf: Leaf,
};

/**
 * Highlighted phrase with a hand-drawn underline swoosh, drawn around the price
 * token so the number is the thing the eye lands on.
 */
function HandUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap text-primary">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-[0.42em] w-full overflow-visible"
      >
        <motion.path
          d="M3 9.5C34 4.2 74 2.4 116 5.1c28 1.8 52 3.6 81 1.4"
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
        />
      </svg>
    </span>
  );
}

function Hero() {
  const { openQuote } = useQuoteModal();

  /* One source for the headline: the deck's H1 lives in site-data as plain text
     (it has to, because the title tag and meta description quote the same price),
     and the swoosh is drawn around the price token here. */
  const [beforePrice, afterPrice] = hero.title.split(PRICING.min);

  /* Keep the punctuation that butts up against the price glued to it inside one
     nowrap, so it never starts its own line hanging off the left margin. */
  const trailingPunctuation = /^\S*/.exec(afterPrice)?.[0] ?? "";
  const restOfTitle = afterPrice.slice(trailingPunctuation.length);

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Static image, no video: it loads instantly and costs nothing on mobile data. */}
      <img
        src={HERO_IMAGE}
        alt="A Demo Bros crew member clearing heavy brick rubble beside the truck on a Melbourne job"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark on the left where the copy sits, easing to the right. Softened
          from the strip-out hero because on this photo the worker stands on the
          left too — too heavy an overlay buried him. A separate top-down wash
          keeps the headline legible without darkening the whole left edge. */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/45 via-transparent to-charcoal/30" />

      {/* Copy left, form right. Top padding clears the fixed header, which is
          tall because the logo is. */}
      <div className="container-wide relative z-10 grid items-center gap-10 pt-28 pb-14 lg:grid-cols-2 lg:gap-14  lg:pb-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <GoogleRatingBadge />
            <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
              {hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            /* 2rem = 32px on a phone. The headline is the one thing on the fold
               that has to land before anything else does, and it now carries the
               work the sub-paragraph used to — that paragraph is hidden at this
               size, which is what buys the room for it. */
            className="font-heading mt-5 text-[2rem] leading-[1.12] text-secondary sm:text-[2.1rem] lg:text-[2.65rem]"
          >
            {beforePrice}
            <span className="whitespace-nowrap">
              <HandUnderline>{PRICING.min}</HandUnderline>
              {trailingPunctuation}
            </span>
            {restOfTitle}
          </motion.h1>

          {/* Hidden on phones. Nothing is lost by it: the proof points below say
              the same four things in a form you can scan, and this paragraph ran
              five lines between the headline and the button the hero exists to
              serve. From sm the fold is deep enough to carry both. */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 hidden max-w-xl text-base leading-relaxed text-secondary/85 sm:block"
          >
            {hero.sub}
          </motion.p>

          {/* Buttons sit above the proof points, so the first thing you can DO is
              never buried under the bullets on a phone. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <CtaButton size="md" onClick={openQuote} className="w-full sm:w-auto">
              {CTA_LABEL}
            </CtaButton>
            <CtaButton
              href={SITE.phoneHref}
              variant="outlineLight"
              size="md"
              icon={false}
              className="w-full sm:w-auto"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call {SITE.phone}
            </CtaButton>
          </motion.div>

          {/* Four proof points. Scans in a glance where a bullet list had to be
              read line by line. */}
          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid max-w-xl gap-3.5 sm:gap-4"
          >
            {hero.bullets.map(({ icon, label }) => {
              const Icon = HERO_ICONS[icon] ?? ShieldCheck;
              return (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/25 sm:h-11 sm:w-11">
                    <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2.25} />
                  </span>
                  <span className="text-[0.9rem] leading-snug font-bold text-secondary sm:text-[0.95rem]">
                    {label}
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* White card against the dark site photography: the highest-contrast
            thing on the page, which is exactly where the eye should land.

            DESKTOP AND TABLET ONLY. On a phone the hero stacks, so this card
            landed under the headline and buried the fold in form fields before
            anyone had read what the offer was. The sticky bar at the bottom of
            the screen carries the action at that size, and it opens the same
            form in the modal — one form, reached the way that suits the screen,
            rather than a second copy of it inline. `md`, matching the breakpoint
            where that bar disappears, so exactly one of the two is ever
            present. */}
        <motion.div
          id="quote-form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden w-full scroll-mt-24 rounded-xl border border-border bg-light p-4 shadow-2xl shadow-black/10 sm:p-6 md:block lg:scroll-mt-28"
        >
          {/* The card's own header shrinks at the narrow end too. Every pixel it
              takes is a pixel of the first field, and the first visible field is
              what tells someone this is a form worth starting. */}
          <h2 className="font-heading text-base text-light-foreground sm:text-xl">
            {quoteForm.title}
          </h2>
          <p className="mt-1 text-[0.8rem] text-light-foreground/70 sm:mt-1.5 sm:text-sm">
            {quoteForm.lede}
          </p>
          <div className="mt-4 sm:mt-5">
            <QuoteForm compact photos={false} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * The hero trust row, on the green strip directly under the fold — the four
 * credentials that decide the enquiry, in the first thing you see after the hero.
 */
function TrustStrip() {
  return (
    <section aria-label="Why Demo Bros" className="bg-primary py-4 lg:py-6">
      <div className="container-wide">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-center sm:gap-x-6 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-10">
          {greenStripClaims.map((claim) => (
            <li
              key={claim}
              className="text-[0.9rem] leading-snug font-bold sm:text-balance text-white sm:text-base lg:text-xl"
            >
              {claim}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =========================== 03 · TRUST STATS =========================== */

const STAT_ICONS: Record<string, typeof Star> = {
  rating: Star,
  reviews: MessagesSquare,
  since: Handshake,
  liability: ShieldCheck,
};

/**
 * Real values, in the HTML, always — static text, never a count-up from zero.
 */
function TrustStats() {
  return (
    <section className="border-y border-border bg-card py-12 lg:py-14">
      <div className="container-wide">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
          {heroStats.map((s) => {
            const Icon = STAT_ICONS[s.id] ?? Star;
            const isRating = s.id === "rating";
            return (
              <div
                key={s.id}
                className="group flex flex-col items-center justify-center bg-card px-3 py-6 text-center transition-colors duration-300 hover:bg-background sm:px-4"
              >
                <dd className="font-heading text-2xl text-foreground lg:text-3xl">{s.value}</dd>
                {isRating ? (
                  <>
                    <span className="mt-2.5 flex items-center gap-2">
                      <GoogleG className="h-5 w-5" />
                      <GoogleStars className="h-[17px] w-[17px]" />
                    </span>
                    <dt className="mt-2 text-[0.8rem] leading-tight font-medium text-muted-foreground sm:text-sm">
                      {s.label}
                    </dt>
                  </>
                ) : (
                  <dt className="mt-2.5 flex flex-col items-center gap-1.5 text-[0.8rem] leading-tight font-medium text-muted-foreground sm:flex-row sm:gap-2 sm:text-sm">
                    <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
                    {s.label}
                  </dt>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

/* ========================= 04 · BEFORE AND AFTER ========================= */

/**
 * Proof before persuasion — sits high, straight after the trust bar.
 *
 * Each pair is a SINGLE combined photo: before on the left half, after on the
 * right half, same spot and angle. We overlay BEFORE (top-left) and AFTER
 * (top-right) on the two halves — the split is 50/50, so the tags land on the
 * right side of the image every time — plus a green divider down the seam to
 * make the "before → after" read unmistakable.
 */
function BeforeAfter() {
  if (beforeAfterPairs.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={beforeAfterHeading.eyebrow}
          title={beforeAfterHeading.title}
          description={beforeAfterHeading.description}
          /* "Every one of these is a Demo Bros job" adds nothing on a phone that
             the eyebrow and title have not said — and the photographs below are
             the whole point of the section. */
          descriptionFromSm
        />

        {/* Two up on a phone, not one. Stacked full-width these three cards ran
            most of three screens, which is a long way to scroll through proof
            you take in at a glance — you either believe a before/after or you
            do not, and looking at it larger does not help. */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-3">
          {beforeAfterPairs.map((pair, i) => {
            /* The odd card out spans the full row rather than sitting
               half-width beside a gap. Only while the grid is two wide — at lg
               it is three columns and all three land in one row. */
            const spans = i === beforeAfterPairs.length - 1;
            return (
              <Reveal
                key={pair.id}
                delay={(i % 3) * 0.05}
                className={spans ? "col-span-2 lg:col-span-1" : ""}
              >
                <figure className="h-full overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative">
                    {/* 15/7 while it spans, 3/2 everywhere else — the same picture
                      at twice the width was half again as tall as the two cards
                      above it, and a photograph you have already understood does
                      not earn that much of a phone screen. It crops top and
                      bottom, which on these interiors is ceiling and carpet. */}
                    <img
                      src={pair.image}
                      alt={`${pair.label} — before on the left, after on the right`}
                      loading="lazy"
                      className={`w-full object-cover ${
                        spans ? "aspect-[15/7] lg:aspect-[3/2]" : "aspect-[3/2]"
                      }`}
                    />
                    {/* Green seam marking the split between the two halves. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-primary/80"
                    />
                    {/* Everything inside a card steps down with it. At half the
                      width these labels and the caption were sized for a card
                      twice as wide, and read as though they had been pasted on. */}
                    <span className="absolute top-2 left-2 rounded-sm bg-charcoal/80 px-1.5 py-0.5 text-[0.5rem] font-bold tracking-[0.14em] text-secondary uppercase backdrop-blur sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.18em]">
                      Before
                    </span>
                    <span className="absolute top-2 right-2 rounded-sm bg-primary px-1.5 py-0.5 text-[0.5rem] font-bold tracking-[0.14em] text-primary-foreground uppercase sm:top-3 sm:right-3 sm:px-2.5 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.18em]">
                      After
                    </span>
                  </div>
                  <figcaption className="border-t border-border px-3 py-2.5 sm:px-5 sm:py-4">
                    <span className="font-heading block text-[0.8rem] leading-snug sm:text-base">
                      {pair.label}
                    </span>
                    <span className="mt-0.5 block text-[0.7rem] text-muted-foreground sm:text-sm">
                      {pair.location}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== 05 · PRICE ============================== */

/* One table in the data file, two groups on the page. Split here rather than in
   site-data so the copy stays a single list in deck order — the presentation
   decision belongs to the panel that renders it. */
const startingPrices = pricing.table.filter((row) => row.from.startsWith("$"));
const quotedOnJob = pricing.table.filter((row) => !row.from.startsWith("$"));

/**
 * A real starting number, before anyone has to talk to a salesperson.
 *
 * The four "quoted on the job" rows are deliberate. Inventing a starting price
 * for a whole-house clear-out would make every other number on the page suspect.
 */
function Price() {
  return (
    <section
      id="prices"
      className="scroll-mt-24 border-t border-border py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          description={pricing.lede}
          /* Four lines explaining how pricing works, directly above a table that
             shows it. On a phone that is a screen of preamble in front of the
             numbers the section is named after — and "What moves the price"
             below the table covers the same ground properly. */
          descriptionFromSm
        />

        {/* Stacked on a phone the table goes FIRST and "what moves the price"
            second. This section is called Price and its payoff is the numbers —
            leading with five reasons a number might move asks the reader to hold
            caveats about a figure they have not been shown yet. Side by side
            from lg the order stops mattering, and the explanation keeps the left
            column where it reads as the lead-in. */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2 lg:gap-12 ">
          <Reveal delay={0.05} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-black/5">
              {/* GROUP ONE — the four real numbers.
                  Tinted green and given the whole top of the panel to itself. In
                  a single eight-row table these four were the same size and
                  weight as four rows reading "Quoted on the job", so the only
                  hard information in the section was matched row for row by its
                  own caveats. */}
              <div className="flex items-baseline justify-between gap-3 border-b border-border bg-primary/8 px-4 py-3.5 sm:px-6">
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-primary uppercase">
                  Starting prices
                </h3>
                {/* The "From" column header, kept as a single label instead of
                    repeated against every row. */}
                <span className="text-[0.7rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  From
                </span>
              </div>

              <dl>
                {startingPrices.map((row) => (
                  <div
                    key={row.job}
                    className="flex items-center justify-between gap-4 border-b border-border px-4 py-3.5 transition-colors duration-200 hover:bg-primary/4 sm:px-6 sm:py-4"
                  >
                    <dt>
                      <span className="block text-[0.95rem] font-semibold sm:text-base">
                        {row.job}
                      </span>
                      <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted-foreground">
                        {row.how}
                      </span>
                    </dt>
                    {/* Big, green, and `tabular-nums` so $99 and $550 line up on
                        the decimal down the column. `whitespace-nowrap` because a
                        price broken across two lines stops looking like a
                        price. */}
                    <dd className="text-xl font-extrabold whitespace-nowrap text-primary tabular-nums sm:text-2xl">
                      {row.from}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* GROUP TWO — the jobs there is no honest starting number for.
                  Listed once under one heading rather than each carrying its own
                  copy of the same five words. */}
              <div className="border-b border-border bg-background px-4 py-3.5 sm:px-6">
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  Priced on the job
                </h3>
              </div>

              <ul className="grid gap-3 px-4 py-4 sm:px-6">
                {quotedOnJob.map((row) => (
                  <li key={row.job} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span>
                      <span className="block text-[0.95rem] font-semibold">{row.job}</span>
                      <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted-foreground">
                        {row.how}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              {pricing.note}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="order-2 lg:order-1">
            <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
              <h3 className="font-heading text-base sm:text-lg lg:text-xl">
                {pricing.factorsTitle}
              </h3>
              <ul className="mt-5 grid gap-3.5">
                {pricing.factors.map((factor) => (
                  <li
                    key={factor}
                    className="flex items-start gap-3 text-[0.95rem] text-foreground/85"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
                    {factor}
                  </li>
                ))}
              </ul>

              {/* The promise gets its own block instead of a <strong> at the end
                  of a sentence. Bold inside a muted paragraph is the weakest
                  emphasis there is — on a phone it read as one more line of grey
                  text, and this is the single sentence the whole price section
                  exists to land. Tinted panel, green rule down the left, set at
                  the size the eye stops on. */}
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  {pricing.close}
                </p>
                <p className="mt-4 rounded-lg border border-primary/25 border-l-4 border-l-primary bg-primary/8 px-4 py-3.5 text-base leading-snug font-bold text-foreground sm:px-5 sm:py-4 sm:text-lg">
                  {pricing.closeEmphasis}
                </p>
              </div>

              {/* CTA after section 05, inside the panel, under the promise. */}
              <CtaRow className="mt-7 lg:justify-start" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================== 06 · SERVICE ROUTER ========================== */

/**
 * Six cards in a clean 3 × 2 grid — three columns, two rows, every card the same
 * size. One block, responsive CSS: one column on a phone, two from sm, three
 * from lg. Deck order is preserved.
 */
function ServiceRouter() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-border bg-card py-12 sm:py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={serviceRouter.eyebrow}
          title={serviceRouter.title}
          description={serviceRouter.lede}
        />

        {/* Two across on a phone. Full width these six cards were six screens of
            scrolling, and this section is a router — its job is to let someone
            find the one that matches their job and get on with it, which is a
            scanning task, not a reading one. */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * A single service card. The `anchor` from the data file (plus #yards for the
 * Yard Cleanups ad group) drops an `id` on the card so message-matched ads can
 * deep-link to it.
 */
function ServiceCard({ service: s }: { service: (typeof services)[number] }) {
  const anchorId = s.slug === "yard-garden-cleanups" ? "yards" : (s as { anchor?: string }).anchor;

  return (
    <article
      id={anchorId}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition-colors duration-300 hover:border-primary/50 ${
        anchorId ? "scroll-mt-24 lg:scroll-mt-28" : ""
      }`}
    >
      {/* Shorter image in the narrow card — 176px of photograph on top of a
          half-width card is a tall crop of a wide scene. */}
      <div className="h-28 w-full overflow-hidden sm:h-44">
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          style={{ objectPosition: s.imagePosition }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-6">
        {/* Body font on a phone, the display face only from sm. `font-heading`
            is Akira Expanded — 800 weight, forced uppercase, negative tracking.
            In a 135px card at 12.8px it fits about eleven characters to a line,
            which is what turned these titles into four-line blocks. Sentence
            case in the body face gets half again as many characters per line and
            is simply legible at that size.

            Short label on a phone, full title from sm — the desktop cards have
            the width for the descriptive version, and it is the one search
            engines and screen readers see first in the document. */}
        <h3 className="text-[0.85rem] leading-snug font-bold text-foreground sm:font-heading sm:text-lg sm:font-normal lg:text-xl">
          <span className="sm:hidden">{s.shortTitle}</span>
          <span className="hidden sm:inline">{s.title}</span>
        </h3>
        {/* Description is desktop only. At half width these three or four
            sentences were the whole card, and nobody reads six paragraphs to
            pick a category — the photograph and the title already say which one
            is theirs, and the price is the only other thing that decides it. */}
        <p className="mt-3 hidden flex-1 leading-relaxed text-muted-foreground sm:block sm:text-base">
          {s.detail}
        </p>
        {s.price && (
          /* `mt-auto` because the description that used to hold the price down
             is hidden here. Grid rows stretch every card to the tallest in the
             row, so without it the prices would sit at a different height in
             each one. */
          <p className="mt-auto pt-2 text-[0.7rem] font-bold tracking-[0.08em] text-primary uppercase sm:mt-5 sm:pt-0 sm:text-sm">
            {s.price}
          </p>
        )}
      </div>
    </article>
  );
}

/* ========================= 06b · WHO WE WORK WITH ========================= */

/**
 * Four audiences, one word each, drawn as line art.
 *
 * Sits directly under the service router: the visitor has just found their job,
 * and this answers the next question — whether Demo Bros works with people like
 * them — before they have to ask it.
 */
function Audiences() {
  return (
    // Plain background: the service router directly above is the card tone, and
    // two card-toned sections running together merge into one. The bottom rule
    // is doing real work here — the process section below shares this same
    // background, so the line is the only thing dividing them.
    <section className="border-b border-border py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <h2 className="font-heading text-center text-[1.15rem] sm:text-2xl lg:text-[1.75rem]">
          {audiences.title}
        </h2>

        {/* Hairlines between columns, never at the start of a row. `odd:` clears
            them in the 2-up phone layout; `nth-child(4n+1)` clears only the
            first of the four-up row. Getting this wrong leaves a stray rule
            floating at the left edge of the second row. */}
        <div className="mt-8 grid grid-cols-2 sm:mt-12 sm:grid-cols-4">
          {audiences.items.map((a, i) => (
            // The nth-child rules belong on the GRID CHILD, which is Reveal —
            // not the div inside it. Inside the wrapper that div is an only
            // child, so `odd:` would match every single time and every column
            // would lose its rule.
            <Reveal
              key={a.label}
              delay={i * 0.06}
              className="border-l border-border odd:border-l-0 sm:odd:border-l sm:nth-[4n+1]:border-l-0"
            >
              <div className="flex flex-col items-center gap-5 px-2 py-6 text-center">
                {/* `alt=""` and aria-hidden on purpose: the word underneath is
                    already the label, so describing the artwork as well would
                    have a screen reader announce every audience twice. */}
                <img
                  src={a.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={80}
                  height={80}
                  className="h-16 w-16 object-contain opacity-85 sm:h-20 sm:w-20"
                />
                {/* 800, not 700. Albert Sans is a variable font carrying the
                    full 100–900 range, so this is a real weight cut rather than
                    a browser-synthesised fake bold — which is what you get if
                    you ask a static font for a weight it does not ship. */}
                <span className="text-base font-extrabold sm:text-lg lg:text-xl">{a.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ 07 · THE HEAVY STUFF ============================ */

/**
 * The differentiator the whole page rests on. On the charcoal band, because this
 * is the section that separates Demo Bros from every two-blokes-and-a-ute crew.
 */
function HeavyStuff() {
  return (
    <section
      id="heavy"
      className="scroll-mt-24 bg-charcoal py-12 sm:py-16 lg:scroll-mt-28 lg:py-20"
    >
      {/* gap-8 stacked, gap-12 from sm. Stacked, the 48px gutter sat between a
          column of copy and its own photograph — the two read as one block, and
          the gap was pricing them as separate sections. */}
      <div className="container-wide grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{heavyStuff.eyebrow}</p>
            <h2 className="font-heading mt-3 text-xl sm:text-balance text-secondary sm:text-2xl lg:text-[1.75rem]">
              {heavyStuff.title}
            </h2>
            <p className="mt-5 text-base font-bold text-secondary sm:text-lg">{heavyStuff.lead}</p>
            {/* The three prose paragraphs are desktop only. `lead` states the
                problem and the ticked list below states what we do about it —
                between them they carry the section. The paragraphs in the middle
                argue the case at length, and on a phone that is a screen of
                argument sitting between the claim and the proof. */}
            {heavyStuff.body.map((para) => (
              <p key={para} className="mt-4 hidden leading-relaxed text-secondary/70 sm:block">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-7 grid gap-3">
              {heavyStuff.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.95rem] text-secondary/85">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA after section 07. */}
            <QuoteCta className="mt-8" />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-xl border border-white/12">
            <img
              src={heavyStuff.image}
              alt="Demo Bros crew clearing heavy brick rubble on a Melbourne job"
              loading="lazy"
              /* Half height on a phone. 4:5 is a portrait crop sized for the
                 desktop column it sits in; full-bleed at phone width that is
                 taller than the viewport, for one supporting photograph. */
              className="aspect-[8/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 08 · HOARDING AND DECEASED ESTATES ================= */

/**
 * A different voice entirely — quiet, unhurried, no shock imagery. Softer card
 * band, a calm non-identifying photo, and a CTA that offers a phone call as an
 * alternative to the form.
 */
function Hoarding() {
  return (
    <section
      id="hoarding"
      className="scroll-mt-24 border-y border-border bg-card py-12 sm:py-16 lg:scroll-mt-28 lg:py-20"
    >
      {/* gap-8 stacked, gap-12 from sm. Stacked, the 48px gutter sat between a
          column of copy and its own photograph — the two read as one block, and
          the gap was pricing them as separate sections. */}
      <div className="container-wide grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal delay={0.05} className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={hoarding.image}
              alt="A room cleared calmly and left swept"
              loading="lazy"
              /* Half height on a phone — see the heavy-stuff photo above. */
              className="aspect-[8/3] w-full object-cover sm:aspect-[4/3]"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">{hoarding.eyebrow}</p>
            <h2 className="font-heading mt-3 text-xl sm:text-balance sm:text-2xl lg:text-[1.75rem]">
              {hoarding.title}
            </h2>
            {/* Desktop only. This is the section where the prose is doing real
                work — it sets the tone for a job people are embarrassed to ring
                about — but it is three paragraphs before the first concrete
                promise. The ticked list below says the same things as
                commitments ("You set the pace", "Nothing is thrown out without
                your say-so"), which is what someone scanning a phone needs
                first. `close` still carries the offer of a quiet call. */}
            {hoarding.body.map((para) => (
              <p key={para} className="mt-4 hidden leading-relaxed text-muted-foreground sm:block">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-7 grid gap-3">
              {hoarding.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[0.95rem] text-foreground/85"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-6 leading-relaxed text-muted-foreground">{hoarding.close}</p>

            {/* CTA after section 08 — form or a quiet call. */}
            {/* `CtaRow`, not a hand-rolled copy of it. These two sections were
                pairing the same buttons in their own flex wrapper, so they kept
                stacking on a phone while every other pair on the page went two
                across. One component, one behaviour. `sm:justify-start` because
                this column is left-aligned copy, not a centred band. */}
            <CtaRow className="mt-7 sm:justify-start" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ==================== 09 · BUILDERS AND TRADES ==================== */

/** B2B band: site cleared, next trade starts. */
function Builders() {
  return (
    <section id="sites" className="scroll-mt-24 py-12 sm:py-16 lg:scroll-mt-28 lg:py-20">
      {/* gap-8 stacked, gap-12 from sm. Stacked, the 48px gutter sat between a
          column of copy and its own photograph — the two read as one block, and
          the gap was pricing them as separate sections. */}
      <div className="container-wide grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{builders.eyebrow}</p>
            <h2 className="font-heading mt-3 text-xl sm:text-balance sm:text-2xl lg:text-[1.75rem]">
              {builders.title}
            </h2>
            <p className="mt-5 text-base font-bold text-foreground sm:text-lg">{builders.lead}</p>
            {/* Desktop only. `lead` already says what the service is; this
                paragraph explains why it matters, and the six ticked points
                below spell out exactly what is covered. On a phone the middle
                one is the one to lose. */}
            <p className="mt-4 hidden leading-relaxed text-muted-foreground sm:block">
              {builders.body}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-7 grid gap-3">
              {builders.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[0.95rem] text-foreground/85"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA after section 09. */}
            {/* `CtaRow`, not a hand-rolled copy of it. These two sections were
                pairing the same buttons in their own flex wrapper, so they kept
                stacking on a phone while every other pair on the page went two
                across. One component, one behaviour. `sm:justify-start` because
                this column is left-aligned copy, not a centred band. */}
            <CtaRow className="mt-7 sm:justify-start" />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:order-first">
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={builders.image}
              alt="A cleared building site handed back swept"
              loading="lazy"
              /* Half height on a phone — see the heavy-stuff photo above. */
              className="aspect-[8/3] w-full object-cover sm:aspect-[4/3]"
            />
            {/* The credential strip stays at full size on a phone. It is the one
                line on this section a builder actually checks for. */}
            <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-3 sm:px-5 sm:py-4">
              <HardHat className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
              <span className="text-sm font-semibold">
                SWMS on every job · inducted before we arrive
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================== 10 · HOW IT WORKS =========================== */

/**
 * Four steps, each carrying a real job photo of that step happening.
 *
 * The old version was a numbered rail that filled with green on scroll. It was a
 * nice piece of motion attached to four lines of text — and the one question
 * this section answers is "what actually happens when I book", which a
 * photograph of it happening answers faster than any animation of a line.
 *
 * Two layouts, one markup. On a phone each step is a horizontal card — square
 * thumbnail left, copy right — because four full-width photo cards stacked is
 * four screens for four sentences. From sm the card turns vertical, the
 * photograph gets the top of it, and the step number sits on the image as a
 * green tab.
 */
function Process() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-border bg-card py-12 sm:py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={processHeading.eyebrow}
          title={processHeading.title}
        />

        {/* Photographic tiles from sm, not photographs sitting inside white
            boxes. The card-with-a-picture-on-top pattern makes every section on
            every website look the same, and it spends half of each tile on
            chrome. Let the photograph BE the tile, wash it down to charcoal, and
            set the copy into it — the pictures become the design instead of
            illustrating it, and the whole row reads as job site rather than as
            brochure.

            PHONES get a different card entirely: small square photo, then the
            number, title and one short line beside it. The tile below is 304px
            tall, and four of them stacked is most of three screens on a section
            that is reassurance, not the offer. Worse, at phone width a
            full-bleed photo with text washed over it is the one layout where
            neither the picture nor the words get enough room.

            Same markup, restyled at `sm` — not two blocks with one hidden, which
            would put every step in the document twice. */}
        <ol className="mt-8 grid grid-cols-1 gap-2.5 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              /* Staggered by index so the four arrive in step order rather than
                 all at once — the sequence is the point of the section. */
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex h-full items-center gap-3 overflow-hidden rounded-xl border border-border bg-background p-2.5 sm:block sm:h-[19rem] sm:border-0 sm:p-0"
            >
              {/* A thumbnail in the flow on a phone; the whole tile from sm. The
                  step number rides on the picture's corner rather than taking a
                  column of its own — it is a marker on the photo, not a third
                  thing competing with it for the row's width. */}
              <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-lg sm:absolute sm:inset-0 sm:h-full sm:w-full sm:rounded-none">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 sm:group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground tabular-nums shadow-md shadow-black/30 sm:hidden"
                >
                  {step.n}
                </span>
              </div>

              {/* Opaque at the foot, clearing by roughly two thirds up. The copy
                  needs a solid ground to sit on; the top of the picture needs to
                  stay a picture. Only exists once the copy is over the photo —
                  on a phone it sits beside it. */}
              <div className="absolute inset-0 hidden bg-gradient-to-t from-charcoal via-charcoal/80 via-45% to-charcoal/15 sm:block" />

              {/* The numeral is the loudest thing in the tile, in the display
                  face and brand green. At that size it carries the order on its
                  own — no "step" label, no chevrons between cards, no second
                  device doing the same job. */}
              <span
                aria-hidden="true"
                className="font-heading absolute top-3 left-4 hidden text-4xl text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:block lg:text-5xl"
              >
                {step.n}
              </span>

              <div className="min-w-0 flex-1 sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex-none sm:p-5">
                {/* Green rule that draws itself out on hover — the one piece of
                    movement in the tile, so it reads as a response rather than
                    as decoration competing with the image zoom. */}
                <span
                  aria-hidden="true"
                  className="mb-3 hidden h-0.5 w-8 origin-left bg-primary transition-transform duration-500 group-hover:scale-x-[2.5] sm:block"
                />
                {/* Body font on a phone, the display face only from sm.
                    `font-heading` is Akira Expanded — 800 weight, forced
                    uppercase, negative tracking. It is built to be read at 40px
                    across a hero; at 14px it becomes a run of identical capitals
                    that has to be decoded rather than read. Sentence case in the
                    body face is simply legible, which matters more here than
                    matching the other headings. */}
                <h3 className="text-[0.9rem] leading-snug font-bold text-foreground sm:font-heading sm:text-sm sm:leading-snug sm:text-secondary lg:text-base">
                  {step.title}
                </h3>
                {/* Phones get `short`, desktop gets `detail`. */}
                <p className="mt-0.5 text-[0.8rem] leading-snug text-muted-foreground sm:hidden">
                  {step.short}
                </p>
                <p className="mt-2 hidden text-[0.8rem] leading-relaxed text-secondary/75 sm:block lg:text-[0.85rem]">
                  {step.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================ 11 · GUARANTEE ============================ */

/** Each guarantee gets the icon that literally describes it. */
const GUARANTEE_ICONS: Record<string, typeof FileCheck> = {
  "fixed-price": FileCheck,
  "no-lifting": Hand,
  swept: Sparkles,
  recycled: Recycle,
};

function Guarantee() {
  return (
    <section className="bg-charcoal py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          tone="charcoal"
          align="center"
          eyebrow={guaranteeHeading.eyebrow}
          title={guaranteeHeading.title}
          description={guaranteeHeading.description}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {guarantees.map((g, i) => {
            const Icon = GUARANTEE_ICONS[g.id] ?? ShieldCheck;
            return (
              <Reveal key={g.id} delay={(i % 2) * 0.05}>
                <article className="flex h-full gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-primary/50 sm:gap-4 sm:p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground sm:h-11 sm:w-11">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base text-secondary">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary/70">{g.detail}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================= 12 · REVIEWS ============================= */

/**
 * Cards wide enough to hold a full review without becoming a column of two-word
 * lines. Six of them is roughly 2400px, which clears a 1920 monitor.
 */
const MIN_MARQUEE_CARDS = 6;
/** Seconds each card spends crossing. Keeps the speed constant as reviews are added. */
const SECONDS_PER_CARD = 7;

/**
 * A continuously scrolling review wall — same belt on a phone as on a desktop.
 *
 * The repeat count is DERIVED, not fixed. With enough verified reviews to fill
 * the track it renders each exactly once; under that it repeats only as far as
 * it must to keep the belt full. Reviews are never invented to pad it — paste
 * the real ones into `testimonials` and the repetition disappears with no code
 * change.
 *
 * TODO: two verified reviews is well under the six the belt wants, so the track
 * is currently tripled and visibly repeats. Paste the remaining Google reviews
 * into `testimonials` to fix it.
 */
function Reviews() {
  const repeats = Math.max(1, Math.ceil(MIN_MARQUEE_CARDS / testimonials.length));
  const track = Array.from({ length: repeats }, () => testimonials).flat();
  const duration = `${track.length * SECONDS_PER_CARD}s`;

  /** One half of the belt. Rendered twice; the second copy is decorative. */
  const half = (hidden: boolean) => (
    <div className="flex gap-4 pr-4" aria-hidden={hidden || undefined}>
      {track.map((t, i) => (
        <figure
          key={`${t.name}-${i}`}
          className="flex w-[17rem] shrink-0 flex-col rounded-xl border border-border bg-background p-5 sm:w-[23rem] sm:p-6"
        >
          <div aria-label={`${t.rating} out of 5 stars`} className="flex gap-1">
            {Array.from({ length: t.rating }).map((_, s) => (
              <Star
                key={s}
                className="h-4 w-4 text-[#FBBC04]"
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </div>
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-2.5 text-sm">
            <GoogleG className="h-4 w-4 shrink-0" />
            <span>
              <span className="block font-semibold">{t.name}</span>
              <span className="text-muted-foreground">{t.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <section
      id="reviews"
      className="scroll-mt-24 border-y border-border bg-card py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide">
        <div className="flex flex-col items-center text-center">
          <GoogleRatingBadge />
          <h2 className="font-heading mt-4 max-w-2xl text-xl sm:text-balance sm:text-2xl lg:text-[1.75rem]">
            {reviewsHeading.title}
          </h2>
        </div>
      </div>

      {/* Full-bleed, outside `container-wide`: a belt that stops at a centred
          gutter looks like it has walls. It should run off both edges. */}
      <div
        className="marquee-viewport group mt-10 motion-reduce:overflow-x-auto"
        style={{
          // Softens both ends so cards fade out rather than being guillotined at
          // the viewport edge.
          maskImage:
            "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
        }}
      >
        <div
          className="flex w-max animate-marquee group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: duration }}
        >
          {/* Each half carries its own trailing `pr-4`, so the two are exactly
              equal in width and the -50% shift lands seamlessly. Put the gap
              between the halves instead and the seam jumps by one gap. */}
          {half(false)}
          {half(true)}
        </div>
      </div>

      <div className="container-wide">
        {/* CTA after section 12. */}
        <CtaRow className="mt-10" />
      </div>
    </section>
  );
}

/* =========================== 13 · SERVICE AREA =========================== */

/**
 * Answers "do you come to me" without making anyone scroll to a footer. No
 * suburb list — naming a dozen suburbs quietly tells everyone else they are not
 * covered.
 */
function ServiceArea() {
  return (
    /* `bg-primary-deep`, not `bg-primary`. White on the brand green measures
       3.44:1 — enough for the large bold type the hero trust strip puts on it,
       but short of the 4.5:1 that body copy needs, and this section is mostly
       body copy. The deep token drops lightness only, keeping the hue and chroma
       identical, so it still reads as the brand while taking white to 4.52:1. */
    <section className="bg-primary-deep py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          tone="green"
          align="center"
          eyebrow={serviceArea.eyebrow}
          title={serviceArea.title}
          description={serviceArea.lede}
        />
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-3xl text-center leading-relaxed text-primary-foreground/90">
            {serviceArea.body}
          </p>
          {/* White on the green, not the brand green on the green — the coverage
              line is the answer the whole section exists to give, and it was the
              one piece of type here that would have disappeared. */}
          <p className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            Melbourne metro and Victoria wide
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================== 14 · FAQ =============================== */

function Faqs() {
  return (
    <section
      id="faqs"
      className="scroll-mt-24 border-t border-border py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="container-wide max-w-3xl">
        <SectionHeading align="center" eyebrow={faqHeading.eyebrow} title={faqHeading.title} />
        <div className="mt-8">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}

/* ============================ 15 · FINAL CTA ============================ */

function FinalCta() {
  const { openQuote } = useQuoteModal();

  return (
    <section className="bg-primary py-12 sm:py-16 lg:py-20">
      <div className="container-wide text-center">
        <h2 className="font-heading mx-auto max-w-2xl text-2xl sm:text-balance text-primary-foreground sm:text-3xl lg:text-4xl">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">{finalCta.lede}</p>
        <p className="mx-auto mt-3 max-w-2xl font-bold text-primary-foreground">{finalCta.body}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <CtaButton variant="solidLight" size="md" onClick={openQuote}>
            {CTA_LABEL}
          </CtaButton>
          <CtaButton href={SITE.phoneHref} variant="outlineLight" icon={false} size="md">
            <Phone className="mr-2 h-4 w-4" />
            Call {SITE.phone}
          </CtaButton>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-primary-foreground/85">
          <Clock className="h-4 w-4 shrink-0" />
          {finalCta.fine}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ shared ------------------------------ */

/** Repeated mid-page nudge back to the form — the only exit a landing page wants. */
function CtaRow({ className = "" }: { className?: string }) {
  const { openQuote } = useQuoteModal();

  return (
    /* Two across on a phone, not stacked. Full-width one above the other, these
       two buttons were most of a screen every time the row repeats — and it
       repeats after six sections. Side by side they read as one choice with two
       answers, which is what they are.

       Both cells stretch to the taller of the two, so a label that wraps to a
       second line does not leave the other button short. From sm there is room
       for them to sit at their natural widths again. */
    <div
      className={`grid grid-cols-2 items-stretch gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 ${className}`}
    >
      {/* Padding and type step down at the narrow end: at `md` metrics neither
          label fits half of a 320px card, and a button whose text is clipped
          reads as broken rather than tight. */}
      <CtaButton
        size="md"
        fullWidth
        onClick={openQuote}
        className="h-full px-3 text-center text-[0.8rem] leading-tight sm:w-auto sm:px-7 sm:text-sm"
      >
        {CTA_LABEL}
      </CtaButton>
      <CtaButton
        href={SITE.phoneHref}
        variant="outline"
        size="md"
        icon={false}
        fullWidth
        className="h-full px-3 text-center text-[0.8rem] leading-tight sm:w-auto sm:px-7 sm:text-sm"
      >
        <Phone className="mr-2 h-4 w-4 shrink-0" />
        Call {SITE.phone}
      </CtaButton>
    </div>
  );
}

/** Single-button variant for left-aligned copy blocks. */
function QuoteCta({ className = "" }: { className?: string }) {
  const { openQuote } = useQuoteModal();

  return (
    <CtaButton size="md" className={className} onClick={openQuote}>
      {CTA_LABEL}
    </CtaButton>
  );
}
