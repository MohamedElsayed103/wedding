import { GROOM_DEFAULT_LOOK, BRIDE_DEFAULT_LOOK } from "@/components/characters/avatar/types";
import type { ChapterEntry, Site, Template } from "./types";

/**
 * The flagship "Mohamed & Mariam" site — used both to seed an empty database
 * and as the public-site fallback so `/` never renders blank even before the
 * DB is seeded.
 */

export const DEFAULT_TEMPLATE: Template = {
  id: "classic-garden",
  name: "Classic Garden",
  description:
    "An ivory & gold enchanted-garden film — envelope, calligraphy, journey, invitation, countdown, venue, finale.",
  accentColor: "#c9a24b",
  designId: "enchanted-garden",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

/** Second built-in theme, on the Midnight Royal design. */
export const MIDNIGHT_TEMPLATE: Template = {
  id: "midnight-royal",
  name: "Midnight Royal",
  description:
    "A starlit navy-and-gold night — a glowing monogram, the couple under moonlight, the story in the stars.",
  accentColor: "#d9b45a",
  designId: "midnight-royal",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

export const DEFAULT_TEMPLATES: Template[] = [DEFAULT_TEMPLATE, MIDNIGHT_TEMPLATE];

const CHAPTERS: ChapterEntry[] = [
  {
    id: "ch1",
    label_en: "Chapter One",
    label_ar: "الفصل الأول",
    text_en: "Different paths, one beautiful story.",
    text_ar: "كان لكل منا طريقه.. حتى جمعنا الله لنكتب حكاية واحدة جميلة.",
  },
  {
    id: "ch2",
    label_en: "Chapter Two",
    label_ar: "الفصل الثاني",
    text_en: "Some stories don't need time — when you know, you know.",
    text_ar: "بعض الحكايات تبدأ بيقين... لا بمرور الوقت.",
  },
  {
    id: "ch3",
    label_en: "Chapter Three",
    label_ar: "الفصل الثالث",
    text_en: "Our story grew with every smile, prayer, and endless conversation",
    text_ar: "كبرت حكايتنا مع كل ضحكة، وكل دعوة، وكل حديث لا ينتهي.",
  },
  {
    id: "ch4",
    label_en: "Chapter Four",
    label_ar: "الفصل الرابع",
    text_en: "From yesterday's prayers to today's joy, our best chapter begins.",
    text_ar: "بين دعاء الأمس.. وفرحة اليوم، تبدأ أجمل فصول حكايتنا.",
  },
];

const GROOM_LOOK = GROOM_DEFAULT_LOOK;
const BRIDE_LOOK = BRIDE_DEFAULT_LOOK;

export const DEFAULT_SITE: Site = {
  id: "mohamed-mariam",
  slug: "mohamed-mariam",
  status: "live",
  planTier: "bespoke",
  templateId: DEFAULT_TEMPLATE.id,
  groomName_en: "Mohamed",
  groomName_ar: "محمد",
  brideName_en: "Mariam",
  brideName_ar: "مريم",
  weddingDate: "2026-08-27T20:30:00",
  dateLabel_en: "27 August 2026",
  dateLabel_ar: "27 أغسطس 2026",
  dateDots: "27 • 08 • 2026",
  venueName_en: "Al-Farouq Mosque",
  venueName_ar: "مسجد الفاروق",
  venueCity_en: "Sheraton, Cairo",
  venueCity_ar: "شيراتون، القاهرة",
  venueMapsUrl: "https://maps.app.goo.gl/PD77uVEepFmj6sNx5",
  defaultLanguage: "en",
  chapters: CHAPTERS,
  groomLook: GROOM_LOOK,
  brideLook: BRIDE_LOOK,
  notes: "The flagship / portfolio site — the one this whole product was built for.",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};
