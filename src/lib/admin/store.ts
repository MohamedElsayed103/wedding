import "server-only";
import { randomUUID } from "node:crypto";
import { getServiceClient } from "@/lib/supabase";
import { DEFAULT_SITE, DEFAULT_TEMPLATES } from "./defaults";
import type { Site, Template } from "./types";

/**
 * Data access for the admin tool + public site, backed by Supabase Postgres.
 *
 * Each row is `{ id, slug?, status?, data: <full object>, created_at, updated_at }`.
 * We mirror a few queryable fields (slug/status) into columns and keep the
 * canonical object in `data` (jsonb) so the app reads/writes whole typed
 * objects. All access is server-side with the secret key.
 */

/**
 * Race a query against a short timeout so a paused/slow database never hangs
 * a guest-facing page — the caller falls back to defaults instead.
 */
function withTimeout<T>(p: PromiseLike<T>, ms = 3000): Promise<T> {
  return Promise.race([
    Promise.resolve(p),
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("db-timeout")), ms)),
  ]);
}

// ---- Sites ----

export async function listSites(): Promise<Site[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("sites")
    .select("data")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => r.data as Site);
}

export async function getSite(id: string): Promise<Site | undefined> {
  const sb = getServiceClient();
  const { data, error } = await sb.from("sites").select("data").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data?.data as Site) ?? undefined;
}

export async function getSiteBySlug(slug: string): Promise<Site | undefined> {
  const sb = getServiceClient();
  const { data, error } = await withTimeout(sb.from("sites").select("data").eq("slug", slug).maybeSingle());
  if (error) throw error;
  return (data?.data as Site) ?? undefined;
}

/** The site the public "/" renders: the first live site, else the newest. */
export async function getPrimarySite(): Promise<Site | undefined> {
  const sb = getServiceClient();
  const { data, error } = await withTimeout(
    sb.from("sites").select("data,status,created_at").order("created_at", { ascending: true })
  );
  if (error) throw error;
  const rows = (data ?? []) as { data: Site; status: string }[];
  const live = rows.find((r) => r.status === "live");
  return (live ?? rows[0])?.data;
}

export type NewSiteInput = Omit<Site, "id" | "createdAt" | "updatedAt">;

export async function createSite(input: NewSiteInput): Promise<Site> {
  const sb = getServiceClient();
  const now = new Date().toISOString();
  const site: Site = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  const { error } = await sb.from("sites").insert({
    id: site.id,
    slug: site.slug,
    status: site.status,
    data: site,
    created_at: now,
    updated_at: now,
  });
  if (error) throw error;
  return site;
}

export async function updateSite(id: string, patch: Partial<NewSiteInput>): Promise<Site | undefined> {
  const existing = await getSite(id);
  if (!existing) return undefined;
  const now = new Date().toISOString();
  const updated: Site = { ...existing, ...patch, id, updatedAt: now };
  const sb = getServiceClient();
  const { error } = await sb
    .from("sites")
    .update({ slug: updated.slug, status: updated.status, data: updated, updated_at: now })
    .eq("id", id);
  if (error) throw error;
  return updated;
}

export async function deleteSite(id: string): Promise<boolean> {
  const sb = getServiceClient();
  const { error, count } = await sb.from("sites").delete({ count: "exact" }).eq("id", id);
  if (error) throw error;
  return (count ?? 0) > 0;
}

// ---- Templates ----

export async function listTemplates(): Promise<Template[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("templates")
    .select("data")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => r.data as Template);
}

export async function getTemplate(id: string): Promise<Template | undefined> {
  const sb = getServiceClient();
  const { data, error } = await withTimeout(sb.from("templates").select("data").eq("id", id).maybeSingle());
  if (error) throw error;
  return (data?.data as Template) ?? undefined;
}

export type NewTemplateInput = Omit<Template, "id" | "createdAt" | "updatedAt">;

export async function createTemplate(input: NewTemplateInput): Promise<Template> {
  const sb = getServiceClient();
  const now = new Date().toISOString();
  const template: Template = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  const { error } = await sb.from("templates").insert({
    id: template.id,
    data: template,
    created_at: now,
    updated_at: now,
  });
  if (error) throw error;
  return template;
}

export async function updateTemplate(id: string, patch: Partial<NewTemplateInput>): Promise<Template | undefined> {
  const existing = await getTemplate(id);
  if (!existing) return undefined;
  const now = new Date().toISOString();
  const updated: Template = { ...existing, ...patch, id, updatedAt: now };
  const sb = getServiceClient();
  const { error } = await sb.from("templates").update({ data: updated, updated_at: now }).eq("id", id);
  if (error) throw error;
  return updated;
}

export async function deleteTemplate(id: string): Promise<boolean> {
  const sb = getServiceClient();
  const { error, count } = await sb.from("templates").delete({ count: "exact" }).eq("id", id);
  if (error) throw error;
  return (count ?? 0) > 0;
}

// ---- Seeding ----

/** Insert the flagship site + template if the tables are empty. Idempotent. */
export async function seedIfEmpty(): Promise<{ seeded: boolean }> {
  const sb = getServiceClient();
  const [{ count: siteCount }, { count: templateCount }] = await Promise.all([
    sb.from("sites").select("id", { count: "exact", head: true }),
    sb.from("templates").select("id", { count: "exact", head: true }),
  ]);
  let seeded = false;
  if ((templateCount ?? 0) === 0) {
    await sb.from("templates").insert(
      DEFAULT_TEMPLATES.map((tpl) => ({
        id: tpl.id,
        data: tpl,
        created_at: tpl.createdAt,
        updated_at: tpl.updatedAt,
      }))
    );
    seeded = true;
  }
  if ((siteCount ?? 0) === 0) {
    await sb.from("sites").insert({
      id: DEFAULT_SITE.id,
      slug: DEFAULT_SITE.slug,
      status: DEFAULT_SITE.status,
      data: DEFAULT_SITE,
      created_at: DEFAULT_SITE.createdAt,
      updated_at: DEFAULT_SITE.updatedAt,
    });
    seeded = true;
  }
  return { seeded };
}
