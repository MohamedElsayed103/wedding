"use client";

import { useEffect, useRef, useState } from "react";
import { FiMusic } from "react-icons/fi";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScroll";

/**
 * Background music (public/audio.m4a). It auto-starts once the invitation has
 * been opened and the visitor begins scrolling — scroll progress only moves
 * past 0 after the envelope unlocks the page, so that's our "opened + scrolling"
 * signal, and the open gesture provides the user-activation browsers require
 * for playback. The button lets guests mute/unmute at any time.
 */
export function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const startedRef = useRef(false); // auto-start only once
  const mutedByUserRef = useRef(false); // don't auto-restart after a manual pause
  const progress = useScrollProgress();

  const play = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;
    a.play()
      .then(() => setOn(true))
      .catch(() => {
        // Autoplay blocked (no user activation yet) — allow a later retry.
        startedRef.current = false;
      });
  };

  // Auto-start when the story starts scrolling (invitation already opened).
  useEffect(() => {
    if (startedRef.current || mutedByUserRef.current) return;
    if (progress > 0.015) {
      startedRef.current = true;
      play();
    }
  }, [progress]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
      mutedByUserRef.current = true;
    } else {
      mutedByUserRef.current = false;
      startedRef.current = true;
      play();
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    return () => {
      a?.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/audio.m4a" loop preload="auto" aria-hidden />
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={toggle}
        aria-label={on ? "Mute music" : "Play music"}
        className="glass fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[80] flex h-12 w-12 items-center justify-center rounded-full text-[color:var(--color-gold-deep)] active:scale-95"
      >
        {on ? (
          <div className="flex items-end gap-[2px]" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-[color:var(--color-gold-deep)]"
                animate={{ height: [4, 12, 6, 14, 5] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut",
                }}
                style={{ height: 6 }}
              />
            ))}
          </div>
        ) : (
          <FiMusic className="text-lg" />
        )}
      </motion.button>
    </>
  );
}
