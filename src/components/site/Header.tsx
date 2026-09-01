import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";

import { CtaButton } from "./CtaButton";
import { useQuoteModal } from "./QuoteModal";
import { CTA_LABEL, SITE } from "@/lib/site-data";

/**
 * Landing-page header: logo, phone, one CTA. No nav links.
 *
 * Nav is the difference between a website and a landing page — every link is an
 * exit from the only action this page is paid to produce.
 *
 * Pinned from `lg` up, and only from `lg`. On a desktop the bar costs a sliver
 * of a tall window and keeps the CTA permanently reachable; on a phone the same
 * bar is a standing tax on a screen that is mostly fold, so below `lg` it is
 * `absolute` and scrolls away with the hero.
 *
 * Absolute rather than static, because the hero photograph runs underneath it —
 * a header in normal flow would sit on the light page background, where the bone
 * wordmark disappears.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const { openQuote } = useQuoteModal();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isThankYou = pathname.startsWith("/thank-you");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Thank-you pages sit on a light background and the visitor has already
     converted. The overlay header (bone logo, transparent bar, quote CTA) is
     wrong here: the light logo disappears and the CTA is redundant. Render a
     solid light bar instead — dark logo + phone clearly visible, no CTA. */
  if (isThankYou) {
    return (
      <header className="relative z-50 border-b border-border bg-background">
        <div className="container-wide flex items-center justify-between gap-3 py-2.5 sm:gap-4 sm:py-3">
          <Link to="/" aria-label="Demo Bros, home" className="block shrink-0">
            <img
              src={logoDark}
              alt="Demo Bros"
              className="h-14 w-auto sm:h-16 lg:h-20"
              width={334}
              height={330}
            />
          </Link>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span>{SITE.phone}</span>
          </a>
        </div>
      </header>
    );
  }

  return (
    /* The scrolled flag is published as a data attribute rather than branching
       in JS, so every dependent style can be gated on `lg:` in CSS. That matters
       here: below lg the header is scrolled off the screen anyway, and swapping
       to the dark wordmark on the way out would flash a charcoal logo against
       the charcoal hero. CSS can express "scrolled AND desktop"; a bare piece of
       React state cannot, without also measuring the viewport. */
    <header
      data-scrolled={scrolled || undefined}
      className="group absolute inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-300 lg:fixed lg:data-scrolled:border-border lg:data-scrolled:bg-background/95 lg:data-scrolled:backdrop-blur"
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
          {/* Both wordmarks are in the markup and swapped with CSS. Bone over the
              dark hero, charcoal once the bar turns solid — one logo in one
              colour would vanish into one of the two backgrounds. */}
          <img
            src={logoLight}
            alt="Demo Bros"
            className="h-14 w-auto sm:h-16 lg:h-20 lg:group-data-scrolled:hidden"
            width={334}
            height={330}
          />
          <img
            src={logoDark}
            alt=""
            aria-hidden="true"
            className="hidden h-14 w-auto sm:h-16 lg:h-20 lg:group-data-scrolled:block"
            width={334}
            height={330}
          />
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary lg:group-data-scrolled:text-foreground"
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
