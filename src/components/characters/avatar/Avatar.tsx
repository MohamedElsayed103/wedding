"use client";

import { useId } from "react";
import { cx } from "@/lib/utils";
import type { AvatarConfig, PartCtx } from "./types";
import {
  BEARD,
  BRIDE_CEREMONY,
  BRIDE_OUTFITS,
  BROWS,
  EYES,
  FACE,
  GLASSES,
  GROOM_CEREMONY,
  GROOM_OUTFITS,
  HAIR,
  HAIR_COLORS,
  HIJAB,
  MOUTH,
  NOSE,
  SKIN,
} from "./registry";

interface Props {
  config: AvatarConfig;
  className?: string;
  facing?: "left" | "right" | "front";
  animate?: boolean;
}

/**
 * One rig, every look. Composes a role-specific body with a fully modular head
 * (face shape, eyes, brows, nose, mouth, hair + color, beard, hijab, glasses).
 * All parts live on a shared 200×440 coordinate rig; the head is nudged down
 * for the bride so both bodies keep their proportions.
 */
export function Avatar({ config, className, facing = "front", animate = true }: Props) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const flip = facing === "left" ? -1 : 1;

  const isGroom = config.role === "groom";
  const cer = config.attire === "ceremony";
  const skin = SKIN[config.skinTone] ?? SKIN.fair;
  const hair = HAIR_COLORS[config.hairColor] ?? HAIR_COLORS.darkBrown;
  const bridePal = cer ? BRIDE_CEREMONY : BRIDE_OUTFITS[config.outfit] ?? BRIDE_OUTFITS.champagne;

  const ctx: PartCtx = {
    skinUrl: `url(#av-skin-${uid})`,
    skinShade: skin.shade,
    hair,
    // Bride keeps the warm rosy lip of the original hand-drawn character;
    // groom uses a neutral, less saturated line.
    lip: isGroom ? "#b0644c" : "#c05f4a",
    lipFill: isGroom ? "#c88a72" : "#dd8570",
    blushUrl: `url(#av-blush-${uid})`,
    hijabUrl: `url(#av-hijab-${uid})`,
    hijabOutline: bridePal.outline,
  };

  const showHijab = !isGroom && config.hijab !== "none";
  const showEars = !showHijab;
  const headOffsetY = isGroom ? 0 : 18;
  const swayOrigin = isGroom ? "100px 132px" : "100px 150px";

  const hairPart = HAIR[config.hair] ?? HAIR.none;
  const hair2 = hairPart(ctx);
  const hijabPart = showHijab ? HIJAB[config.hijab](ctx) : null;

  return (
    <svg
      viewBox="0 0 200 440"
      className={cx("h-full w-auto select-none", className)}
      style={{ transform: `scaleX(${flip})`, overflow: "visible" }}
      role="img"
      aria-label={isGroom ? "Groom" : "Bride"}
    >
      <defs>
        <linearGradient id={`av-skin-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skin.a} />
          <stop offset="1" stopColor={skin.b} />
        </linearGradient>
        <radialGradient id={`av-blush-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={skin.blush} stopOpacity="0.5" />
          <stop offset="1" stopColor={skin.blush} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`av-rim-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={!isGroom && cer ? "#e8ce8f" : "#fffdf6"} stopOpacity="0.5" />
          <stop offset="0.7" stopColor={!isGroom && cer ? "#e8ce8f" : "#fffdf6"} stopOpacity="0.16" />
          <stop offset="1" stopColor="#fffdf6" stopOpacity="0" />
        </radialGradient>
        {isGroom ? (
          <GroomDefs uid={uid} cer={cer} outfit={config.outfit} />
        ) : (
          <BrideDefs uid={uid} pal={bridePal} />
        )}
      </defs>

      <ellipse cx="100" cy="220" rx={isGroom ? 105 : 110} ry="215" fill={`url(#av-rim-${uid})`} />
      <ellipse cx="100" cy="432" rx={isGroom ? 46 : 52} ry="7" fill="#4a4235" opacity="0.18" />

      <g className={animate ? "anim-breathe" : undefined} style={{ transformOrigin: "100px 420px", animationDuration: isGroom ? "5.5s" : "6.2s" }}>
        {isGroom ? (
          <GroomBody uid={uid} cer={cer} outfit={config.outfit} skin={skin} />
        ) : (
          <BrideBody uid={uid} skin={skin} animate={animate} />
        )}

        <g transform={`translate(0, ${headOffsetY})`}>
          {showHijab && hijabPart?.back}
          {!showHijab && hair2.back}

          <g className={animate ? "anim-sway" : undefined} style={{ transformOrigin: swayOrigin, animationDuration: "7.5s" }}>
            {showEars && (
              <>
                <circle cx="63" cy="94" r="8" fill={ctx.skinUrl} />
                <circle cx="137" cy="94" r="8" fill={ctx.skinUrl} />
              </>
            )}
            {FACE[config.faceShape](ctx)}
            {isGroom && BEARD[config.beard](ctx)}
            {!showHijab && hair2.front}
            {showHijab && hijabPart?.front}

            {BROWS[config.brows](ctx)}
            <g style={animate ? { animation: "blink 6.5s ease-in-out infinite", transformOrigin: "100px 84px" } : undefined}>
              {EYES[config.eyes](ctx)}
            </g>
            {GLASSES[config.glasses](ctx)}
            {NOSE[config.nose](ctx)}
            {/* The bride's mouth sits a touch higher (closer under the nose) for
                a softer, more feminine face; the groom keeps the base position. */}
            <g transform={isGroom ? undefined : "translate(0,-9)"}>
              {MOUTH[config.mouth](ctx)}
            </g>
            <circle cx="76" cy="100" r="7" fill={ctx.blushUrl} />
            <circle cx="124" cy="100" r="7" fill={ctx.blushUrl} />
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ---------------- groom ---------------- */

function GroomDefs({ uid, cer, outfit }: { uid: string; cer: boolean; outfit: string }) {
  const p = cer ? GROOM_CEREMONY : GROOM_OUTFITS[outfit] ?? GROOM_OUTFITS.espresso;
  return (
    <>
      <linearGradient id={`av-suit-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={p.suitA} /><stop offset="1" stopColor={p.suitB} />
      </linearGradient>
      <linearGradient id={`av-vest-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={p.vestA} /><stop offset="1" stopColor={p.vestB} />
      </linearGradient>
      <linearGradient id={`av-legs-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={p.legA} /><stop offset="1" stopColor={p.legB} />
      </linearGradient>
    </>
  );
}

function GroomBody({ uid, cer, outfit, skin }: { uid: string; cer: boolean; outfit: string; skin: (typeof SKIN)["fair"] }) {
  const p = cer ? GROOM_CEREMONY : GROOM_OUTFITS[outfit] ?? GROOM_OUTFITS.espresso;
  const suit = `url(#av-suit-${uid})`;
  const vest = `url(#av-vest-${uid})`;
  const legs = `url(#av-legs-${uid})`;
  const skinUrl = `url(#av-skin-${uid})`;
  return (
    <>
      <path d="M84 300 L80 418 q0 6 7 6 h6 q6 0 6 -6 l3 -118 z" fill={legs} />
      <path d="M116 300 L120 418 q0 6 -7 6 h-6 q-6 0 -6 -6 l-3 -118 z" fill={legs} />
      <path d="M88 305 L85 415" stroke={p.crease} strokeWidth="1.4" opacity="0.5" />
      <path d="M112 305 L115 415" stroke={p.crease} strokeWidth="1.4" opacity="0.5" />
      <path d="M73 418 q-3 12 8 13 h14 q4 0 4 -5 v-8 z" fill="#1a120c" />
      <path d="M127 418 q3 12 -8 13 h-14 q-4 0 -4 -5 v-8 z" fill="#1a120c" />
      <path d="M87 124 h26 v40 q-13 11 -26 0 z" fill={skin.b} />
      <path d="M87 128 q13 8 26 0 v6 q-13 7 -26 0 z" fill={skin.shade} opacity="0.55" />
      <path d="M58 160 q42 -22 84 0 q8 5 8 16 l6 108 q-52 16 -108 0 l6 -108 q0 -11 8 -16 z" fill={suit} stroke="#241a10" strokeWidth="1.6" strokeOpacity="0.35" />
      <path d="M66 166 q-16 8 -20 46 l-8 56 q0 7 7 8 q7 0 8 -6 l12 -60 z" fill={suit} stroke="#241a10" strokeWidth="1.4" strokeOpacity="0.3" />
      <path d="M134 166 q16 8 20 46 l6 40 q-2 8 -9 7 q-6 -1 -7 -7 l-10 -56 z" fill={suit} stroke="#241a10" strokeWidth="1.4" strokeOpacity="0.3" />
      <path d="M44 262 q6 5 15 3 l1 6 q-9 3 -17 -2 z" fill="#f7f3ea" />
      <path d="M156 246 q-6 5 -15 3 l-1 6 q9 3 17 -2 z" fill="#f7f3ea" />
      <circle cx="52" cy="274" r="8" fill={skinUrl} />
      <circle cx="148" cy="258" r="8" fill={skinUrl} />
      <rect x="140" y="243" width="14" height="7" rx="3" fill="#3a2e22" />
      <circle cx="147" cy="246.5" r="4" fill="#e8ce8f" stroke="#3a2e22" strokeWidth="1.4" />
      <path d="M100 156 l-15 8 v70 h30 v-70 z" fill="#f7f3ea" />
      <path d="M85 166 l15 8 l15 -8 l6 20 l-5 58 q-16 8 -32 0 l-5 -58 z" fill={vest} />
      <circle cx="100" cy="204" r="1.5" fill="#c9a24b" />
      <circle cx="100" cy="218" r="1.5" fill="#c9a24b" />
      <circle cx="100" cy="232" r="1.5" fill="#c9a24b" />
      <path d="M96 156 l-22 8 l14 74 l10 -8 z" fill={p.lapel} />
      <path d="M104 156 l22 8 l-14 74 l-10 -8 z" fill={p.lapel} />
      {cer ? (
        <>
          <path d="M99 166 q-11 -7 -14 -1 q-2 6 3 9 q6 3 11 -3 z" fill="#17171d" />
          <path d="M101 166 q11 -7 14 -1 q2 6 -3 9 q-6 3 -11 -3 z" fill="#17171d" />
          <rect x="96.5" y="163" width="7" height="8" rx="2.4" fill="#26262e" />
        </>
      ) : (
        <>
          <path d="M100 162 l6 7 l-3 42 l-3 6 l-3 -6 l-3 -42 z" fill="#ead9b0" />
          <path d="M100 162 l6 7 l-6 3 l-6 -3 z" fill="#dcc491" />
        </>
      )}
      <path d="M120 196 l10 -4 l-1 8 l-8 2 z" fill="#f7f3ea" />
    </>
  );
}

/* ---------------- bride ---------------- */

function BrideDefs({ uid, pal }: { uid: string; pal: (typeof BRIDE_OUTFITS)["champagne"] }) {
  return (
    <>
      <linearGradient id={`av-hijab-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stopColor={pal.hijabA} /><stop offset="1" stopColor={pal.hijabB} />
      </linearGradient>
      <linearGradient id={`av-dress-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={pal.dressA} /><stop offset="0.6" stopColor={pal.dressB} /><stop offset="1" stopColor={pal.dressC} />
      </linearGradient>
    </>
  );
}

function BrideBody({ uid, skin, animate }: { uid: string; skin: (typeof SKIN)["fair"]; animate: boolean }) {
  const dress = `url(#av-dress-${uid})`;
  const skinUrl = `url(#av-skin-${uid})`;
  return (
    <>
      {/* neck (shows in hair-mode; hidden by hijab otherwise) */}
      <path d="M89 150 h22 v26 q-11 8 -22 0 z" fill={skin.b} />
      <path
        d="M72 176 q28 -14 56 0 q10 6 14 30 l22 214 q-64 20 -128 0 l22 -214 q4 -24 14 -30 z"
        fill={dress}
        className={animate ? "anim-sway-soft" : undefined}
        style={{ transformOrigin: "100px 200px", animationDuration: "9s" }}
      />
      <path d="M92 200 q-10 110 -14 214 q10 4 18 2 q-2 -108 4 -216 z" fill="#fff" opacity="0.26" />
      <path d="M118 214 q6 100 8 196 q8 -2 12 -5 q-8 -96 -14 -193 z" fill="#fff" opacity="0.14" />
      {[[88, 200], [106, 205], [97, 214], [114, 222], [84, 224], [101, 231], [91, 243], [111, 246], [98, 258], [86, 262]].map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r="1.5" fill="#fffdf4" opacity="0.9" />
      ))}
      <path d="M74 184 q-18 8 -22 42 l-8 54 q0 7 7 8 q6 0 8 -6 l12 -58 z" fill={dress} />
      <path d="M126 184 q18 8 22 42 l8 54 q0 7 -7 8 q-6 0 -8 -6 l-12 -58 z" fill={dress} />
      <circle cx="46" cy="286" r="7.5" fill={skinUrl} />
      <circle cx="154" cy="286" r="7.5" fill={skinUrl} />
    </>
  );
}
