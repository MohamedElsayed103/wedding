import type { Metadata } from "next";
import { getPrimarySite, getTemplate } from "@/lib/admin/store";
import { DEFAULT_SITE, DEFAULT_TEMPLATE } from "@/lib/admin/defaults";
import { buildDict, resolveSite } from "@/lib/siteContent";
import { getDesign, DESIGNS } from "@/components/designs/registry";

// Always read the latest from the DB so admin edits appear immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "A live invitation — Reverie",
  description: "Experience a real Reverie wedding invitation film.",
};

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ design?: string }>;
}) {
  const { design } = await searchParams;
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
    // tables not created yet — use defaults
  }

  // ?design=<id> previews any coded design with this couple's data (used by the
  // "Preview" links on the admin Templates page).
  const chosen = design && DESIGNS[design] ? design : designId;
  const dict = buildDict(site);
  const resolved = resolveSite(site, DESIGNS[chosen]?.accentColor ?? accent);
  const { Component } = getDesign(chosen);
  return <Component dict={dict} site={resolved} />;
}
