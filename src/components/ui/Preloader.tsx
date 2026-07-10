"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

/** A graceful monogram loader while fonts settle. Locks scroll until ready. */
export function Preloader() {
  const [done, setDone] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    let cancelled = false;
    const minShow = new Promise((r) => setTimeout(r, 1600));
    const fonts =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : Promise.resolve();

    Promise.all([minShow, fonts]).then(() => {
      if (!cancelled) setDone(true);
    });

    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelled = true;
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[color:var(--color-ivory)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-24 w-24 items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="1.2"
                strokeDasharray="289"
                initial={{ strokeDashoffset: 289 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </svg>
            <span className="font-roman text-2xl tracking-tighter text-[color:var(--color-gold-deep)]">
              M♡M
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 font-script text-xl text-[color:var(--color-gold-deep)]"
          >
            {t.tagline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
