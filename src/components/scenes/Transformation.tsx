"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Couple } from "@/components/characters/Couple";
import { FlowerArch } from "@/components/environment/GardenElements";
import { GardenGround } from "@/components/environment/GardenGround";
import { seededRandom } from "@/lib/utils";

/**
 * THE TRANSFORMATION — beneath a great white arch at golden hour, a swirl of
 * gold lifts the couple's everyday clothes into wedding attire. Breathtaking.
 */
export function Transformation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Cross-fade casual -> wedding around the midpoint.
  const casualOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const weddingOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const swirlScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.4, 1.5, 0.6]);
  const swirlOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.72], [0, 0.95, 0]);
  const swirlRotate = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const flash = useTransform(scrollYProgress, [0.46, 0.52, 0.6], [0, 0.8, 0]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.75, 0.95, 1],
    [0, 1, 1, 0.4]
  );

  const swirlPetals = useMemo(() => {
    const rnd = seededRandom(909);
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: Math.round((i / 16) * Math.PI * 2 * 1000) / 1000,
      dist: Math.round(60 + rnd() * 120),
      size: Math.round(8 + rnd() * 14),
      white: rnd() > 0.5,
    }));
  }, []);

  return (
    <section ref={ref} className="relative" style={{ height: "140svh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* golden-hour warm wash */}
        <motion.div
          style={{ opacity: flash }}
          className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_50%_45%,rgba(255,236,190,0.95),transparent_60%)]"
        />

        {/* grand arch */}
        <FlowerArch className="absolute top-[6%] left-1/2 z-0 w-[92vw] max-w-[560px] -translate-x-1/2" />

        {/* swirl of gold */}
        <motion.div
          style={{ scale: swirlScale, opacity: swirlOpacity, rotate: swirlRotate }}
          className="absolute bottom-[30%] left-1/2 z-10 h-[46vh] w-[46vh] -translate-x-1/2 translate-y-1/2"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(232,206,143,0.6), transparent, rgba(201,162,75,0.5), transparent)",
              filter: "blur(6px)",
            }}
          />
          {swirlPetals.map((p) => (
            <span
              key={p.id}
              className="absolute left-1/2 top-1/2 rounded-[60%_40%_60%_40%]"
              style={{
                width: p.size,
                height: Math.round(p.size * 130) / 100,
                background: p.white ? "#fbf7ef" : "#e8ce8f",
                transform: `translate(-50%,-50%) rotate(${p.angle}rad) translateX(${p.dist}px)`,
                boxShadow: "0 0 8px rgba(232,206,143,0.7)",
              }}
            />
          ))}
        </motion.div>

        {/* the couple, crossfading outfits */}
        <div className="absolute bottom-[16%] left-1/2 z-20 h-[42vh] max-h-[420px] min-h-[240px] -translate-x-1/2">
          <motion.div style={{ opacity: casualOpacity }} className="absolute inset-0">
            <Couple outfit="casual" lookingAtEachOther className="h-full" />
          </motion.div>
          <motion.div style={{ opacity: weddingOpacity }} className="absolute inset-0">
            <Couple outfit="wedding" lookingAtEachOther className="h-full" />
          </motion.div>
        </div>

        {/* title */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="pointer-events-none absolute top-[16%] left-0 right-0 z-30 text-center safe-x"
        >
          <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
            AND SO, FOREVER
          </p>
          <h2 className="mt-2 font-display text-3xl text-[color:var(--color-ink)] sm:text-5xl">
            A promise, sealed in gold
          </h2>
        </motion.div>

        <GardenGround density={0.9} />
      </div>
    </section>
  );
}
