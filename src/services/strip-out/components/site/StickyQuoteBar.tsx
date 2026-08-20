import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuoteModal } from "./QuoteModal";
import { CTA_LABEL } from "@/services/strip-out/lib/site-data";
import { usePastHero } from "@/services/strip-out/lib/use-past-hero";

/**
 * Full-width quote button pinned to the bottom of the screen on phones.
 *
 * It slides up once the hero has scrolled fully out of view. Over the hero it
 * covers the bottom of the fold — the trust strip, the stats — while the hero's
 * own CTA is still on screen and doing the same job. Past that point the page is
 * proof and detail, the original call to action is gone, and there is nothing
 * left competing with it.
 *
 * `usePastHero` is shared with the floating call button so the two arrive
 * together — see the hook for why it observes the hero rather than watching a
 * scroll offset.
 */
export function StickyQuoteBar() {
  const visible = usePastHero();
  const { openQuote } = useQuoteModal();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        >
          <button
            type="button"
            onClick={openQuote}
            /* The safe-area inset keeps the label clear of the home indicator on
               a notched iPhone, where the bottom ~34px of the viewport is not
               reliably tappable. */
            className="flex w-full flex-col items-center justify-center bg-primary px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-primary-foreground shadow-[0_-8px_24px_rgba(0,0,0,0.18)] transition-colors active:bg-primary-deep"
          >
            {/* The page's one button label, not a bespoke line for this bar.
                Deck note 9 asks for the same words on every call to action, and
                it is a real rule rather than tidiness — someone who has read
                "Get my fixed price" on the way down should meet the same promise
                here, not a new one they have to reappraise. */}
            <span className="flex items-center gap-2 text-[0.95rem] font-bold">
              {CTA_LABEL}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
            {/* The promise, not a tagline. A bar that only says "get a quote"
                asks for a commitment; this one answers the two objections that
                stop the tap — what it costs me, and how long I wait. */}
            <span className="mt-0.5 text-[0.7rem] font-medium text-primary-foreground/85">
              Free, itemised, in writing within 24 hours
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
