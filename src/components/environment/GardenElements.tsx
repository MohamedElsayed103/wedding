"use client";

import { useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { useProgressEffect } from "@/hooks/useScroll";

/* ---------------- Rose / blossom ---------------- */
interface FlowerProps {
  className?: string;
  color?: string;
  center?: string;
  size?: number;
  bloom?: boolean; // whether interactive hover bloom is enabled
  style?: React.CSSProperties;
  sway?: boolean;
}

export function Flower({
  className,
  color = "#fbf7ef",
  center = "#e8ce8f",
  size = 60,
  bloom = true,
  style,
  sway = true,
}: FlowerProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={cx("inline-block", sway && "anim-sway-soft", className)}
      style={{ width: size, height: size, transformOrigin: "bottom center", ...style }}
      onPointerEnter={() => bloom && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full overflow-visible transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.18)" : "scale(1)" }}
      >
        <g style={{ transformOrigin: "50px 50px" }}>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="30"
              rx="15"
              ry="22"
              fill={color}
              stroke="rgba(201,162,75,0.25)"
              strokeWidth="1"
              style={{
                transformOrigin: "50px 50px",
                transform: `rotate(${deg}deg) scale(${hovered ? 1.08 : 1})`,
                transition: "transform 0.5s var(--ease-silk)",
              }}
            />
          ))}
          {/* inner petals */}
          {[30, 90, 150, 210, 270, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="38"
              rx="9"
              ry="14"
              fill={color}
              opacity="0.92"
              style={{
                transformOrigin: "50px 50px",
                transform: `rotate(${deg}deg)`,
              }}
            />
          ))}
          <circle cx="50" cy="50" r="8" fill={center} />
          <circle cx="50" cy="50" r="4" fill="#c9a24b" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

/* ---------------- Lantern (swings, glows at night) ---------------- */
export function Lantern({
  className,
  size = 70,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  const glowRef = useRef<SVGEllipseElement>(null);
  useProgressEffect((p) => {
    if (glowRef.current) {
      const on = Math.max(0, (p - 0.6) / 0.35);
      glowRef.current.style.opacity = String(Math.min(1, on));
    }
  });
  return (
    <div
      className={cx("anim-swing inline-block", className)}
      style={{ width: size, height: Math.round(size * 180) / 100, ...style }}
    >
      <svg viewBox="0 0 60 110" className="h-full w-full overflow-visible">
        {/* hang string */}
        <line x1="30" y1="0" x2="30" y2="18" stroke="#8a7250" strokeWidth="1.5" />
        {/* glow */}
        <ellipse ref={glowRef} cx="30" cy="60" rx="34" ry="40" fill="#ffdd9c" opacity="0" style={{ filter: "blur(8px)" }} />
        {/* cap */}
        <path d="M18 20 h24 l-4 8 h-16 z" fill="#a67c34" />
        {/* body */}
        <rect x="18" y="28" width="24" height="46" rx="8" fill="#f6e6c4" stroke="#c9a24b" strokeWidth="1.5" />
        <rect x="22" y="34" width="16" height="34" rx="5" fill="#ffe9b8" />
        {/* flame */}
        <ellipse cx="30" cy="52" rx="4" ry="7" fill="#ffb867" className="anim-twinkle" />
        {/* base */}
        <path d="M20 74 h20 l-3 8 h-14 z" fill="#a67c34" />
      </svg>
    </div>
  );
}

/* ---------------- Grand flower arch ---------------- */
export function FlowerArch({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const blossoms = [
    5, 12, 20, 28, 35, 42, 50, 58, 65, 72, 80, 88, 95,
  ];
  return (
    <svg
      viewBox="0 0 300 260"
      className={cx("overflow-visible", className)}
      style={style}
      aria-hidden
    >
      {/* arch structure */}
      <path
        d="M40 260 L40 130 Q40 30 150 30 Q260 30 260 130 L260 260"
        fill="none"
        stroke="#b9a888"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M40 260 L40 130 Q40 30 150 30 Q260 30 260 130 L260 260"
        fill="none"
        stroke="#8f7d5f"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* greenery + roses along the arch */}
      {blossoms.map((t, i) => {
        // parametric position along the arch path (approx.)
        // NOTE: round to fixed precision so the SSR and client markup match
        // exactly (raw floats stringify differently → hydration mismatch).
        const angle = Math.PI * (t / 100);
        const cx = Math.round(150 - Math.cos(angle) * 118);
        const cy = Math.round(130 - Math.sin(angle) * 100);
        const r = 10 + (i % 3) * 4;
        const cyTop = cy - Math.round(r * 0.6);
        const rx = Math.round(r * 0.5 * 100) / 100;
        const ry = Math.round(r * 0.8 * 100) / 100;
        const innerR = Math.round(r * 0.34 * 100) / 100;
        const white = i % 2 === 0;
        return (
          <g key={i} style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <circle cx={cx} cy={cy} r={r + 5} fill="#7d8a5f" opacity="0.4" />
            <g
              className="anim-sway-soft"
              style={{ transformOrigin: `${cx}px ${cy}px`, animationDelay: `${(i * 2) / 10}s` }}
            >
              {[0, 72, 144, 216, 288].map((d) => (
                <ellipse
                  key={d}
                  cx={cx}
                  cy={cyTop}
                  rx={rx}
                  ry={ry}
                  fill={white ? "#fbf7ef" : "#f0d9c4"}
                  style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${d}deg)` }}
                />
              ))}
              <circle cx={cx} cy={cy} r={innerR} fill="#e8ce8f" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- Olive branch ---------------- */
export function OliveBranch({
  className,
  style,
  flip = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 80"
      className={cx("overflow-visible anim-sway-soft", className)}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
      aria-hidden
    >
      <path d="M0 40 Q100 20 200 40" fill="none" stroke="#7d8a5f" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 20 + i * 20;
        const y = 40 - Math.sin((i / 9) * Math.PI) * 12;
        const up = i % 2 === 0;
        return (
          <g key={i}>
            <ellipse cx={x} cy={up ? y - 10 : y + 10} rx="9" ry="4" fill="#9caa7d" transform={`rotate(${up ? -30 : 30} ${x} ${y})`} />
            {i % 3 === 0 && <circle cx={x} cy={y} r="3.4" fill="#5c6a44" />}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- Fountain (reflects light) ---------------- */
export function Fountain({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 200 160" className={cx("overflow-visible", className)} style={style} aria-hidden>
      {/* basin */}
      <ellipse cx="100" cy="130" rx="86" ry="22" fill="#cdbd9a" />
      <ellipse cx="100" cy="126" rx="80" ry="18" fill="#dfe9ec" />
      <ellipse cx="100" cy="126" rx="80" ry="18" fill="url(#water-sheen)" opacity="0.7" />
      {/* pillar */}
      <rect x="92" y="70" width="16" height="52" rx="4" fill="#cdbd9a" />
      <ellipse cx="100" cy="70" rx="26" ry="8" fill="#dbcaa4" />
      {/* water arcs */}
      {[-1, 1].map((d) => (
        <path
          key={d}
          d={`M100 66 q${d * 40} 6 ${d * 34} 48`}
          fill="none"
          stroke="#eaf3f5"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
          className="anim-float"
          style={{ animationDuration: "3s" }}
        />
      ))}
      <defs>
        <linearGradient id="water-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.6" className="anim-shimmer" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------------- Layered grass / bushes silhouette ---------------- */
export function FoliageRow({
  className,
  color = "#7d8a5f",
  style,
}: {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      className={cx("block w-full", className)}
      style={style}
      aria-hidden
    >
      <path
        d="M0 160 V80 Q60 40 120 70 Q180 30 250 65 Q320 20 400 60 Q470 25 550 65 Q640 30 720 60 Q800 25 880 62 Q960 30 1040 66 Q1120 35 1200 72 V160 Z"
        fill={color}
      />
    </svg>
  );
}
