import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteBySlug, getTemplate } from "@/lib/admin/store";
import { DEFAULT_TEMPLATE } from "@/lib/admin/defaults";
import { buildDict, resolveSite } from "@/lib/siteContent";
import { getDesign } from "@/components/designs/registry";

// Multi-tenant: every couple's film lives at /their-slug, served from the DB.
// (Explicit routes like /demo and /admin take precedence over this catch-all.)
export const dynamic = "force-dynamic";

// Only published sites are reachable at their public URL. Drafts and archived
// sites 404 for guests even if the slug is guessed; the admin previews via the
// editor. ("paid" is allowed so a couple can view/share before it's flipped live.)
const PUBLIC_STATUSES = new Set(["live", "paid"]);

async function load(slug: string) {
  try {
    const site = await getSiteBySlug(slug);
    if (!site || !PUBLIC_STATUSES.has(site.status)) return null;
    let accent = DEFAULT_TEMPLATE.accentColor;
    let designId = DEFAULT_TEMPLATE.designId;
    const tpl = await getTemplate(site.templateId);
    if (tpl) {
      accent = tpl.accentColor;
      designId = tpl.designId ?? designId;
    }
    return { site, accent, designId };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await load(slug);
  if (!loaded) return { title: "Invitation not found" };
  const names = `${loaded.site.groomName_en} & ${loaded.site.brideName_en}`;
  const title = `${names} — ${loaded.site.dateLabel_en}`;
  const description = `Join ${names} for an interactive wedding invitation film.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loaded = await load(slug);
  if (!loaded) notFound();

  const dict = buildDict(loaded.site);
  const resolved = resolveSite(loaded.site, loaded.accent);
  const { Component } = getDesign(loaded.designId);
  return <Component dict={dict} site={resolved} />;
}
