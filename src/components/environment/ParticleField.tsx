"use client";

import { useEffect, useRef } from "react";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Kind = "petal" | "dust" | "leaf";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  kind: Kind;
  hue: string;
  sway: number;
  swaySpeed: number;
  life: number; // 1 = fresh, used for cursor petals
  decay: number;
  seed: number;
}

const PETAL_COLORS = ["#fbf7ef", "#f4e6d2", "#f0d9c4", "#efe0c0"];
const DUST_COLORS = ["#e8ce8f", "#c9a24b", "#f0dca0"];
const LEAF_COLORS = ["#9caa7d", "#7d8a5f", "#b7c199"];

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { density, ready, isTouch } = useDeviceTier();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      // Cap the backing-store resolution — a full-screen canvas at dpr 3
      // (common on phones) redraws several million extra pixels every frame
      // for detail nobody notices in soft, blurry decorative particles.
      // Phones are fill-rate bound; cap harder on touch so the fullscreen
      // canvas isn't repainting millions of extra pixels each frame.
      dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1 : 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const base = reduced ? 10 : isTouch ? 26 : 42;
    const count = Math.max(8, Math.round(base * density));
    const particles: P[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const makeParticle = (fresh = false): P => {
      const r = Math.random();
      const kind: Kind = r < 0.62 ? "petal" : r < 0.86 ? "dust" : "leaf";
      const size =
        kind === "dust" ? rand(1.5, 3.5) : kind === "leaf" ? rand(7, 13) : rand(6, 14);
      return {
        x: rand(0, w),
        y: fresh ? rand(-h * 0.2, -10) : rand(0, h),
        vx: rand(-0.25, 0.25),
        vy: kind === "dust" ? rand(0.15, 0.5) : rand(0.35, 0.95),
        size,
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.02, 0.02),
        kind,
        hue:
          kind === "dust"
            ? pick(DUST_COLORS)
            : kind === "leaf"
              ? pick(LEAF_COLORS)
              : pick(PETAL_COLORS),
        sway: rand(0, Math.PI * 2),
        swaySpeed: rand(0.008, 0.02),
        life: 1,
        decay: 0,
        seed: rand(0, 1000),
      };
    };

    for (let i = 0; i < count; i++) particles.push(makeParticle());

    // Wind driven by scroll velocity.
    let wind = 0;
    let targetWind = 0;

    const drawPetal = (p: P) => {
      ctx.beginPath();
      const s = p.size;
      ctx.moveTo(0, -s * 0.5);
      ctx.bezierCurveTo(s * 0.55, -s * 0.5, s * 0.55, s * 0.5, 0, s * 0.6);
      ctx.bezierCurveTo(-s * 0.55, s * 0.5, -s * 0.55, -s * 0.5, 0, -s * 0.5);
      ctx.fill();
    };

    const drawLeaf = (p: P) => {
      const s = p.size;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.32, s * 0.62, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    let mx = -1;
    let my = -1;
    const cursorPetals: P[] = [];
    let lastSpawn = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const now = performance.now();
      if (now - lastSpawn > 55 && cursorPetals.length < 26) {
        lastSpawn = now;
        cursorPetals.push({
          ...makeParticle(),
          x: mx + rand(-6, 6),
          y: my + rand(-6, 6),
          vx: rand(-0.6, 0.6),
          vy: rand(-0.2, 0.5),
          size: rand(5, 10),
          kind: "petal",
          hue: pick(PETAL_COLORS),
          life: 1,
          decay: rand(0.006, 0.014),
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      wind += (targetWind - wind) * 0.04;
      targetWind *= 0.94;

      const step = (p: P, cursor: boolean) => {
        p.sway += p.swaySpeed;
        p.x += p.vx + Math.sin(p.sway) * 0.4 + wind;
        p.y += p.vy;
        p.rot += p.vr;
        if (cursor) {
          p.vy += 0.012;
          p.life -= p.decay;
        }

        // Recycle
        if (!cursor) {
          if (p.y > h + 20) {
            p.y = -20;
            p.x = rand(0, w);
          }
          if (p.x > w + 20) p.x = -20;
          if (p.x < -20) p.x = w + 20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = cursor
          ? Math.max(0, p.life) * 0.9
          : p.kind === "dust"
            ? 0.85
            : 0.9;
        ctx.fillStyle = p.hue;
        if (p.kind === "dust") {
          // A single soft-edged fill reads as a glow without the cost of
          // shadowBlur, which is a full per-particle software blur pass —
          // brutally expensive on mobile GPUs at this particle count.
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.85, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === "leaf") {
          drawLeaf(p);
        } else {
          drawPetal(p);
        }
        ctx.restore();
      };

      for (const p of particles) step(p, false);
      for (let i = cursorPetals.length - 1; i >= 0; i--) {
        step(cursorPetals[i], true);
        if (cursorPetals[i].life <= 0) cursorPetals.splice(i, 1);
      }

      raf = requestAnimationFrame(render);
    };
    if (!reduced) {
      raf = requestAnimationFrame(render);
    } else {
      // Draw a single static frame.
      render();
      cancelAnimationFrame(raf);
    }

    // Feed wind from wheel/touch.
    const onWheel = (e: WheelEvent) => {
      targetWind = Math.max(-1.5, Math.min(1.5, e.deltaY * 0.004));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", resize);
    };
  }, [density, ready, reduced, isTouch]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    />
  );
}
