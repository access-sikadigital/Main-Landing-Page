import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { heroPoster, optimizeHeroVideo } from "@/services/strip-out/lib/hero-video";

const MIRA_VIDEO =
  "https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1600/v1783752870/Mira_Said_-_Demo_Bros_Talking_Head_Captions_uirzqj.mp4";

/**
 * Frame 0 catches Mira mid-word with her eyes shut. `so_6` pulls a still from six
 * seconds in instead, which is a settled, presentable frame.
 */
const CARD_POSTER =
  "https://res.cloudinary.com/eksopivw/video/upload/so_6/q_auto,f_auto,w_1200/v1783752870/Mira_Said_-_Demo_Bros_Talking_Head_Captions_uirzqj.jpg";

/**
 * Hero video bubble.
 *
 * A talking head is the one clip that must NOT be a darkened background loop —
 * it only works watched, with sound. So the hero shows a still frame in a small
 * circle, and the clip opens full size on click. Nothing downloads until then.
 */
export function MiraVideo({
  onDark = false,
  variant = "bubble",
}: {
  onDark?: boolean;
  /** "bubble" is the small hero pill; "card" is the 16:9 block in the explainer. */
  variant?: "bubble" | "card";
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  /** Card variant only: plays inline instead of opening the dialog. */
  const [playing, setPlaying] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inlineRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();

  // Hand focus back to the trigger so keyboard users are not dumped at the top
  // of the document when the dialog closes.
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  // The overlay is portalled to <body>, which only exists on the client.
  useEffect(() => setMounted(true), []);

  // Freeze the page behind the overlay and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, close, lenis]);

  /* Portalled to <body>. Rendered in place it lands inside the hero's stacking
     context — under the fixed header and the form card — and gets clipped by the
     hero's overflow-hidden. A portal escapes all of that. */
  const overlay =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Meet Mira from Demo Bros"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-charcoal/60 text-secondary transition-colors hover:bg-white/10 lg:top-7 lg:right-7"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.video
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              src={optimizeHeroVideo(MIRA_VIDEO)}
              poster={heroPoster(MIRA_VIDEO)}
              controls
              autoPlay
              playsInline
              className="max-h-[86vh] w-auto max-w-[min(100%,64rem)] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  /**
   * Full-width 16:9 player for the explainer section. Plays in place rather than
   * opening the dialog — a fullscreen takeover is the wrong weight for a video
   * that sits beside the copy it is illustrating.
   */
  if (variant === "card") {
    if (playing) {
      return (
        <div className="overflow-hidden rounded-xl bg-charcoal shadow-xl shadow-black/15">
          <video
            ref={inlineRef}
            src={optimizeHeroVideo(MIRA_VIDEO)}
            poster={CARD_POSTER}
            controls
            autoPlay
            playsInline
            onEnded={() => setPlaying(false)}
            className="aspect-video w-full bg-charcoal object-cover"
          />
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label="Play video: meet Mira from Demo Bros"
        className="group relative block w-full overflow-hidden rounded-xl bg-charcoal shadow-xl shadow-black/15 outline-none focus:outline-none focus-visible:outline-none"
      >
        <img
          src={CARD_POSTER}
          alt=""
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-charcoal/25 transition-colors duration-300 group-hover:bg-charcoal/10" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-6 w-6" fill="currentColor" strokeWidth={0} />
          </span>
        </span>
      </button>
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        // Focus ring suppressed by request — the global :focus-visible rule drew a
        // green rectangle around the pill after closing the dialog with Escape.
        className="group flex items-center gap-4 rounded-full text-left outline-none focus:outline-none focus-visible:outline-none"
        aria-label="Play video: meet Mira from Demo Bros"
      >
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          {/* Slow pulse to draw the eye without shouting */}
          <span className="absolute inset-0 animate-ping rounded-full border border-primary/40 opacity-30 [animation-duration:3s]" />
          <span className="absolute inset-0 overflow-hidden rounded-full border-2 border-primary/60 transition-transform duration-500 group-hover:scale-105">
            <img
              src={heroPoster(MIRA_VIDEO)}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-charcoal/25 transition-colors duration-300 group-hover:bg-charcoal/10" />
          </span>
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-3 w-3" fill="currentColor" strokeWidth={0} />
          </span>
        </span>

        <span>
          <span
            className={`block text-sm font-semibold transition-colors duration-300 group-hover:text-primary ${
              onDark ? "text-secondary" : "text-foreground"
            }`}
          >
            Meet Mira
          </span>
          <span className={`block text-sm ${onDark ? "text-secondary/65" : "text-foreground/60"}`}>
            Watch how we work
          </span>
        </span>
      </button>

      {overlay}
    </>
  );
}
