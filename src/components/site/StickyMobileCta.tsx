import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useQuoteModal } from "./QuoteModal";
import { CTA_LABEL } from "@/lib/site-data";

/**
 * Mobile-only sticky CTA pinned to the bottom of the viewport. It stays hidden
 * while the hero is on screen (the hero already has the buttons) and slides up
 * once the visitor scrolls past it, so the one action this page exists for is
 * always one tap away. Hidden from `lg` up.
 */
export function StickyMobileCta() {
  const { openQuote } = useQuoteModal();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      setShow(true);
      return;
    }
    // Reveal the bar once the hero has scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={openQuote}
      aria-label={CTA_LABEL}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-primary px-5 py-4 text-base font-bold text-primary-foreground shadow-[0_-6px_24px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {CTA_LABEL}
      <ArrowRight className="h-5 w-5" />
    </button>
  );
}
