import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { QuoteModalProvider } from "@/components/site/QuoteModal";
import { CtaButton } from "@/components/site/CtaButton";
import { PRICING, SITE } from "@/lib/site-data";
import { captureTracking } from "@/lib/tracking";

// Copy deck v8, section 16. The prices quoted here are two of the eight places
// they appear (build note 10) — change them in PRICING and they change here too.
// Public URL of the site — used to build absolute URLs for social share images
// (Open Graph / Twitter require absolute URLs, not relative paths). Update this
// if the production domain changes.
const SITE_URL = "https://go.demobros.com.au";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const TITLE = `Demo Bros | Melbourne Demolitions & Strip Outs from ${PRICING.kitchen}`;
const DESCRIPTION = `Melbourne strip out specialists. Kitchens from ${PRICING.kitchen}, bathrooms from ${PRICING.bathroom}, cleared in a day. Itemised price in writing within 24 hours, and it doesn't move. 4.9★ from 54 Melbourne jobs.`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="font-heading mt-6 text-5xl text-foreground sm:text-7xl">Demolished</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          This page has been stripped out. Everything else is exactly where it should be.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href="/" size="md">
            Back to the top
          </CtaButton>
          <CtaButton href={SITE.phoneHref} variant="outline" size="md" icon={false}>
            Call {SITE.phone}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-2xl text-foreground">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or give us a call.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton
            size="sm"
            icon={false}
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </CtaButton>
          <CtaButton href={SITE.phoneHref} variant="outline" size="sm" icon={false}>
            Call {SITE.phone}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "Demo Bros" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Demo Bros" },
      { property: "og:url", content: SITE_URL },
      // The share image (1200×630) that appears when the link is posted to
      // Facebook, WhatsApp, LinkedIn, iMessage, Slack, etc.
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Demo Bros — House Demolition, Rubbish Removal & Strip-Outs, Melbourne",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Favicons. SVG for modern browsers, PNG/ICO fallbacks for older ones and
      // for tab/bookmark/home-screen icons across devices.
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "/#business",
          name: "Demo Bros",
          description:
            "Melbourne strip out and demolition specialists. Kitchen, bathroom and laundry strip outs, internal and partial demolition, in-house asbestos removal, site clearance and full house demolition.",
          telephone: "+61-1800-960-625",
          email: SITE.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "103/181 Rosamond Rd",
            addressLocality: "Maribyrnong",
            addressRegion: "VIC",
            postalCode: "3032",
            addressCountry: "AU",
          },
          // Deck section 12: Melbourne metro first, but the whole state is covered.
          areaServed: "Greater Melbourne and Victoria, Australia",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: 54,
            bestRating: "5",
          },
          priceRange: "$$",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M9642CM');`,
          }}
        />
        {/* End Google Tag Manager */}
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9642CM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Capture first-touch ad/campaign attribution on the visitor's landing page.
  useEffect(() => {
    captureTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <QuoteModalProvider>
          <Header />
          {/* Required: the route renders here. Removing <Outlet /> breaks the page. */}
          <main suppressHydrationWarning>
            <Outlet />
          </main>
          <Footer />
        </QuoteModalProvider>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
