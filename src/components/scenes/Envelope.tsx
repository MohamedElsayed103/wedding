"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/hooks/useScroll";
import { useLang } from "@/hooks/useLang";
import { seededRandom } from "@/lib/utils";

/**
 * OPENING — a luxurious champagne envelope sealed in wax. Tap (or first
 * scroll) breaks the seal: the flap lifts, a gold-foil letter rises out amid
 * a burst of petals, and then the camera flies *into* the letter — the paper
 * dissolves and the garden takes its place.
 */
export function Envelope() {
  const [opened, setOpened] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollTo, unlockScroll } = useLenis();
  const { t, ready } = useLang();
  const tiltRef = useRef<HTMLDivElement>(null);

  // First scroll gesture opens the envelope too — but only once the visitor
  // has chosen a language (the gate swallows earlier gestures).
  useEffect(() => {
    if (opened || !ready) return;
    const open = () => setOpened(true);
    window.addEventListener("wheel", open, { once: true, passive: true });
    window.addEventListener("touchmove", open, { once: true, passive: true });
    return () => {
      window.removeEventListener("wheel", open);
      window.removeEventListener("touchmove", open);
    };
  }, [opened, ready]);

  // After the letter has been admired, zoom the camera through it — and only
  // now release the scroll lock so the visitor can continue into the story.
  useEffect(() => {
    if (!opened) return;
    const id = setTimeout(() => {
      setDismissed(true);
      unlockScroll();
    }, 2100);
    return () => clearTimeout(id);
  }, [opened, unlockScroll]);

  // Subtle 3D tilt on fine pointers only.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = tiltRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `rotateY(${(dx * 7).toFixed(2)}deg) rotateX(${(-dy * 7).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // One-shot celebratory burst when the seal breaks.
  const burst = (() => {
    const rnd = seededRandom(64);
    return Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2 + rnd() * 0.5;
      const dist = 120 + rnd() * 160;
      return {
        id: i,
        x: Math.round(Math.cos(angle) * dist),
        y: Math.round(Math.sin(angle) * dist * 0.8) - 40,
        rot: Math.round(rnd() * 360),
        delay: Math.round(rnd() * 20) / 100,
        glyph: i % 3 === 0 ? "✦" : "✿",
        gold: i % 3 === 0,
        size: 12 + Math.round(rnd() * 10),
      };
    });
  })();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden safe-x">
      {/* soft radial spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,0.55), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        <motion.div
            className="flex flex-col items-center"
            animate={
              dismissed
                ? { opacity: 0, scale: 3.4, y: 120 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ duration: 1.2, ease: [0.55, 0, 0.3, 1] }}
            onAnimationComplete={() => {
              if (dismissed) setHidden(true);
            }}
            style={{
              pointerEvents: dismissed ? "none" : undefined,
              transformOrigin: "50% 42%",
              // stay in layout so the hint below doesn't jump when we vanish
              visibility: hidden ? "hidden" : "visible",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: opened ? 0 : 1, y: 0 }}
              transition={{ delay: opened ? 0 : 0.4, duration: opened ? 0.4 : 1 }}
              className="font-roman tracking-luxe text-[0.7rem] text-[color:var(--color-gold-deep)] sm:text-xs"
            >
              {t.youAreInvited}
            </motion.p>

            {/* Envelope (3D-tilting shell) */}
            <div
              className="relative mt-6 cursor-pointer"
              style={{ perspective: "1400px" }}
              onClick={() => setOpened(true)}
              role="button"
              aria-label="Open the invitation"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpened(true)}
            >
              <div
                ref={tiltRef}
                className="relative transition-transform duration-300 ease-out"
                style={{
                  width: "min(84vw, 360px)",
                  height: "min(56vw, 240px)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* burst of petals + sparkles when the seal breaks */}
                {opened && (
                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-20">
                    {burst.map((b) => (
                      <motion.span
                        key={b.id}
                        className="absolute"
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0.3, rotate: 0 }}
                        animate={{
                          x: b.x,
                          y: b.y,
                          opacity: 0,
                          scale: 1,
                          rotate: b.rot,
                        }}
                        transition={{ duration: 1.3, delay: b.delay, ease: "easeOut" }}
                        style={{
                          fontSize: b.size,
                          color: b.gold ? "#c9a24b" : "#f0d9c4",
                          textShadow: b.gold ? "0 0 8px rgba(232,206,143,0.9)" : undefined,
                        }}
                      >
                        {b.glyph}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Letter that lifts out — gold-foil framed. z-index must
                    clear the pocket + seam layers below (z-index: 3) and the
                    opened flap (z-index: 1), otherwise their diagonal clip
                    paths paint over the letter as it rises, cutting it off.
                    pointer-events is always "none": while closed the letter
                    is invisible but still occupies this space, and without
                    this it silently steals the click meant to open the
                    envelope (the seal sits underneath, at the same spot). */}
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-10 rounded-lg"
                  style={{
                    width: "90%",
                    height: "118%",
                    x: "-50%",
                    padding: 2,
                    background:
                      "linear-gradient(120deg, #a67c34, #e8ce8f, #c9a24b, #e8ce8f, #a67c34)",
                    backgroundSize: "300% auto",
                    boxShadow: "0 24px 60px -20px rgba(74,66,53,0.45)",
                  }}
                  initial={false}
                  animate={
                    opened
                      ? { y: "-84%", opacity: 1, backgroundPosition: "200% center" }
                      : { y: "-50%", opacity: 0 }
                  }
                  transition={{
                    y: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: opened ? 0.35 : 0 },
                    opacity: { duration: 0.7, delay: opened ? 0.35 : 0 },
                    backgroundPosition: { duration: 3, ease: "linear", delay: 0.4 },
                  }}
                >
                  <div
                    className="flex h-full w-full flex-col items-center justify-center rounded-[6px] px-6 text-center"
                    style={{
                      background: "linear-gradient(165deg, #fdfaf3, #f4ecdc)",
                    }}
                  >
                    <p className="font-roman text-[0.5rem] tracking-luxe text-[color:var(--color-ink-soft)] sm:text-[0.58rem]">
                      {t.togetherWithFamilies}
                    </p>
                    <p className="mt-2 font-script text-3xl leading-tight text-[color:var(--color-gold-deep)] sm:text-4xl">
                      {t.coupleNames}
                    </p>
                    <div className="my-2 flex w-full items-center justify-center gap-2">
                      <span className="gold-hairline w-12" />
                      <span className="text-xs text-[color:var(--color-gold)]">❧</span>
                      <span className="gold-hairline w-12" />
                    </div>
                    <p className="font-roman text-[0.62rem] tracking-wide-2 text-[color:var(--color-ink)] sm:text-xs">
                      {t.dateLabel}
                    </p>
                    <p className="mt-1 font-serif text-[0.68rem] italic text-[color:var(--color-ink-soft)] sm:text-sm">
                      {t.venueName}
                    </p>
                  </div>
                </motion.div>

                {/* Envelope back */}
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: "linear-gradient(160deg, #f3ead8, #e2d2b4)",
                    boxShadow: "0 30px 70px -30px rgba(74,66,53,0.5)",
                  }}
                />

                {/* Front pocket with gold-foil edge */}
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: "linear-gradient(155deg, #faf5e9, #eaddc2)",
                    clipPath: "polygon(0 32%, 50% 100%, 100% 32%, 100% 100%, 0 100%)",
                    zIndex: 3,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(201,162,75,0.22), transparent 55%)",
                    clipPath: "polygon(0 0, 50% 62%, 0 100%)",
                    zIndex: 3,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background:
                      "linear-gradient(205deg, rgba(201,162,75,0.22), transparent 55%)",
                    clipPath: "polygon(100% 0, 50% 62%, 100% 100%)",
                    zIndex: 3,
                  }}
                />

                {/* Top flap */}
                <motion.div
                  className="absolute inset-0 origin-top rounded-md"
                  style={{
                    background: "linear-gradient(160deg, #f1e6cd, #ddc9a2)",
                    clipPath: "polygon(0 0, 100% 0, 50% 66%)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    zIndex: opened ? 1 : 6,
                  }}
                  initial={false}
                  animate={{ rotateX: opened ? -168 : 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Wax seal + inviting pulse ring */}
                  <AnimatePresence>
                    {!opened && (
                      <motion.div
                        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span
                          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[color:var(--color-gold)]"
                          style={{ animation: "pulse-ring 2.6s ease-out infinite" }}
                        />
                        <div
                          className="relative flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
                          style={{
                            background:
                              "radial-gradient(circle at 35% 30%, #b9863f, #8a5a24)",
                            boxShadow:
                              "0 6px 16px rgba(74,40,10,0.45), inset 0 2px 4px rgba(255,255,255,0.3)",
                          }}
                        >
                          <span className="font-roman text-sm font-semibold tracking-tighter text-[#f4e6c9] sm:text-base">
                            M♡M
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>

        {/* Prompt / hint */}
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="tap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              onClick={() => setOpened(true)}
              className="mt-10 min-h-11 px-6 font-body text-xs tracking-wide-2 text-[color:var(--color-ink-soft)]"
            >
              {t.tapToOpen}
            </motion.button>
          ) : (
            <motion.button
              key="scroll"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.9 }}
              onClick={() => scrollTo(window.innerHeight, 0)}
              className="mt-10 flex min-h-11 flex-col items-center gap-2 px-6 font-body text-xs tracking-wide-2 text-[color:var(--color-ink-soft)]"
            >
              <span>{t.scrollToBegin}</span>
              <span className="anim-float text-[color:var(--color-gold)]">❦</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
