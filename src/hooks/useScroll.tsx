"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { clamp } from "@/lib/utils";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/* ---- Module-level progress store (0..1 across the whole film) ---- */
let _progress = 0;
let _velocity = 0;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

const store = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
  getProgress: () => _progress,
  getVelocity: () => _velocity,
  set(progress: number, velocity: number) {
    _progress = clamp(progress);
    _velocity = velocity;
    emit();
  },
};

/** Subscribe to overall film progress (0 = envelope, 1 = finale). */
export function useScrollProgress(): number {
  return useSyncExternalStore(
    store.subscribe,
    store.getProgress,
    () => 0
  );
}

/**
 * Imperative per-frame progress subscription — for animation-heavy leaves
 * (sky, particles) that must mutate the DOM without triggering React renders.
 * The callback receives (progress, velocity) and also fires once on mount.
 */
export function useProgressEffect(
  cb: (progress: number, velocity: number) => void
) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => {
    const run = () => ref.current(store.getProgress(), store.getVelocity());
    run();
    return store.subscribe(run);
  }, []);
}

interface LenisCtx {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  /** Release the scroll lock (the page starts locked until the envelope opens). */
  unlockScroll: () => void;
}
const Ctx = createContext<LenisCtx>({
  lenis: null,
  scrollTo: () => {},
  unlockScroll: () => {},
});
export const useLenis = () => useContext(Ctx);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  // The story stays pinned at the top until the invitation is opened — no
  // scrolling past the envelope before the visitor breaks the seal.
  const [locked, setLocked] = useState(true);
  const lockedRef = useRef(true);
  const unlockScroll = useCallback(() => {
    lockedRef.current = false;
    setLocked(false);
  }, []);

  // Enforce the lock across every input path: Lenis (wheel), and native
  // touch/overflow (phones, where Lenis only reads position). A gesture while
  // locked still fires its listener elsewhere (so the envelope can open) — it
  // just can't move the page.
  useEffect(() => {
    const lenis = lenisRef.current;
    const root = document.documentElement;
    const body = document.body;
    if (locked) {
      lenis?.stop();
      window.scrollTo(0, 0);
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      lenis?.start();
      root.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }
    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [locked]);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    // Phones/tablets: native scrolling only. A single passive listener feeds
    // the progress store — no Lenis rAF loop and no smoothing layer fighting
    // iOS momentum, which is what made scrolling feel laggy. The scroll lock
    // still works via `overflow: hidden` (set in the lock effect above).
    if (isTouch) {
      const onNativeScroll = () => {
        const limit = document.documentElement.scrollHeight - window.innerHeight;
        store.set(limit > 0 ? window.scrollY / limit : 0, 0);
      };
      onNativeScroll();
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      window.addEventListener("resize", onNativeScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onNativeScroll);
        window.removeEventListener("resize", onNativeScroll);
      };
    }

    // Desktop: Lenis smooth wheel — a comfortable, unhurried glide.
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reducedMotion,
      syncTouch: false,
      touchMultiplier: 1.05,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;
    // Honour a lock that was set before Lenis existed (it starts locked).
    if (lockedRef.current) lenis.stop();

    const onScroll = ({
      scroll,
      limit,
      velocity,
    }: {
      scroll: number;
      limit: number;
      velocity: number;
    }) => {
      store.set(limit > 0 ? scroll / limit : 0, velocity);
    };
    lenis.on("scroll", onScroll);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const value = useMemo<LenisCtx>(
    () => ({
      lenis: lenisRef.current,
      scrollTo: (target, offset = 0) => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, { offset, duration: 1.2 });
        } else if (typeof target === "number") {
          // Native path (touch): smooth-scroll to a pixel offset.
          window.scrollTo({ top: target + offset, behavior: "smooth" });
        }
      },
      unlockScroll,
    }),
    [unlockScroll]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
