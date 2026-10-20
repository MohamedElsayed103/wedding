import type { CSSProperties } from "react";

/**
 * The cinema engine is ONE premium, photo-driven film re-skinned into many
 * "templates". A theme is just a palette (it overrides the global design tokens
 * so the shared Preloader / language gate re-colour themselves automatically),
 * a font pairing, and the gradient laid over hero photography.
 */
export interface CinemaTheme {
  id: string;
  name: string;
  description: string;
  mode: "dark" | "light";
  accentColor: string; // mirrors the template accent (for cards/meta)
  /** Overrides of the global --color-* tokens, applied on the root wrapper. */
  vars: CSSProperties;
  display: string; // display font class
  script: string; // script font class
  heroOverlay: string; // gradient drawn over the hero image/video
  sectionOverlay: string; // soft vignette for photo sections
}

const tokens = (o: {
  ivory: string; cream: string; beige: string;
  ink: string; inkSoft: string;
  gold: string; goldDeep: string; goldLight: string;
}): CSSProperties =>
  ({
    "--color-ivory": o.ivory,
    "--color-cream": o.cream,
    "--color-beige": o.beige,
    "--color-ink": o.ink,
    "--color-ink-soft": o.inkSoft,
    "--color-gold": o.gold,
    "--color-gold-deep": o.goldDeep,
    "--color-gold-light": o.goldLight,
  }) as CSSProperties;

export const CINEMA_THEMES: CinemaTheme[] = [
  {
    id: "cinema-moonlight",
    name: "Moonlight",
    description:
      "A dark, cinematic night in navy & gold — full-bleed photography, a glowing hero, the story under moonlight.",
    mode: "dark",
    accentColor: "#d9b45a",
    vars: tokens({
      ivory: "#0e1726", cream: "#131f33", beige: "#1b2942",
      ink: "#f3ead6", inkSoft: "#aeb9cb",
      gold: "#d9b45a", goldDeep: "#c69a3f", goldLight: "#ecd292",
    }),
    display: "font-display",
    script: "font-script",
    heroOverlay:
      "linear-gradient(to top, rgba(8,12,22,0.92) 0%, rgba(8,12,22,0.25) 55%, rgba(8,12,22,0.6) 100%)",
    sectionOverlay: "linear-gradient(180deg, rgba(8,12,22,0) 0%, rgba(8,12,22,0.35) 100%)",
  },
  {
    id: "cinema-ivory",
    name: "Ivory Editorial",
    description:
      "Light, airy and magazine-elegant — cream & charcoal, serif headlines, generous whitespace around the photos.",
    mode: "light",
    accentColor: "#b08d57",
    vars: tokens({
      ivory: "#f7f2e9", cream: "#efe7d7", beige: "#e5dac5",
      ink: "#2c2a26", inkSoft: "#6b6355",
      gold: "#b08d57", goldDeep: "#8f7045", goldLight: "#d9c39c",
    }),
    display: "font-display",
    script: "font-script",
    heroOverlay:
      "linear-gradient(to top, rgba(28,24,18,0.66) 0%, rgba(28,24,18,0.05) 50%, rgba(28,24,18,0.25) 100%)",
    sectionOverlay: "linear-gradient(180deg, rgba(247,242,233,0) 0%, rgba(229,218,197,0.5) 100%)",
  },
  {
    id: "cinema-rose",
    name: "Rose Garden",
    description:
      "Soft blush & rose with warm gold — romantic and tender, Cormorant serif, delicate floral calm.",
    mode: "light",
    accentColor: "#b56b72",
    vars: tokens({
      ivory: "#fcf4f1", cream: "#f6e7e2", beige: "#eed6cf",
      ink: "#3a2b2b", inkSoft: "#7a6160",
      gold: "#b56b72", goldDeep: "#9a545c", goldLight: "#e3b7b5",
    }),
    display: "font-serif",
    script: "font-script",
    heroOverlay:
      "linear-gradient(to top, rgba(45,25,27,0.7) 0%, rgba(45,25,27,0.05) 52%, rgba(45,25,27,0.28) 100%)",
    sectionOverlay: "linear-gradient(180deg, rgba(252,244,241,0) 0%, rgba(238,214,207,0.55) 100%)",
  },
  {
    id: "cinema-noir",
    name: "Minimal Noir",
    description:
      "Stark, modern and confident — near-black with muted gold, Cinzel capitals, pure photography, nothing extra.",
    mode: "dark",
    accentColor: "#cbb68a",
    vars: tokens({
      ivory: "#0a0a0b", cream: "#141416", beige: "#1d1d20",
      ink: "#f4f4f2", inkSoft: "#a6a6a3",
      gold: "#cbb68a", goldDeep: "#b2a074", goldLight: "#e3d8bd",
    }),
    display: "font-roman",
    script: "font-display",
    heroOverlay:
      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.55) 100%)",
    sectionOverlay: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
  },
  {
    id: "cinema-emerald",
    name: "Royal Emerald",
    description:
      "Deep emerald & gold — regal and lush, a jewel-box night, gold filigree over rich green.",
    mode: "dark",
    accentColor: "#d9b45a",
    vars: tokens({
      ivory: "#0c1f1a", cream: "#10271f", beige: "#17352a",
      ink: "#f1ead3", inkSoft: "#b4c3b4",
      gold: "#d9b45a", goldDeep: "#bf9a42", goldLight: "#ecd292",
    }),
    display: "font-display",
    script: "font-script",
    heroOverlay:
      "linear-gradient(to top, rgba(6,18,14,0.92) 0%, rgba(6,18,14,0.25) 55%, rgba(6,18,14,0.6) 100%)",
    sectionOverlay: "linear-gradient(180deg, rgba(6,18,14,0) 0%, rgba(6,18,14,0.4) 100%)",
  },
];

export const CINEMA_THEME_MAP: Record<string, CinemaTheme> = Object.fromEntries(
  CINEMA_THEMES.map((t) => [t.id, t])
);
