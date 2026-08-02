import type { Metadata } from "next";
import { getPrimarySite, getTemplate } from "@/lib/admin/store";
import { DEFAULT_SITE, DEFAULT_TEMPLATE } from "@/lib/admin/defaults";
import { buildDict, resolveSite } from "@/lib/siteContent";
import { getDesign } from "@/components/designs/registry";

/**
 * Root = the couple's invitation film (the primary/live site).
 *
 * The SaaS marketing landing page lives at /studio for now; after the wedding,
 * swap these two files to make / the landing page again.
 */
export const dynamic = "force-dynamic";

async function loadPrimary() {
  let site = DEFAULT_SITE;
  let accent = DEFAULT_TEMPLATE.accentColor;
  let designId = DEFAULT_TEMPLATE.designId;
  try {
    const found = await getPrimarySite();
    if (found) {
      site = found;
      const tpl = await getTemplate(found.templateId);
      if (tpl) {
        accent = tpl.accentColor;
        designId = tpl.designId ?? designId;
      }
    }
  } catch {
    // DB not reachable — fall back to the built-in flagship content.
  }
  return { site, accent, designId };
}

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await loadPrimary();
  const names = `${site.groomName_en} & ${site.brideName_en}`;
  return {
    title: `${names} — ${site.dateLabel_en}`,
    description: `Join ${names} — a wedding invitation film.`,
  };
}

export default async function Home() {
  const { site, accent, designId } = await loadPrimary();
  const dict = buildDict(site);
  const resolved = resolveSite(site, accent);
  const { Component } = getDesign(designId);
  return <Component dict={dict} site={resolved} />;
}
