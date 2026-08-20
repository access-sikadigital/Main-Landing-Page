import { useEffect, useState } from "react";

/**
 * True once the hero section has scrolled fully out of view.
 *
 * The sticky quote bar hides until this flips, so it never sits over the fold
 * while the hero's own CTA is still on screen doing the same job.
 *
 * An IntersectionObserver rather than a scroll handler comparing `scrollY`
 * against a number. The hero's height changes with the viewport, with how the
 * headline wraps, and with mobile Safari collapsing its address bar mid-scroll,
 * so any fixed threshold would be wrong on most phones.
 */
export function usePastHero(heroId = "top") {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    // No hero on this route — leave the controls visible rather than stranding
    // them permanently hidden behind a condition that can never become true.
    if (!hero) {
      setPastHero(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  return pastHero;
}
