// Single-page landing content for Demo Bros.
//
// Source of truth: "Demo Bros — Landing Page Copy Deck v8 (Build ready)".
// Copy here is the deck verbatim, in the deck's page order. Theme, fonts, logo
// and imagery are carried over unchanged from the main demo-bros site.
//
// The deck's argument, from headline to footer: you should know what it costs
// before you commit. Price up front, in writing within 24 hours, and it does not
// move after that.

export const SITE = {
  name: "Demo Bros",
  tagline: "Melbourne strip outs from $800, cleared in a day",
  phone: "1800 960 625",
  phoneHref: "tel:1800960625",
  email: "info@demobros.com.au",
  address: "103/181 Rosamond Rd, Maribyrnong VIC 3032",
};

/**
 * Every price the page quotes, in one place.
 *
 * Deck build note 10: prices appear in eight places — H1, hero subhead, hero
 * bullets, price table, service card, FAQ, final CTA, and the title tag and meta
 * description. They must all change together, so they all read from here. Change
 * a number in this object and the whole page follows.
 */
export const PRICING = {
  kitchen: "$800",
  bathroom: "$1,200",
  laundry: "$800",
} as const;

/** The one button label, used everywhere. Sentence case, per deck note 9. */
export const CTA_LABEL = "Get my fixed price";

/* ============================== 01 · HERO ============================== */

export const hero = {
  eyebrow: "Free quote",
  title: `Melbourne strip outs from ${PRICING.kitchen}, cleared in a day.`,
  sub: `Kitchens from ${PRICING.kitchen}, bathrooms from ${PRICING.bathroom}. Out in a day, so your tiler starts the next morning. Fixed price in writing within 24 hours — free, itemised, and we don't chase you.`,
  /** `icon` is a lucide name resolved in index.tsx, keeping this file pure content. */
  bullets: [
    { icon: "tag", label: `Kitchens from ${PRICING.kitchen}, bathrooms from ${PRICING.bathroom}` },
    { icon: "timer", label: "Kitchens, bathrooms and laundries cleared in a day" },
    {
      icon: "shield",
      label: "Asbestos removal handled in-house — no third contractor on your job",
    },
    { icon: "leaf", label: "Skip, rubbish and clean-up included" },
  ],
};

/**
 * The hero trust row, carried on the green strip directly under the fold.
 * Four claims, no more — it is a glance, not a read.
 */
export const greenStripClaims = [
  "4.9 ★ from 54 Google reviews",
  "Family owned since 2013",
  "$20M public liability",
  "VBA registered",
];

/* =========================== 02 · QUOTE FORM =========================== */

export const quoteForm = {
  title: "Get your fixed quote",
  lede: "Tell us what's coming out. Itemised, in writing, within 24 hours.",
  fine: "Free, itemised, no obligation. One quote, one follow-up.",
  /** Sits directly under the submit button, on its own. Deck note 2. */
  fineEmphasis: "We do not chase you.",
};

/**
 * "What needs to come out?" — MULTI-SELECT, in exactly this order.
 *
 * Deck note 2: the lead record must store every option ticked, not just the
 * first. `value` is what travels to GoHighLevel.
 */
export const quoteServiceOptions = [
  { value: "kitchen-strip-out", label: "Kitchen strip out" },
  { value: "bathroom-strip-out", label: "Bathroom strip out" },
  { value: "laundry-strip-out", label: "Laundry strip out" },
  { value: "internal-demolition", label: "Internal demolition" },
  { value: "partial-demolition", label: "Partial demolition" },
  { value: "wall-tile-asbestos-removal", label: "Wall, tile or asbestos removal" },
  { value: "shed-deck-site-clearance", label: "Shed, deck or site clearance" },
  { value: "full-house-demolition", label: "Full house demolition" },
  { value: "something-else", label: "Something else" },
];

/** "When are you looking to start?" — tells the crew how to sequence the job. */
export const timingOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "within-2-weeks", label: "Within 2 weeks" },
  { value: "within-1-month", label: "Within 1 month" },
  { value: "more-than-1-month", label: "More than 1 month" },
  { value: "not-sure", label: "Not sure yet" },
];

/* =========================== 03 · TRUST STATS =========================== */

export interface HeroStat {
  /** Keys the icon used for this stat in the trust band. */
  id: string;
  value: string;
  label: string;
}

/**
 * Deck build note 1: these must render REAL values in the HTML. They used to
 * count up from zero, so a fast scroll, blocked JS or a reduced-motion setting
 * showed "0.0 Google rating · 0 jobs". They are plain static strings now.
 */
export const heroStats: HeroStat[] = [
  { id: "rating", value: "4.9", label: "Google rating" },
  { id: "reviews", value: "54", label: "Google reviews" },
  { id: "since", value: "2013", label: "Family owned since" },
  { id: "turnaround", value: "24h", label: "Price in writing" },
];

/* ============================== 04 · PRICE ============================== */

export const pricing = {
  eyebrow: "Up-front pricing",
  title: "Get an idea of what it costs before we even call you back.",
  lede: "Most people want a rough number before they pick up the phone. Fair enough. Here's where our prices start, so you can work out whether we're in your range before you go any further.",
  /** `from` is either a starting price or the honest "we can't say yet". */
  table: [
    { job: "Kitchen strip out", from: PRICING.kitchen },
    { job: "Bathroom strip out", from: PRICING.bathroom },
    { job: "Laundry", from: PRICING.laundry },
    { job: "Kitchen and bathroom together", from: "Quoted on the job" },
    { job: "Internal strip out", from: "Quoted on the job" },
    { job: "Wall, tile or asbestos removal", from: "Quoted on the job" },
    { job: "Shed, deck or site clearance", from: "Quoted on the job" },
    { job: "Full house demolition", from: "Quoted on the job" },
  ],
  note: "The bottom five vary too much for a starting number to mean anything, so we don't invent one. They get priced properly, in writing, within 24 hours.",
  factorsTitle: "What moves the price",
  factors: [
    "How much is coming out, and whether the floor comes up with it",
    "Access — stairs, a narrow side gate, a third-floor unit with one lift",
    "Whether anything pre-1990 needs testing first",
    "How much rubbish there is once it's all on the ground",
    "Whether anything structural is involved",
  ],
  close: "All of that gets priced up front, not discovered afterwards.",
  closeEmphasis: "Whatever number comes back, that's the number.",
};

/* ========================== 05 · SERVICE ROUTER ========================== */

/**
 * Five cards, rendered ONCE — deck note 6: the old build output the grid twice,
 * one copy for mobile and one for desktop. One markup block, responsive CSS.
 *
 * Deck note 7 removed the commercial/retail strip out and office defit cards
 * from this page; that traffic goes to the footer link instead.
 *
 * Every `imagePosition` is a plain centre now. The photographs were commissioned
 * 3:2 with the action deliberately in the middle third, which is what the card's
 * wide crop keeps — so there is no off-centre subject left to compensate for.
 * The field stays because the moment one photo is swapped for a library shot,
 * it will be needed again.
 */
export const services = [
  {
    slug: "kitchen-bathroom-laundry",
    title: "Kitchen, bathroom and laundry strip out",
    detail:
      "Cabinets, benchtop, splashback, tiles, fittings, the lot. In at eight, out by knock-off, so your tiler starts the next morning.",
    price: `From ${PRICING.kitchen}`,
    image: "/images/services/kitchen-bathroom-laundry.jpg",
    imagePosition: "50% 50%",
  },
  {
    slug: "internal-strip-out",
    title: "Internal strip out",
    detail:
      "One room or the whole house. A small internal is usually a day; a full strip back to the frame — walls, ceilings, floors — is generally inside a week. Tell us the scope and we'll tell you which one yours is.",
    price: null,
    image: "/images/services/internal-strip-out.jpg",
    imagePosition: "50% 50%",
  },
  {
    slug: "wall-tile-asbestos-removal",
    title: "Wall, tile and asbestos removal",
    detail:
      "Load-bearing walls, wall and floor tiles, render, sheeting, asbestos, old fixtures. If it's attached to the building and you want it gone, get in touch — we'll tell you straight away whether it's something we do.",
    price: null,
    image: "/images/services/wall-tile-asbestos-removal.jpg",
    imagePosition: "50% 50%",
  },
  {
    slug: "shed-deck-site-clearance",
    title: "Shed, deck and site clearance",
    detail: "Sheds, carports, decks, pergolas, concrete. Nothing left behind for you to deal with.",
    price: null,
    image: "/images/services/shed-deck-site-clearance.jpg",
    imagePosition: "50% 50%",
  },
  {
    slug: "full-house-demolition",
    title: "Full house demolitions",
    detail:
      "House down, block clean and level, ready for the slab. Permits, disconnections and waste all handled.",
    price: null,
    image: "/images/services/full-house-demolition.jpg",
    imagePosition: "50% 50%",
  },
];

export const serviceRouter = {
  eyebrow: "What we take out",
  title: "Find the job that sounds like yours.",
  lede: "Not on the list? We still take it out. Tell us what it is.",
};

/* =========================== WHO WE WORK WITH =========================== */

/**
 * One word each, deliberately.
 *
 * This replaces the four-tab "Who we work with" block the deck retired in build
 * note 7 — that version carried a paragraph per audience and a tab bar to hide
 * three quarters of it. This is the same reassurance ("we do jobs like yours")
 * at a glance, with nothing to click and nothing to read past.
 *
 * Custom line-art artwork rather than lucide icons — a house with a person in
 * it, a tradesman, an apartment block, a civic building. A stock icon set can
 * say "building"; it cannot say "the person who lives there".
 *
 * Filenames are lowercase. They arrived as Homeowner.png / Builders.png and so
 * on in the public root; Windows would have served those whatever the case, but
 * the host this deploys to will not, and a capital letter in a path is a class
 * of bug that only ever shows up in production.
 */
export const audiences = {
  title: "Who we work with",
  items: [
    { image: "/images/audiences/homeowners.png", label: "Homeowners" },
    { image: "/images/audiences/builders.png", label: "Builders" },
    { image: "/images/audiences/developers.png", label: "Developers" },
    { image: "/images/audiences/government.png", label: "Government" },
  ],
};

/* ============================= 06 · ASBESTOS ============================= */

/**
 * The section that separates Demo Bros from every crew that stops when it hits
 * asbestos. In-house removal is the differentiator the whole deck leans on.
 */
export const asbestos = {
  eyebrow: "Built before 1990?",
  title: "The one thing that turns a one-day job into a three-week one.",
  body: [
    "If your place went up before 1990, asbestos was standard building material — in the wall sheeting, the eaves, the old vinyl underlay. Most demolition crews hit it and stop, because it isn't something they handle.",
    "Then you're waiting on someone else's calendar, paying a second contractor, and your tiler has quietly moved on to another job.",
    "We take it out ourselves. We look for it before we quote, our own crew removes it safely, and it sits inside the price you already agreed to.",
  ],
  /**
   * These three are a sequence, not a bag of features: found, then removed,
   * then already paid for. Rendered as a numbered order in index.tsx, because
   * the order is the argument — each one is only reassuring because the one
   * before it happened first.
   */
  points: [
    "Identified before the quote, not discovered halfway through",
    "Removed safely by our own crew and disposed of properly",
    "In the number from the start, never added later",
  ],
};

/* =========================== 07 · HOW IT WORKS =========================== */

/**
 * Each step carries a photograph of that step actually happening.
 *
 * Seven lines of text describing a process is something a reader skims and
 * takes on trust. Seven pictures of the process is something they can check —
 * and it answers the question the copy cannot, which is what "we protect what
 * stays" or "swept and photographed" actually looks like when the crew leaves.
 *
 * Filenames are number-prefixed so the folder sorts in step order on disk.
 */
export const processSteps = [
  {
    n: "01",
    title: "Tell us what's coming out",
    detail:
      "Submit an enquiry using our form, and attach any photos for a faster, more accurate quote.",
    image: "/images/process/01-tell-us.jpg",
  },
  {
    n: "02",
    title: "Free site inspection, if it needs one",
    detail:
      "On bigger jobs we'll come out and scope it properly, at no cost, so the number we give you is the right one.",
    image: "/images/process/02-site-inspection.jpg",
  },
  {
    n: "03",
    title: "Your number, in writing",
    detail: "Itemised, within 24 hours. Free, and nothing to sign.",
    image: "/images/process/03-number-in-writing.jpg",
  },
  {
    n: "04",
    title: "We protect what stays",
    detail: "Floor protection down, barriers up, services isolated.",
    image: "/images/process/04-protect-what-stays.jpg",
  },
  {
    n: "05",
    title: "We strip it out",
    detail: "Load-bearing checked before anything structural moves.",
    image: "/images/process/05-strip-it-out.jpg",
  },
  {
    n: "06",
    title: "Waste gone",
    detail: "Skip and tip runs are on us. Recycled where we can.",
    image: "/images/process/06-waste-gone.jpg",
  },
  {
    n: "07",
    title: "Swept and photographed",
    detail: "Bare walls, clean floor, photographed at handover. Your trades walk straight in.",
    image: "/images/process/07-swept-photographed.jpg",
  },
];

export const processHeading = {
  eyebrow: "How it works",
  title: "Seven steps. You know the price before anything moves.",
};

/* ==================== 08 · THE JOB NOBODY QUOTES FOR ==================== */

export const nobodyExplains = {
  eyebrow: "The part nobody explains",
  title: "Everyone talks about the renovation. Nobody tells you what comes first.",
  lead: "You've picked the tiles. Your builder's booked. The quote's signed.",
  body: [
    "Then someone mentions the old bathroom has to come out before any of it can start — and suddenly there's a job nobody planned for, and nobody budgeted for, sitting between you and the room you actually want.",
    "That job's ours. One day. Bare walls, skip gone, floor swept. Your trades walk in the next morning and get straight to work.",
  ],
  points: [
    "Bare walls and a swept floor, not a pile in the middle of the room",
    "The floorboards and staircase you're keeping, covered the whole way",
    "A finish date you can give your builder with a straight face",
  ],
};

/* ========================= 09 · BEFORE AND AFTER ========================= */

/**
 * ONE composite image per row, not two files.
 *
 * Each picture already carries the before on its left half and the after on its
 * right, split down the exact middle — same room, same window, same light. That
 * is the whole point of the section ("Same room, one day apart"), and a single
 * frame guarantees it in a way two separately-loaded files never can: there is
 * no way for the halves to drift apart, load out of order, or get mismatched by
 * a later edit.
 *
 * `note` says what came out. Deliberately NOT a street address — these are
 * illustrative, and attaching a real one would present them as a record of a
 * specific job.
 */
export interface BeforeAfterPair {
  id: string;
  label: string;
  note: string;
  image: string;
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "kitchen",
    label: "Kitchen strip out",
    note: "Cabinets, benchtop, splashback and floor covering out",
    image: "/images/before-after/kitchen-strip-out.jpg",
  },
  {
    id: "laundry",
    label: "Laundry strip out",
    note: "Tub, cabinetry and wall tiles out, services capped",
    image: "/images/before-after/laundry-strip-out.jpg",
  },
  {
    id: "internal",
    label: "Internal strip out",
    note: "Back to the frame, swept and ready for trades",
    image: "/images/before-after/internal-strip-out.jpg",
  },
];

/* ============================ 10 · GUARANTEE ============================ */

/** `id` keys the icon chosen for each card in the guarantees grid. */
export const guarantees = [
  {
    id: "fixed-price",
    title: "If we read the job wrong, that's ours to wear",
    detail:
      "We quoted it. Getting it right was our job, not yours. The price we wrote down is the price you pay.",
  },
  {
    id: "asbestos",
    title: "Asbestos is in the number, not on top of it",
    detail:
      "We remove it ourselves, so it doesn't add a contractor to your job or a week to your timeline.",
  },
  {
    id: "handover",
    title: "Handover photographed",
    detail:
      "Swept, cleared and photographed when we leave, so there's never an argument about the state we left it in.",
  },
  {
    id: "one-crew",
    title: "One crew, start to finish",
    detail:
      "Nobody gets subcontracted out on the morning. The team that quoted you is the team that turns up.",
  },
];

export const guaranteeHeading = {
  eyebrow: "Fixed price guarantee",
  title: "The number doesn't move.",
  description: "No day-rate creep. No variation at the end. No phone call halfway through the job.",
};

/* ============================= 11 · REVIEWS ============================= */

/**
 * Deck note 5: reviews DO NOT loop. Six to eight unique, residential-weighted,
 * no duplicates in the carousel — so these render once, as a grid.
 *
 * TODO before publish: the deck asks for 4–6 further residential reviews,
 * prioritising ones that name a timeline or a price that held. Only these three
 * are verified from the Google Business Profile. Do not invent the rest.
 */
export const testimonials = [
  {
    name: "Jessie Shepherd",
    role: "Strip out, inner west",
    quote:
      "Thanks to Tony and his team at Demo Bros for their strip out of an old property we have. From start to finish the team were professional, communicative and respectful of my property. Completed on time and within my budget.",
    rating: 5,
  },
  {
    name: "George Toubia",
    role: "Shed demolition",
    quote:
      "The team were professional, efficient and took all necessary safety precautions to ensure the job was done safely. They also left the site clean and tidy, which was much appreciated.",
    rating: 5,
  },
  {
    name: "Tony Manara",
    role: "Commercial demolition",
    quote:
      "They exceeded all our expectations. Knowledgeable, experienced and had all the necessary equipment to complete the job quickly and efficiently. They took the time to explain the entire process.",
    rating: 5,
  },
];

export const reviewsHeading = {
  title: "4.9 stars from hundreds of sites across Melbourne.",
};

/* =========================== 12 · SERVICE AREA =========================== */

/**
 * Deck note 7 removed the twelve-suburb chip list. Statewide prose replaces it —
 * a list of twelve suburbs quietly tells everyone in the other four hundred that
 * they are not covered.
 */
export const serviceArea = {
  eyebrow: "Where we work",
  title: "Melbourne wide — and the rest of Victoria too.",
  lede: "Most of our work is Melbourne metro — every suburb, inner and outer, north and south of the river. But we cover the whole state: the Peninsula, Geelong and the Surf Coast, Ballarat, Bendigo, Gippsland and the north-east.",
  body: "Tell us where the job is and we'll tell you when we can be there — usually in the same reply as the price.",
};

/* =============================== 13 · FAQ =============================== */

/**
 * Deck note 4: the first item opens by default, and every answer is in the HTML
 * on load rather than injected on click — the answers are the SEO surface.
 */
export const faqs = [
  {
    q: "What does a strip out cost?",
    a: `Kitchens start at ${PRICING.kitchen} and bathrooms at ${PRICING.bathroom}. Laundries sit in the same range. What moves it is how much is coming out, whether the floor comes up, how hard the access is, and whether anything pre-1990 needs testing first. Full internal strip outs, wall removals and house demolition vary too much for a starting number to be useful, so we quote those on the job. Either way you get an itemised figure in writing within 24 hours, and that figure is what you pay.`,
  },
  {
    q: "How long does it take?",
    a: "A kitchen, bathroom or laundry is cleared in a day. Small internal demo, same. A full internal strip out is usually inside a week. You get the finish date with the quote, not after we start, so you can book your trades around it.",
  },
  {
    q: "Do you handle asbestos?",
    a: "We do it ourselves, rather than bringing someone else in. Anything pre-1990 gets looked at before we quote, removed safely by our own crew, disposed of properly, and it sits inside the same fixed price. It doesn't add a contractor to your job or a week to your timeline.",
  },
  {
    q: "How far do you travel?",
    a: "Melbourne metro is our home ground and most of what we do. Beyond that we cover the whole state — regional, coastal, the Peninsula. Tell us the address and we'll tell you when we can be there.",
  },
  {
    q: "Do I need a permit?",
    a: "For internal strip outs, usually not. For house demolition and anything structural, yes — and we handle the application, the disconnections and the council side. We'll tell you which one yours is when we quote.",
  },
  {
    q: "Do you take the rubbish away?",
    a: "Yes, always, and it's in the fixed price. Skip hire and tip runs are ours, not yours. Anything that can be recycled, is.",
  },
  {
    q: "What about the parts of the house I'm keeping?",
    a: "Floor protection goes down and barriers go up before the first tile comes off. The hallway, the floorboards and the staircase you're keeping are covered the whole way through. We photograph the handover so there's nothing to argue about later.",
  },
  {
    q: "Can you work to my builder's start date?",
    a: "That's the normal way we work. Tell us the date your trades are booked for and we'll clear it before then — or we'll tell you straight away if we can't, while you've still got time to sort something out.",
  },
  {
    q: "Are you insured?",
    a: "$20M public liability, VBA registered, family owned since 2013. Certificates on request before we start.",
  },
];

export const faqHeading = {
  eyebrow: "Questions we get every week",
  title: "Straight answers, starting with the one everybody asks.",
};

/* ============================ 14 · FINAL CTA ============================ */

export const finalCta = {
  title: "Get your fixed price.",
  lede: "Tell us what's coming out and we'll send you an itemised number in writing within 24 hours. Free, no obligation, and it doesn't move after that.",
  body: `Kitchens from ${PRICING.kitchen}. Bathrooms from ${PRICING.bathroom}. Most rooms cleared in a day.`,
  fine: "4.9 ★ Google · Family owned since 2013 · $20M public liability · VBA registered",
};

/* ============================== 15 · FOOTER ============================== */

export const footer = {
  coverage:
    "Strip outs and demolition across Melbourne — every suburb, inner and outer — plus the Peninsula, Geelong, Ballarat, Bendigo and regional Victoria.",
  /** Deck note 7: commercial traffic leaves this page through the footer. */
  commercial:
    "Office defit, retail strip out or end-of-lease make good? We do that too — get in touch for a free quote.",
  legal: "Melbourne demolition & strip outs · Licensed and VBA registered · $20M public liability",
};

/* ============================ QUOTE MODAL ============================ */

/**
 * The modal's selling points. Split into `lead` and `rest` so the part that
 * actually closes the sale carries the weight and the qualifier sits back.
 */
export const modalBenefits = [
  {
    lead: `Kitchens from ${PRICING.kitchen}, bathrooms from ${PRICING.bathroom}`,
    rest: "and most rooms cleared in a day",
  },
  { lead: "Fixed price in writing", rest: "within 24 hours, and it doesn't move after that" },
  { lead: "Asbestos removed by our own crew", rest: "inside the price, not on top of it" },
  { lead: "Skip, rubbish and clean-up included", rest: "no variation at the end" },
];
