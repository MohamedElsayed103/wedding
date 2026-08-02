import type {
  BeardId,
  BrowId,
  EyeId,
  FaceShapeId,
  GlassesId,
  HairColorId,
  HairId,
  HijabId,
  MouthId,
  NoseId,
  PartCtx,
  SkinToneId,
} from "./types";
import type { ReactNode } from "react";

/* ============================ palettes ============================ */

export const SKIN: Record<SkinToneId, { a: string; b: string; shade: string; blush: string }> = {
  porcelain: { a: "#fce6d4", b: "#f6d5bb", shade: "#e6b795", blush: "#f0a58c" },
  fair: { a: "#f4d6b8", b: "#e9bf98", shade: "#d6a67e", blush: "#e8a37d" },
  medium: { a: "#dba877", b: "#c68e5c", shade: "#a8724a", blush: "#c9784f" },
  tan: { a: "#b98255", b: "#96683f", shade: "#7c542f", blush: "#a85f38" },
  deep: { a: "#8a5a38", b: "#6d4527", shade: "#523218", blush: "#7a4326" },
};

export const HAIR_COLORS: Record<HairColorId, { base: string; shadow: string; sheen: string }> = {
  black: { base: "#241a13", shadow: "#120c07", sheen: "#4a3a2c" },
  darkBrown: { base: "#3b2a1e", shadow: "#241811", sheen: "#6b4b30" },
  brown: { base: "#6f4c2e", shadow: "#4c3320", sheen: "#9a6f45" },
  auburn: { base: "#6e3b28", shadow: "#4a2718", sheen: "#9a553a" },
  blonde: { base: "#c0904f", shadow: "#9a6d38", sheen: "#ddb673" },
  gray: { base: "#9a958f", shadow: "#726d68", sheen: "#c2beb9" },
};

export interface OutfitPalette {
  suitA: string; suitB: string; vestA: string; vestB: string;
  legA: string; legB: string; lapel: string; crease: string;
}
export const GROOM_OUTFITS: Record<string, OutfitPalette> = {
  espresso: { suitA: "#4a3b2e", suitB: "#332619", vestA: "#57463a", vestB: "#3d2f23", legA: "#42342a", legB: "#2c211a", lapel: "#514134", crease: "#5a4936" },
  olive: { suitA: "#4b5a3e", suitB: "#333f28", vestA: "#5c6b49", vestB: "#404a31", legA: "#47542e", legB: "#2f3820", lapel: "#4a5a3c", crease: "#55603e" },
  navy: { suitA: "#2c3a52", suitB: "#1c2638", vestA: "#35455c", vestB: "#232e3f", legA: "#29354a", legB: "#1a222f", lapel: "#2e3d54", crease: "#34445c" },
  charcoal: { suitA: "#3a3a42", suitB: "#24242b", vestA: "#2f2f37", vestB: "#1f1f26", legA: "#33333b", legB: "#22222a", lapel: "#45454f", crease: "#55555f" },
};
export const GROOM_CEREMONY: OutfitPalette = { suitA: "#2e2e36", suitB: "#17171d", vestA: "#26262e", vestB: "#131318", legA: "#26262e", legB: "#101015", lapel: "#33333c", crease: "#4a4a55" };

export interface BridePalette {
  hijabA: string; hijabB: string; dressA: string; dressB: string; dressC: string; outline: string; fold: string;
}
export const BRIDE_OUTFITS: Record<string, BridePalette> = {
  champagne: { hijabA: "#eed7ba", hijabB: "#c3a077", dressA: "#ecd4b5", dressB: "#d9ba90", dressC: "#bd9a6e", outline: "#8f7350", fold: "#a98a62" },
  rose: { hijabA: "#f0d3c8", hijabB: "#cf9a86", dressA: "#f2d6c9", dressB: "#dba792", dressC: "#b97c62", outline: "#9c7261", fold: "#b98a72" },
  sage: { hijabA: "#dbe2c9", hijabB: "#9aa87f", dressA: "#dde3ca", dressB: "#b7c193", dressC: "#8b9968", outline: "#7c8a63", fold: "#96a578" },
  blush: { hijabA: "#f3dfe0", hijabB: "#d3a9ad", dressA: "#f5e2e3", dressB: "#ddb2b6", dressC: "#c48b90", outline: "#a8767b", fold: "#c0969a" },
};
export const BRIDE_CEREMONY: BridePalette = { hijabA: "#fefcf7", hijabB: "#ddd2bd", dressA: "#fefcf7", dressB: "#f0e8d6", dressC: "#ddd0b6", outline: "#b8a88e", fold: "#cbbda4" };

/* ============================ face ============================ */

export const FACE: Record<FaceShapeId, (ctx: PartCtx) => ReactNode> = {
  oval: (c) => (
    <path d="M62 72 q0 -36 38 -36 q38 0 38 36 q0 28 -9 46 q-9 20 -29 20 q-20 0 -29 -20 q-9 -18 -9 -46 z" fill={c.skinUrl} />
  ),
  round: (c) => (
    <path d="M59 78 q0 -42 41 -42 q41 0 41 42 q0 28 -13 44 q-10 12 -28 12 q-18 0 -28 -12 q-13 -16 -13 -44 z" fill={c.skinUrl} />
  ),
  square: (c) => (
    <path d="M61 74 q0 -38 39 -38 q39 0 39 38 q0 30 -5 44 q-3 11 -13 15 q-21 7 -42 0 q-10 -4 -13 -15 q-5 -14 -5 -44 z" fill={c.skinUrl} />
  ),
};

/* ============================ eyes (blink-wrapped by Avatar) ============================ */

export const EYES: Record<EyeId, (ctx: PartCtx) => ReactNode> = {
  almond: (c) => (
    <>
      <ellipse cx="85" cy="84" rx="5.5" ry="6.2" fill="#fff" />
      <ellipse cx="117" cy="84" rx="5.5" ry="6.2" fill="#fff" />
      <circle cx="86" cy="85" r="3" fill="#33200f" />
      <circle cx="118" cy="85" r="3" fill="#33200f" />
      <circle cx="87.2" cy="83.4" r="1" fill="#fff" />
      <circle cx="119.2" cy="83.4" r="1" fill="#fff" />
      <path d="M79 80 q6 -3 12 -1" stroke={c.hair.shadow} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M111 79 q6 -2 12 1" stroke={c.hair.shadow} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </>
  ),
  round: (c) => (
    <>
      <circle cx="85" cy="84" r="6.4" fill="#fff" />
      <circle cx="117" cy="84" r="6.4" fill="#fff" />
      <circle cx="86" cy="85" r="3.6" fill="#33200f" />
      <circle cx="118" cy="85" r="3.6" fill="#33200f" />
      <circle cx="87.4" cy="83.2" r="1.2" fill="#fff" />
      <circle cx="119.4" cy="83.2" r="1.2" fill="#fff" />
      <path d="M78 78 q7 -3 14 -1" stroke={c.hair.shadow} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M110 78 q7 -2 14 1" stroke={c.hair.shadow} strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </>
  ),
  soft: (c) => (
    <>
      <ellipse cx="85" cy="85" rx="5.6" ry="4.8" fill="#fff" />
      <ellipse cx="117" cy="85" rx="5.6" ry="4.8" fill="#fff" />
      <circle cx="85.6" cy="85.4" r="2.8" fill="#33200f" />
      <circle cx="117.6" cy="85.4" r="2.8" fill="#33200f" />
      <circle cx="86.6" cy="84.2" r="0.9" fill="#fff" />
      <circle cx="118.6" cy="84.2" r="0.9" fill="#fff" />
      <path d="M79 82 q6 -4 13 -1" stroke={c.hair.shadow} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M110 81 q7 -3 13 1" stroke={c.hair.shadow} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
};

/* ============================ brows ============================ */

export const BROWS: Record<BrowId, (ctx: PartCtx) => ReactNode> = {
  soft: (c) => (
    <>
      <path d="M76 72 q9 -4 17 -1" stroke={c.hair.shadow} strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M107 71 q8 -3 17 1" stroke={c.hair.shadow} strokeWidth="2.8" fill="none" strokeLinecap="round" />
    </>
  ),
  straight: (c) => (
    <>
      <path d="M77 71 q8 -1 16 0" stroke={c.hair.shadow} strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M107 71 q8 -1 16 0" stroke={c.hair.shadow} strokeWidth="2.8" fill="none" strokeLinecap="round" />
    </>
  ),
  arched: (c) => (
    <>
      <path d="M76 73 q9 -7 17 -1" stroke={c.hair.shadow} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M107 72 q8 -6 17 1" stroke={c.hair.shadow} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </>
  ),
};

/* ============================ nose ============================ */

export const NOSE: Record<NoseId, (ctx: PartCtx) => ReactNode> = {
  button: (c) => (
    <path d="M100 88 q2 8 -1 13 q-2 2 -4 1" stroke={c.skinShade} strokeWidth="2" fill="none" strokeLinecap="round" />
  ),
  straight: (c) => (
    <path d="M99 87 q-1 8 0 12 q1 3 -3 3.5" stroke={c.skinShade} strokeWidth="2" fill="none" strokeLinecap="round" />
  ),
};

/* ============================ mouth ============================ */

export const MOUTH: Record<MouthId, (ctx: PartCtx) => ReactNode> = {
  smile: (c) => (
    <>
      <path d="M91 116 q9 8 18 0" stroke={c.lip} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </>
  ),
  soft: (c) => (
    <>
      <path d="M91 116 q9 8 18 0" stroke={c.lip} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M93 116 q7 4 14 0 q-7 4 -14 0 z" fill={c.lipFill} opacity="0.55" />
    </>
  ),
  neutral: (c) => (
    <path d="M93 117 q7 2 14 0" stroke={c.lip} strokeWidth="2.4" fill="none" strokeLinecap="round" />
  ),
};

/* ============================ hair (back drawn behind face, front over) ============================ */

type HairPart = { back?: ReactNode; front: ReactNode };
export const HAIR: Record<HairId, (ctx: PartCtx) => HairPart> = {
  none: () => ({ front: null }),
  shortSwept: (c) => ({
    front: (
      <>
        <path d="M60 82 C54 54 64 36 86 32 C96 30 104 32 110 36 C118 31 134 33 140 42 C147 56 146 70 140 84 C137 73 132 63 125 57 C119 53 110 51 100 51 C85 51 73 55 66 66 C62 72 60 77 60 82 Z" fill={c.hair.base} />
        <path d="M60 82 C57 62 62 48 71 40 C66 54 64 68 66 82 Z" fill={c.hair.shadow} opacity="0.55" />
        <path d="M140 84 C143 64 140 48 131 40 C136 54 138 70 134 84 Z" fill={c.hair.shadow} opacity="0.5" />
        <path d="M80 44 q8 8 6 18" stroke={c.hair.sheen} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M97 40 q8 9 6 20" stroke={c.hair.sheen} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M114 42 q6 8 5 18" stroke={c.hair.sheen} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />
      </>
    ),
  }),
  buzz: (c) => ({
    front: (
      <>
        <path d="M62 76 C58 46 74 32 100 32 C126 32 142 46 138 76 C135 62 120 52 100 52 C80 52 65 62 62 76 Z" fill={c.hair.base} />
        <path d="M62 76 C60 58 66 46 76 40 C70 52 66 64 66 76 Z" fill={c.hair.shadow} opacity="0.4" />
      </>
    ),
  }),
  curly: (c) => ({
    front: (
      <>
        <path d="M60 80 C52 50 70 30 100 30 C130 30 148 50 140 80 C138 66 128 56 116 54 C120 46 110 42 104 48 C100 40 90 42 88 50 C80 48 72 54 74 62 C66 62 60 70 60 80 Z" fill={c.hair.base} />
        {[[70, 58], [84, 46], [100, 42], [116, 46], [130, 58], [92, 50], [108, 50]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="8" fill={c.hair.base} />
        ))}
        {[[74, 56], [100, 44], [126, 56]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={c.hair.sheen} opacity="0.4" />
        ))}
      </>
    ),
  }),
  longWavy: (c) => ({
    back: (
      <>
        <path d="M58 70 C46 96 46 140 58 168 C64 158 66 150 66 138 C62 118 60 92 66 72 Z" fill={c.hair.base} />
        <path d="M142 70 C154 96 154 140 142 168 C136 158 134 150 134 138 C138 118 140 92 134 72 Z" fill={c.hair.base} />
        <path d="M60 74 C52 100 52 138 60 160" stroke={c.hair.shadow} strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M140 74 C148 100 148 138 140 160" stroke={c.hair.shadow} strokeWidth="2" fill="none" opacity="0.4" />
      </>
    ),
    front: (
      <>
        <path d="M58 80 C52 48 72 30 100 30 C128 30 148 48 142 80 C140 64 128 54 116 52 C110 52 105 52 100 52 C86 52 72 56 66 68 C62 72 60 76 58 80 Z" fill={c.hair.base} />
        <path d="M84 40 q10 12 8 30" stroke={c.hair.sheen} strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M116 40 q-10 12 -8 30" stroke={c.hair.sheen} strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
      </>
    ),
  }),
  bun: (c) => ({
    back: <circle cx="100" cy="34" r="15" fill={c.hair.base} />,
    front: (
      <>
        <path d="M62 78 C58 50 74 34 100 34 C126 34 142 50 138 78 C135 62 120 54 100 54 C80 54 65 62 62 78 Z" fill={c.hair.base} />
        <path d="M70 60 q30 -16 60 0" stroke={c.hair.sheen} strokeWidth="2" fill="none" opacity="0.4" />
        <circle cx="100" cy="34" r="7" fill={c.hair.shadow} opacity="0.35" />
      </>
    ),
  }),
  // Sleek pulled-back top with a ponytail draping down one side (feminine).
  ponytail: (c) => ({
    back: (
      <>
        <path d="M116 46 C138 56 144 90 137 124 C133 144 126 160 117 170 C124 152 124 128 119 106 C114 82 108 62 100 50 Z" fill={c.hair.base} />
        <path d="M118 54 C136 66 140 96 133 126" stroke={c.hair.shadow} strokeWidth="2" fill="none" opacity="0.4" />
        <ellipse cx="112" cy="52" rx="6" ry="4.5" fill={c.hair.shadow} opacity="0.5" />
      </>
    ),
    front: (
      <>
        <path d="M62 76 C58 46 76 30 100 30 C124 30 142 46 138 76 C134 60 118 50 100 50 C82 50 66 60 62 76 Z" fill={c.hair.base} />
        <path d="M74 52 q26 -14 52 0" stroke={c.hair.sheen} strokeWidth="2" fill="none" opacity="0.45" />
        <path d="M80 46 q6 8 4 16" stroke={c.hair.sheen} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.4" />
      </>
    ),
  }),
};

/* ============================ beard ============================ */

export const BEARD: Record<BeardId, (ctx: PartCtx) => ReactNode> = {
  none: () => null,
  stubble: (c) => (
    <g fill={c.hair.shadow} opacity="0.5">
      {[[80, 120], [88, 128], [96, 132], [104, 132], [112, 128], [120, 120], [76, 110], [124, 110], [84, 124], [116, 124], [100, 134], [92, 130], [108, 130]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" />
      ))}
      <path d="M89 109 q11 4 22 0 q-3 4 -11 4 q-8 0 -11 -4 z" opacity="0.6" />
    </g>
  ),
  short: (c) => (
    <>
      <path d="M66 96 Q71 126 88 135 Q100 140 112 135 Q129 126 134 96 L130 96 Q126 119 110 127 Q100 131 90 127 Q74 119 70 96 Z" fill={c.hair.shadow} opacity="0.95" />
      <path d="M89 109 q11 5 22 0 q-3 5.5 -11 5.5 q-8 0 -11 -5.5 z" fill={c.hair.shadow} opacity="0.95" />
    </>
  ),
  full: (c) => (
    <>
      <path d="M63 90 Q66 128 90 140 Q100 144 110 140 Q134 128 137 90 Q132 108 122 116 L124 96 Q112 108 100 108 Q88 108 76 96 L78 116 Q68 108 63 90 Z" fill={c.hair.shadow} />
      <path d="M88 108 q12 5 24 0 q-3 6 -12 6 q-9 0 -12 -6 z" fill={c.hair.shadow} />
    </>
  ),
};

/* ============================ hijab (bride) ============================ */

type HijabPart = { back: ReactNode; front: ReactNode };
export const HIJAB: Record<HijabId, (ctx: PartCtx) => HijabPart> = {
  none: () => ({ back: null, front: null }),
  wrapped: (c) => ({
    back: (
      <path d="M100 30 C62 30 49 62 52 100 C53 122 62 152 80 158 C88 161 94 152 100 152 C106 152 112 161 120 158 C138 152 147 122 148 100 C151 62 138 30 100 30 Z" fill={c.hijabUrl} stroke={c.hijabOutline} strokeWidth="1.6" strokeOpacity="0.3" />
    ),
    front: (
      <>
        <path d="M100 47 C74 47 66 66 68 92 C60 90 58 74 63 58 C70 40 84 33 100 33 C116 33 130 40 137 58 C142 74 140 90 132 92 C134 66 126 47 100 47 Z" fill={c.hijabUrl} />
        <path d="M72 108 q28 26 56 0 q4 22 -12 34 q-16 8 -32 0 q-16 -12 -12 -34 z" fill={c.hijabUrl} />
        <path d="M70 96 q6 -22 24 -28" stroke="#00000014" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="128" cy="104" r="2.2" fill="#c9a24b" />
      </>
    ),
  }),
  draped: (c) => ({
    back: (
      <path d="M100 28 C58 28 44 64 48 108 C50 138 60 172 82 176 C90 178 96 168 100 168 C104 168 110 178 118 176 C140 172 150 138 152 108 C156 64 142 28 100 28 Z" fill={c.hijabUrl} stroke={c.hijabOutline} strokeWidth="1.6" strokeOpacity="0.3" />
    ),
    front: (
      <>
        <path d="M100 46 C72 46 63 66 66 94 C57 91 55 72 61 55 C69 38 84 31 100 31 C116 31 131 38 139 55 C145 72 143 91 134 94 C137 66 128 46 100 46 Z" fill={c.hijabUrl} />
        <path d="M70 108 q30 28 60 0 q6 26 -14 40 q-16 9 -32 0 q-20 -14 -14 -40 z" fill={c.hijabUrl} />
        <path d="M68 98 q7 -24 26 -30" stroke="#00000012" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
  }),
  turban: (c) => ({
    back: (
      <path d="M100 32 C66 32 54 58 56 92 C57 110 64 128 78 132 C86 134 94 130 100 130 C106 130 114 134 122 132 C136 128 143 110 144 92 C146 58 134 32 100 32 Z" fill={c.hijabUrl} stroke={c.hijabOutline} strokeWidth="1.6" strokeOpacity="0.3" />
    ),
    front: (
      <>
        <path d="M100 44 C74 44 64 62 66 88 Q60 84 60 70 C62 48 78 33 100 33 C122 33 138 48 140 70 C140 84 134 88 134 88 C136 62 126 44 100 44 Z" fill={c.hijabUrl} />
        {/* wrapped folds across the top */}
        <path d="M64 74 Q100 56 136 74" stroke={c.hijabOutline} strokeWidth="2" fill="none" strokeOpacity="0.35" />
        <path d="M66 84 Q100 68 134 84" stroke={c.hijabOutline} strokeWidth="2" fill="none" strokeOpacity="0.3" />
        {/* side knot */}
        <path d="M132 84 q14 4 12 18 q-8 2 -14 -6 z" fill={c.hijabUrl} />
        <circle cx="134" cy="90" r="2" fill="#c9a24b" />
      </>
    ),
  }),
};

/* ============================ glasses ============================ */

export const GLASSES: Record<GlassesId, (ctx: PartCtx) => ReactNode> = {
  none: () => null,
  round: () => (
    <g stroke="#3a2e22" strokeWidth="2" fill="none">
      <circle cx="85" cy="84" r="9" />
      <circle cx="117" cy="84" r="9" />
      <path d="M94 83 h14" />
      <path d="M76 82 l-8 -2" />
      <path d="M126 82 l8 -2" />
    </g>
  ),
  rect: () => (
    <g stroke="#3a2e22" strokeWidth="2" fill="none">
      <rect x="75" y="77" width="20" height="14" rx="4" />
      <rect x="107" y="77" width="20" height="14" rx="4" />
      <path d="M95 82 h12" />
      <path d="M75 81 l-7 -2" />
      <path d="M127 81 l7 -2" />
    </g>
  ),
};
