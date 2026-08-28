// Single-page landing content for Demo Bros — Campaign 3 (Rubbish Removal & Cleanups).
//
// Source of truth: "Demo Bros — Campaign 3 Landing Page Copy Deck v1 (Build ready)".
// Copy here is the deck verbatim, in the deck's page order. Theme, fonts, logo
// and imagery are carried over unchanged from the main demo-bros site.
//
// The deck's argument, from headline to footer: we're a demolition crew, not a
// man with a ute — so nothing is too heavy, too big or too much. Fixed price
// before we load, and you don't lift a thing.

export const SITE = {
  name: "Demo Bros",
  tagline: "Melbourne rubbish removal — we do the lifting",
  phone: "1800 960 625",
  phoneHref: "tel:1800960625",
  email: "info@demobros.com.au",
  address: "103/181 Rosamond Rd, Maribyrnong VIC 3032",
};

/**
 * Every price the page quotes, in one place.
 *
 * Deck build note: prices appear in eight places — H1, hero subhead, price
 * table, service card, FAQ, final CTA, and the title tag and meta description.
 * They must all change together, so they all read from here.
 *
 * !!! INDICATIVE STARTING PRICES — CONFIRM WITH JOHN BEFORE THIS PAGE GOES LIVE !!!
 * These are grounded in current Melbourne market rates (2026): minimum load
 * ~$79–150, 6x4/7x5 trailer ~$110–250, half truck ~$200–400, full truck
 * ~$350–700. The values below sit mid-market on purpose — the deck warns that a
 * hopeful low anchor only produces angry quote calls. They are the page's main
 * weapon, so swap them for John's real "from" prices the moment he confirms them;
 * change them here once and the whole page (H1, hero, table, FAQ, final CTA and
 * page meta) follows.
 */
export const PRICING = {
  min: "$99", // minimum load callout — a few items
  trailer: "$150",
  halfTruck: "$290",
  fullTruck: "$550",
} as const;

/** The one button label, used everywhere. Sentence case. */
export const CTA_LABEL = "Get my fixed price";

/* ============================== 01 · HERO ============================== */

export const hero = {
  eyebrow: "Free quote",
  // NOTE: leads on the placeholder price. If John cannot supply a number, use the
  // fallback H1 from the deck: "Melbourne rubbish removal. Fixed price before we
  // load, and you don't lift a thing." — but push hard for the number first.
  title: `Melbourne rubbish removal from ${PRICING.min}. We do the lifting.`,
  sub: "Household junk, hard rubbish, concrete, whole garages and full house clear-outs. We're a demolition crew, so nothing's too heavy or too much. You get a fixed price before we load, and you don't touch a thing.",
  /** `icon` is a lucide name resolved in index.tsx, keeping this file pure content. */
  bullets: [
    { icon: "tag", label: "Fixed price before we load — no bill that grows on the day" },
    { icon: "weight", label: "Concrete, brick, decks and sheds included, not knocked back" },
    { icon: "hand", label: "You don't lift, sort or carry anything" },
    { icon: "leaf", label: "Sorted and recycled where we can" },
  ],
};

/**
 * The hero trust row, carried on the green strip directly under the fold.
 * Four claims, no more — it is a glance, not a read.
 */
export const greenStripClaims = [
  "4.9 ★ from 56 Google reviews",
  "Family owned since 2013",
  "$20M public liability",
  "VBA registered",
];

/* =========================== 02 · QUOTE FORM =========================== */

export const quoteForm = {
  title: "Get your fixed quote",
  lede: "Tell us what needs to go. Fixed price back within 24 hours.",
  fine: "Free, no obligation. One quote, one follow-up.",
  /** Sits directly under the submit button, on its own. */
  fineEmphasis: "We do not chase you.",
};

/**
 * "What needs clearing?" — MULTI-SELECT, in exactly this order.
 *
 * The lead record must store every option ticked, not just the first.
 * `value` is what travels to GoHighLevel.
 */
export const quoteServiceOptions = [
  { value: "strip-out", label: "Strip Out" },
  { value: "partial-demolition", label: "Partial Demolition" },
  { value: "full-home-demolition", label: "Full Home Demolition" },
  { value: "rubbish-removal", label: "Rubbish Removal" },
  { value: "other", label: "Other" },
];

/*
 * There is no `amountOptions` or `timingOptions` list any more. "Roughly how
 * much is there?" and "When do you need it gone?" were both required selects,
 * and both asked for a guess the visitor has not made yet — volume, and a start
 * date. The crew asks the same two questions on the follow-up call, where they
 * cost nothing instead of a form abandonment.
 */

/* =========================== 03 · TRUST STATS =========================== */

export interface HeroStat {
  /** Keys the icon used for this stat in the trust band. */
  id: string;
  value: string;
  label: string;
}

/**
 * Real values in the HTML on load. No animating up from zero — a fast scroll,
 * blocked JS or a reduced-motion setting must never show "0.0 Google rating".
 */
export const heroStats: HeroStat[] = [
  { id: "rating", value: "4.9", label: "Google rating" },
  { id: "reviews", value: "56", label: "Google reviews" },
  { id: "since", value: "2013", label: "Family owned since" },
  { id: "liability", value: "$20M", label: "Public liability" },
];

/* ========================= 04 · BEFORE AND AFTER ========================= */

/**
 * Proof before persuasion — sits high, straight after the trust bar.
 *
 * Each pair is a SINGLE combined image: before on the left half, after on the
 * right half, same spot and same camera angle. The page overlays its own
 * BEFORE / AFTER tags on the two halves, so the image itself carries no text.
 *
 * !!! ILLUSTRATIVE PLACEHOLDERS — SWAP FOR REAL VERIFIED DEMO BROS JOB PHOTOS
 * BEFORE PUBLISH. These three are AI-generated stand-ins that match the real
 * clearance jobs (garage, yard, whole room). The section says "Every one of
 * these is a Demo Bros job", so replace them with genuine before/after photos of
 * actual jobs as soon as they're available.
 *
 * PHOTO RULES for the real replacements: nothing identifying in any hoarding or
 * deceased-estate photo — no faces, no documents, no mail, no framed pictures,
 * no house numbers. Get written permission before using either.
 */
export interface BeforeAfterPair {
  id: string;
  label: string;
  location: string;
  /** One image, before on the left half, after on the right half. */
  image: string;
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "garage",
    label: "Garage cleared, floor swept",
    location: "Melbourne",
    image: "/images/before-after/garage-clearout.jpg",
  },
  {
    id: "yard",
    label: "Yard and old shed cleared",
    location: "Melbourne",
    image: "/images/before-after/yard-clearout.jpg",
  },
  {
    id: "room",
    label: "Whole room cleared out",
    location: "Melbourne",
    image: "/images/before-after/room-clearout.jpg",
  },
];

export const beforeAfterHeading = {
  eyebrow: "Before and after",
  title: "Full, then empty. Usually the same day.",
  description: "Every one of these is a Demo Bros job.",
};

/* ============================== 05 · PRICE ============================== */

export const pricing = {
  eyebrow: "Up-front pricing",
  title: "What it costs, before you pick up the phone.",
  lede: "Rubbish removal is priced on how much there is, how heavy it is and how far we carry it. Here's where ours starts, so you can work out whether we're in your range before you go any further.",
  /** `how` describes the load; `from` is a starting price or the honest "we can't say yet". */
  table: [
    { job: "Minimum load", how: "A few items — a mattress, a couch, a fridge", from: PRICING.min },
    { job: "Trailer load", how: "A garage corner, a small clean-out", from: PRICING.trailer },
    { job: "Half truck load", how: "A full garage or a small yard", from: PRICING.halfTruck },
    {
      job: "Full truck load",
      how: "A large garage, a big yard, a small house",
      from: PRICING.fullTruck,
    },
    {
      job: "Whole house or deceased estate",
      how: "Room by room, everything out",
      from: "Quoted on the job",
    },
    { job: "Hoarding cleanup", how: "Staged over as long as it takes", from: "Quoted on the job" },
    {
      job: "Construction and demolition waste",
      how: "Concrete, brick, timber, plasterboard",
      from: "Quoted on the job",
    },
    {
      job: "Deck, shed, carport or pergola",
      how: "Dismantled first, then removed",
      from: "Quoted on the job",
    },
  ],
  note: "The bottom four vary too much for a starting number to mean anything, so we don't invent one. They get priced properly, in writing, within 24 hours.",
  factorsTitle: "What moves the price",
  factors: [
    "How much there is — the honest answer, not the hopeful one",
    "How heavy it is. Concrete, brick, soil and tiles are charged by weight, because that's how the tip charges us",
    "Access — stairs, a long carry from the back yard, no truck parking out front",
    "Whether anything has to be taken apart before it can be carried out",
    "Whether it needs sorting, and whether anything needs specialist disposal",
  ],
  close: "All of that gets priced up front, not discovered on the day.",
  closeEmphasis: "Whatever number comes back, that's the number.",
};

/* ========================== 06 · SERVICE ROUTER ========================== */

/**
 * Six cards, rendered ONCE — one markup block, responsive CSS.
 *
 * `shortTitle` is the phone label; `title` runs from sm. Two up on a phone each
 * card is about 135px wide, and the full titles ran to four lines apiece —
 * "Heavy and awkward — concrete, brick, decks and sheds" is a sentence, not a
 * label. The short ones name the thing in nouns someone can scan for, which is
 * the entire job of a service router.
 */
export const services = [
  {
    slug: "household-hard-rubbish",
    title: "Household and hard rubbish",
    shortTitle: "Household and hard rubbish",
    detail:
      "Furniture, mattresses, whitegoods, boxes, the pile that's been beside the shed for two years. We lift it, load it and take it away, and you don't carry anything to the kerb.",
    price: `From ${PRICING.min}`,
    // Two crew loading a mattress, couch and whitegoods into the truck.
    image: "/images/services/household-hard-rubbish.jpg",
    imagePosition: "50% 45%",
  },
  {
    slug: "garage-shed-whole-house-clearouts",
    title: "Garage, shed and whole house clear-outs",
    shortTitle: "Garage and house clear-outs",
    detail:
      "Everything out, floor swept, ready for the next thing. Moving, selling, renting it out or just getting the garage back — we clear the lot in one go rather than a load at a time.",
    price: null,
    // An emptied brick garage, swept concrete floor, roller door open.
    image: "/images/services/garage-whole-house-clearout.jpg",
    imagePosition: "50% 55%",
  },
  {
    slug: "yard-garden-cleanups",
    title: "Yard and garden clean-ups",
    shortTitle: "Yard and garden clean-ups",
    detail:
      "Overgrown back yards, green waste, old decking, broken concrete, the shed that's half fallen over. We clear it back to usable ground and take the lot with us.",
    price: null,
    // Overgrown back yard: green waste, old decking and a half-fallen shed.
    image: "/images/services/yard-garden-cleanup.jpg",
    imagePosition: "50% 55%",
  },
  {
    slug: "heavy-awkward",
    title: "Heavy and awkward — concrete, brick, decks and sheds",
    shortTitle: "Concrete, brick and decks",
    detail:
      "The stuff a rubbish ute turns down. We're a demolition crew, so we bring the gear, take it apart properly and carry it out.",
    price: null,
    // Crew carrying broken brick, a dismantled deck and a brick pile.
    image: "/images/services/heavy-concrete-brick-deck.jpg",
    imagePosition: "55% 50%",
  },
  {
    slug: "hoarding-deceased-estates",
    title: "Hoarding cleanups and deceased estates",
    shortTitle: "Hoarding and deceased estates",
    detail:
      "Handled quietly, at your pace, with nothing thrown out without you saying so. More below.",
    price: null,
    // Calm, non-identifying cleared room — no faces, no belongings, nothing personal.
    image: "/images/services/hoarding-deceased-estate.jpg",
    imagePosition: "50% 55%",
    anchor: "hoarding",
  },
  {
    slug: "building-site-cleanups",
    title: "Building site clean-ups",
    shortTitle: "Building site clean-ups",
    detail:
      "Construction and demolition waste cleared through the build or in one hit at the end, so the next trade walks onto a clear site. More below.",
    price: null,
    // Crew bagging plasterboard and timber offcuts on a framed-out site.
    image: "/images/services/building-site-cleanup.jpg",
    imagePosition: "50% 50%",
    anchor: "sites",
  },
];

export const serviceRouter = {
  eyebrow: "What we clear",
  title: "Find the job that sounds like yours.",
  lede: "Not on the list? We probably still take it. Tell us what it is.",
};

/* ========================= 06b · WHO WE WORK WITH ========================= */

/**
 * Four audiences, one word each, drawn as line art.
 *
 * Sits directly under the service router: the visitor has just found their job,
 * and this answers the next question — whether Demo Bros works with people like
 * them — before they have to ask it.
 *
 * Custom artwork rather than a stock icon set, because these have to carry
 * PEOPLE, not just buildings — a house with someone standing in it reads as
 * "homeowner" in a way that an outline of a house never will.
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

/* ============================ 07 · THE HEAVY STUFF ============================ */

/**
 * The differentiator the whole page rests on. On the charcoal band, because this
 * is the section that separates Demo Bros from every two-blokes-and-a-ute
 * operator that turns down anything heavy.
 */
export const heavyStuff = {
  eyebrow: "The heavy stuff",
  title: "The stuff other rubbish guys won't take.",
  lead: "Most rubbish removal is two blokes and a ute. That works right up until it doesn't.",
  body: [
    "It's fine for boxes and a couch. It stops working the moment it's a concrete path, a brick barbecue, a deck that's still bolted down, or a shed that has to come apart before any of it can go anywhere.",
    "That's the part where you start getting “sorry, we don't do that.”",
    "We're a demolition company. Taking heavy things apart safely and carrying them out is the actual job, every day. So the pile that got knocked back three times is the one we quote like anything else.",
  ],
  points: [
    "Concrete, brick, tiles, render and rubble — we've got the gear and the weight allowance",
    "Decks, sheds, carports and pergolas taken apart first, then removed",
    "Whole garages and whole houses, not one load at a time",
    "Asbestos handled in-house rather than passed to another contractor",
    "Sorted and recycled where we can, disposed of properly where we can't",
  ],
  image: "/images/services/heavy-concrete-brick-deck.jpg",
};

/* ================= 08 · HOARDING AND DECEASED ESTATES ================= */

/**
 * A different voice entirely. Tone rules, held hard:
 *   Never use junk, mess, filthy, squalor or hoarder as a label for a person.
 *   No shock photography, no urgency pressure, no countdown, no shame.
 * This band carries the least volume and by far the highest job value.
 */
export const hoarding = {
  eyebrow: "Hoarding and deceased estates",
  title: "Nothing leaves until you say so.",
  body: [
    "Clearing a house that's filled up over years isn't really a rubbish job, and we don't treat it like one.",
    "Most of the time someone rings us about a parent who can't manage the house anymore, an estate that has to be emptied by a certain date, or a situation at home that got away from them quietly and has been hard to ask for help with.",
    "We do these regularly. Nobody on our crew reacts, comments or makes anyone feel judged. We work room by room at whatever pace suits, and we check before anything goes.",
  ],
  points: [
    "You set the pace. One room, one weekend, or staged over weeks — whatever you can manage",
    "Nothing is thrown out without your say-so. Photos, documents, jewellery and anything that looks like it matters get set aside for you, not binned",
    "We keep it discreet. Minimal noise, minimal mess out the front, no reason for the neighbours to take an interest",
    "Executors and family welcome. We'll work with whoever is handling it and keep everyone updated",
    "Fixed price up front, so there's no bill that quietly grows as the job goes on",
  ],
  close:
    "If you'd rather just talk it through before anything else, call and ask for a quiet chat. There's no pressure and no commitment.",
  image: "/images/services/hoarding-deceased-estate.jpg",
};

/* ==================== 09 · BUILDERS AND TRADES ==================== */

/** B2B band. Site cleared, next trade starts. */
export const builders = {
  eyebrow: "Building sites",
  title: "Site cleared, next trade starts.",
  lead: "Construction and demolition waste removed across Melbourne — through the build or in one hit at the end.",
  body: "A site full of offcuts and rubble is a site where the next trade loses half a morning, and a safety issue nobody wants on their job. We clear it properly and hand it back swept.",
  points: [
    "Concrete, brick, timber, plasterboard, tiles and packaging — mixed loads are fine, we sort them",
    "Staged through the build or one clear at the end, whichever suits your program",
    "Sorted and recycled where we can, disposed of properly where we can't",
    "Broom-swept before handover, so the next trade starts on a clear floor",
    "SWMS on every job, VBA registered, $20M public liability, inducted before we arrive",
    "We work to your program, including after hours where the site needs it",
  ],
  image: "/images/services/building-site-cleanup.jpg",
};

/* =========================== 10 · HOW IT WORKS =========================== */

/**
 * Four steps, not seven — this is a simpler purchase than a strip out and a long
 * process list reads like friction.
 *
 * `image` is a real Demo Bros job photo per step, and `alt` describes what is
 * happening in it rather than repeating the step title — a screen reader that
 * hears the title and then hears it again as the picture's description learns
 * nothing the second time.
 *
 * `short` is the phone line, `detail` the desktop one. The headings alone are
 * too abstract to carry the section — "We load it" does not tell you that you
 * are not expected to touch anything — but a phone has room for one plain line
 * saying what happens, not three.
 */
export const processSteps = [
  {
    n: "01",
    /* No longer "Send us photos". The quote form dropped its upload field —
       leaving the form to go and find photos is the most expensive thing you
       can ask of someone mid-enquiry. Tick what needs to go instead; the crew
       asks for a photo on the follow-up if the job actually needs one. */
    title: "Tell us what needs to go",
    detail:
      "Tick what's going and add anything awkward about the access. Thirty seconds, and it's enough to price from.",
    image: "/images/process/01-tell-us.jpg",
    alt: "A customer photographing an old kitchen on her phone before booking a clearance",
    short: "Tell us what's going and where",
  },
  {
    n: "02",
    title: "Fixed price back",
    detail:
      "Within 24 hours, in writing, free and no obligation. Bigger jobs get a free look on site first.",
    image: "/images/process/02-fixed-price.jpg",
    alt: "An itemised Demo Bros quote on a clipboard, held on site",
    short: "Itemised quote within 24 hours",
  },
  {
    n: "03",
    title: "We load it",
    detail:
      "You don't lift, sort or carry anything. We protect floors and doorways on the way through.",
    image: "/images/process/03-we-load-it.jpg",
    alt: "A Demo Bros crew member in hi-vis carrying material out to the bin on a Melbourne driveway",
    short: "We lift, carry and load the lot",
  },
  {
    n: "04",
    title: "Swept and gone",
    detail: "Space left clear and swept. Sorted and recycled where we can.",
    image: "/images/process/04-swept-and-gone.jpg",
    alt: "An emptied room with a clean swept concrete floor at the end of a clearance",
    short: "Left clear, swept and recycled",
  },
];

export const processHeading = {
  eyebrow: "How it works",
  title: "Four steps. You know the price before we turn up.",
};

/* ============================ 11 · GUARANTEE ============================ */

/** `id` keys the icon chosen for each card in the guarantees grid. */
export const guarantees = [
  {
    id: "fixed-price",
    title: "If we read the load wrong, that's ours to wear",
    detail:
      "We quoted it off what you told us. Getting it right was our job, not yours. If the scope genuinely changes we'll stop and tell you before we do anything, not after.",
  },
  {
    id: "no-lifting",
    title: "You don't lift anything",
    detail:
      "Nothing needs to be moved to the kerb, bagged or sorted before we arrive. We come to where it is.",
  },
  {
    id: "swept",
    title: "Swept before we leave",
    detail: "The space is left clear and swept, not just emptied.",
  },
  {
    id: "recycled",
    title: "Recycled where we can",
    detail:
      "Metal, timber, concrete, whitegoods and green waste get sorted and diverted rather than everything going to landfill.",
  },
];

export const guaranteeHeading = {
  eyebrow: "Fixed price guarantee",
  title: "The number doesn't move.",
  description:
    "No “that's more than you said” on the day. No day-rate creep. No surprise weight charge at the end.",
};

/* ============================= 12 · REVIEWS ============================= */

/**
 * Reviews DO NOT loop. Six to eight unique, no duplicates.
 *
 * USE VERIFIED GOOGLE REVIEWS ONLY. TODO before publish: the deck asks for 4–6
 * further clearance/cleanup-specific reviews — prioritise any that mention heavy
 * or awkward material, a full clear-out, or a price that held. Only these two are
 * verified from the Google Business Profile. Never publish a hoarding or
 * deceased-estate review without explicit written permission, first name only.
 */
/**
 * VERIFIED Google reviews only — every one of these is a real review of Demo
 * Bros, carried across from the other Demo Bros campaign sites.
 *
 * Do NOT write new ones to fill the wall. The reviews marquee below repeats a
 * short list rather than inventing entries, and the aggregate rating in the page
 * schema (4.9 from 54) has to stay answerable against the real Google profile.
 * Paste the remaining reviews in here and the belt stops repeating on its own —
 * no code change needed.
 */
export const testimonials = [
  {
    name: "Toko T",
    role: "Half house demolition, Brighton",
    quote:
      "We recently had a half house demolition completed in Brighton — the team at Demo Bros did an absolutely fantastic job. The workmanship was outstanding and we're ecstatic with the results. Everything was handled professionally and safely.",
    rating: 5,
  },
  {
    name: "Tom Peyton",
    role: "Residential demolition",
    quote:
      "Demo Bros were great to deal with for our recent demolition. They were very responsive and easy to communicate with. Our permit and demolition were organised promptly and they did a great job. Highly recommended!",
    rating: 5,
  },
  {
    name: "Cale Dudderidge",
    role: "Commercial project, city",
    quote:
      "Demo Bros did a great job on our commercial project in the city. With a tight program and access challenges, Henry and the team smashed it within the time frame, leaving the job tidy and ready for the next trade.",
    rating: 5,
  },
  {
    name: "John Biffaro",
    role: "Demolition",
    quote:
      "Nothing but praise for the boys at Demo Bros. Henry was responsive, prompt and true to his word from the start. Isabel was great on the admin side, and Don did the job in the required time — quick and clean. Could not be happier.",
    rating: 5,
  },
  {
    name: "Drew Tuulakitau",
    role: "Backyard clean-up & levelling",
    quote:
      "Demo Bros did an amazing job with our backyard clean-up and soil levelling. Super professional, on time and easy to deal with. The price was very reasonable and the site was left spotless and perfectly levelled for the next stage. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sharleen Kiely",
    role: "Brick wall & fence demolition",
    quote:
      "I hired Demo Bros to demolish a brick wall and fence attached to my house and I couldn't be happier with the result. The team was extremely professional, efficient and helpful from start to finish.",
    rating: 5,
  },
  {
    name: "Michael Tsalkos",
    role: "Garage demolition",
    quote:
      "Demo Bros did a great job demolishing the rear garage in a safe and timely manner, delivering on time. Would highly recommend the team for any job, large or small.",
    rating: 5,
  },
  {
    name: "Carmen Teoh Jia Wen",
    role: "Site clean-up, Kew",
    quote:
      "The boys did a great job on our project at Kew. They tidied up our site and even helped remove an extra tree trunk at the back. Really happy with them.",
    rating: 5,
  },
  {
    name: "Kristin W",
    role: "Project, Melbourne",
    quote:
      "I recently used Demo Bros for a project in Melbourne. The full team — from ops to planning to delivery — were great, and I'd recommend them moving forward.",
    rating: 5,
  },
  {
    name: "Eli Dzagba",
    role: "Melbourne",
    quote:
      "Our car broke down at the highway entrance and one of the Demo Bros crew pulled up out of nowhere, big smile, and didn't even hesitate. Helped us push it off the road and towed us all the way home. Top blokes.",
    rating: 5,
  },
];

export const reviewsHeading = {
  title: "4.9 stars from 54 Melbourne jobs.",
};

/* =========================== 13 · SERVICE AREA =========================== */

/**
 * No suburb list — a list of individual suburbs quietly tells everyone in the
 * others that they are not covered.
 */
export const serviceArea = {
  eyebrow: "Where we work",
  title: "Melbourne wide — and the rest of Victoria too.",
  lede: "Every suburb, inner and outer, north and south of the river — that's most of what we do. For bigger clear-outs, whole houses and estates we cover the wider state as well.",
  body: "Tell us where the job is and we'll tell you when we can be there — usually in the same reply as the price.",
};

/* =============================== 14 · FAQ =============================== */

/**
 * The first item opens by default, and every answer is in the HTML on load
 * rather than injected on click — the answers are the SEO surface.
 */
export const faqs = [
  {
    q: "What does rubbish removal cost?",
    a: `It starts at ${PRICING.min} for a minimum load and goes up with how much there is and how heavy it is. Concrete, brick, soil and tiles are charged by weight because that's how the tip charges us. Send the details through the form and you'll have a fixed price back within 24 hours — and that price is what you pay.`,
  },
  {
    q: "Do I need to move anything to the kerb first?",
    a: "No. We come to wherever it is — the back yard, the garage, upstairs, behind the shed. You don't need to lift, bag or sort anything.",
  },
  {
    q: "Do you take concrete, bricks and soil?",
    a: "Yes. Heavy material is normal work for us — we're a demolition crew, so we've got the gear and the weight allowance for it. It's priced by weight rather than by volume.",
  },
  {
    q: "Can you take apart a deck, shed or carport as well?",
    a: "Yes. We dismantle it properly first, then remove the lot. That's demolition work rather than rubbish removal, which is why most rubbish removalists say no to it and we don't.",
  },
  {
    q: "Do I need to be home?",
    a: "Not always. If everything's accessible and you're happy for us to go ahead off the quote, we can clear it and send you photos when it's done.",
  },
  {
    q: "Is there anything you can't take?",
    a: "A few things need specialist disposal and can't go in a general load — paint and chemicals, gas bottles and car batteries. Tell us if any of that's in there and we'll point you to where it goes. Asbestos we do handle ourselves.",
  },
  {
    q: "Do you recycle?",
    a: "Where we can, yes. Metal, timber, concrete, whitegoods and green waste get sorted and diverted rather than everything going straight to landfill.",
  },
  {
    q: "Can you clear a whole house or a deceased estate?",
    a: "Yes, and we do a lot of them. Room by room, at whatever pace suits, with anything that looks like it matters set aside for you rather than thrown out. Executors and family are welcome on site or kept updated, whichever you'd prefer.",
  },
  {
    q: "Do you do hoarding cleanups discreetly?",
    a: "Yes. We keep noise and mess out the front to a minimum, nobody on the crew reacts or comments, and nothing leaves the property without you saying so. You set the pace and we work to it.",
  },
  {
    q: "Are you insured?",
    a: "$20M public liability, VBA registered, family owned since 2013. Certificates on request before we start.",
  },
];

export const faqHeading = {
  eyebrow: "Questions we get every week",
  title: "The questions we get asked most, starting with the big one.",
};

/* ============================ 15 · FINAL CTA ============================ */

export const finalCta = {
  title: "Get your fixed price.",
  lede: "Tell us what needs to go and we'll send back a fixed price within 24 hours. Free, no obligation, and it doesn't move after that.",
  body: `From ${PRICING.min}. We do the lifting.`,
  fine: "4.9 ★ Google · Family owned since 2013 · $20M public liability · VBA registered",
};

/* ============================== 16 · FOOTER ============================== */

export const footer = {
  coverage:
    "Rubbish removal, hard rubbish, yard clean-ups, site clean-ups, deceased estates and hoarding cleanups across Melbourne — every suburb, inner and outer.",
  /** Strip-out traffic leaves this page through the footer. */
  commercial:
    "Stripping out a kitchen, bathroom or whole interior? That's our main line of work — get in touch for a free quote.",
  legal:
    "Melbourne demolition & rubbish removal · Licensed and VBA registered · $20M public liability",
};

/* ============================ QUOTE MODAL ============================ */

/**
 * The modal's selling points. Split into `lead` and `rest` so the part that
 * actually closes the sale carries the weight and the qualifier sits back.
 */
export const modalBenefits = [
  { lead: "Fixed price before we load", rest: "no bill that grows on the day" },
  {
    lead: "Concrete, brick, decks and sheds included",
    rest: "not knocked back like a rubbish ute",
  },
  { lead: "You don't lift, sort or carry anything", rest: "we come to where it is" },
  { lead: "Sorted and recycled where we can", rest: "swept before we leave" },
];
