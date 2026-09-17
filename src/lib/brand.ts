/**
 * Brand + marketing config. Single source of truth for the studio identity,
 * so renaming (Zifaf → whatever you buy the domain for) is one edit.
 */

export const BRAND = {
  name: "Zifaf",
  wordmark: "Zifaf",
  // "the invitation is a memory"
  tagline: "The invitation is a memory.",
  subtitle:
    "We turn your love story into a cinematic, illustrated invitation film — starring the two of you — that guests watch instead of skim. Bilingual, on any device, unforgettable.",
  email: "mohamed.elsayed.11011@gmail.com",
  instagram: "https://instagram.com/",
  // global, not region-specific
  currency: "USD",
} as const;

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

// PLACEHOLDER copy — replace features/taglines when you send the final wording.
export const PRICING: PricingTier[] = [
  {
    id: "standard",
    name: "Standard",
    price: "500 EGP",
    cadence: "one-time",
    tagline: "A beautiful animated invitation.",
    features: [
      "Our core design",
      "Your names, date & venue",
      "Bilingual film (English + Arabic)",
      "Countdown, live map & shareable link",
      "Ready in ~2 days",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "1000 EGP",
    cadence: "one-time",
    tagline: "More designs, more you.",
    featured: true,
    features: [
      "Everything in Standard",
      "More designs to choose from",
      "Custom character looks of you & your partner",
      "Your own love-story chapters",
      "Priority delivery + your own domain",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    price: "1500 EGP",
    cadence: "one-time",
    tagline: "A fully bespoke film.",
    features: [
      "Everything in Premium",
      "Custom scenes & animation for your story",
      "Unlimited revisions",
      "Full custom-domain setup",
      "White-glove service",
    ],
  },
];

export const DIFFERENTIATORS = [
  {
    icon: "🎬",
    title: "A film, not a card",
    text: "One continuous scroll-driven story — an animated short that happens to be a website.",
  },
  {
    icon: "👰🏽",
    title: "The couple, illustrated",
    text: "Characters styled to look like you two — customizable down to skin tone, hair, hijab, beard and outfits.",
  },
  {
    icon: "🌍",
    title: "Bilingual by design",
    text: "Native English + Arabic with right-to-left layout — every guest reads it in their language.",
  },
  {
    icon: "📱",
    title: "Flawless on any phone",
    text: "Performance-obsessed: smooth 60fps scrolling, tuned for the device in every guest's hand.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us your story",
    text: "Names, date, venue, and a few memories — plus how you'd like your characters to look.",
  },
  {
    step: "02",
    title: "We craft your film",
    text: "We build your bilingual invitation film and send you a private preview to react to.",
  },
  {
    step: "03",
    title: "Share the link",
    text: "Send it by WhatsApp, or print the QR on your cards. Guests watch, then RSVP.",
  },
];

export const FAQ = [
  {
    q: "How is this different from Zola or a Canva invite?",
    a: "Those are static templates. Zifaf is an animated love story starring illustrated versions of you — closer to a Pixar short than a web page. Guests actually watch it to the end.",
  },
  {
    q: "Do you support Arabic?",
    a: "Yes — natively, with full right-to-left layout and Arabic typography, not machine translation. Guests can switch language on arrival.",
  },
  {
    q: "Can the characters look like us?",
    a: "Yes. On Signature you pick from a rich set of looks; on Bespoke we illustrate the characters based on your engagement photos.",
  },
  {
    q: "What do guests need to do?",
    a: "Just tap your link — no app, no login. It works on any modern phone. They can RSVP and add the date to their calendar.",
  },
  {
    q: "How long does it take?",
    a: "Signature is ready in 3–4 days. Bespoke takes 1–2 weeks depending on revisions. Rush delivery is available.",
  },
];
