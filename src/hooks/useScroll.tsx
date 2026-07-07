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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--scroll-progress",
        _progress.toFixed(4)
      );
    }
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
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reducedMotion,
      syncTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1.7,
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
      const p = limit > 0 ? scroll / limit : 0;
      store.set(p, velocity);
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
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
          duration: 1.6,
        }),
    }),
    []
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
