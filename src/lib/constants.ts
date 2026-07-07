/**
 * Central source of truth for the couple, date, venue and story beats.
 * Editing this file re-scores the entire film.
 */

export const COUPLE = {
  groom: "Mohamed",
  bride: "Mariam",
  monogram: "M ♡ M",
} as const;

/** Wedding date — 26 August 2026, local evening ceremony. */
export const WEDDING_DATE = new Date("2026-08-26T17:00:00");
export const WEDDING_DATE_LABEL = "26 August 2026";
export const WEDDING_DATE_DOTS = "26 • 08 • 2026";

export const VENUE = {
  name: "The Garden Pavilion",
  city: "By the olive grove",
  mapsUrl: "https://maps.app.goo.gl/4sxizKuApMXYTdu48",
  // Generic embeddable map centred on the shared pin's region.
  embedSrc:
    "https://maps.google.com/maps?q=wedding%20venue&t=&z=13&ie=UTF8&iwloc=&output=embed",
  directionsUrl: "https://maps.app.goo.gl/4sxizKuApMXYTdu48",
} as const;

export const ARABIC_VERSE = "وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً";
export const ARABIC_VERSE_TRANSLATION =
  "“And He placed between you affection and mercy.”";

/** Memories revealed along the path — the journey *is* the timeline. */
export interface Memory {
  id: string;
  icon: string; // emoji glyph used as an elegant marker
  title: string;
  caption: string;
}

export const MEMORIES: Memory[] = [
  {
    id: "met",
    icon: "✦",
    title: "The First Hello",
    caption: "Two strangers, one glance — and the garden held its breath.",
  },
  {
    id: "laughter",
    icon: "❀",
    title: "A Thousand Small Laughs",
    caption: "Ordinary days turned golden simply because we shared them.",
  },
  {
    id: "promise",
    icon: "☾",
    title: "The Quiet Promise",
    caption: "Beneath the olive branches, forever began to feel possible.",
  },
];

