"use client";

import { useRef } from "react";
import { useProgressEffect } from "@/hooks/useScroll";

/** A whisper-thin golden rail that tracks the film's progress. */
export function ProgressRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const beadRef = useRef<HTMLDivElement>(null);

  useProgressEffect((p) => {
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    if (beadRef.current) beadRef.current.style.top = `${p * 100}%`;
  });

  return (
    <div
      className="fixed right-[max(0.5rem,env(safe-area-inset-right))] top-1/2 z-[70] h-[34vh] w-[2px] -translate-y-1/2 rounded-full bg-[color:var(--color-gold)]/15"
      aria-hidden
    >
      <div
        ref={fillRef}
        className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-[color:var(--color-gold-light)] to-[color:var(--color-gold-deep)]"
        style={{ transform: "scaleY(0)" }}
      />
      <div
        ref={beadRef}
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-gold)]"
        style={{ top: "0%", boxShadow: "0 0 8px rgba(201,162,75,0.9)" }}
      />
    </div>
  );
}
