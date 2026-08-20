import { Phone } from "lucide-react";
import { SITE } from "@/lib/site-data";

/**
 * One floating button: tap it and the phone dials.
 *
 * It used to be a speed-dial — a toggle that opened a WhatsApp option and a call
 * option, with the closed button alternating between two icons on a timer. That
 * put two taps and a decision in front of the one thing it was there to do, and
 * the alternating icon meant you could never be sure what the button would give
 * you until you pressed it.
 *
 * It is an <a href="tel:"> rather than a button with a handler, so it behaves
 * like a phone number should: long-press to copy, right-click to save, and it
 * works with JavaScript off.
 */
export function FloatingContact() {
  return (
    <a
      href={SITE.phoneHref}
      aria-label={`Call ${SITE.phone}`}
      className="group fixed right-5 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/30 transition-transform hover:scale-105 lg:bottom-5"
    >
      {/* Slow pulse, so the button reads as live without nagging. Behind the
          icon and non-interactive, so it never eats the tap. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-primary opacity-25 [animation-duration:2.6s]"
      />
      <Phone className="relative h-6 w-6" />
    </a>
  );
}
