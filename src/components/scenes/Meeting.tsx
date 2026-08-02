"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar } from "@/components/characters/avatar/Avatar";
import { GardenGround } from "@/components/environment/GardenGround";
import { Flower } from "@/components/environment/GardenElements";
import { useLang } from "@/hooks/useLang";
import { useSite } from "@/hooks/useSite";

/**
 * CHAPTER 1 — Mohamed enters from one side, Mariam from the other. The scene is
 * PINNED (sticky) for two screen-heights so the couple begin at the far edges,
 * fully visible, and then walk slowly inward to meet dead-centre while the
 * visitor scrolls — the convergence happens entirely on-screen, never off it.
 */
export function Meeting() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { groom, bride } = useSite();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The couple start at the far edges (visible from the first frame the scene
  // pins) and walk in, settling to centre by ~0.7 and holding while the chapter
  // is read. A generous span makes the walk slow and deliberate.
  const mohamedX = useTransform(scrollYProgress, [0.05, 0.7], ["-42vw", "0vw"]);
  const mariamX = useTransform(scrollYProgress, [0.05, 0.7], ["42vw", "0vw"]);
  const bloom = useTransform(scrollYProgress, [0.62, 0.85], [0, 1]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.16, 0.9, 1],
    [0, 1, 1, 0]
  );
  const chapter = t.chapters[0];

  return (
    <section ref={ref} className="relative" style={{ height: "220svh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity }}
          className="pointer-events-none absolute top-[12%] left-0 right-0 z-20 text-center safe-x"
        >
          <p className="font-roman uppercase tracking-luxe text-sm text-[color:var(--color-gold-deep)] sm:text-base">
            {chapter?.label}
          </p>
          <p className="mx-auto mt-4 max-w-3xl px-4 font-serif text-2xl italic leading-snug text-[color:var(--color-ink)] sm:text-4xl lg:text-5xl">
            {chapter?.text}
          </p>
        </motion.div>

        {/* couple — centred flex; each avatar walks in from an edge to x=0 */}
        <div className="absolute bottom-[12%] left-0 right-0 z-10 h-[44vh] max-h-[440px] min-h-[240px]">
          <div className="relative mx-auto flex h-full w-max items-end justify-center gap-2 sm:gap-4">
            <motion.div style={{ x: mohamedX }} className="h-full">
              <div
                className="h-full"
                style={{ animation: "walk-bob 1.05s ease-in-out infinite" }}
              >
                <Avatar
                  config={{ ...groom, role: "groom", attire: "signature" }}
                  facing="right"
                  className="h-full"
                />
              </div>
            </motion.div>
            <motion.div style={{ x: mariamX }} className="h-full">
              <div
                className="h-full"
                style={{ animation: "walk-bob 1.05s ease-in-out 0.52s infinite" }}
              >
                <Avatar
                  config={{ ...bride, role: "bride", attire: "signature" }}
                  facing="left"
                  className="h-full"
                />
              </div>
            </motion.div>

            {/* the spark between them */}
            <motion.div
              style={{ scale: bloom, opacity: bloom }}
              className="absolute bottom-[46%] left-1/2 -translate-x-1/2"
            >
              <span className="text-2xl text-[color:var(--color-gold)]">✦</span>
            </motion.div>
          </div>
        </div>

        {/* blooming flowers as they meet */}
        <motion.div
          style={{ opacity: bloom }}
          className="pointer-events-none absolute bottom-[14%] left-0 right-0 z-10"
        >
          <div className="mx-auto flex max-w-md items-end justify-between px-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div key={i} style={{ scale: bloom }} transition={{ delay: i * 0.05 }}>
                <Flower size={26 + (i % 3) * 8} color={i % 2 ? "#f0d9c4" : "#fbf7ef"} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <GardenGround lanterns={false} density={0.7} />
      </div>
    </section>
  );
}
