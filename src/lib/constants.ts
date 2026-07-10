/**
 * Language-independent facts: the date, the venue links, the verse.
 * All visitor-facing copy (both languages) lives in `i18n.ts`.
 */

/** Wedding date — 27 August 2026, local evening ceremony. */
export const WEDDING_DATE = new Date("2026-08-27T17:00:00");
export const WEDDING_DATE_DOTS = "27 • 08 • 2026";

export const VENUE = {
  mapsUrl: "https://maps.app.goo.gl/PD77uVEepFmj6sNx5",
  // Generic embeddable map centred on the shared pin's region.
  embedSrc:
    "https://maps.google.com/maps?q=Al-Farouq%20Mosque%20Sheraton%20Cairo&t=&z=14&ie=UTF8&iwloc=&output=embed",
  directionsUrl: "https://maps.app.goo.gl/PD77uVEepFmj6sNx5",
} as const;

export const ARABIC_VERSE = "وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً";
