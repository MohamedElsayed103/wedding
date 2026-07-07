"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COUPLE, WEDDING_DATE_LABEL } from "@/lib/constants";
import { useLenis } from "@/hooks/useScroll";

/**
 * OPENING — a luxurious ivory envelope with a wax seal (M ♡ M). It opens on
 * tap; the invitation lifts out, particles bloom, and a hint invites the
 * visitor to scroll "into" the garden.
 */
export function Envelope() {
  const [opened, setOpened] = useState(false);
  const { scrollTo } = useLenis();

  // Allow the very first scroll gesture to open the envelope too.
  useEffect(() => {
    if (opened) return;
    const open = () => setOpened(true);
    window.addEventListener("wheel", open, { once: true, passive: true });
    window.addEventListener("touchmove", open, { once: true, passive: true });
    return () => {
      window.removeEventListener("wheel", open);
      window.removeEventListener("touchmove", open);
    };
  }, [opened]);

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
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-roman tracking-luxe text-[0.7rem] text-[color:var(--color-gold-deep)] sm:text-xs"
        >
          YOU ARE INVITED
        </motion.p>

        {/* Envelope */}
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
            className="relative"
            style={{
              width: "min(78vw, 340px)",
              height: "min(52vw, 226px)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Letter that lifts out */}
            <motion.div
              className="glass absolute left-1/2 top-1/2 flex flex-col items-center justify-center rounded-md px-6 text-center"
              style={{ width: "88%", height: "112%", x: "-50%" }}
              initial={false}
              animate={
                opened
                  ? { y: "-72%", opacity: 1 }
                  : { y: "-50%", opacity: 0 }
              }
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: opened ? 0.35 : 0 }}
            >
              <p className="font-script text-2xl text-[color:var(--color-gold-deep)] sm:text-3xl">
                {COUPLE.groom} &amp; {COUPLE.bride}
              </p>
              <div className="gold-hairline my-2 w-24" />
              <p className="font-roman tracking-wide-2 text-[0.62rem] text-[color:var(--color-ink-soft)] sm:text-xs">
                {WEDDING_DATE_LABEL}
              </p>
            </motion.div>

            {/* Envelope back */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background:
                  "linear-gradient(160deg, #f6efe2, #e8dcc6)",
                boxShadow: "0 30px 70px -30px rgba(74,66,53,0.5)",
              }}
            />

            {/* Front pocket */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background: "linear-gradient(155deg, #fbf7ef, #ecdfca)",
                clipPath: "polygon(0 32%, 50% 100%, 100% 32%, 100% 100%, 0 100%)",
                zIndex: 3,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            />
            {/* side seams */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background:
                  "linear-gradient(155deg, rgba(201,162,75,0.18), transparent)",
                clipPath: "polygon(0 0, 50% 62%, 0 100%)",
                zIndex: 3,
              }}
            />
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background:
                  "linear-gradient(205deg, rgba(201,162,75,0.18), transparent)",
                clipPath: "polygon(100% 0, 50% 62%, 100% 100%)",
                zIndex: 3,
              }}
            />

            {/* Top flap */}
            <motion.div
              className="absolute inset-0 origin-top rounded-md"
              style={{
                background: "linear-gradient(160deg, #f4ead6, #e3d2b3)",
                clipPath: "polygon(0 0, 100% 0, 50% 66%)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                zIndex: opened ? 1 : 6,
              }}
              initial={false}
              animate={{ rotateX: opened ? -168 : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Wax seal */}
              <AnimatePresence>
                {!opened && (
                  <motion.div
                    className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
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
              className="mt-10 font-body text-xs tracking-wide-2 text-[color:var(--color-ink-soft)]"
            >
              tap the seal to open
            </motion.button>
          ) : (
            <motion.button
              key="scroll"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              onClick={() => scrollTo(window.innerHeight, 0)}
              className="mt-10 flex flex-col items-center gap-2 font-body text-xs tracking-wide-2 text-[color:var(--color-ink-soft)]"
            >
              <span>scroll to begin the story</span>
              <span className="anim-float text-[color:var(--color-gold)]">❦</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
