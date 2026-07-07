"use client";

import { cx } from "@/lib/utils";

interface Props {
  outfit?: "casual" | "wedding";
  className?: string;
  facing?: "left" | "right" | "front";
  animate?: boolean;
}

/**
 * Mariam — a refined flat-illustration bride in an elegant hijab that wraps the
 * head and drapes over the shoulders (no visible hair, modest). Soft features,
 * gentle smile. Blinks, breathes and the hijab sways in the wind.
 */
export function Mariam({
  outfit = "casual",
  className,
  facing = "front",
  animate = true,
}: Props) {
  const isWedding = outfit === "wedding";
  const flip = facing === "left" ? -1 : 1;

  // Casual look uses a dusty rose/terracotta — luminous ivory for the wedding
  // gown. The rose reads clearly against the cream/beige garden backdrop
  // (plain beige on beige used to disappear into the background).
  const hijabA = isWedding ? "#fdfaf3" : "#d99a8c";
  const hijabB = isWedding ? "#ece1cf" : "#b06e5c";
  const dressA = isWedding ? "#fdfaf3" : "#d38f7f";
  const dressB = isWedding ? "#eee4d1" : "#a8604f";
  // Scope gradient ids per outfit — SVG ids are document-global and both
  // outfits render together during the transformation cross-fade.
  const u = isWedding ? "w" : "c";
  const skin = `url(#w-skin-${u})`;
  const hijab = `url(#w-hijab-${u})`;
  const dress = `url(#w-dress-${u})`;
  const blush = `url(#w-blush-${u})`;

  return (
    <svg
      viewBox="0 0 200 440"
      className={cx("h-full w-auto select-none", className)}
      style={{ transform: `scaleX(${flip})`, overflow: "visible" }}
      role="img"
      aria-label="Mariam"
    >
      <defs>
        <linearGradient id={`w-skin-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fadcc0" />
          <stop offset="1" stopColor="#f2c8a2" />
        </linearGradient>
        <linearGradient id={`w-hijab-${u}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={hijabA} />
          <stop offset="1" stopColor={hijabB} />
        </linearGradient>
        <linearGradient id={`w-dress-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dressA} />
          <stop offset="1" stopColor={dressB} />
        </linearGradient>
        <radialGradient id={`w-blush-${u}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f0977f" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f0977f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="100" cy="432" rx="52" ry="7" fill="#4a4235" opacity="0.15" />

      <g
        className={animate ? "anim-breathe" : undefined}
        style={{ transformOrigin: "100px 420px", animationDuration: "6.2s" }}
      >
        {/* ---- long flowing dress, hem resting on the ground ---- */}
        <path
          d="M72 176 q28 -14 56 0 q10 6 14 30 l22 214 q-64 20 -128 0 l22 -214 q4 -24 14 -30 z"
          fill={dress}
          className={animate ? "anim-sway-soft" : undefined}
          style={{ transformOrigin: "100px 200px", animationDuration: "9s" }}
        />
        {/* soft central sheen */}
        <path d="M100 200 q-16 110 -22 216 q22 7 44 0 q-6 -106 -22 -216 z" fill="#fff" opacity={isWedding ? 0.32 : 0.14} />
        {/* pearl beading on the bodice */}
        {[
          [90, 206], [108, 210], [99, 220], [116, 226], [84, 228],
          [102, 236], [92, 248], [112, 250],
        ].map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r="1.4" fill="#fff" opacity="0.9" />
        ))}
        {/* wedding train */}
        {isWedding && (
          <path
            d="M140 220 q46 44 34 200 q-22 8 -40 4 q10 -104 6 -204 z"
            fill="#fdfaf3"
            opacity="0.8"
            className={animate ? "anim-sway-soft" : undefined}
            style={{ transformOrigin: "140px 220px", animationDuration: "10s" }}
          />
        )}

        {/* ---- sleeves + hands ---- */}
        <path d="M74 184 q-18 8 -22 42 l-8 54 q0 7 7 8 q6 0 8 -6 l12 -58 z" fill={dress} />
        <path d="M126 184 q18 8 22 42 l8 54 q0 7 -7 8 q-6 0 -8 -6 l-12 -58 z" fill={dress} />
        <circle cx="46" cy="286" r="7.5" fill={skin} />
        <circle cx="154" cy="286" r="7.5" fill={skin} />

        {/* head + hijab shifted down so they rest on the shoulders/drape */}
        <g transform="translate(0,18)">
        {/* ---- hijab hood + shoulder drape (behind face) ---- */}
        <path
          d="M100 30
             C62 30 49 62 52 100
             C53 122 62 152 80 158
             C88 161 94 152 100 152
             C106 152 112 161 120 158
             C138 152 147 122 148 100
             C151 62 138 30 100 30 Z"
          fill={hijab}
          className={animate ? "anim-sway" : undefined}
          style={{ transformOrigin: "100px 96px", animationDuration: "7.5s" }}
        />

        {/* ---- head group ---- */}
        <g
          className={animate ? "anim-sway" : undefined}
          style={{ transformOrigin: "100px 96px", animationDuration: "7.5s" }}
        >
          {/* face */}
          <ellipse cx="100" cy="84" rx="31" ry="37" fill={skin} />

          {/* hijab front frame — covers forehead sides + under the chin */}
          <path
            d="M100 47
               C74 47 66 66 68 92
               C60 90 58 74 63 58
               C70 40 84 33 100 33
               C116 33 130 40 137 58
               C142 74 140 90 132 92
               C134 66 126 47 100 47 Z"
            fill={hijab}
          />
          {/* under-chin wrap hiding the neck */}
          <path d="M72 108 q28 26 56 0 q4 22 -12 34 q-16 8 -32 0 q-16 -12 -12 -34 z" fill={hijab} />
          {/* soft fold line + a little pin */}
          <path d="M70 96 q6 -22 24 -28" stroke="#00000012" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="128" cy="104" r="2.2" fill="#e8ce8f" />

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
            <circle cx="86" cy="86" r="3.2" fill="#4a2f1e" />
            <circle cx="116" cy="86" r="3.2" fill="#4a2f1e" />
            <circle cx="87.2" cy="84.4" r="1.1" fill="#fff" />
            <circle cx="117.2" cy="84.4" r="1.1" fill="#fff" />
            <path d="M79 80 q6 -3 12 -1" stroke="#3a241a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M109 79 q6 -2 12 1" stroke="#3a241a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>

          {/* nose */}
          <path d="M100 88 q2 7 -1 11 q-2 1 -3 0" stroke="#e6a884" strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* blush */}
          <circle cx="80" cy="98" r="7" fill={blush} />
          <circle cx="120" cy="98" r="7" fill={blush} />

          {/* soft smile + lips */}
          <path d="M91 106 q9 8 18 0" stroke="#c56a55" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M93 106 q7 4 14 0 q-7 4 -14 0 z" fill="#df8873" opacity="0.55" />
        </g>
        </g>
      </g>
    </svg>
  );
}
