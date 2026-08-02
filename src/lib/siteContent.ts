import { DICT, type Chapter, type Lang, type Strings } from "./i18n";
import type { Site } from "./admin/types";
import {
  BRIDE_DEFAULT_LOOK,
  GROOM_DEFAULT_LOOK,
  type AvatarLook,
} from "@/components/characters/avatar/types";

/**
 * Turns a stored `Site` (DB row) into the two runtime shapes the film needs:
 *  - `buildDict(site)` → the bilingual string dictionary (template UI copy from
 *    i18n.ts, with the couple-specific fields overridden from the site).
 *  - `resolveSite(site)` → non-string runtime config (character looks, date,
 *    map, accent) consumed via the SiteProvider.
 *
 * Kept framework-neutral (no server-only import) so it can run in the server
 * component that fetches the site and pass plain objects to the client.
 */

export interface ResolvedSite {
  slug: string;
  groom: AvatarLook;
  bride: AvatarLook;
  weddingDate: string; // ISO
  dateDots: string;
  mapsUrl: string;
  accentColor: string;
  defaultLanguage: Lang;
}

function chaptersFor(site: Site, lang: Lang): Chapter[] {
  return (site.chapters ?? []).map((c) => ({
    id: c.id,
    label: lang === "ar" ? c.label_ar : c.label_en,
    text: lang === "ar" ? c.text_ar : c.text_en,
  }));
}

function stringsFor(site: Site, lang: Lang): Strings {
  const base = DICT[lang];
  const groom = lang === "ar" ? site.groomName_ar : site.groomName_en;
  const bride = lang === "ar" ? site.brideName_ar : site.brideName_en;
  return {
    ...base,
    groom,
    bride,
    coupleNames: `${groom} ${base.and} ${bride}`,
    dateLabel: lang === "ar" ? site.dateLabel_ar : site.dateLabel_en,
    venueName: lang === "ar" ? site.venueName_ar : site.venueName_en,
    venueCity: lang === "ar" ? site.venueCity_ar : site.venueCity_en,
    chapters: chaptersFor(site, lang).length ? chaptersFor(site, lang) : base.chapters,
  };
}

export function buildDict(site: Site): Record<Lang, Strings> {
  return { en: stringsFor(site, "en"), ar: stringsFor(site, "ar") };
}

export function resolveSite(site: Site, accentColor: string): ResolvedSite {
  // Merge stored looks over defaults so legacy/partial records still render.
  return {
    slug: site.slug,
    groom: { ...GROOM_DEFAULT_LOOK, ...(site.groomLook ?? {}) },
    bride: { ...BRIDE_DEFAULT_LOOK, ...(site.brideLook ?? {}) },
    weddingDate: site.weddingDate,
    dateDots: site.dateDots,
    mapsUrl: site.venueMapsUrl,
    accentColor,
    defaultLanguage: site.defaultLanguage,
  };
}
