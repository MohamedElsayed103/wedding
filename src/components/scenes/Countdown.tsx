"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { WEDDING_DATE, WEDDING_DATE_DOTS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { pad2 } from "@/lib/utils";

export function Countdown() {
  const time = useCountdown(WEDDING_DATE);

  const units = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Minutes", value: time?.minutes ?? 0 },
    { label: "Seconds", value: time?.seconds ?? 0 },
  ];

  return (
    <section className="relative flex min-h-[70svh] items-center justify-center py-14 safe-x">
      <div className="w-full max-w-2xl text-center">
        <Reveal>
          <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
            COUNTING THE MOMENTS
          </p>
          <h2 className="mt-3 font-display text-2xl text-[color:var(--color-ink)] sm:text-4xl">
            Until we say “forever”
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 grid grid-cols-4 gap-2 sm:gap-5">
            {units.map((u) => (
              <div
                key={u.label}
                className="glass flex flex-col items-center rounded-xl px-1 py-5 sm:py-7"
              >
                <div className="relative h-[1.1em] overflow-hidden font-display text-3xl leading-none text-[color:var(--color-gold-deep)] sm:text-5xl">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={u.value}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="block tabular-nums"
                    >
                      {pad2(u.value)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="mt-3 font-roman text-[0.55rem] tracking-luxe text-[color:var(--color-ink-soft)] sm:text-xs">
                  {u.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-10 font-script text-3xl text-[color:var(--color-gold-deep)] sm:text-4xl">
            {WEDDING_DATE_DOTS}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
