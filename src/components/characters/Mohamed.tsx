"use client";

import { cx } from "@/lib/utils";

export type Attire = "signature" | "ceremony";
export type SkinTone = "fair" | "medium" | "tan";
export type OutfitPalette = "espresso" | "olive" | "navy";
export type BeardStyle = "short" | "none";

interface Props {
  className?: string;
  /** Gaze/lean direction — used when the couple look at each other. */
  facing?: "left" | "right" | "front";
  animate?: boolean;
  /** "signature" = suit like the photo; "ceremony" = black tuxedo (fixed). */
  attire?: Attire;
  skinTone?: SkinTone;
  /** Colorway for the signature suit — ceremony is always classic black. */
  outfitPalette?: OutfitPalette;
  beardStyle?: BeardStyle;
}

const SKIN: Record<SkinTone, { a: string; b: string; neck: string; neckShadow: string; blush: string; blushOpacity: number }> = {
  fair: { a: "#f4d6b8", b: "#e9bf98", neck: "#e7ba92", neckShadow: "#d9a980", blush: "#e8a37d", blushOpacity: 0.45 },
  medium: { a: "#dba877", b: "#c68e5c", neck: "#c99568", neckShadow: "#b98052", blush: "#c97b4f", blushOpacity: 0.4 },
  tan: { a: "#b98255", b: "#96683f", neck: "#a8724a", neckShadow: "#8f5e39", blush: "#a85f38", blushOpacity: 0.35 },
};

const PALETTE: Record<OutfitPalette, { suitA: string; suitB: string; vestA: string; vestB: string; legA: string; legB: string; lapel: string; crease: string }> = {
  espresso: { suitA: "#4a3b2e", suitB: "#332619", vestA: "#57463a", vestB: "#3d2f23", legA: "#42342a", legB: "#2c211a", lapel: "#514134", crease: "#5a4936" },
  olive: { suitA: "#4b5a3e", suitB: "#333f28", vestA: "#5c6b49", vestB: "#404a31", legA: "#47542e", legB: "#2f3820", lapel: "#4a5a3c", crease: "#55603e" },
  navy: { suitA: "#2c3a52", suitB: "#1c2638", vestA: "#35455c", vestB: "#232e3f", legA: "#29354a", legB: "#1a222f", lapel: "#2e3d54", crease: "#34445c" },
};

const CEREMONY_PALETTE = { suitA: "#2e2e36", suitB: "#17171d", vestA: "#26262e", vestB: "#131318", legA: "#26262e", legB: "#101015", lapel: "#33333c", crease: "#4a4a55" };

/**
 * Mohamed — modelled on the engagement photo: three-piece suit, white shirt,
 * short neat beard, dark swept hair and a warm smile. The finale swaps to a
 * black tuxedo with a bow tie. skinTone, outfitPalette and beardStyle are
 * parametric (see BUSINESS_PLAN.md §4 Phase A) so new "looks" are a config
 * choice, not new artwork.
 */
export function Mohamed({
  className,
  facing = "front",
  animate = true,
  attire = "signature",
  skinTone = "fair",
  outfitPalette = "espresso",
  beardStyle = "short",
}: Props) {
  const flip = facing === "left" ? -1 : 1;
  const cer = attire === "ceremony";
  const bearded = beardStyle === "short";
  // SVG ids are document-global and many combinations may render on the same
  // page at once (e.g. the admin cast-library browser) — scope every
  // gradient id by the full combination so none of them ever collide.
  const toneKey = skinTone[0];
  const paletteKey = cer ? "k" : outfitPalette[0];
  const beardKey = bearded ? "s" : "n";
  const u = `${cer ? "c" : "s"}${toneKey}${paletteKey}${beardKey}`;

  const skin = SKIN[skinTone];
  const pal = cer ? CEREMONY_PALETTE : PALETTE[outfitPalette];
  const suit = `url(#mo-suit-${u})`;
  const vest = `url(#mo-vest-${u})`;
  const legs = `url(#mo-legs-${u})`;
  const lapel = pal.lapel;
  const crease = pal.crease;

  return (
    <svg
      viewBox="0 0 200 440"
      className={cx("h-full w-auto select-none", className)}
      style={{ transform: `scaleX(${flip})`, overflow: "visible" }}
      role="img"
      aria-label="Mohamed"
    >
      <defs>
        <linearGradient id={`mo-skin-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skin.a} />
          <stop offset="1" stopColor={skin.b} />
        </linearGradient>
        <linearGradient id={`mo-hair-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#332318" />
          <stop offset="1" stopColor="#1c120b" />
        </linearGradient>
        <linearGradient id={`mo-suit-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.suitA} />
          <stop offset="1" stopColor={pal.suitB} />
        </linearGradient>
        <linearGradient id={`mo-vest-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.vestA} />
          <stop offset="1" stopColor={pal.vestB} />
        </linearGradient>
        <linearGradient id={`mo-legs-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.legA} />
          <stop offset="1" stopColor={pal.legB} />
        </linearGradient>
        <radialGradient id={`mo-blush-${u}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={skin.blush} stopOpacity={skin.blushOpacity} />
          <stop offset="1" stopColor={skin.blush} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`mo-rim-${u}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffdf6" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#fffdf6" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fffdf6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft rim glow so the dark suit + face read against any backdrop */}
      <ellipse cx="100" cy="220" rx="105" ry="215" fill={`url(#mo-rim-${u})`} />

      {/* ground shadow */}
      <ellipse cx="100" cy="432" rx="46" ry="7" fill="#4a4235" opacity="0.18" />

      <g
        className={animate ? "anim-breathe" : undefined}
        style={{ transformOrigin: "100px 420px" }}
      >
        {/* ---- legs ---- */}
        <path d="M84 300 L80 418 q0 6 7 6 h6 q6 0 6 -6 l3 -118 z" fill={legs} />
        <path d="M116 300 L120 418 q0 6 -7 6 h-6 q-6 0 -6 -6 l-3 -118 z" fill={legs} />
        {/* trouser crease highlights */}
        <path d="M88 305 L85 415" stroke={crease} strokeWidth="1.4" opacity="0.5" />
        <path d="M112 305 L115 415" stroke={crease} strokeWidth="1.4" opacity="0.5" />
        {/* polished shoes */}
        <path d="M73 418 q-3 12 8 13 h14 q4 0 4 -5 v-8 z" fill="#1a120c" />
        <path d="M127 418 q3 12 -8 13 h-14 q-4 0 -4 -5 v-8 z" fill="#1a120c" />
        <path d="M76 421 q6 5 22 4" stroke="#3d2f23" strokeWidth="1.4" fill="none" opacity="0.8" />
        <path d="M124 421 q-6 5 -22 4" stroke="#3d2f23" strokeWidth="1.4" fill="none" opacity="0.8" />

        {/* ---- neck ---- */}
        <path d="M87 124 h26 v40 q-13 11 -26 0 z" fill={skin.neck} />
        <path d="M87 128 q13 8 26 0 v6 q-13 7 -26 0 z" fill={skin.neckShadow} opacity="0.55" />

        {/* ---- torso: jacket ---- */}
        <path
          d="M58 160 q42 -22 84 0 q8 5 8 16 l6 108 q-52 16 -108 0 l6 -108 q0 -11 8 -16 z"
          fill={suit}
          stroke="#241a10"
          strokeWidth="1.6"
          strokeOpacity="0.35"
        />

        {/* ---- arms ---- */}
        <path d="M66 166 q-16 8 -20 46 l-8 56 q0 7 7 8 q7 0 8 -6 l12 -60 z" fill={suit} stroke="#241a10" strokeWidth="1.4" strokeOpacity="0.3" />
        {/* right arm bent — hands clasped like the photo */}
        <path d="M134 166 q16 8 20 46 l6 40 q-2 8 -9 7 q-6 -1 -7 -7 l-10 -56 z" fill={suit} stroke="#241a10" strokeWidth="1.4" strokeOpacity="0.3" />
        {/* cuffs */}
        <path d="M44 262 q6 5 15 3 l1 6 q-9 3 -17 -2 z" fill="#f7f3ea" />
        <path d="M156 246 q-6 5 -15 3 l-1 6 q9 3 17 -2 z" fill="#f7f3ea" />
        {/* hands */}
        <circle cx="52" cy="274" r="8" fill={`url(#mo-skin-${u})`} />
        <circle cx="148" cy="258" r="8" fill={`url(#mo-skin-${u})`} />
        {/* watch on the left wrist, like the photo */}
        <rect x="140" y="243" width="14" height="7" rx="3" fill="#3a2e22" />
        <circle cx="147" cy="246.5" r="4" fill="#e8ce8f" stroke="#3a2e22" strokeWidth="1.4" />

        {/* ---- shirt + waistcoat + lapels + tie ---- */}
        <path d="M100 156 l-15 8 v70 h30 v-70 z" fill="#f7f3ea" />
        <path d="M85 166 l15 8 l15 -8 l6 20 l-5 58 q-16 8 -32 0 l-5 -58 z" fill={vest} />
        <circle cx="100" cy="204" r="1.5" fill="#c9a24b" />
        <circle cx="100" cy="218" r="1.5" fill="#c9a24b" />
        <circle cx="100" cy="232" r="1.5" fill="#c9a24b" />
        <path d="M96 156 l-22 8 l14 74 l10 -8 z" fill={lapel} />
        <path d="M104 156 l22 8 l-14 74 l-10 -8 z" fill={lapel} />
        {cer ? (
          <>
            {/* black bow tie */}
            <path d="M99 166 q-11 -7 -14 -1 q-2 6 3 9 q6 3 11 -3 z" fill="#17171d" />
            <path d="M101 166 q11 -7 14 -1 q2 6 -3 9 q-6 3 -11 -3 z" fill="#17171d" />
            <rect x="96.5" y="163" width="7" height="8" rx="2.4" fill="#26262e" />
          </>
        ) : (
          <>
            {/* champagne tie */}
            <path d="M100 162 l6 7 l-3 42 l-3 6 l-3 -6 l-3 -42 z" fill="#ead9b0" />
            <path d="M100 162 l6 7 l-6 3 l-6 -3 z" fill="#dcc491" />
          </>
        )}
        {/* pocket square */}
        <path d="M120 196 l10 -4 l-1 8 l-8 2 z" fill="#f7f3ea" />

        {/* ---- head (pivots at the neck base) ---- */}
        <g
          className={animate ? "anim-sway" : undefined}
          style={{ transformOrigin: "100px 132px", animationDuration: "8s" }}
        >
          {/* ears */}
          <circle cx="63" cy="94" r="8" fill={`url(#mo-skin-${u})`} />
          <circle cx="137" cy="94" r="8" fill={`url(#mo-skin-${u})`} />

          {/* face */}
          <path
            d="M62 72 q0 -36 38 -36 q38 0 38 36 q0 28 -9 46 q-9 20 -29 20 q-20 0 -29 -20 q-9 -18 -9 -46 z"
            fill={`url(#mo-skin-${u})`}
          />

          {bearded && (
            <>
              {/* short, well-groomed beard — a thin band hugging the jawline */}
              <path
                d="M66 96
                   Q71 126 88 135 Q100 140 112 135 Q129 126 134 96
                   L130 96 Q126 119 110 127 Q100 131 90 127 Q74 119 70 96 Z"
                fill="#2b1c12"
                opacity="0.95"
              />
              {/* moustache */}
              <path d="M89 109 q11 5 22 0 q-3 5.5 -11 5.5 q-8 0 -11 -5.5 z" fill="#2b1c12" opacity="0.95" />
            </>
          )}

          {/* mouth — warm smile */}
          <path d="M91 118 q9 7 18 0" stroke="#b0644c" strokeWidth="2.6" fill="none" strokeLinecap="round" />

          {/* short tidy swept hair */}
          <path
            d="M60 82
               C54 54 64 36 86 32
               C96 30 104 32 110 36
               C118 31 134 33 140 42
               C147 56 146 70 140 84
               C137 73 132 63 125 57
               C119 53 110 51 100 51
               C85 51 73 55 66 66
               C62 72 60 77 60 82 Z"
            fill={`url(#mo-hair-${u})`}
          />
          <path d="M60 82 C57 62 62 48 71 40 C66 54 64 68 66 82 Z" fill="#180f09" opacity="0.55" />
          <path d="M140 84 C143 64 140 48 131 40 C136 54 138 70 134 84 Z" fill="#180f09" opacity="0.5" />
          <path d="M80 44 q8 8 6 18" stroke="#6b4b30" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M97 40 q8 9 6 20" stroke="#6b4b30" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M114 42 q6 8 5 18" stroke="#6b4b30" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />

          {/* eyebrows */}
          <path d="M76 72 q9 -4 17 -1" stroke="#2b1c11" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M107 71 q8 -3 17 1" stroke="#2b1c11" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* eyes */}
          <g
            style={
              animate
                ? { animation: "blink 6.5s ease-in-out infinite", transformOrigin: "100px 84px" }
                : undefined
            }
          >
            <ellipse cx="84" cy="84" rx="5.5" ry="6.2" fill="#fff" />
            <ellipse cx="116" cy="84" rx="5.5" ry="6.2" fill="#fff" />
            <circle cx="85" cy="85" r="3" fill="#33200f" />
            <circle cx="117" cy="85" r="3" fill="#33200f" />
            <circle cx="86.2" cy="83.6" r="1" fill="#fff" />
            <circle cx="118.2" cy="83.6" r="1" fill="#fff" />
          </g>

          {/* nose */}
          <path d="M100 88 q2 8 -1 13 q-2 2 -4 1" stroke="#d9a077" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* blush */}
          <circle cx="76" cy="100" r="7" fill={`url(#mo-blush-${u})`} />
          <circle cx="124" cy="100" r="7" fill={`url(#mo-blush-${u})`} />
        </g>
      </g>
    </svg>
  );
}
