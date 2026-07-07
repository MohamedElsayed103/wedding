"use client";

import { cx } from "@/lib/utils";

interface Props {
  outfit?: "casual" | "wedding";
  className?: string;
  facing?: "left" | "right" | "front";
  animate?: boolean;
}

/**
 * Mohamed — a refined flat-illustration groom: fair skin, tidy dark hair,
 * a neat trimmed beard following the jaw, warm eyes and a gentle smile.
 * Blinks, breathes and sways softly.
 */
export function Mohamed({
  outfit = "casual",
  className,
  facing = "front",
  animate = true,
}: Props) {
  const isWedding = outfit === "wedding";
  const flip = facing === "left" ? -1 : 1;
  // SVG gradient ids are document-global; scope them per outfit so multiple
  // instances on the page (e.g. the transformation cross-fade) never collide.
  const u = isWedding ? "w" : "c";
  const skin = `url(#m-skin-${u})`;
  const hair = `url(#m-hair-${u})`;
  const jacket = `url(#m-jacket-${u})`;
  const legs = `url(#m-legs-${u})`;
  const blush = `url(#m-blush-${u})`;

  return (
    <svg
      viewBox="0 0 200 440"
      className={cx("h-full w-auto select-none", className)}
      style={{ transform: `scaleX(${flip})`, overflow: "visible" }}
      role="img"
      aria-label="Mohamed"
    >
      <defs>
        <linearGradient id={`m-skin-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d9bd" />
          <stop offset="1" stopColor="#eec49e" />
        </linearGradient>
        <linearGradient id={`m-hair-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2a1e" />
          <stop offset="1" stopColor="#241811" />
        </linearGradient>
        <linearGradient id={`m-jacket-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={isWedding ? "#3d3d46" : "#efe7d6"} />
          <stop offset="1" stopColor={isWedding ? "#282830" : "#ddd0b8"} />
        </linearGradient>
        <linearGradient id={`m-legs-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={isWedding ? "#33333b" : "#f2ecdd"} />
          <stop offset="1" stopColor={isWedding ? "#22222a" : "#e6ddc9"} />
        </linearGradient>
        <radialGradient id={`m-blush-${u}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#eea882" stopOpacity="0.5" />
          <stop offset="1" stopColor="#eea882" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="100" cy="432" rx="46" ry="7" fill="#4a4235" opacity="0.15" />

      <g
        className={animate ? "anim-breathe" : undefined}
        style={{ transformOrigin: "100px 420px" }}
      >
        {/* ---- legs ---- */}
        <path d="M84 300 L80 418 q0 6 7 6 h6 q6 0 6 -6 l3 -118 z" fill={legs} />
        <path d="M116 300 L120 418 q0 6 -7 6 h-6 q-6 0 -6 -6 l-3 -118 z" fill={legs} />
        {/* shoes */}
        <path d="M73 418 q-3 12 8 13 h14 q4 0 4 -5 v-8 z" fill={isWedding ? "#1c1610" : "#7c6244"} />
        <path d="M127 418 q3 12 -8 13 h-14 q-4 0 -4 -5 v-8 z" fill={isWedding ? "#1c1610" : "#7c6244"} />

        {/* ---- neck (drawn before torso so the shoulders overlap its base) ---- */}
        <path d="M87 124 h26 v40 q-13 11 -26 0 z" fill="#e7ba92" />
        {/* neck shadow under the jaw */}
        <path d="M87 128 q13 8 26 0 v6 q-13 7 -26 0 z" fill="#d9a980" opacity="0.55" />

        {/* ---- torso (shoulders raised to meet the neck) ---- */}
        <path
          d="M58 160 q42 -22 84 0 q8 5 8 16 l6 108 q-52 16 -108 0 l6 -108 q0 -11 8 -16 z"
          fill={jacket}
        />

        {/* ---- arms ---- */}
        <path d="M66 166 q-16 8 -20 46 l-8 56 q0 7 7 8 q7 0 8 -6 l12 -60 z" fill={jacket} />
        <path d="M134 166 q16 8 20 46 l8 56 q0 7 -7 8 q-7 0 -8 -6 l-12 -60 z" fill={jacket} />
        <circle cx="42" cy="278" r="8" fill={skin} />
        <circle cx="158" cy="278" r="8" fill={skin} />

        {/* ---- outfit detail ---- */}
        {isWedding ? (
          <>
            {/* shirt V */}
            <path d="M100 156 l-15 8 v70 h30 v-70 z" fill="#f4ecda" />
            {/* waistcoat */}
            <path d="M85 166 l15 8 l15 -8 l6 20 l-5 58 q-16 8 -32 0 l-5 -58 z" fill="#2b2b33" />
            <circle cx="100" cy="204" r="1.5" fill="#c9a24b" />
            <circle cx="100" cy="218" r="1.5" fill="#c9a24b" />
            <circle cx="100" cy="232" r="1.5" fill="#c9a24b" />
            {/* lapels */}
            <path d="M96 156 l-22 8 l14 74 l10 -8 z" fill="#31313a" />
            <path d="M104 156 l22 8 l-14 74 l-10 -8 z" fill="#31313a" />
            {/* tie */}
            <path d="M100 162 l6 7 l-3 42 l-3 6 l-3 -6 l-3 -42 z" fill="#e6d3a8" />
          </>
        ) : (
          <>
            {/* open collar */}
            <path d="M100 156 l-13 7 l7 12 l6 -8 z" fill="#e6dcc6" />
            <path d="M100 156 l13 7 l-7 12 l-6 -8 z" fill="#e6dcc6" />
            <circle cx="100" cy="192" r="1.6" fill="#c3b48f" />
            <circle cx="100" cy="212" r="1.6" fill="#c3b48f" />
            <circle cx="100" cy="232" r="1.6" fill="#c3b48f" />
          </>
        )}

        {/* ---- head (pivots at the neck base so it never detaches) ---- */}
        <g
          className={animate ? "anim-sway" : undefined}
          style={{ transformOrigin: "100px 132px", animationDuration: "8s" }}
        >
          {/* ears */}
          <circle cx="63" cy="94" r="8" fill={skin} />
          <circle cx="137" cy="94" r="8" fill={skin} />

          {/* face — clean-shaven */}
          <path
            d="M62 72 q0 -36 38 -36 q38 0 38 36 q0 28 -9 46 q-9 20 -29 20 q-20 0 -29 -20 q-9 -18 -9 -46 z"
            fill={skin}
          />
          {/* soft jaw shading */}
          <path d="M72 116 q28 22 56 0 q-6 16 -28 16 q-22 0 -28 -16 z" fill="#e6b892" opacity="0.4" />

          {/* short, tidy swept hair */}
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
            fill={hair}
          />
          {/* darker under-layer for depth at the sides */}
          <path d="M60 82 C57 62 62 48 71 40 C66 54 64 68 66 82 Z" fill="#241811" opacity="0.55" />
          <path d="M140 84 C143 64 140 48 131 40 C136 54 138 70 134 84 Z" fill="#241811" opacity="0.5" />
          {/* textured strands swept back */}
          <path d="M80 44 q8 8 6 18" stroke="#7a5636" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M97 40 q8 9 6 20" stroke="#7a5636" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M114 42 q6 8 5 18" stroke="#7a5636" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65" />
          {/* highlight sheen */}
          <path d="M84 38 q16 -5 32 4" stroke="#a07a52" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.5" />

          {/* eyebrows */}
          <path d="M76 72 q9 -4 17 -1" stroke="#3b2a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M107 71 q8 -3 17 1" stroke="#3b2a1e" strokeWidth="3" fill="none" strokeLinecap="round" />

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
            <circle cx="85" cy="85" r="3" fill="#3a2418" />
            <circle cx="117" cy="85" r="3" fill="#3a2418" />
            <circle cx="86.2" cy="83.6" r="1" fill="#fff" />
            <circle cx="118.2" cy="83.6" r="1" fill="#fff" />
          </g>

          {/* nose */}
          <path d="M100 88 q2 8 -1 13 q-2 2 -4 1" stroke="#dca77e" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* blush */}
          <circle cx="76" cy="100" r="7" fill={blush} />
          <circle cx="124" cy="100" r="7" fill={blush} />

          {/* warm smile */}
          <path d="M89 112 q11 9 22 0" stroke="#a24d3a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
