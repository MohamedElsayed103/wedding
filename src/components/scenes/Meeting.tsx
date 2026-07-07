"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mohamed } from "@/components/characters/Mohamed";
import { Mariam } from "@/components/characters/Mariam";
import { GardenGround } from "@/components/environment/GardenGround";
import { Flower } from "@/components/environment/GardenElements";

/**
 * CHAPTER 1 — Mohamed enters from one side, Mariam from the other. They notice
 * each other, smile, and the garden blooms. Their positions are driven by
 * scroll, so the visitor literally moves the story forward.
 */
export function Meeting() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const mohamedX = useTransform(scrollYProgress, [0, 0.9], ["-70vw", "-16vw"]);
  const mariamX = useTransform(scrollYProgress, [0, 0.9], ["70vw", "16vw"]);
  const bloom = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[115svh] items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity: titleOpacity }}
        className="pointer-events-none absolute top-[14%] left-0 right-0 z-20 text-center safe-x"
      >
        <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
          CHAPTER ONE
        </p>
        <h2 className="mt-2 font-display text-2xl text-[color:var(--color-ink)] sm:text-4xl">
          Two paths, one garden
        </h2>
      </motion.div>

      {/* couple */}
      <div className="absolute bottom-[14%] left-1/2 z-10 h-[42vh] max-h-[420px] min-h-[240px] -translate-x-1/2">
        <div className="relative h-full w-[80vw] max-w-[520px]">
          <motion.div style={{ x: mohamedX }} className="absolute bottom-0 left-1/2 h-full">
            <Mohamed outfit="casual" facing="right" className="h-full" />
          </motion.div>
          <motion.div style={{ x: mariamX }} className="absolute bottom-0 left-1/2 h-full">
            <Mariam outfit="casual" facing="left" className="h-full" />
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
      <motion.div style={{ opacity: bloom }} className="pointer-events-none absolute bottom-[16%] left-0 right-0 z-10">
        <div className="mx-auto flex max-w-md items-end justify-between px-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              style={{ scale: bloom }}
              transition={{ delay: i * 0.05 }}
            >
              <Flower size={26 + (i % 3) * 8} color={i % 2 ? "#f0d9c4" : "#fbf7ef"} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <GardenGround lanterns={false} density={0.7} />
    </section>
  );
}
