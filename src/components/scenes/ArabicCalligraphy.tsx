"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ARABIC_VERSE, ARABIC_VERSE_TRANSLATION } from "@/lib/constants";

/**
 * The Qur'anic verse reveals itself in gold ink — written right-to-left by a
 * travelling pen glow, then the translation fades in. Subtle, no flash.
 */
export function ArabicCalligraphy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const WRITE = 3.4;

  return (
    <section className="relative flex min-h-[90svh] items-center justify-center safe-x">
      <div ref={ref} className="relative w-full max-w-3xl px-4 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="mb-6 block font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]"
        >
          IN THE NAME OF LOVE &amp; MERCY
        </motion.span>

        <div className="relative inline-block">
          {/* faint guide ink */}
          <span
            className="font-arabic text-4xl leading-relaxed text-[color:var(--color-gold-deep)] opacity-[0.08] sm:text-6xl"
            aria-hidden
          >
            {ARABIC_VERSE}
          </span>

          {/* revealed gold ink (RTL clip wipe) */}
          <motion.span
            className="font-arabic text-gradient-gold anim-shimmer absolute inset-0 text-4xl leading-relaxed sm:text-6xl"
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={inView ? { clipPath: "inset(0 0 0 0%)" } : {}}
            transition={{ duration: WRITE, ease: [0.4, 0, 0.2, 1] }}
          >
            {ARABIC_VERSE}
          </motion.span>

          {/* travelling pen glow */}
          {inView && (
            <motion.span
              className="pointer-events-none absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full sm:h-10 sm:w-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,206,143,0.95), transparent 65%)",
              }}
              initial={{ left: "100%", opacity: 0 }}
              animate={{ left: ["100%", "0%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: WRITE, ease: [0.4, 0, 0.2, 1] }}
            />
          )}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: WRITE + 0.3, duration: 1.2 }}
          className="mt-8 font-serif text-base italic text-[color:var(--color-ink-soft)] sm:text-lg"
        >
          {ARABIC_VERSE_TRANSLATION}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: WRITE + 0.9, duration: 1 }}
          className="mt-2 font-body text-[0.62rem] tracking-wide-2 text-[color:var(--color-ink-soft)]"
        >
          Sūrah ar-Rūm · 30:21
        </motion.p>
      </div>
    </section>
  );
}
