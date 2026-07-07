"use client";

import { useEffect, useMemo, useRef } from "react";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { seededRandom } from "@/lib/utils";

interface Fly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  scale: number;
  hue: string;
  wing: number;
}

const WINGS = ["#c9a24b", "#e8ce8f", "#e8dcc6", "#9caa7d"];

function Wings({ hue, animated }: { hue: string; animated: boolean }) {
  return (
    <div className="relative" style={{ width: 26, height: 22 }}>
      <span
        data-wl
        className={animated ? "anim-wing-l" : undefined}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          display: "block",
          height: 16,
          width: 13,
          transformOrigin: "right",
          borderRadius: "70% 30% 60% 40%",
          background: `linear-gradient(140deg, ${hue}, #fbf7ef)`,
          transform: "translate(-100%,-50%)",
          boxShadow: "0 1px 3px rgba(74,66,53,0.2)",
        }}
      />
      <span
        data-wr
        className={animated ? "anim-wing-r" : undefined}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          display: "block",
          height: 16,
          width: 13,
          transformOrigin: "left",
          borderRadius: "30% 70% 40% 60%",
          background: `linear-gradient(220deg, ${hue}, #fbf7ef)`,
          transform: "translateY(-50%)",
          boxShadow: "0 1px 3px rgba(74,66,53,0.2)",
        }}
      />
      <span
        className="absolute left-1/2 top-1/2 block h-[14px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "#4a4235" }}
      />
    </div>
  );
}

/**
 * Touch devices (phones/tablets) get a pure-CSS flight path. This is not
 * just an optimization — a JS/rAF-driven loop visibly freezes on iOS Safari
 * while a finger is touching the screen, which read as "the butterflies
 * stop." Compositor-driven CSS transforms are immune to that.
 */
function CssButterflies({ seeds }: { seeds: { x: number; y: number; hue: string; scale: number }[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {seeds.map((s, i) => (
        <div
          key={i}
          className="absolute left-0 top-0 will-change-transform"
          style={{
            left: `${s.x * 100}%`,
            top: `${s.y * 70 + 10}%`,
            animation: `${i % 2 ? "flutter-2" : "flutter-1"} ${14 + (i % 4) * 3}s ease-in-out ${
              i * 0.6
            }s infinite`,
          }}
        >
          <div style={{ transform: `scale(${s.scale})`, perspective: "120px" }}>
            <Wings hue={s.hue} animated />
          </div>
        </div>
      ))}
    </div>
  );
}

/** A few butterflies that wander gently and dart away from the cursor (desktop/mouse only). */
function JsButterflies({ seeds }: { seeds: { x: number; y: number; hue: string; scale: number }[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const nodes = Array.from(
      wrap.querySelectorAll<HTMLDivElement>("[data-fly]")
    );

    let w = window.innerWidth;
    let h = window.innerHeight;
    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const flies: Fly[] = seeds.map((s) => ({
      x: s.x * w,
      y: s.y * h * 0.7 + h * 0.1,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.4,
      phase: Math.random() * Math.PI * 2,
      scale: s.scale,
      hue: s.hue,
      wing: 0,
    }));

    let mx = -9999;
    let my = -9999;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      for (let i = 0; i < flies.length; i++) {
        const f = flies[i];
        f.phase += 0.05;
        // Gentle wander
        f.vx += Math.sin(f.phase * 0.7) * 0.02;
        f.vy += Math.cos(f.phase) * 0.015;

        // Repel from cursor
        const dx = f.x - mx;
        const dy = f.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1;
          const force = (130 - d) / 130;
          f.vx += (dx / d) * force * 1.4;
          f.vy += (dy / d) * force * 1.4;
        }

        f.vx *= 0.96;
        f.vy *= 0.96;
        const speed = Math.hypot(f.vx, f.vy);
        if (speed < 0.35) {
          f.vx += (Math.random() - 0.5) * 0.3;
          f.vy += (Math.random() - 0.5) * 0.2;
        }
        f.x += f.vx;
        f.y += f.vy + Math.sin(f.phase) * 0.3;

        // Wrap softly
        if (f.x < -40) f.x = w + 40;
        if (f.x > w + 40) f.x = -40;
        if (f.y < h * 0.05) f.vy += 0.05;
        if (f.y > h * 0.85) f.vy -= 0.05;

        const flap = 0.5 + Math.abs(Math.sin(f.phase * 3)) * 0.5;
        const dir = f.vx >= 0 ? 1 : -1;
        const node = nodes[i];
        if (node) {
          node.style.transform = `translate3d(${f.x}px, ${f.y}px, 0) scale(${f.scale}) scaleX(${dir})`;
          const lw = node.querySelector<HTMLElement>("[data-wl]");
          const rw = node.querySelector<HTMLElement>("[data-wr]");
          if (lw) lw.style.transform = `rotateY(${flap * 70}deg)`;
          if (rw) rw.style.transform = `rotateY(${-flap * 70}deg)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [seeds]);

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {seeds.map((s, i) => (
        <div
          key={i}
          data-fly
          className="absolute left-0 top-0 will-change-transform"
          style={{ perspective: "120px" }}
        >
          <Wings hue={s.hue} animated={false} />
        </div>
      ))}
    </div>
  );
}

export function Butterflies() {
  const { density, ready, isTouch } = useDeviceTier();
  const reduced = usePrefersReducedMotion();

  const count = reduced ? 2 : Math.max(2, Math.round(4 * density));

  const seeds = useMemo(() => {
    const rnd = seededRandom(21);
    return Array.from({ length: count }, () => ({
      x: rnd(),
      y: rnd(),
      hue: WINGS[Math.floor(rnd() * WINGS.length)],
      scale: 0.7 + rnd() * 0.7,
    }));
  }, [count]);

  if (!ready || reduced) return null;

  return isTouch ? (
    <CssButterflies seeds={seeds} />
  ) : (
    <JsButterflies seeds={seeds} />
  );
}
