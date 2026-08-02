import type { ComponentType } from "react";
import type { Lang, Strings } from "@/lib/i18n";
import type { ResolvedSite } from "@/lib/siteContent";
import { Experience } from "@/components/Experience";
import { MidnightExperience } from "@/components/designs/midnight/MidnightExperience";
import { DESIGN_META, DEFAULT_DESIGN_ID, type DesignMeta } from "./meta";

/**
 * The design library — the code-level catalogue of *layouts/films*.
 *
 * A "template" in the admin is a THEME (name + accent) that points at one of
 * these designs via `designId`. Adding a genuinely new design (different scenes
 * and animation) means: build its root component, then map it here + add its
 * entry to ./meta. It then becomes selectable when creating a theme. A couple's
 * site → its template → this design.
 */
export type DesignComponent = ComponentType<{
  dict: Record<Lang, Strings>;
  site: ResolvedSite;
}>;

export interface DesignEntry extends DesignMeta {
  Component: DesignComponent;
}

const COMPONENTS: Record<string, DesignComponent> = {
  "enchanted-garden": Experience,
  "midnight-royal": MidnightExperience,
};

export const DESIGNS: Record<string, DesignEntry> = Object.fromEntries(
  DESIGN_META.filter((m) => COMPONENTS[m.id]).map((m) => [
    m.id,
    { ...m, Component: COMPONENTS[m.id] },
  ])
);

export const DESIGN_LIST: DesignEntry[] = Object.values(DESIGNS);
export { DEFAULT_DESIGN_ID };

/** Resolve a design id (from a template) to its entry, falling back safely. */
export function getDesign(id?: string): DesignEntry {
  return (id && DESIGNS[id]) || DESIGNS[DEFAULT_DESIGN_ID];
}
