"use client";

import { cx } from "@/lib/utils";

export type Attire = "signature" | "ceremony";

interface Props {
  className?: string;
  facing?: "left" | "right" | "front";
  animate?: boolean;
  /** "signature" = champagne satin like the photo; "ceremony" = white gown. */
  attire?: Attire;
}

/**
 * Mariam — modelled on the engagement photo: satin hijab draped over the
 * shoulders, matching pearl-beaded satin dress, soft smile. The finale swaps
 * to a luminous white bridal gown. Deeper satin shading + a rim glow keep
 * her clearly readable against the cream garden backdrop.
 */
export function Mariam({
  className,
  facing = "front",
  animate = true,
  attire = "signature",
}: Props) {
  const flip = facing === "left" ? -1 : 1;
  const cer = attire === "ceremony";
  // Scope gradient ids per attire — both attires render in one document.
  const u = cer ? "c" : "s";
  const outline = cer ? "#b8a88e" : "#8f7350";
  const fold = cer ? "#cbbda4" : "#a98a62";

  return (
    <svg
      viewBox="0 0 200 440"
      className={cx("h-full w-auto select-none", className)}
      style={{ transform: `scaleX(${flip})`, overflow: "visible" }}
      role="img"
      aria-label="Mariam"
    >
      <defs>
        <linearGradient id={`ma-skin-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8dabd" />
          <stop offset="1" stopColor="#efc59e" />
        </linearGradient>
        {/* champagne satin (photo) or luminous white bridal satin (ceremony) */}
        <linearGradient id={`ma-hijab-${u}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={cer ? "#fefcf7" : "#eed7ba"} />
          <stop offset="1" stopColor={cer ? "#ddd2bd" : "#c3a077"} />
        </linearGradient>
        <linearGradient id={`ma-dress-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={cer ? "#fefcf7" : "#ecd4b5"} />
          <stop offset="0.6" stopColor={cer ? "#f0e8d6" : "#d9ba90"} />
          <stop offset="1" stopColor={cer ? "#ddd0b6" : "#bd9a6e"} />
        </linearGradient>
        <radialGradient id={`ma-blush-${u}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ef9880" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ef9880" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`ma-rim-${u}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={cer ? "#e8ce8f" : "#fffdf6"} stopOpacity="0.55" />
          <stop offset="0.7" stopColor={cer ? "#e8ce8f" : "#fffdf6"} stopOpacity="0.18" />
          <stop offset="1" stopColor={cer ? "#e8ce8f" : "#fffdf6"} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft rim glow behind the figure */}
      <ellipse cx="100" cy="220" rx="110" ry="215" fill={`url(#ma-rim-${u})`} />

      {/* ground shadow */}
      <ellipse cx="100" cy="432" rx="52" ry="7" fill="#4a4235" opacity="0.18" />

      <g
        className={animate ? "anim-breathe" : undefined}
        style={{ transformOrigin: "100px 420px", animationDuration: "6.2s" }}
      >
        {/* ---- long satin dress, hem resting on the ground ---- */}
        <path
          d="M72 176 q28 -14 56 0 q10 6 14 30 l22 214 q-64 20 -128 0 l22 -214 q4 -24 14 -30 z"
          fill={`url(#ma-dress-${u})`}
          stroke={outline}
          strokeWidth="1.6"
          strokeOpacity="0.35"
          className={animate ? "anim-sway-soft" : undefined}
          style={{ transformOrigin: "100px 200px", animationDuration: "9s" }}
        />
        {/* satin sheen — two vertical light streaks like draped fabric */}
        <path d="M92 200 q-10 110 -14 214 q10 4 18 2 q-2 -108 4 -216 z" fill="#fff" opacity="0.28" />
        <path d="M118 214 q6 100 8 196 q8 -2 12 -5 q-8 -96 -14 -193 z" fill="#fff" opacity="0.16" />
        {/* drape folds */}
        <path d="M74 220 q6 90 2 176" stroke={fold} strokeWidth="1.6" fill="none" opacity="0.5" />
        <path d="M128 226 q4 84 8 168" stroke={fold} strokeWidth="1.6" fill="none" opacity="0.5" />
        {/* pearl beading scattered on the bodice, like the photo */}
        {[
          [88, 200], [106, 205], [97, 214], [114, 222], [84, 224],
          [101, 231], [91, 243], [111, 246], [98, 258], [86, 262],
        ].map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r="1.5" fill="#fffdf4" opacity="0.95" />
        ))}

        {/* ---- sleeves + hands ---- */}
        <path d="M74 184 q-18 8 -22 42 l-8 54 q0 7 7 8 q6 0 8 -6 l12 -58 z" fill={`url(#ma-dress-${u})`} stroke={outline} strokeWidth="1.4" strokeOpacity="0.3" />
        <path d="M126 184 q18 8 22 42 l8 54 q0 7 -7 8 q-6 0 -8 -6 l-12 -58 z" fill={`url(#ma-dress-${u})`} stroke={outline} strokeWidth="1.4" strokeOpacity="0.3" />
        <circle cx="46" cy="286" r="7.5" fill={`url(#ma-skin-${u})`} />
        <circle cx="154" cy="286" r="7.5" fill={`url(#ma-skin-${u})`} />

        {/* head + hijab, resting on the shoulders */}
        <g transform="translate(0,18)">
          {/* hijab hood + shoulder drape (behind face) */}
          <path
            d="M100 30
               C62 30 49 62 52 100
               C53 122 62 152 80 158
               C88 161 94 152 100 152
               C106 152 112 161 120 158
               C138 152 147 122 148 100
               C151 62 138 30 100 30 Z"
            fill={`url(#ma-hijab-${u})`}
            stroke={outline}
            strokeWidth="1.6"
            strokeOpacity="0.3"
            className={animate ? "anim-sway" : undefined}
            style={{ transformOrigin: "100px 96px", animationDuration: "7.5s" }}
          />

          <g
            className={animate ? "anim-sway" : undefined}
            style={{ transformOrigin: "100px 96px", animationDuration: "7.5s" }}
          >
            {/* face */}
            <ellipse cx="100" cy="84" rx="31" ry="37" fill={`url(#ma-skin-${u})`} />

            {/* hijab front frame — forehead + sides */}
            <path
              d="M100 47
                 C74 47 66 66 68 92
                 C60 90 58 74 63 58
                 C70 40 84 33 100 33
                 C116 33 130 40 137 58
                 C142 74 140 90 132 92
                 C134 66 126 47 100 47 Z"
              fill={`url(#ma-hijab-${u})`}
            />
            {/* under-chin wrap */}
            <path d="M72 108 q28 26 56 0 q4 22 -12 34 q-16 8 -32 0 q-16 -12 -12 -34 z" fill={`url(#ma-hijab-${u})`} />
            {/* fold shadow + gold pin */}
            <path d="M70 96 q6 -22 24 -28" stroke="#00000014" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="128" cy="104" r="2.2" fill="#c9a24b" />

            {/* eyebrows */}
            <path d="M78 74 q8 -3 15 -1" stroke="#6b4a34" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M107 73 q7 -2 15 1" stroke="#6b4a34" strokeWidth="2.4" fill="none" strokeLinecap="round" />

            {/* eyes with lashes */}
            <g
              style={
                animate
                  ? { animation: "blink 5.5s ease-in-out infinite", transformOrigin: "100px 85px" }
                  : undefined
              }
            >
              <ellipse cx="85" cy="85" rx="5.6" ry="6.4" fill="#fff" />
              <ellipse cx="115" cy="85" rx="5.6" ry="6.4" fill="#fff" />
              <circle cx="86" cy="86" r="3.2" fill="#42291a" />
              <circle cx="116" cy="86" r="3.2" fill="#42291a" />
              <circle cx="87.2" cy="84.4" r="1.1" fill="#fff" />
              <circle cx="117.2" cy="84.4" r="1.1" fill="#fff" />
              <path d="M79 80 q6 -3 12 -1" stroke="#33200f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M109 79 q6 -2 12 1" stroke="#33200f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>

            {/* nose */}
            <path d="M100 88 q2 7 -1 11 q-2 1 -3 0" stroke="#e2a37e" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* blush */}
            <circle cx="80" cy="98" r="7" fill={`url(#ma-blush-${u})`} />
            <circle cx="120" cy="98" r="7" fill={`url(#ma-blush-${u})`} />

            {/* soft smile + lips */}
            <path d="M91 106 q9 8 18 0" stroke="#c05f4a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M93 106 q7 4 14 0 q-7 4 -14 0 z" fill="#dd8570" opacity="0.55" />
          </g>
        </g>
      </g>
    </svg>
  );
}
