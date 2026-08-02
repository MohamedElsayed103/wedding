import type { ReactNode } from "react";

/** Every customizable dimension of a character. Snapchat/Bitmoji-style. */
export type Role = "groom" | "bride";
export type SkinToneId = "porcelain" | "fair" | "medium" | "tan" | "deep";
export type HairColorId = "black" | "darkBrown" | "brown" | "auburn" | "blonde" | "gray";
export type HairId =
  | "none"
  | "shortSwept"
  | "buzz"
  | "curly"
  | "longWavy"
  | "bun"
  | "ponytail";
export type BeardId = "none" | "stubble" | "short" | "full";
export type HijabId = "none" | "wrapped" | "draped" | "turban";
export type EyeId = "almond" | "round" | "soft";
export type BrowId = "soft" | "straight" | "arched";
export type NoseId = "button" | "straight";
export type MouthId = "smile" | "soft" | "neutral";
export type FaceShapeId = "oval" | "round" | "square";
export type GlassesId = "none" | "round" | "rect";
export type GroomOutfitId = "espresso" | "olive" | "navy" | "charcoal";
export type BrideOutfitId = "champagne" | "rose" | "sage" | "blush";
export type Attire = "signature" | "ceremony";

/** The customizable dimensions stored per couple (no role/attire — those are
 *  set by the scene: groom vs bride, signature vs ceremony). */
export interface AvatarLook {
  skinTone: SkinToneId;
  faceShape: FaceShapeId;
  eyes: EyeId;
  brows: BrowId;
  nose: NoseId;
  mouth: MouthId;
  hair: HairId;
  hairColor: HairColorId;
  beard: BeardId; // groom (bride leaves "none")
  hijab: HijabId; // bride (groom leaves "none"); when set, hair is hidden
  glasses: GlassesId;
  outfit: GroomOutfitId | BrideOutfitId;
}

export interface AvatarConfig extends AvatarLook {
  role: Role;
  attire: Attire;
}

/** Ordered option lists for building pickers + cast libraries. */
export const OPTIONS = {
  skinTone: ["porcelain", "fair", "medium", "tan", "deep"] as SkinToneId[],
  faceShape: ["oval", "round", "square"] as FaceShapeId[],
  eyes: ["almond", "round", "soft"] as EyeId[],
  brows: ["soft", "straight", "arched"] as BrowId[],
  nose: ["button", "straight"] as NoseId[],
  mouth: ["smile", "soft", "neutral"] as MouthId[],
  // Full registry (every drawable style).
  hair: ["none", "shortSwept", "buzz", "curly", "longWavy", "bun", "ponytail"] as HairId[],
  // Gender-appropriate subsets shown in the builder. Groom = short/masculine
  // (incl. bald); bride = feminine styles only (never bald/buzz).
  groomHair: ["none", "buzz", "shortSwept", "curly"] as HairId[],
  brideHair: ["longWavy", "bun", "ponytail", "curly"] as HairId[],
  hairColor: ["black", "darkBrown", "brown", "auburn", "blonde", "gray"] as HairColorId[],
  beard: ["none", "stubble", "short", "full"] as BeardId[],
  hijab: ["none", "wrapped", "draped", "turban"] as HijabId[],
  glasses: ["none", "round", "rect"] as GlassesId[],
  groomOutfit: ["espresso", "olive", "navy", "charcoal"] as GroomOutfitId[],
  brideOutfit: ["champagne", "rose", "sage", "blush"] as BrideOutfitId[],
} as const;

/** Sensible defaults so legacy/partial data still renders. */
export const GROOM_DEFAULT_LOOK: AvatarLook = {
  skinTone: "fair", faceShape: "oval", eyes: "almond", brows: "soft", nose: "button",
  mouth: "smile", hair: "shortSwept", hairColor: "darkBrown", beard: "short", hijab: "none",
  glasses: "none", outfit: "espresso",
};
export const BRIDE_DEFAULT_LOOK: AvatarLook = {
  skinTone: "fair", faceShape: "oval", eyes: "almond", brows: "soft", nose: "button",
  mouth: "soft", hair: "longWavy", hairColor: "darkBrown", beard: "none", hijab: "wrapped",
  glasses: "none", outfit: "champagne",
};

/** Colors resolved once per avatar and handed to every part renderer. */
export interface PartCtx {
  skinUrl: string; // url(#...) skin gradient
  skinShade: string; // darker skin (ears/neck shadow)
  hair: { base: string; shadow: string; sheen: string };
  lip: string;
  lipFill: string; // soft filled lower-lip tint (feminine mouths)
  blushUrl: string;
  hijabUrl: string; // url(#...) hijab satin gradient (bride)
  hijabOutline: string;
}

export type PartRenderer = (ctx: PartCtx) => ReactNode;
