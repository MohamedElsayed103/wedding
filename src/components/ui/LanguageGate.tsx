"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";

/**
 * The very first thing a guest sees: an elegant bilingual prompt to choose
 * their language. Locks scrolling until a choice is made; skipped entirely
 * on return visits (choice is remembered).
 */
export function LanguageGate() {
  const { ready, choose } = useLang();

  // Hold the page still while the gate is open (body-level lock so it
  // composes with the preloader's html-level lock).
  useEffect(() => {
    if (ready) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[color:var(--color-ivory)] safe-x"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* soft golden halo */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(55% 45% at 50% 42%, rgba(232,206,143,0.28), transparent 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--color-gold)]/50"
              style={{ boxShadow: "0 0 40px rgba(201,162,75,0.25)" }}
            >
              <span className="font-roman text-xl tracking-tighter text-[color:var(--color-gold-deep)]">
                M♡M
              </span>
            </div>

            <p className="mt-8 font-serif text-lg italic text-[color:var(--color-ink-soft)]">
              Choose your language
            </p>
            <p className="mt-1 font-arabic text-xl text-[color:var(--color-ink-soft)]">
              اختر لغتك
            </p>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={() => choose("en")}
                className="lux-button min-h-12 rounded-full px-10 py-3 font-roman text-sm tracking-wide-2 text-[#3c2c20] active:scale-95"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => choose("ar")}
                className="min-h-12 rounded-full border border-[color:var(--color-gold)]/50 bg-white/50 px-10 py-3 font-arabic text-lg text-[color:var(--color-gold-deep)] transition-colors hover:bg-white/80 active:scale-95"
              >
                العربية
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
