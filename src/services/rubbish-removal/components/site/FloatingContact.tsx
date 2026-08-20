import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { SITE } from "@/services/rubbish-removal/lib/site-data";
import { usePastHero } from "@/services/rubbish-removal/lib/use-past-hero";

/**
 * Floating call button, bottom-right.
 *
 * A plain `tel:` link now, not a menu. It used to be a toggle that opened a
 * WhatsApp option and a call option — two taps to reach either, and a decision
 * to make in between, for a page whose entire secondary action is "ring them".
 * WhatsApp has gone with it: nothing else on the site offers it, so it was the
 * only channel here the business had not already committed to on every other
 * surface.
 *
 * Hidden until the hero has scrolled past, sharing `usePastHero` with the sticky
 * quote bar so the two arrive together — separately-written observers would
 * eventually drift, and a call button landing a moment before or after the quote
 * bar reads as a glitch.
 */
export function FloatingContact() {
  const visible = usePastHero();

  return (
    <AnimatePresence>
      {visible && (
        /* Lifted clear of the sticky quote bar below md, where the two would
           otherwise stack on top of each other in the same corner. */
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-5 bottom-[6.5rem] z-50 md:bottom-5"
        >
          <a
            href={SITE.phoneHref}
            aria-label={`Call ${SITE.phone}`}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/30 transition-transform hover:scale-105"
          >
            {/* Slow pulse so the button reads as live without nagging. */}
            <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-25 [animation-duration:2.6s] motion-reduce:hidden" />
            <Phone className="relative h-6 w-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
