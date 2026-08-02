/**
 * Data model for the admin tool — see BUSINESS_PLAN.md §5.2 "Content model".
 *
 * This is intentionally the same shape that a future multi-tenant database
 * would use (per the plan's Postgres/Supabase recommendation). Keeping the
 * shape identical now means migrating storage later (see store.ts) doesn't
 * touch the admin UI or the character components at all.
 */

import type { AvatarLook } from "@/components/characters/avatar/types";

export type PlanTier = "signature" | "bespoke" | "studio";
export type SiteStatus = "draft" | "paid" | "live" | "archived";

/** A couple's stored character looks are the full customizable Avatar set. */
export type CharacterLook = AvatarLook;

/** One chapter of the couple's story (bilingual). */
export interface ChapterEntry {
  id: string;
  label_en: string; // "Chapter Two"
  label_ar: string; // "الفصل الثاني"
  text_en: string;
  text_ar: string;
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
  chapters: ChapterEntry[];

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
  designId: string; // which coded design (layout/animation) this theme renders — see components/designs/registry
  createdAt: string;
  updatedAt: string;
}

export interface AdminData {
  sites: Site[];
  templates: Template[];
}
