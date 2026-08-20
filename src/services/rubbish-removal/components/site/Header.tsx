import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Phone } from "lucide-react";
import logoDark from "@/services/rubbish-removal/assets/logo-dark.svg";
import logoLight from "@/services/rubbish-removal/assets/logo-light.svg";

import { CtaButton } from "./CtaButton";
import { useQuoteModal } from "./QuoteModal";
import { CTA_LABEL, SITE } from "@/services/rubbish-removal/lib/site-data";

/**
 * Landing-page header: logo, phone, one CTA. No nav links.
 *
 * Nav is the difference between a website and a landing page — every link is an
 * exit from the only action this page is paid to produce.
 *
 * PINNED FROM md, absolute below it. On a phone the logo alone is 56px of a
 * short viewport, and it was holding that space for the whole scroll to keep a
 * CTA in reach — a CTA the sticky bar at the bottom of the screen already
 * carries, in a bar sized for a thumb rather than a corner of the header. So on
 * a phone it scrolls away with the hero it sits on, and the page gets the height
 * back. From md the sticky bar is gone and the header is the only thing left
 * holding a call to action, so it pins.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const { openQuote } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      /* The solid bar is a `md:` variant throughout. Below md the header is
         absolute, so it only ever sits on the dark hero photograph — swapping to
         a light bar at 24px of scroll would have painted a white strip across
         the hero for the half-second before it slid out of frame. */
      className={`absolute inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-300 md:fixed ${
        scrolled ? "md:border-border md:bg-background/95 md:backdrop-blur" : ""
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-3 py-2.5 sm:gap-4 sm:py-3">
        <a
          href="#top"
          aria-label="Demo Bros, back to top"
          className="block shrink-0"
          onClick={(e) => {
            e.preventDefault();
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {/* Charcoal wordmark on the light bar, bone wordmark over the dark
              hero — the same logo in one colour would vanish in one of them.

              Two <img>s rather than one with a swapped `src`: below md the
              header is absolute and only ever sits on the dark hero, so the
              wordmark there is always the bone one, while from md it follows the
              scrolled state. One `src` cannot hold two answers at two
              breakpoints. Both are inline SVGs, so the second costs nothing.

              `alt=""` on both: the anchor's aria-label already names the link,
              and two alt texts would have it announced twice. */}
          <img
            src={logoLight}
            alt=""
            className="h-14 w-auto sm:h-16 md:hidden"
            width={334}
            height={330}
          />
          <img
            src={scrolled ? logoDark : logoLight}
            alt=""
            className="hidden h-16 w-auto md:block lg:h-20"
            width={334}
            height={330}
          />
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={SITE.phoneHref}
            /* Bone below md for the same reason as the logo — the bar behind it
               never turns light at that size. */
            className={`flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary ${
              scrolled ? "md:text-foreground" : ""
            }`}
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{SITE.phone}</span>
          </a>
          {/* Opens the quote modal rather than scrolling. From halfway down the
              page, scrolling all the way back up to the hero form was the longest
              path to the only action this page exists for. */}
          {/* Deck note 9: one button label, sentence case, everywhere. */}
          <CtaButton size="sm" onClick={openQuote} className="hidden sm:inline-flex">
            {CTA_LABEL}
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
