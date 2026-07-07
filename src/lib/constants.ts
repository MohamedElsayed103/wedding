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

/**
 * The film's chapters, expressed as scroll-progress ranges [0..1].
 * The Atmosphere reads `progress` to drive time-of-day + camera.
 */
export const CHAPTERS = {
  envelope: { start: 0.0, end: 0.08 },
  calligraphy: { start: 0.08, end: 0.16 },
  meeting: { start: 0.16, end: 0.34 },
  journey: { start: 0.34, end: 0.56 },
  transformation: { start: 0.56, end: 0.68 },
  invitation: { start: 0.68, end: 0.78 },
  countdown: { start: 0.78, end: 0.85 },
  rsvp: { start: 0.85, end: 0.92 },
  venue: { start: 0.92, end: 0.97 },
  finale: { start: 0.97, end: 1.0 },
} as const;

export const CALENDAR_EVENT = {
  title: "Wedding of Mohamed & Mariam",
  description:
    "Join us as we celebrate the wedding of Mohamed & Mariam. With love, in a garden of white roses and jasmine.",
  location: "The Garden Pavilion",
  // Local time; converted to UTC where required by each provider.
  start: new Date("2026-08-26T17:00:00"),
  end: new Date("2026-08-26T23:00:00"),
} as const;
