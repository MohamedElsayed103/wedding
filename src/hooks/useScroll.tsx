"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
}
const Ctx = createContext<LenisCtx>({ lenis: null, scrollTo: () => {} });
export const useLenis = () => useContext(Ctx);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Comfortable reading pace: smooth, unhurried, but never slow-motion.
    // Touch devices use fully native scrolling (Lenis only reads position).
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reducedMotion,
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.15,
    });
    lenisRef.current = lenis;

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
      scrollTo: (target, offset = 0) =>
        lenisRef.current?.scrollTo(target, {
          offset,
          duration: 1.2,
        }),
    }),
    []
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
