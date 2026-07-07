"use client";

import { useMemo, useRef } from "react";
import { useProgressEffect } from "@/hooks/useScroll";
import { clamp, lerp, mix, seededRandom } from "@/lib/utils";

/** Time-of-day keyframes across the film's progress (0..1). */
interface SkyStop {
  at: number;
  top: string;
  mid: string;
  bot: string;
  sun: string; // sun/moon colour
  sunY: number; // 0 = top, 1 = horizon
  glow: number; // ambient warm glow strength 0..1
  stars: number; // starfield opacity 0..1
}

const SKY: SkyStop[] = [
  // Soft morning
  { at: 0.0, top: "#cfe1ea", mid: "#e9eede", bot: "#f7f0e2", sun: "#fff4d6", sunY: 0.22, glow: 0.25, stars: 0 },
  { at: 0.2, top: "#cfe3e6", mid: "#eef0e0", bot: "#f8f1e3", sun: "#fff2cf", sunY: 0.18, glow: 0.35, stars: 0 },
  // Warm midday
  { at: 0.42, top: "#dfe6d6", mid: "#f2ecd8", bot: "#faf2e1", sun: "#ffedbf", sunY: 0.24, glow: 0.5, stars: 0 },
  // Golden hour — transformation
  { at: 0.62, top: "#e8c99a", mid: "#f3d9ab", bot: "#f6e6c4", sun: "#ffcf87", sunY: 0.52, glow: 0.9, stars: 0.05 },
  // Dusk
  { at: 0.78, top: "#a98a86", mid: "#d9b593", bot: "#eccfa5", sun: "#ff9d6b", sunY: 0.74, glow: 0.7, stars: 0.25 },
  // Twilight
  { at: 0.9, top: "#4a4a63", mid: "#7d6d78", bot: "#bfa07f", sun: "#ffd9a0", sunY: 0.9, glow: 0.4, stars: 0.7 },
  // Night
  { at: 1.0, top: "#2b2c44", mid: "#3f3d54", bot: "#6a5b5a", sun: "#f4ecd6", sunY: 0.2, glow: 0.3, stars: 1 },
];

function sample(p: number): SkyStop {
  let a = SKY[0];
  let b = SKY[SKY.length - 1];
  for (let i = 0; i < SKY.length - 1; i++) {
    if (p >= SKY[i].at && p <= SKY[i + 1].at) {
      a = SKY[i];
      b = SKY[i + 1];
      break;
    }
  }
  const span = b.at - a.at || 1;
  const t = clamp((p - a.at) / span);
  return {
    at: p,
    top: mix(a.top, b.top, t),
    mid: mix(a.mid, b.mid, t),
    bot: mix(a.bot, b.bot, t),
    sun: mix(a.sun, b.sun, t),
    sunY: lerp(a.sunY, b.sunY, t),
    glow: lerp(a.glow, b.glow, t),
    stars: lerp(a.stars, b.stars, t),
  };
}

export function Sky() {
  const gradRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(() => {
    const rnd = seededRandom(1337);
    const r2 = (n: number) => Math.round(n * 100) / 100;
    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: r2(rnd() * 100),
      y: r2(rnd() * 70),
      s: r2(0.6 + rnd() * 1.8),
      d: r2(2 + rnd() * 4),
      delay: r2(rnd() * 4),
    }));
  }, []);

  useProgressEffect((p) => {
    const s = sample(p);
    if (gradRef.current) {
      gradRef.current.style.background = `linear-gradient(180deg, ${s.top} 0%, ${s.mid} 52%, ${s.bot} 100%)`;
    }
    if (sunRef.current) {
      sunRef.current.style.top = `${s.sunY * 62 + 4}%`;
      sunRef.current.style.background = `radial-gradient(circle, ${s.sun} 0%, transparent 68%)`;
      sunRef.current.style.transform = `translateX(-50%) translateX(${(p - 0.5) * 26}vw)`;
    }
    if (glowRef.current) glowRef.current.style.opacity = String(s.glow);
    if (starsRef.current) starsRef.current.style.opacity = String(s.stars);
  });

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden" aria-hidden>
      <div ref={gradRef} className="absolute inset-0" />

      {/* Sun / moon */}
      <div
        ref={sunRef}
        className="absolute left-1/2 h-[46vmin] w-[46vmin] rounded-full blur-[2px]"
        style={{ background: "radial-gradient(circle, #fff4d6, #fff4d600 68%)" }}
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

      {/* Starfield (fades in at night) */}
      <div ref={starsRef} className="absolute inset-0" style={{ opacity: 0 }}>
        {stars.map((st) => (
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

      {/* Drifting soft clouds */}
      <Clouds />
    </div>
  );
}

function Clouds() {
  const cloudsRef = useRef<HTMLDivElement>(null);
  useProgressEffect((p) => {
    if (cloudsRef.current) {
      // Clouds thin out toward night.
      cloudsRef.current.style.opacity = String(clamp(1 - p * 1.25) * 0.8);
    }
  });
  const clouds = useMemo(() => {
    const rnd = seededRandom(88);
    const r2 = (n: number) => Math.round(n * 100) / 100;
    return Array.from({ length: 5 }, (_, i) => ({
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
