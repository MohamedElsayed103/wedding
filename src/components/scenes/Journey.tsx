"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Couple } from "@/components/characters/Couple";
import { GardenGround } from "@/components/environment/GardenGround";
import { Flower } from "@/components/environment/GardenElements";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { type Memory } from "@/lib/i18n";
import { useLang } from "@/hooks/useLang";
import { seededRandom } from "@/lib/utils";

/**
 * THE WALK — the journey itself is the timeline. The couple walk together while
 * the camera follows; important memories fade in naturally along the path.
 */
export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Camera drift + a gentle "follow" scale.
  const groundX = useTransform(scrollYProgress, [0, 1], ["0%", "-46%"]);
  const coupleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.96, 1.04, 0.98]
  );
  const coupleY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  const { t } = useLang();
  const memories = t.memories;
  const { density } = useDeviceTier();
  const flowerCount = Math.max(6, Math.round(14 * density));
  const pathFlowers = (() => {
    const rnd = seededRandom(555);
    return Array.from({ length: flowerCount }, (_, i) => ({
      id: i,
      left: Math.round((i / flowerCount) * 2000) / 10,
      size: Math.round(22 + rnd() * 26),
      bottom: Math.round(rnd() * 30),
      white: rnd() > 0.4,
    }));
  })();

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${memories.length * 60 + 40}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* moving flower path — the ground slides by as they walk forward */}
        <motion.div
          style={{ x: groundX }}
          className="pointer-events-none absolute bottom-[15%] left-0 z-0 h-[120px] w-[200%]"
        >
          {pathFlowers.map((f) => (
            <div
              key={f.id}
              className="absolute"
              style={{ left: `${f.left}%`, bottom: `${f.bottom}px` }}
            >
              <Flower size={f.size} color={f.white ? "#fbf7ef" : "#f0d9c4"} />
            </div>
          ))}
        </motion.div>

        {/* walking couple, camera-followed */}
        <motion.div
          style={{ scale: coupleScale, y: coupleY }}
          className="absolute bottom-[16%] left-1/2 z-10 h-[40vh] max-h-[400px] min-h-[230px] -translate-x-1/2"
        >
          <Couple walking lookingAtEachOther className="h-full" />
        </motion.div>

        {/* memories fade in along the way */}
        {memories.map((m, i) => (
          <MemoryCard
            key={m.id}
            memory={m}
            progress={scrollYProgress}
            index={i}
            total={memories.length}
          />
        ))}

        <GardenGround density={0.85} />
      </div>
    </section>
  );
}

function MemoryCard({
  memory,
  progress,
  index,
  total,
}: {
  memory: Memory;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  // Give each memory a band of the scroll; fade in, hold, fade out.
  const band = 1 / (total + 0.5);
  const start = index * band + 0.06;
  const opacity = useTransform(
    progress,
    [start, start + band * 0.3, start + band * 0.8, start + band],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, start + band],
    [40, -30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute top-[18%] left-0 right-0 z-20 px-6 text-center safe-x"
    >
      <div className="mx-auto max-w-md">
        <span className="text-2xl text-[color:var(--color-gold)]">{memory.icon}</span>
        <h3 className="mt-3 font-display text-2xl text-[color:var(--color-ink)] sm:text-3xl">
          {memory.title}
        </h3>
        <p className="mt-3 font-serif text-base italic leading-relaxed text-[color:var(--color-ink-soft)] sm:text-lg">
          {memory.caption}
        </p>
      </div>
    </motion.div>
  );
}
