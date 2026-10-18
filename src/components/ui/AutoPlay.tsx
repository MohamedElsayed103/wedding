"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/hooks/useLang";
import { useLenis } from "@/hooks/useScroll";

/**
 * Hands-free "cinema" playback for screen recordings. Add `?play` to the URL
 * (optionally `?play=ar` for Arabic, and `?speed=` in px/second) and the film
 * runs itself: it picks the language, opens the envelope, then glides smoothly
 * from top to bottom at a steady, readable pace. Does nothing without `?play`.
 */
export function AutoPlay() {
  const { ready, choose } = useLang();
  const { scrollImmediate } = useLenis();
  const startedRef = useRef(false);

  // Keep the latest callbacks without re-running the sequence.
  const chooseRef = useRef(choose);
  chooseRef.current = choose;
  const scrollRef = useRef(scrollImmediate);
  scrollRef.current = scrollImmediate;
  const readyRef = useRef(ready);
  readyRef.current = ready;

  useEffect(() => {
    if (startedRef.current) return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("play")) return;
    startedRef.current = true;

    const langParam = params.get("play");
    const lang = langParam === "ar" ? "ar" : "en";
    // px per second — "not too fast, not too slow". Override with ?speed=.
    const pxPerSec = Math.max(40, Number(params.get("speed")) || 150);

    let raf = 0;
    const timers: number[] = [];
    let cancelled = false;

    // 1. Pick the language (dismisses the gate) — after a short beat so the
    //    gate is visible on camera first.
    timers.push(window.setTimeout(() => chooseRef.current(lang), 1400));

    // 2. Break the envelope seal with a synthetic gesture (its own listener
    //    opens on the first wheel/touchmove once a language is chosen).
    timers.push(
      window.setTimeout(() => {
        window.dispatchEvent(new WheelEvent("wheel", { deltaY: 12 }));
      }, 4200)
    );

    // 3. After the envelope flies open and releases the scroll lock, glide to
    //    the bottom at a constant speed with a gentle ease-in.
    timers.push(
      window.setTimeout(() => {
        let last = performance.now();
        let elapsed = 0;
        const tick = (now: number) => {
          if (cancelled) return;
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          elapsed += dt;
          const ease = Math.min(1, elapsed / 1.6); // 1.6s ramp-up
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const next = Math.min(max, window.scrollY + pxPerSec * ease * dt);
          scrollRef.current(next);
          if (next < max - 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, 6600)
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return null;
}
