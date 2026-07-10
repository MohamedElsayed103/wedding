"use client";

import { useMemo, useRef, useState } from "react";
import { useProgressEffect } from "@/hooks/useScroll";
import { clamp, seededRandom } from "@/lib/utils";

/**
 * Time-of-day keyframes across the film's progress (0..1).
 *
 * PERFORMANCE NOTE: rewriting a full-screen `background: linear-gradient(...)`
 * every scroll frame forces a full-screen repaint per frame — the single
 * biggest FPS killer on phones. Instead we stack two fixed gradient layers
 * and crossfade the top one's OPACITY (compositor-only). Gradient strings are
 * only rewritten when scroll crosses into a new segment (a handful of times
 * across the whole film).
 */
interface SkyStop {
  at: number;
  top: string;
  mid: string;
  bot: string;
  sunY: number; // 0 = top, 1 = horizon
  glow: number; // ambient warm glow strength 0..1
  stars: number; // starfield opacity 0..1
  dusk: number; // warm/orange sun tint 0..1
}

const SKY: SkyStop[] = [
  { at: 0.0, top: "#cfe1ea", mid: "#e9eede", bot: "#f7f0e2", sunY: 0.22, glow: 0.25, stars: 0, dusk: 0 },
  { at: 0.2, top: "#cfe3e6", mid: "#eef0e0", bot: "#f8f1e3", sunY: 0.18, glow: 0.35, stars: 0, dusk: 0 },
  { at: 0.42, top: "#dfe6d6", mid: "#f2ecd8", bot: "#faf2e1", sunY: 0.24, glow: 0.5, stars: 0, dusk: 0.15 },
  { at: 0.62, top: "#e8c99a", mid: "#f3d9ab", bot: "#f6e6c4", sunY: 0.52, glow: 0.9, stars: 0.05, dusk: 0.7 },
  { at: 0.78, top: "#a98a86", mid: "#d9b593", bot: "#eccfa5", sunY: 0.74, glow: 0.7, stars: 0.25, dusk: 1 },
  { at: 0.9, top: "#4a4a63", mid: "#7d6d78", bot: "#bfa07f", sunY: 0.9, glow: 0.4, stars: 0.7, dusk: 0.6 },
  { at: 1.0, top: "#2b2c44", mid: "#3f3d54", bot: "#6a5b5a", sunY: 0.2, glow: 0.3, stars: 1, dusk: 0 },
];

const gradientOf = (s: SkyStop) =>
  `linear-gradient(180deg, ${s.top} 0%, ${s.mid} 52%, ${s.bot} 100%)`;

/** Find the segment index i such that SKY[i].at <= p <= SKY[i+1].at. */
function segmentAt(p: number): number {
  for (let i = 0; i < SKY.length - 1; i++) {
    if (p <= SKY[i + 1].at) return i;
  }
  return SKY.length - 2;
}

export function Sky() {
  const baseRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const sunDuskRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const segRef = useRef(-1);

  const stars = useMemo(() => {
    const rnd = seededRandom(1337);
    const r2 = (n: number) => Math.round(n * 100) / 100;
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      x: r2(rnd() * 100),
      y: r2(rnd() * 70),
      s: r2(0.6 + rnd() * 1.8),
      d: r2(2 + rnd() * 4),
      delay: r2(rnd() * 4),
    }));
  }, []);

  const [starsVisible, setStarsVisible] = useState(false);
  const [cloudsVisible, setCloudsVisible] = useState(true);

  useProgressEffect((p) => {
    const i = segmentAt(p);
    const a = SKY[i];
    const b = SKY[i + 1];
    const t = clamp((p - a.at) / (b.at - a.at || 1));

    // Rewrite gradients only on segment change (rare, one-time paint).
    if (segRef.current !== i) {
      segRef.current = i;
      if (baseRef.current) baseRef.current.style.background = gradientOf(a);
      if (fadeRef.current) fadeRef.current.style.background = gradientOf(b);
    }
    // Continuous per-frame work: opacity + transform only.
    if (fadeRef.current) fadeRef.current.style.opacity = t.toFixed(3);

    const sunY = a.sunY + (b.sunY - a.sunY) * t;
    const dusk = a.dusk + (b.dusk - a.dusk) * t;
    const sunTransform = `translate(-50%, 0) translate(${((p - 0.5) * 26).toFixed(2)}vw, ${(sunY * 62 + 4).toFixed(2)}vh)`;
    if (sunRef.current) sunRef.current.style.transform = sunTransform;
    if (sunDuskRef.current) {
      sunDuskRef.current.style.transform = sunTransform;
      sunDuskRef.current.style.opacity = dusk.toFixed(3);
    }
    if (glowRef.current)
      glowRef.current.style.opacity = (a.glow + (b.glow - a.glow) * t).toFixed(3);
    if (starsRef.current)
      starsRef.current.style.opacity = (a.stars + (b.stars - a.stars) * t).toFixed(3);

    setStarsVisible((v) => (p > 0.55 ? true : p < 0.5 ? false : v));
    setCloudsVisible((v) => (p < 0.78 ? true : p > 0.82 ? false : v));
  });

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden" aria-hidden>
      {/* two stacked gradients — only the top layer's opacity animates */}
      <div ref={baseRef} className="absolute inset-0" style={{ background: gradientOf(SKY[0]) }} />
      <div
        ref={fadeRef}
        className="absolute inset-0"
        style={{ background: gradientOf(SKY[1]), opacity: 0, willChange: "opacity" }}
      />

      {/* Sun — warm daylight disc + a dusk-orange twin crossfaded above it.
          Both move with transform only. */}
      <div
        ref={sunRef}
        className="absolute left-1/2 top-0 h-[46vmin] w-[46vmin] rounded-full"
        style={{
          background: "radial-gradient(circle, #fff2cf 0%, transparent 68%)",
          willChange: "transform",
        }}
      />
      <div
        ref={sunDuskRef}
        className="absolute left-1/2 top-0 h-[46vmin] w-[46vmin] rounded-full"
        style={{
          background: "radial-gradient(circle, #ffb877 0%, transparent 68%)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* Warm ambient glow from the horizon */}
      <div
        ref={glowRef}
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 118%, rgba(201,162,75,0.55), rgba(201,162,75,0) 60%)",
          opacity: 0.3,
        }}
      />

      {/* Starfield (mounted only near night) */}
      <div ref={starsRef} className="absolute inset-0" style={{ opacity: 0 }}>
        {starsVisible &&
          stars.map((st) => (
            <span
              key={st.id}
              className="absolute rounded-full bg-white anim-twinkle"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                width: `${st.s}px`,
                height: `${st.s}px`,
                animationDuration: `${st.d}s`,
                animationDelay: `${st.delay}s`,
                boxShadow: "0 0 6px rgba(255,255,255,0.8)",
              }}
            />
          ))}
      </div>

      {/* Drifting soft clouds (daytime only) */}
      {cloudsVisible && <Clouds />}
    </div>
  );
}

function Clouds() {
  const cloudsRef = useRef<HTMLDivElement>(null);
  useProgressEffect((p) => {
    if (cloudsRef.current) {
      cloudsRef.current.style.opacity = String(clamp(1 - p * 1.25) * 0.8);
    }
  });
  const clouds = useMemo(() => {
    const rnd = seededRandom(88);
    const r2 = (n: number) => Math.round(n * 100) / 100;
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: r2(6 + rnd() * 34),
      scale: r2(0.7 + rnd() * 0.9),
      dur: r2(40 + rnd() * 40),
      delay: r2(-rnd() * 40),
      left: r2(rnd() * 80),
    }));
  }, []);
  return (
    <div ref={cloudsRef} className="absolute inset-0">
      {clouds.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            transform: `scale(${c.scale})`,
            animation: `drift-cloud ${c.dur}s ease-in-out ${c.delay}s infinite alternate`,
          }}
        >
          <svg width="240" height="90" viewBox="0 0 240 90" fill="none">
            <g fill="rgba(255,255,255,0.72)">
              <ellipse cx="70" cy="55" rx="60" ry="30" />
              <ellipse cx="120" cy="42" rx="52" ry="34" />
              <ellipse cx="170" cy="55" rx="55" ry="28" />
              <ellipse cx="110" cy="62" rx="80" ry="22" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
