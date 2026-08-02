/**
 * Lightweight design catalogue (plain data, no component imports) — safe to
 * import into client bundles like the admin UI without pulling the whole films
 * in. The runtime registry in ./registry attaches the actual components to
 * these ids.
 */
export interface DesignMeta {
  id: string;
  name: string;
  description: string;
  accentColor: string;
}

export const DESIGN_META: DesignMeta[] = [
  {
    id: "enchanted-garden",
    name: "Enchanted Garden",
    description:
      "Ivory & gold golden-hour garden film — a sealed envelope, calligraphy, the walk to meet, the vows.",
    accentColor: "#c9a24b",
  },
  {
    id: "midnight-royal",
    name: "Midnight Royal",
    description:
      "A starlit navy-and-gold night — a glowing monogram, the couple under moonlight, the story in the stars.",
    accentColor: "#d9b45a",
  },
];

export const DEFAULT_DESIGN_ID = "enchanted-garden";

export function designName(id?: string): string {
  return DESIGN_META.find((d) => d.id === id)?.name ?? id ?? "—";
}
