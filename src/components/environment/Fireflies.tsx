"use client";

import { useMemo, useRef } from "react";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { useProgressEffect } from "@/hooks/useScroll";
import { seededRandom, smoothstep } from "@/lib/utils";

/** Fireflies that only ignite as the film approaches night. */
export function Fireflies() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { density } = useDeviceTier();

  const count = Math.max(8, Math.round(26 * density));

  const flies = useMemo(() => {
    const rnd = seededRandom(707);
    const r2 = (n: number) => Math.round(n * 100) / 100;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: r2(rnd() * 100),
      y: r2(30 + rnd() * 65),
      size: r2(2 + rnd() * 3.5),
      dur: r2(4 + rnd() * 6),
      delay: r2(rnd() * 6),
      drift: r2(6 + rnd() * 16),
    }));
  }, [count]);

  useProgressEffect((p) => {
    if (wrapRef.current) {
      // Ignite from dusk (0.72) into night.
      wrapRef.current.style.opacity = String(smoothstep(0.7, 0.95, p));
    }
  });

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ opacity: 0 }}
      aria-hidden
    >
      {flies.map((f) => (
        <span
          key={f.id}
          className="absolute rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: "#ffe9a8",
            boxShadow: "0 0 10px 3px rgba(255,220,140,0.85)",
            animation: `twinkle ${f.dur}s ease-in-out ${f.delay}s infinite, float-y ${
              Math.round(f.dur * 160) / 100
            }s ease-in-out ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
