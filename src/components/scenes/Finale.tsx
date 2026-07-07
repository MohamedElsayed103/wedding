"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Couple } from "@/components/characters/Couple";
import { FlowerArch } from "@/components/environment/GardenElements";
import { GardenGround } from "@/components/environment/GardenGround";
import { COUPLE, WEDDING_DATE_DOTS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

/**
 * FINAL SCENE — night falls, lanterns and fireflies glow, and the couple walk
 * through an enormous arch as the camera pulls back. "Forever Begins."
 */
export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Camera pulls back — the couple recede through the arch.
  const coupleScale = useTransform(scrollYProgress, [0, 0.7], [1.1, 0.55]);
  const coupleY = useTransform(scrollYProgress, [0, 0.7], ["0%", "-8%"]);
  const coupleOpacity = useTransform(scrollYProgress, [0.55, 0.95], [1, 0.25]);
  const nightWash = useTransform(scrollYProgress, [0, 0.6], [0, 0.5]);
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  return (
    <section ref={ref} className="relative" style={{ height: "130svh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        {/* deepening night wash */}
        <motion.div
          style={{ opacity: nightWash }}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b2c44]/70 via-[#3f3d54]/40 to-transparent" />
        </motion.div>

        <FlowerArch className="absolute top-[2%] left-1/2 z-0 w-[120vw] max-w-[820px] -translate-x-1/2" />

        <motion.div
          style={{ scale: coupleScale, y: coupleY, opacity: coupleOpacity }}
          className="absolute bottom-[20%] left-1/2 z-10 h-[46vh] max-h-[440px] min-h-[250px] -translate-x-1/2"
        >
          <Couple outfit="wedding" walking lookingAtEachOther className="h-full" />
        </motion.div>

        {/* final title */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute top-[24%] left-0 right-0 z-20 text-center safe-x"
        >
          <h2 className="font-script text-5xl text-[color:var(--color-gold-light)] drop-shadow-[0_2px_20px_rgba(201,162,75,0.5)] sm:text-7xl">
            Forever Begins
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4 font-display text-xl text-[color:var(--color-ivory)] sm:text-2xl">
            <span>{COUPLE.groom}</span>
            <span className="text-[color:var(--color-gold-light)]">♡</span>
            <span>{COUPLE.bride}</span>
          </div>
          <p className="mt-4 font-roman tracking-luxe text-xs text-[color:var(--color-gold-light)]">
            {WEDDING_DATE_DOTS}
          </p>
        </motion.div>

        <GardenGround density={1} />
      </div>

      {/* closing whisper below the pinned scene */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 text-center">
        <Reveal>
          <p className="font-serif text-sm italic text-[color:var(--color-ink-soft)]">
            Made with love, for the ones we love.
          </p>
          <p className="mt-1 font-body text-[0.6rem] tracking-wide-2 text-[color:var(--color-ink-soft)]/70">
            {COUPLE.groom} &amp; {COUPLE.bride} · {WEDDING_DATE_DOTS}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
