"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A soft golden cursor with a magnetic follow ring — desktop pointers only.
 * (Petal spawning on move is handled by the ParticleField.)
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("cursor-hidden");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement;
      const interactive = !!t.closest("a, button, input, textarea, [role='button']");
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? "56px" : "34px";
        ringRef.current.style.height = interactive ? "56px" : "34px";
        ringRef.current.style.borderColor = interactive
          ? "rgba(201,162,75,0.9)"
          : "rgba(201,162,75,0.5)";
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("cursor-hidden");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full"
        style={{ background: "var(--color-gold)", boxShadow: "0 0 8px rgba(201,162,75,0.8)" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-[34px] w-[34px] rounded-full border transition-[width,height,border-color] duration-300"
        style={{ borderColor: "rgba(201,162,75,0.5)" }}
      />
    </div>
  );
}
