import { useEffect } from "react";
import { SITE } from "@/lib/site-data";
import { CtaButton } from "./CtaButton";

/**
 * Dedicated thank-you page shown after a successful quote submission.
 *
 * Each landing page redirects to its OWN thank-you URL (e.g. /thank-you,
 * /thank-you-house-demolition …) so the marketing team can fire a distinct
 * Google Ads / Meta / GA4 conversion on each. On mount we also push a
 * `generate_lead` event to the GTM dataLayer, tagged with which form it came
 * from, so a single GTM trigger can pick up every lead with its source.
 */
export function ThankYou({
  source,
  homePath = "/",
}: {
  source: string;
  homePath?: string;
}) {
  useEffect(() => {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "generate_lead", form_location: source });
  }, [source]);

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-background px-4 pt-28 pb-20">
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary">
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
            <path
              d="M2 13 12 23 32 3"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="font-heading mt-8 text-3xl text-foreground sm:text-4xl">
          Thanks — we&rsquo;ve got your details.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          One of our team will be in touch within 24 hours with your itemised,
          fixed price. If it&rsquo;s urgent, call us now.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton href={SITE.phoneHref} size="lg" icon={false}>
            Call {SITE.phone}
          </CtaButton>
          <CtaButton to={homePath} variant="outline" size="lg">
            Back to home
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
