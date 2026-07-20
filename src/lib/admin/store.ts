/**
 * Storage for the admin tool. Node-runtime only (uses `fs`) — never import
 * this from a client component or from Edge middleware.
 *
 * TODAY: a single JSON file under `.data/` (gitignored). This is fine for
 * local development and for a single always-on Node server, but Vercel's
 * serverless functions have an ephemeral, per-invocation filesystem — writes
 * here will NOT reliably persist or be shared across requests once deployed
 * to Vercel. That's fine for building/demoing the admin UI now; before
 * relying on this in production, swap this module for a real database
 * (Postgres via Neon/Supabase, per BUSINESS_PLAN.md §5.1/§5.2) — every
 * function below is written as a small, swappable interface so that's a
 * one-file change, not an admin-UI rewrite.
 */
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { AdminData, CharacterLook, MemoryEntry, Site, Template } from "./types";

const DATA_DIR = join(process.cwd(), ".data");
const DATA_FILE = join(DATA_DIR, "admin-store.json");

function seed(): AdminData {
  const now = new Date().toISOString();
  const template: Template = {
    id: "classic-garden",
    name: "Classic Garden",
    description: "The original ivory & gold enchanted-garden film — envelope, calligraphy, journey, invitation, countdown, venue, finale.",
    accentColor: "#c9a24b",
    createdAt: now,
    updatedAt: now,
  };

  const memories: MemoryEntry[] = [
    {
      id: "met",
      icon: "✦",
      title_en: "The First Hello",
      title_ar: "اللقاء الأول",
      caption_en: "Two strangers, one glance — and the garden held its breath.",
      caption_ar: "غريبان ونظرة واحدة — فحبست الحديقة أنفاسها.",
    },
    {
      id: "laughter",
      icon: "❀",
      title_en: "A Thousand Small Laughs",
      title_ar: "ألف ضحكة صغيرة",
      caption_en: "Ordinary days turned golden simply because we shared them.",
      caption_ar: "أيامٌ عادية صارت ذهبية لأننا عشناها معًا.",
    },
    {
      id: "promise",
      icon: "☾",
      title_en: "The Quiet Promise",
      title_ar: "الوعد الهادئ",
      caption_en: "Beneath the olive branches, forever began to feel possible.",
      caption_ar: "تحت أغصان الزيتون، بدأ الأبد يبدو ممكنًا.",
    },
  ];

  const groomLook: CharacterLook = { skinTone: "fair", outfitPalette: "espresso", beardStyle: "short" };
  const brideLook: CharacterLook = { skinTone: "fair", outfitPalette: "champagne" };

  const site: Site = {
    id: "mohamed-mariam",
    slug: "mohamed-mariam",
    status: "live",
    planTier: "bespoke",
    templateId: template.id,
    groomName_en: "Mohamed",
    groomName_ar: "محمد",
    brideName_en: "Mariam",
    brideName_ar: "مريم",
    weddingDate: "2026-08-27T17:00:00",
    dateLabel_en: "27 August 2026",
    dateLabel_ar: "27 أغسطس 2026",
    dateDots: "27 • 08 • 2026",
    venueName_en: "Al-Farouq Mosque",
    venueName_ar: "مسجد الفاروق",
    venueCity_en: "Sheraton, Cairo",
    venueCity_ar: "شيراتون، القاهرة",
    venueMapsUrl: "https://maps.app.goo.gl/PD77uVEepFmj6sNx5",
    defaultLanguage: "en",
    memories,
    groomLook,
    brideLook,
    notes: "This is the flagship/portfolio site — the one this whole product was built for.",
    createdAt: now,
    updatedAt: now,
  };

  return { sites: [site], templates: [template] };
}

function ensureFile(): void {
  if (!existsSync(DATA_FILE)) {
    mkdirSync(dirname(DATA_FILE), { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(seed(), null, 2), "utf8");
  }
}

function read(): AdminData {
  ensureFile();
  const raw = readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw) as AdminData;
}

function write(data: AdminData): void {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// ---- Sites ----

export function listSites(): Site[] {
  return read().sites;
}

export function getSite(id: string): Site | undefined {
  return read().sites.find((s) => s.id === id);
}

export function getSiteBySlug(slug: string): Site | undefined {
  return read().sites.find((s) => s.slug === slug);
}

export function getPrimarySite(): Site | undefined {
  const data = read();
  return data.sites.find((s) => s.status === "live") ?? data.sites[0];
}

export type NewSiteInput = Omit<Site, "id" | "createdAt" | "updatedAt">;

export function createSite(input: NewSiteInput): Site {
  const data = read();
  const now = new Date().toISOString();
  const site: Site = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  data.sites.push(site);
  write(data);
  return site;
}

export function updateSite(id: string, patch: Partial<NewSiteInput>): Site | undefined {
  const data = read();
  const idx = data.sites.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  const updated: Site = { ...data.sites[idx], ...patch, id, updatedAt: new Date().toISOString() };
  data.sites[idx] = updated;
  write(data);
  return updated;
}

export function deleteSite(id: string): boolean {
  const data = read();
  const before = data.sites.length;
  data.sites = data.sites.filter((s) => s.id !== id);
  write(data);
  return data.sites.length < before;
}

// ---- Templates ----

export function listTemplates(): Template[] {
  return read().templates;
}

export function getTemplate(id: string): Template | undefined {
  return read().templates.find((t) => t.id === id);
}

export type NewTemplateInput = Omit<Template, "id" | "createdAt" | "updatedAt">;

export function createTemplate(input: NewTemplateInput): Template {
  const data = read();
  const now = new Date().toISOString();
  const template: Template = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  data.templates.push(template);
  write(data);
  return template;
}

export function updateTemplate(id: string, patch: Partial<NewTemplateInput>): Template | undefined {
  const data = read();
  const idx = data.templates.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  const updated: Template = { ...data.templates[idx], ...patch, id, updatedAt: new Date().toISOString() };
  data.templates[idx] = updated;
  write(data);
  return updated;
}

export function deleteTemplate(id: string): boolean {
  const data = read();
  const before = data.templates.length;
  data.templates = data.templates.filter((t) => t.id !== id);
  write(data);
  return data.templates.length < before;
}
