"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ResolvedSite } from "@/lib/siteContent";

/**
 * Carries the couple's non-string runtime config (character looks, date, map,
 * accent) to the film scenes. Strings go through LangProvider; everything
 * else goes through here.
 */
const Ctx = createContext<ResolvedSite | null>(null);

export function useSite(): ResolvedSite {
  const site = useContext(Ctx);
  if (!site) throw new Error("useSite must be used within <SiteProvider>");
  return site;
}

export function SiteProvider({ site, children }: { site: ResolvedSite; children: ReactNode }) {
  return <Ctx.Provider value={site}>{children}</Ctx.Provider>;
}
