/**
 * Data model for the admin tool — see BUSINESS_PLAN.md §5.2 "Content model".
 *
 * This is intentionally the same shape that a future multi-tenant database
 * would use (per the plan's Postgres/Supabase recommendation). Keeping the
 * shape identical now means migrating storage later (see store.ts) doesn't
 * touch the admin UI or the character components at all.
 */

export type PlanTier = "signature" | "bespoke" | "studio";
export type SiteStatus = "draft" | "paid" | "live" | "archived";

export interface CharacterLook {
  skinTone: "fair" | "medium" | "tan";
  outfitPalette: string; // validated against the groom/bride palette enums in the UI
  beardStyle?: "short" | "none"; // groom only
}

export interface MemoryEntry {
  id: string;
  icon: string;
  title_en: string;
  title_ar: string;
  caption_en: string;
  caption_ar: string;
}

export interface Site {
  id: string;
  slug: string;
  status: SiteStatus;
  planTier: PlanTier;
  templateId: string;

  groomName_en: string;
  groomName_ar: string;
  brideName_en: string;
  brideName_ar: string;

  weddingDate: string; // ISO date
  dateLabel_en: string;
  dateLabel_ar: string;
  dateDots: string; // "27 • 08 • 2026"

  venueName_en: string;
  venueName_ar: string;
  venueCity_en: string;
  venueCity_ar: string;
  venueMapsUrl: string;

  defaultLanguage: "en" | "ar";
  memories: MemoryEntry[];

  groomLook: CharacterLook;
  brideLook: CharacterLook;

  domain?: string; // custom domain once assigned
  notes?: string; // internal ops notes, never guest-facing

  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  accentColor: string; // hex, drives --color-gold override
  createdAt: string;
  updatedAt: string;
}

export interface AdminData {
  sites: Site[];
  templates: Template[];
}
