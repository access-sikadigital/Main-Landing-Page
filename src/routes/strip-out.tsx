import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Camera,
  Check,
  Clock,
  FileCheck,
  FileClock,
  Handshake,
  Leaf,
  MapPin,
  MessagesSquare,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Star,
  Users,
  Tag,
  Timer,
} from "lucide-react";

/**
 * Hero background — two photographs, not one photograph cropped twice.
 *
 * The desktop shot is a wide scene: an excavator on the left, its bucket of
 * brick on the right, and the story is the distance between them. A phone asks
 * that scene for a tall narrow slice, which throws away both ends and leaves an
 * unreadable patch of the middle.
 *
 * So the phone gets a picture built around a single vertical subject instead —
 * one crew member, hard hat, Demo Bros shirt, standing centre-frame in the
 * rubble. A standing figure is the one composition that survives being cropped
 * narrow, because the crop runs along the axis the subject already occupies.
 */
const HERO_IMAGE_DESKTOP = "/images/house-demolition/hero.jpg";
const HERO_IMAGE_MOBILE = "/images/renovation-preparation/hero.jpg";
import { Reveal } from "@/services/strip-out/components/site/Reveal";
import { SectionHeading } from "@/services/strip-out/components/site/SectionHeading";
import { FaqList, faqJsonLd } from "@/services/strip-out/components/site/FaqList";
import { CtaButton } from "@/services/strip-out/components/site/CtaButton";
import { QuoteForm } from "@/services/strip-out/components/site/QuoteForm";
import { MiraVideo } from "@/services/strip-out/components/site/MiraVideo";
import { useQuoteModal } from "@/services/strip-out/components/site/QuoteModal";
import { FloatingContact } from "@/services/strip-out/components/site/FloatingContact";
import { StickyQuoteBar } from "@/services/strip-out/components/site/StickyQuoteBar";
import {
  GoogleG,
  GoogleRatingBadge,
  GoogleRatingSticky,
  GoogleStars,
} from "@/services/strip-out/components/site/GoogleRating";

import {
  CTA_LABEL,
  PRICING,
  SITE,
  asbestos,
  audiences,
  beforeAfterPairs,
  faqHeading,
  faqs,
  finalCta,
  greenStripClaims,
  guaranteeHeading,
  guarantees,
  hero,
  heroStats,
  nobodyExplains,
  pricing,
  processHeading,
  processSteps,
  quoteForm,
  reviewsHeading,
  serviceArea,
  serviceRouter,
  services,
  testimonials,
} from "@/services/strip-out/lib/site-data";

export const Route = createFileRoute("/strip-out")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) }],
  }),
  component: LandingPage,
});

/**
 * Paid-traffic landing page, built to copy deck v8 — the section order below is
 * the deck's, top to bottom.
 *
 * Deliberately NOT a website: no nav links to leak clicks, no sitemap footer.
 * Every section either proves the offer or points back at the form. Build note 3
 * puts a CTA after sections 04, 08, 11 and 14, which is why `CtaRow` recurs.
 */
function LandingPage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <TrustStats />
      {/* Before/after moved up from its deck position after section 08, to sit
          immediately ahead of the price.

          It is the only section that PROVES the offer rather than stating it, and
          it now does that work before the first number appears — so the reader
          meets "$800" already knowing what $800 buys. Down at section 09 it was
          nine screens deep, where most paid traffic never reached it. */}
      <BeforeAfter />
      <Price />
      <ServiceRouter />
      <Audiences />
      {/* "How it works" ahead of the asbestos case, not after it.

          The seven steps are the plain account of what happens; asbestos is the
          exception that complicates it. Explaining the exception before the rule
          asks the reader to hold a caveat about a process they have not been
          told yet. This way the asbestos section has something to be an
          exception TO. */}
      <Process />
      <Asbestos />
      <NobodyExplains />
      <Guarantee />
      <Reviews />
      <ServiceArea />
      <Faqs />
      <FinalCta />
      <GoogleRatingSticky />
      <FloatingContact />
      <StickyQuoteBar />
    </>
  );
}

/* ============================== 01 · HERO ============================== */

const HERO_ICONS: Record<string, typeof Tag> = {
  tag: Tag,
  timer: Timer,
  shield: ShieldCheck,
  leaf: Leaf,
};

/**
 * Highlighted phrase with a hand-drawn underline swoosh.
 *
 * `preserveAspectRatio="none"` stretches the curve to whatever width the words
 * take, and `vector-effect="non-scaling-stroke"` stops that stretch from
 * squashing the stroke — so the line stays an even weight at any size.
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
     (it has to, because the title tag and meta description quote the same
     price), and the swoosh is drawn around the price token here. */
  const [beforePrice, afterPrice] = hero.title.split(PRICING.kitchen);

  /* The swoosh span is an inline-block, and an inline-block offers the browser a
     line-break opportunity immediately after it. So the comma that follows the
     price was free to start its own line — ", CLEARED" hanging off the left
     margin. Split the punctuation that butts up against the price away from the
     rest of the sentence, and keep it glued to the price inside one nowrap. */
  const trailingPunctuation = /^\S*/.exec(afterPrice)?.[0] ?? "";
  const restOfTitle = afterPrice.slice(trailingPunctuation.length);

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Static image, no video: it loads instantly and costs nothing on mobile data.

          <picture> rather than two <img>s behind a `hidden` class: the browser
          resolves the media query BEFORE it fetches, so a phone downloads only
          the phone photograph. Two hidden images would download both and throw
          one away — on the exact connection that can least afford it. */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={HERO_IMAGE_DESKTOP} />
        {/* Crop position as classes, NOT an inline style — an inline style wins
            over any class, so the desktop value could never take effect. The
            mobile figure stands right of centre, hence 60%. */}
        <img
          src={HERO_IMAGE_MOBILE}
          alt="A Demo Bros crew member on a Melbourne demolition site"
          className="absolute inset-0 h-full w-full object-[60%_45%] object-cover lg:object-[50%_50%]"
        />
      </picture>

      {/* Two different overlays, because the copy sits differently on each.

          On a phone the text runs the full width, so the wash has to be even —
          a left-to-right fade would leave the ends of every line sitting on a
          bright patch of photograph. From lg the copy occupies the left column
          only, so the gradient can clear towards the right and let the crew and
          the excavator show through. */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/88 via-charcoal/82 to-charcoal/92 lg:bg-gradient-to-r lg:from-charcoal/92 lg:via-charcoal/70 lg:to-charcoal/40" />

      {/* Copy left, form right. Top padding clears the fixed header, which is
          tall because the logo is. */}
      <div className="container-wide relative z-10 grid items-center gap-10 pt-22 md:pt-30 pb-14 lg:grid-cols-2 lg:gap-14 lg:pb-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <GoogleRatingBadge />
            {/* Sits beside the rating, not under it, and borrows the badge's
                exact shape and padding so the two read as one matched pair of
                credentials rather than a badge with a sticker next to it.

                Filled with the DEEP green, not `--primary`. The label is 11px
                bold, and white on the standard brand green measures 3.44:1 —
                under the 4.5:1 small text needs, on a pill this size sitting
                over a photograph. The deeper token is the same hue and chroma
                with the lightness pulled down, so it still reads as the brand
                green while taking white to 4.52:1. */}
            <span className="rounded-full bg-primary-deep px-2.5 py-1 text-[0.7rem] font-bold text-primary-foreground sm:px-3.5 sm:py-2 sm:text-xs">
              {hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            /* No `text-balance` here. Balancing equalises line LENGTHS, which on
               a phone meant it would leave half a line of space empty to keep the
               next line from being short — the gap you could see to the right of
               MELBOURNE. Plain greedy wrapping fills each line before moving on.
               Sized so the longest word still fits one line inside the container
               padding on a 320px phone, the narrowest screen worth designing for. */
            className="font-heading mt-5 text-[2rem] leading-[1.15] text-secondary sm:text-[2.5rem] lg:text-[3rem]"
          >
            {beforePrice}
            <span className="whitespace-nowrap">
              <HandUnderline>{PRICING.kitchen}</HandUnderline>
              {trailingPunctuation}
            </span>
            {restOfTitle}
          </motion.h1>

          {/* Hidden on phones. Nothing is lost by it: the first bullet below is
              word for word the opening of this paragraph, and the rest of it is
              restated by the other three. Five lines of duplicate text sat
              between the headline and the button that the hero exists to serve.
              From sm the fold is deep enough to carry both. */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 hidden max-w-xl text-base leading-relaxed text-secondary/85 sm:block"
          >
            {hero.sub}
          </motion.p>

          {/* Buttons sit above the proof points, not below them. On a phone the
              four bullets are most of a screen, and burying the only action
              under them means the first thing you can DO arrives after the
              second scroll. Full-width buttons below sm — a half-width button
              next to another half-width button gives neither a comfortable
              thumb target. */}
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
                  {/* Green disc, white icon: brand colour doing the work. */}
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
            landed under the headline and buried the fold in eight form fields
            before anyone had read what the offer was. The sticky bar at the
            bottom of the screen carries the action at that size, and it opens
            the same form in the modal — one form, reached the way that suits the
            screen, rather than a second copy of it inline. `md`, matching the
            breakpoint where that bar disappears, so exactly one of the two is
            ever present. */}
        <motion.div
          id="quote-form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden w-full scroll-mt-24 rounded-xl border border-border bg-light p-4 shadow-2xl shadow-black/10 md:block sm:p-6 lg:scroll-mt-28"
        >
          {/* The card's own header shrinks on a phone too. Every pixel it takes
              is a pixel of the first field, and the first visible field is what
              tells someone this is a form worth starting. */}
          <h2 className="font-heading text-base text-light-foreground sm:text-xl">
            {quoteForm.title}
          </h2>
          <p className="mt-1 text-[0.8rem] text-light-foreground/70 sm:mt-1.5 sm:text-sm">
            {quoteForm.lede}
          </p>
          <div className="mt-4 sm:mt-5">
            <QuoteForm compact />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * The hero trust row, on the green strip directly under the fold.
 *
 * This is the green in the black / white / green rotation, and it puts the four
 * credentials that decide the enquiry in the first thing you see after the hero.
 */
function TrustStrip() {
  return (
    <section aria-label="Why Demo Bros" className="bg-primary py-4 lg:py-6">
      <div className="container-wide">
        {/* Two columns on a phone, one row from lg. Stacked as four full-width
            lines this strip ran nearly a third of a phone screen for four short
            credentials — a glance should not cost a scroll. */}
        {/* gap-x-3 at base: two columns inside a 280px content box leave only
            ~128px per claim, and a 24px gutter was eating a character off every
            line of it. */}
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-center sm:gap-x-6 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-10">
          {greenStripClaims.map((claim) => (
            <li
              key={claim}
              /* White on this green is 3.5:1, which only clears AA once the type
                 is large AND bold — hence bold, never a lighter weight. */
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
  turnaround: FileClock,
};

/**
 * Deck build note 1: real values, in the HTML, always.
 *
 * These used to count up from zero, which meant a fast scroll, blocked JS or a
 * reduced-motion setting showed "0.0 Google rating · 0 jobs" — the page's own
 * proof, reading as nothing. They are static text now.
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
                {/* Figure first in every cell, mark underneath — same rhythm as
                    the Google rating rather than an icon floating above. */}
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
                  /* Icon over the label on a phone, beside it from sm up. Two of
                     these labels wrap to two lines at this width, and a centred
                     icon next to a two-line label leaves the whole cell looking
                     like it has slipped sideways. */
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

/* ============================== 04 · PRICE ============================== */

/**
 * The section the whole deck is built around: a real starting number, before
 * anyone has to talk to a salesperson.
 *
 * The five "quoted on the job" rows are deliberate. Inventing a starting price
 * for a full house demolition would make every other number on the page suspect.
 */

/* Split on the data, not on a hardcoded index: a row either opens with a dollar
   sign or it does not. Add a starting price to any of the five in site-data and
   it moves itself up into the highlighted group. */
const startingPrices = pricing.table.filter((row) => row.from.startsWith("$"));
const quotedOnJob = pricing.table.filter((row) => !row.from.startsWith("$"));

function Price() {
  return (
    <section id="price" className="scroll-mt-24 py-16 lg:scroll-mt-28 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          description={pricing.lede}
        />

        {/* Two columns from lg: the table on the left, the reasoning on the
            right. Stacked and capped at max-w-3xl this section ran most of a
            screen tall while leaving a third of the page width empty on either
            side — and it separated the prices from the explanation of what
            moves them, which is the one thing a reader wants next to them. */}
        <div className="mt-10 flex flex-col-reverse sm:grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Order is set explicitly at BOTH breakpoints rather than left to
              source order, because the two want opposite arrangements: on a
              phone the table comes first, and at lg it moves to the right-hand
              column. Leading a pricing section with the caveats on a number
              nobody has seen yet reads as hedging. */}
          <Reveal delay={0.05} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-black/5">
              {/* GROUP ONE — the three real numbers.
                  Tinted green and given the whole top of the panel to itself.
                  In a single eight-row table these three were the same size and
                  weight as five rows reading "Quoted on the job", so the only
                  hard information in the section was outnumbered by its own
                  caveats. */}
              <div className="flex items-baseline justify-between gap-3 border-b border-border bg-primary/[0.07] px-5 py-3.5 sm:px-6">
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-primary uppercase">
                  Starting prices
                </h3>
                {/* The deck's "From" column header, kept as a single label
                    instead of repeated against every row. */}
                <span className="text-[0.7rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  From
                </span>
              </div>

              <dl>
                {startingPrices.map((row) => (
                  <div
                    key={row.job}
                    className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 transition-colors duration-200 hover:bg-primary/[0.04] sm:px-6"
                  >
                    <dt className="text-[0.95rem] font-semibold sm:text-base">{row.job}</dt>
                    {/* Big, green, and `tabular-nums` so $800 and $1,200 line up
                        on the decimal down the column. `whitespace-nowrap`
                        because a price broken across two lines stops looking
                        like a price. */}
                    <dd className="text-xl font-extrabold whitespace-nowrap text-primary tabular-nums sm:text-2xl">
                      {row.from}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* GROUP TWO — the jobs there is no honest starting number for.
                  Listed once under one heading rather than each carrying its own
                  copy of the same five words. */}
              <div className="border-b border-border bg-background px-5 py-3.5 sm:px-6">
                <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  Priced on the job
                </h3>
              </div>

              <ul className="grid gap-2.5 px-5 py-4 sm:px-6">
                {quotedOnJob.map((row) => (
                  <li
                    key={row.job}
                    className="flex items-start gap-2.5 text-[0.95rem] text-foreground/80"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    {row.job}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              {pricing.note}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:order-1">
            {/* Boxed, so the column reads as a companion to the table rather
                than loose text floating beside it. */}
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h3 className="font-heading text-lg lg:text-xl">{pricing.factorsTitle}</h3>
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

              <p className="mt-6 border-t border-border pt-6 leading-relaxed text-muted-foreground">
                {pricing.close}{" "}
                <strong className="font-bold text-foreground">{pricing.closeEmphasis}</strong>
              </p>

              {/* Deck note 3: a CTA after section 04. Inside the panel, directly
                  under the promise it is asking you to act on. */}
              <CtaRow className="mt-7 lg:justify-start" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================== 05 · SERVICE ROUTER ========================== */

/** How many of the five cards go in the wide bottom row. */
const WIDE_SERVICE_CARDS = 2;

/**
 * Splits the cards by how much copy each one carries.
 *
 * Five equal columns left the two long descriptions running to six lines while
 * the short ones stopped at two, so every card in the row was sized by its
 * wordiest neighbour and three of them ended in dead space. The two longest go
 * in a wider bottom row where the same text takes three lines; the three short
 * ones share the top row and stay tight.
 *
 * Length decides membership, but each row keeps the deck's original card order —
 * sorting the cards by how much text they happen to contain would drop the
 * kitchen card, the only one with a price on it, to the end of its row.
 */
const wideSlugs = new Set(
  [...services]
    .sort((a, b) => b.detail.length - a.detail.length)
    .slice(0, WIDE_SERVICE_CARDS)
    .map((s) => s.slug),
);
const compactServices = services.filter((s) => !wideSlugs.has(s.slug));
const wideServices = services.filter((s) => wideSlugs.has(s.slug));

/**
 * Five cards, rendered ONCE.
 *
 * Deck note 6: the old build emitted the grid twice — one copy for mobile, one
 * for desktop — which doubled the markup, doubled the image requests and made
 * every card a duplicate in the accessibility tree. One block, responsive CSS.
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

        {/* Two-up on phones. The split into a three-card row and a two-card row
            exists because two of the descriptions run long — and on a phone the
            descriptions are hidden, so the reason for the split does not apply
            there. One 2×2-and-one grid, becoming 3 + 2 from sm. */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {compactServices.map((s, i) => (
            // An odd number of cards in two columns leaves the last one alone in
            // a half-width row with a hole beside it, so it spans instead. Only
            // below lg — up there the row is three across and three cards fit
            // exactly.
            <Reveal
              key={s.slug}
              delay={(i % 3) * 0.05}
              className="h-full [&:nth-child(odd):last-child]:col-span-2 lg:[&:nth-child(odd):last-child]:col-span-1"
            >
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        {/* Row two: the two wordy ones, at half the section width each. */}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-2">
          {wideServices.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.05} className="h-full">
              <ServiceCard service={s} wide />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * `wide` turns the card on its side from sm up: image left, copy right.
 *
 * At half the section width a stacked card would want a very wide, very short
 * photo and would still leave the text short of the fold. Landscape uses the
 * extra width for the copy and gives the image a portrait crop, which suits a
 * room shot far better than a letterbox.
 */
function ServiceCard({
  service: s,
  wide = false,
}: {
  service: (typeof services)[number];
  wide?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition-colors duration-300 hover:border-primary/50">
      {/* Image on top in every card, wide row included. Side by side, the photo
          had to fill a tall narrow column while the copy ran out well before the
          bottom, so each card ended in a block of empty background as deep as
          the picture. Stacked, the image crops to a band and the card closes up
          under the last line — and both rows share one silhouette. `wide` now
          only buys the photo a little more height, since the card is wider. */}
      <div className={`w-full overflow-hidden ${wide ? "h-28 sm:h-52" : "h-28 sm:h-44"}`}>
        {/* Most of these photos are tall portraits, and the subject is rarely in
            the middle of the frame — the saw cutting brick sits high and right,
            the deck sits low. Cropping every one from the centre put the wrong
            part of the picture in the card, so each carries its own focal point. */}
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          style={{ objectPosition: s.imagePosition }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5 lg:p-6">
        <h3 className="font-heading text-[0.75rem] leading-snug sm:text-lg lg:text-xl">
          {s.title}
        </h3>
        {/* Description is desktop-only. Two cards across a phone leaves each one
            about 150px wide, where these run to eight or nine lines and bury the
            title they belong to. The card's job at that size is to let someone
            recognise their job and tap; the detail is what the quote is for. */}
        <p className="mt-3 hidden flex-1 text-[0.95rem] leading-relaxed text-muted-foreground sm:block sm:text-base">
          {s.detail}
        </p>
        {s.price && (
          <p className="mt-2 text-[0.7rem] font-bold tracking-[0.08em] text-primary uppercase sm:mt-5 sm:text-sm">
            {s.price}
          </p>
        )}
      </div>
    </article>
  );
}

/* ========================= WHO WE WORK WITH ========================= */

/**
 * Four audiences, one word each, drawn as line art.
 *
 * Sits between "what we take out" and the asbestos case: the visitor has just
 * found their job, and this answers the next question — whether Demo Bros works
 * with people like them — before they have to ask it.
 *
 * Custom artwork rather than a stock icon set, because these have to carry
 * PEOPLE, not just buildings — a house with someone standing in it reads as
 * "homeowner" in a way that an outline of a house never will.
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

/* ============================= 06 · ASBESTOS ============================= */

/**
 * On the charcoal band, because this is the section that separates Demo Bros
 * from every crew that downs tools the moment it finds asbestos.
 */
function Asbestos() {
  return (
    <section className="bg-charcoal py-12 sm:py-16 lg:py-20">
      <div className="container-wide grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">{asbestos.eyebrow}</p>
          <h2 className="font-heading mt-3 text-xl sm:text-balance text-secondary sm:text-2xl lg:text-[1.75rem]">
            {asbestos.title}
          </h2>
          {asbestos.body.map((para) => (
            <p key={para} className="mt-4 leading-relaxed text-secondary/70">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.08}>
          {/* One panel, three hairline-divided rows — not three floating cards.
              Boxing each point separately gave equal visual weight to three
              things that are actually one sequence, and the icon-disc-in-a-
              rounded-box treatment is the most generic shape on the internet.
              Large numerals in the display face carry the order instead, and
              they tie this block to the numbered process steps further down. */}
          <div className="overflow-hidden rounded-xl border border-white/12 bg-white/[0.03] lg:mt-14">
            <p className="border-b border-white/10 bg-white/[0.04] px-5 py-4 text-[0.7rem] font-bold tracking-[0.18em] text-primary uppercase sm:px-6 sm:tracking-[0.22em]">
              How we handle it
            </p>
            <ol>
              {asbestos.points.map((point, i) => (
                <li
                  key={point}
                  className="group flex items-baseline gap-4 border-b border-white/10 px-5 py-5 transition-colors duration-300 last:border-0 hover:bg-white/[0.05] sm:gap-5 sm:px-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading w-8 shrink-0 text-lg text-primary tabular-nums transition-colors duration-300 group-hover:text-primary/70"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] leading-relaxed font-medium text-secondary">
                    {point}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================== 07 · HOW IT WORKS =========================== */

/**
 * All seven steps and all seven photographs on screen at once.
 *
 * Seven does not divide into equal rows, which is what made every previous
 * attempt at this section awkward — a 3-across grid orphaned the last card, and
 * the stacked timeline that avoided the problem ran past three thousand pixels.
 *
 * The fix is two rows of DIFFERENT counts: four then three, using a 12-column
 * grid where the top row takes 3 columns each and the bottom row takes 4. Both
 * rows come out flush, nothing is orphaned, and the whole process is about one
 * screen instead of five.
 *
 * Image heights are fixed rather than set by aspect ratio. The two rows are
 * different widths, so an aspect ratio would make the bottom row's pictures
 * taller than the top row's and the grid would look like it had slipped.
 */
function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-12 sm:py-16 lg:scroll-mt-28 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow={processHeading.eyebrow}
          title={processHeading.title}
        />

        {/* Photographic tiles, not photographs sitting inside white boxes.
            The card-with-a-picture-on-top pattern makes every section on every
            website look the same, and it spends half of each tile on chrome. Let
            the photograph BE the tile, wash it down to charcoal, and set the copy
            into it — the pictures become the design instead of illustrating it,
            and the whole row reads as job site rather than as brochure.

            The section itself stays light. The band above this one is already
            charcoal, and two dark bands back to back merge into one. */}
        {/* PHONES get a different card entirely — a compact row: small square
            photo, then the number, title and detail beside it. The tile below is
            272px tall, and seven of them is nearly two thousand pixels of
            scrolling on a section that is reassurance, not the offer. Worse, at
            phone width a full-bleed photo with text washed over it is the one
            layout where neither the picture nor the words get enough room.

            Same markup, restyled at `sm` — not two blocks with one hidden, which
            would put every step in the document twice. */}
        <ol className="mt-8 grid grid-cols-1 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12 lg:gap-5">
          {/* The <li> is the grid child and carries the column span — Reveal
              renders a <div>, and a <div> is not a permitted child of <ol>. It
              goes inside the item, not around it. */}
          {processSteps.map((step, i) => (
            <li
              key={step.n}
              // Seven is odd, so the final tile would sit alone in the two-up
              // layout at sm. It spans the row instead.
              className={`sm:[&:nth-child(odd):last-child]:col-span-2 lg:[&:nth-child(odd):last-child]:col-span-4 ${
                i < 4 ? "lg:col-span-3" : "lg:col-span-4"
              }`}
            >
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <article className="group relative flex h-full items-center gap-3 overflow-hidden rounded-xl border border-border bg-card p-2.5 sm:block sm:h-[19rem] sm:border-0 sm:p-0">
                  {/* A thumbnail in the flow on a phone; the whole tile from sm. */}
                  {/* A thumbnail in the flow on a phone; the whole tile from sm.
                      The step number rides on the picture's corner rather than
                      taking a column of its own — it is a marker on the photo,
                      not a third thing competing with it for the row's width. */}
                  <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-lg sm:absolute sm:inset-0 sm:h-full sm:w-full sm:rounded-none">
                    <img
                      src={step.image}
                      alt={`${step.title} — Demo Bros crew on site`}
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

                  {/* Opaque at the foot, clearing by roughly two thirds up. The
                      copy needs a solid ground to sit on; the top of the picture
                      needs to stay a picture. Only exists once the copy is over
                      the photo — on a phone it sits beside it. */}
                  <div className="absolute inset-0 hidden bg-gradient-to-t from-charcoal via-charcoal/80 via-45% to-charcoal/15 sm:block" />

                  {/* The numeral is the loudest thing in the tile, in the display
                      face and brand green. At that size it carries the order on
                      its own — no "step" label, no chevrons between cards, no
                      second device doing the same job. */}
                  <span
                    aria-hidden="true"
                    className="font-heading absolute top-3 left-4 hidden text-4xl text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:block lg:text-5xl"
                  >
                    {step.n}
                  </span>

                  <div className="min-w-0 flex-1 sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex-none sm:p-5">
                    {/* Green rule that draws itself out on hover — the one piece
                        of movement in the tile, so it reads as a response rather
                        than as decoration competing with the image zoom. */}
                    <span
                      aria-hidden="true"
                      className="mb-3 hidden h-0.5 w-8 origin-left bg-primary transition-transform duration-500 group-hover:scale-x-[2.5] sm:block"
                    />
                    {/* Body font on a phone, the display face only from sm.
                        `font-heading` is Akira Expanded — 800 weight, forced
                        uppercase, negative tracking. It is built to be read at
                        40px across a hero, and at 14px it is a wall of identical
                        capital letters that has to be decoded rather than read.
                        Sentence case in the body face is simply legible, which
                        matters more here than matching the other headings. */}
                    {/* Body font on a phone, the display face only from sm.
                        `font-heading` is Akira Expanded — 800 weight, forced
                        uppercase, negative tracking. It is built to be read at
                        40px across a hero; at 14px it becomes a run of identical
                        capitals that has to be decoded rather than read.
                        Sentence case in the body face is simply legible, which
                        matters more here than matching the other headings. */}
                    <h3 className="text-[0.9rem] leading-snug font-bold text-foreground sm:font-heading sm:text-sm sm:leading-snug sm:text-secondary lg:text-base">
                      {step.title}
                    </h3>
                    {/* Phones get `short`, desktop gets the deck's `detail`.
                        The headings alone were too abstract to carry the section
                        — "We protect what stays" does not tell you that the
                        picture is plastic sheeting over a doorway. One plain
                        line saying what is happening does. */}
                    <p className="mt-0.5 text-[0.8rem] leading-snug text-muted-foreground sm:hidden">
                      {step.short}
                    </p>
                    <p className="mt-2 hidden text-[0.8rem] leading-relaxed text-secondary/75 sm:block lg:text-[0.85rem]">
                      {step.detail}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ==================== 08 · THE JOB NOBODY QUOTES FOR ==================== */

/**
 * Names the problem before selling the fix: the strip out sitting between the
 * visitor and the room they actually want. Mira's video sits alongside so the
 * promise arrives from a person rather than a paragraph.
 */
function NobodyExplains() {
  return (
    <section className="border-y border-border bg-card py-12 sm:py-16 lg:py-20">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{nobodyExplains.eyebrow}</p>
            <h2 className="font-heading mt-3 text-xl sm:text-balance sm:text-2xl lg:text-[1.75rem]">
              {nobodyExplains.title}
            </h2>
            <p className="mt-5 text-lg font-bold text-foreground">{nobodyExplains.lead}</p>
            {nobodyExplains.body.map((para) => (
              <p key={para} className="mt-4 leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-7 grid gap-3">
              {nobodyExplains.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[0.95rem] text-foreground/85"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
                  {point}
                </li>
              ))}
            </ul>

            {/* Deck note 3: a CTA after section 08. */}
            <QuoteCta className="mt-8" />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <MiraVideo variant="card" />
        </Reveal>
      </div>
    </section>
  );
}

/* ========================= 09 · BEFORE AND AFTER ========================= */

/**
 * The money shot for a demolition business: the same room, before and after.
 *
 * Static pairs rather than a drag-slider — a slider asks the visitor to work for
 * the payoff, and half of them never touch it. Both images in a pair must be the
 * same room; the data file says so too, because pairing unrelated shots would be
 * fabricating evidence.
 */
function BeforeAfter() {
  if (beforeAfterPairs.length === 0) return null;

  return (
    /* Bottom rule because the price section directly below shares this same
       plain background. Both are large, airy blocks; without a line between them
       they read as one very long section with a second heading in the middle.
       Not a card tone instead — each pair sits in a `bg-card` figure, and those
       would vanish into a card-toned section. */
    <section className="border-b border-border py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow="Before and after"
          title="Same room, one day apart."
        />

        {/* Two up, with the third spanning the full width. Each frame already
            holds a side-by-side pair, so two cards across means four photographs
            across the page — the third going full width is what stops all three
            being squeezed that small, and gives the section one image big enough
            to actually read the difference in. */}
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {beforeAfterPairs.map((pair, i) => {
            // The card that spans both columns. At 3:2 across a full phone width
            // it stood nearly 400px tall — one card taking most of the screen —
            // so the wide one takes a shallower crop there and goes back to 3:2
            // from sm, where the row is wide enough for the height not to bite.
            const spansRow = i === beforeAfterPairs.length - 1 && beforeAfterPairs.length % 2 === 1;
            return (
              <Reveal
                key={pair.id}
                delay={(i % 2) * 0.05}
                /* "Odd-numbered AND last" is how CSS says "there is an odd
                   number of these", which is the only case that leaves a hole
                   beside the final card in a two-column grid. With four pairs
                   nothing spans and the grid stays square on its own.

                   Cancelled at lg, where the row is three across and three pairs
                   fill it exactly — left on, the third card would stretch over
                   two of the three columns and break the row. */
                className="h-full [&:nth-child(odd):last-child]:col-span-2 lg:[&:nth-child(odd):last-child]:col-span-1"
              >
                <figure className="h-full overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative">
                    <img
                      src={pair.image}
                      alt={`${pair.label}, before and after`}
                      loading="lazy"
                      className={`w-full object-cover ${
                        spansRow ? "aspect-[2/1] sm:aspect-[3/2]" : "aspect-[3/2]"
                      }`}
                    />
                    {/* The composite splits at exactly 50%, so AFTER is inset from
                      the midpoint by the same amount BEFORE gets from the left
                      edge — both then sit the same distance inside their own
                      half. The inset shrinks with the label on small screens, or
                      AFTER drifts off its own half. */}
                    <span className="absolute top-1.5 left-1.5 rounded-sm bg-charcoal/80 px-1.5 py-0.5 text-[0.5rem] font-bold tracking-[0.06em] text-secondary uppercase backdrop-blur sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.18em]">
                      Before
                    </span>
                    <span className="absolute top-1.5 left-[calc(50%+0.375rem)] rounded-sm bg-primary px-1.5 py-0.5 text-[0.5rem] font-bold tracking-[0.06em] text-primary-foreground uppercase sm:top-3 sm:left-[calc(50%+0.75rem)] sm:px-2.5 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.18em]">
                      After
                    </span>
                  </div>
                  <figcaption className="border-t border-border px-3 py-2.5 sm:px-5 sm:py-4">
                    <span className="font-heading text-[0.75rem] leading-snug sm:text-base">
                      {pair.label}
                    </span>
                    {/* Caption line is desktop-only, same reasoning as the service
                      cards: at half a phone width it runs to four lines and
                      swamps the title it belongs to. */}
                    <span className="mt-0.5 hidden text-sm text-muted-foreground sm:block">
                      {pair.note}
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

/* ============================ 10 · GUARANTEE ============================ */

/** Each guarantee gets the icon that literally describes it. */
const GUARANTEE_ICONS: Record<string, typeof FileCheck> = {
  "fixed-price": FileCheck,
  asbestos: ShieldAlert,
  handover: Camera,
  "one-crew": Users,
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
                {/* At 320px, p-6 plus a 44px icon left barely 170px for the
                    text — enough to break "photographed" across two lines. */}
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

/* ============================= 11 · REVIEWS ============================= */

/**
 * Enough cards on one half of the track to outrun the widest screen.
 *
 * The track is duplicated and slid by exactly -50%, so a "half" has to be wider
 * than the viewport or the loop shows its own tail with empty space behind it.
 * Six cards is roughly 2400px, which clears a 1920 monitor.
 */
const MIN_MARQUEE_CARDS = 6;
/** Seconds each card spends crossing. Keeps the speed constant as reviews are added. */
const SECONDS_PER_CARD = 7;

/**
 * A continuously scrolling review wall.
 *
 * Deck note 5 says reviews must not loop, and that note is about DUPLICATES —
 * the old build cycled three testimonials so the same one passed you every
 * twenty seconds, which reads as three reviews dressed up as twelve. The repeat
 * count below is therefore derived, not fixed: with enough real reviews to fill
 * the track it renders each exactly once and the deck's rule holds on its own.
 * Under that, it repeats only as far as it must to keep the belt full.
 *
 * TODO: three verified reviews is below the deck's six-to-eight, so the track is
 * currently doubled and visibly repeats. Paste the remaining Google reviews into
 * `testimonials` and this stops happening without a code change.
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
          className="flex w-[19rem] shrink-0 flex-col rounded-xl border border-border bg-background p-5 sm:w-[23rem] sm:p-6"
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
            "linear-gradient(to right, transparent, black 4rem, black calc(100% - 4rem), transparent)",
        }}
      >
        <div
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
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
        {/* Deck note 3: a CTA after section 11. */}
        <CtaRow className="mt-10" />
      </div>
    </section>
  );
}

/* =========================== 12 · SERVICE AREA =========================== */

/**
 * Answers "do you come to me" without making anyone scroll to a footer.
 *
 * Deck note 7 retired the twelve-suburb chip list: naming twelve suburbs quietly
 * tells everyone in the other four hundred that they are not covered.
 */
function ServiceArea() {
  return (
    /* `bg-primary-deep`, not `bg-primary`. White on the brand green measures
       3.44:1 — enough for the large bold type the hero trust strip puts on it,
       but short of the 4.5:1 that body copy needs, and this section is mostly
       body copy. The deep token drops lightness only, keeping the hue and chroma
       identical, and takes white to 4.52:1. */
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
          {/* Full-strength white here: it is the one line in the section acting
              as a stamp rather than prose, so it should be the brightest thing. */}
          <p className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-primary-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            Melbourne metro and Victoria wide
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================== 13 · FAQ =============================== */

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

/* ============================ 14 · FINAL CTA ============================ */

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
    /* Two equal columns on a phone, back to a centred inline pair from sm.
       Wrapped, the two buttons stacked at their own natural widths — a wide
       green one over a narrower outlined one, left-aligned against each other —
       which reads as two unrelated controls rather than one choice with two
       answers. Equal cells make them a pair. */
    <div
      className={`grid grid-cols-2 items-stretch gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 ${className}`}
    >
      <CtaButton size="md" fullWidth onClick={openQuote} className="sm:w-auto">
        {CTA_LABEL}
      </CtaButton>
      <CtaButton
        href={SITE.phoneHref}
        variant="outline"
        size="md"
        icon={false}
        fullWidth
        className="sm:w-auto"
      >
        <Phone className="mr-2 h-4 w-4 shrink-0" />
        {/* Number only from sm. Half a 390px screen leaves about 165px, and
            "Call 1800 960 625" needs more than that — it would wrap the number
            onto a second line, which is the one thing a phone number must not
            do. */}
        <span className="sm:hidden">Call us</span>
        <span className="hidden sm:inline">Call {SITE.phone}</span>
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
