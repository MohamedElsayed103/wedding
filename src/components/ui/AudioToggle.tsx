"use client";

import { useEffect, useRef, useState } from "react";
import { FiMusic, FiVolumeX } from "react-icons/fi";
import { motion } from "framer-motion";

/**
 * Optional ambience — NO autoplay. Starts only on the visitor's tap. A soft,
 * synthesized garden pad (gentle chord + airy wind) generated with Web Audio,
 * so it ships with zero audio assets.
 */
export function AudioToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  const teardown = () => {
    nodesRef.current.forEach((n) => {
      try {
        (n as OscillatorNode).stop?.();
      } catch {
        /* not an oscillator */
      }
      try {
        n.disconnect();
      } catch {
        /* already gone */
      }
    });
    nodesRef.current = [];
  };

  const start = async () => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 2.5);
    master.connect(ctx.destination);
    masterRef.current = master;

    // Warm chord pad (soft major 9th)
    const freqs = [220, 277.18, 329.63, 493.88];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 ? "sine" : "triangle";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.14 / freqs.length;
      // slow shimmer
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05 / freqs.length;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      osc.connect(g);
      g.connect(master);
      osc.start();
      lfo.start();
      nodesRef.current.push(osc, lfo, g, lfoGain);
    });

    // Airy wind — filtered noise
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 480;
    bp.Q.value = 0.7;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.03;
    noise.connect(bp);
    bp.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    nodesRef.current.push(noise, bp, noiseGain);
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      window.setTimeout(teardown, 1300);
    } else {
      teardown();
    }
  };

  const toggle = () => {
    if (on) {
      stop();
      setOn(false);
    } else {
      start().catch(() => {});
      setOn(true);
    }
  };

  useEffect(() => {
    return () => {
      teardown();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      onClick={toggle}
      aria-label={on ? "Mute ambience" : "Play ambience"}
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
      <span className="sr-only">
        {on ? <FiVolumeX /> : null}
      </span>
    </motion.button>
  );
}
