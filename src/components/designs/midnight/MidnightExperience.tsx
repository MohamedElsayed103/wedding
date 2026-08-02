"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollProvider, useLenis } from "@/hooks/useScroll";
import { LangProvider, useLang } from "@/hooks/useLang";
import { SiteProvider, useSite } from "@/hooks/useSite";
import type { Lang, Strings } from "@/lib/i18n";
import type { ResolvedSite } from "@/lib/siteContent";
import { Preloader } from "@/components/ui/Preloader";
import { LanguageGate } from "@/components/ui/LanguageGate";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { Couple } from "@/components/characters/Couple";
import { seededRandom } from "@/lib/utils";

/**
 * DESIGN #2 — "Midnight Royal".
 *
 * A distinct coded design (not a recolour of the garden film): its own starlit
 * atmosphere, its own opening (a glowing monogram instead of an envelope), and
 * its own scene flow. It reuses the shared primitives — providers, the language
 * gate, the character avatars and the bilingual dictionary — so any couple's
 * data renders in either design purely by which template they pick.
 */
export function MidnightExperience({
  dict,
  site,
}: {
  dict: Record<Lang, Strings>;
  site: ResolvedSite;
}) {
  return (
    <LangProvider dict={dict} defaultLang={site.defaultLanguage}>
      <SiteProvider site={site}>
        <ScrollProvider>
          <Preloader />
          <LanguageGate />
          <MidnightSky />
          <CustomCursor />
          <ProgressRail />
          <AudioToggle />

          <main className="relative z-10">
            <Overture />
            <Vow />
            <Story />
            <Moment />
            <Forever />
          </main>
        </ScrollProvider>
      </SiteProvider>
    </LangProvider>
  );
}

/* ---------------- shared bits ---------------- */

const GOLD = "#d9b45a";
const GOLD_LIGHT = "#f0dca0";
const IVORY = "#f4ecd8";
const IVORY_SOFT = "#cdbf9a";

function Hairline({ className = "" }: { className?: string }) {
  return (
    <span
      className={"inline-block h-px " + className}
      style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
    />
  );
}

/* ---------------- persistent starfield world ---------------- */

function MidnightSky() {
  const stars = useMemo(() => {
    const rnd = seededRandom(77);
    return Array.from({ length: 68 }, (_, i) => ({
      id: i,
      left: Math.round(rnd() * 1000) / 10,
      top: Math.round(rnd() * 850) / 10,
      size: 1 + Math.round(rnd() * 2),
      delay: Math.round(rnd() * 400) / 100,
      dur: 2.6 + Math.round(rnd() * 300) / 100,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
      style={{
        background:
          "linear-gradient(180deg,#0a0e24 0%,#111838 42%,#1c2145 72%,#2a2749 100%)",
      }}
    >
      {/* moon glow */}
      <div
        className="absolute -right-20 -top-24 h-[26rem] w-[26rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,230,184,0.9) 0%, rgba(217,180,90,0.28) 34%, transparent 68%)",
          filter: "blur(2px)",
        }}
      />
      <div className="absolute -right-2 top-6 h-24 w-24 rounded-full" style={{ background: "radial-gradient(circle at 40% 38%, #fbf3d6, #e9d69a 60%, #d9b45a)" }} />

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: IVORY,
            boxShadow: `0 0 ${s.size * 2}px rgba(253,246,223,0.8)`,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* warm floor glow */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 70% at 50% 100%, rgba(217,180,90,0.12), transparent 60%)" }}
      />
    </div>
  );
}

/* ---------------- 1 · Overture (opening + scroll unlock) ---------------- */

function Overture() {
  const { t, ready } = useLang();
  const { dateDots } = useSite();
  const { unlockScroll, scrollTo } = useLenis();
  const [entered, setEntered] = useState(false);

  const enter = useCallback(() => {
    setEntered(true);
    unlockScroll();
  }, [unlockScroll]);

  // First scroll gesture also enters (the gate swallows earlier gestures).
  useEffect(() => {
    if (!ready || entered) return;
    const open = () => enter();
    window.addEventListener("wheel", open, { once: true, passive: true });
    window.addEventListener("touchmove", open, { once: true, passive: true });
    return () => {
      window.removeEventListener("wheel", open);
      window.removeEventListener("touchmove", open);
    };
  }, [ready, entered, enter]);

  const gi = (t.groom.trim()[0] ?? "").toUpperCase();
  const bi = (t.bride.trim()[0] ?? "").toUpperCase();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center safe-x">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="font-roman uppercase tracking-luxe text-[0.7rem]"
        style={{ color: GOLD }}
      >
        {t.youAreInvited}
      </motion.p>

      {/* glowing monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-8 flex h-40 w-40 items-center justify-center rounded-full sm:h-48 sm:w-48"
        style={{
          border: `1px solid ${GOLD}`,
          boxShadow: `0 0 60px -12px ${GOLD}, inset 0 0 40px -20px ${GOLD_LIGHT}`,
        }}
      >
        <span
          className="absolute h-full w-full rounded-full"
          style={{ border: `1px solid rgba(217,180,90,0.25)`, animation: "pulse-ring 3.4s ease-out infinite" }}
        />
        <span className="font-script text-4xl sm:text-5xl" style={{ color: IVORY }}>
          {gi}
        </span>
        <span className="mx-1 font-script text-2xl sm:text-3xl" style={{ color: GOLD }}>&amp;</span>
        <span className="font-script text-4xl sm:text-5xl" style={{ color: IVORY }}>
          {bi}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="mt-10 font-script text-5xl sm:text-6xl"
        style={{ color: GOLD_LIGHT, textShadow: "0 2px 30px rgba(217,180,90,0.4)" }}
      >
        {t.coupleNames}
      </motion.h1>

      <div className="mt-5 flex items-center justify-center gap-3">
        <Hairline className="w-12" />
        <span className="font-roman tracking-wide-2 text-xs" style={{ color: IVORY_SOFT }}>{dateDots}</span>
        <Hairline className="w-12" />
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 0 : 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={() => {
          enter();
          scrollTo(window.innerHeight, 0);
        }}
        className="mt-12 flex min-h-11 flex-col items-center gap-2 px-6 font-body text-xs tracking-wide-2"
        style={{ color: IVORY_SOFT, pointerEvents: entered ? "none" : undefined }}
      >
        <span>{t.scrollToBegin}</span>
        <span className="anim-float" style={{ color: GOLD }}>❦</span>
      </motion.button>
    </section>
  );
}

/* ---------------- 2 · The Vow (couple + verse) ---------------- */

function Vow() {
  const { t } = useLang();
  const { groom, bride } = useSite();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center safe-x">
      <p className="font-roman uppercase tracking-luxe text-[0.65rem]" style={{ color: GOLD }}>
        {t.calligraphyLabel}
      </p>
      {t.verseTranslation ? (
        <p className="mx-auto mt-4 max-w-xl font-serif text-xl italic leading-relaxed sm:text-2xl" style={{ color: IVORY }}>
          {t.verseTranslation}
        </p>
      ) : null}
      <p className="mt-2 font-roman tracking-wide-2 text-[0.6rem]" style={{ color: IVORY_SOFT }}>
        {t.verseReference}
      </p>

      {/* spotlight + couple in ceremony attire */}
      <div className="relative mt-8 h-[42vh] max-h-[420px] min-h-[240px]">
        <motion.div
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        >
          <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, rgba(240,220,160,0.22), transparent 62%)" }} />
        </motion.div>
        <Couple attire="ceremony" lookingAtEachOther groomLook={groom} brideLook={bride} className="relative h-full" />
      </div>
    </section>
  );
}

/* ---------------- 3 · The Story (chapters in the stars) ---------------- */

function Story() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const chapters = t.chapters;

  return (
    <section ref={ref} className="relative" style={{ height: `${chapters.length * 70 + 30}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-6 safe-x">
        {chapters.map((c, i) => (
          <StoryChapter key={c.id} label={c.label} text={c.text} index={i} total={chapters.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function StoryChapter({
  label,
  text,
  index,
  total,
  progress,
}: {
  label: string;
  text: string;
  index: number;
  total: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  const band = 1 / total;
  const start = index * band;
  const opacity = useTransform(
    progress,
    [start, start + band * 0.28, start + band * 0.78, start + band],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, start + band], [46, -34]);

  return (
    <motion.div style={{ opacity, y }} className="pointer-events-none absolute left-0 right-0 mx-auto max-w-3xl px-6 text-center">
      <p className="font-roman uppercase tracking-luxe text-sm sm:text-base" style={{ color: GOLD }}>{label}</p>
      <p className="mt-5 font-serif text-2xl italic leading-snug sm:text-4xl lg:text-5xl" style={{ color: IVORY }}>{text}</p>
    </motion.div>
  );
}

/* ---------------- 4 · The Moment (countdown + venue) ---------------- */

function useCountdown(iso: string) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  return left;
}

function Moment() {
  const { t } = useLang();
  const { weddingDate, mapsUrl } = useSite();
  const c = useCountdown(weddingDate);
  const cells: [number, string][] = c
    ? [
        [c.d, t.days],
        [c.h, t.hours],
        [c.m, t.minutes],
        [c.s, t.seconds],
      ]
    : [];

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center safe-x">
      <p className="font-roman uppercase tracking-luxe text-[0.65rem]" style={{ color: GOLD }}>{t.countingLabel}</p>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl" style={{ color: IVORY }}>{t.countingTitle}</h2>

      <div className="mt-10 flex gap-4 sm:gap-7">
        {cells.map(([v, lbl]) => (
          <div key={lbl} className="flex min-w-[3.6rem] flex-col items-center">
            <span className="font-display text-4xl sm:text-6xl" style={{ color: GOLD_LIGHT }}>
              {String(v).padStart(2, "0")}
            </span>
            <span className="mt-1 font-roman uppercase tracking-wide-2 text-[0.55rem]" style={{ color: IVORY_SOFT }}>{lbl}</span>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <p className="font-roman uppercase tracking-luxe text-[0.6rem]" style={{ color: GOLD }}>{t.venueLabel}</p>
        <p className="mt-3 font-display text-2xl sm:text-3xl" style={{ color: IVORY }}>{t.venueName}</p>
        <p className="mt-1 font-serif italic" style={{ color: IVORY_SOFT }}>{t.venueCity}</p>
        {mapsUrl ? (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full px-7 py-3 font-roman text-xs tracking-luxe"
            style={{ border: `1px solid ${GOLD}`, color: GOLD_LIGHT }}
          >
            {t.directions}
          </a>
        ) : null}
      </div>
    </section>
  );
}

/* ---------------- 5 · Forever (finale) ---------------- */

function Forever() {
  const { t } = useLang();
  const { dateDots } = useSite();
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center safe-x">
      <motion.h2
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1 }}
        className="font-script text-5xl sm:text-7xl"
        style={{ color: GOLD_LIGHT, textShadow: "0 2px 40px rgba(217,180,90,0.45)" }}
      >
        {t.foreverBegins}
      </motion.h2>

      <div className="mt-6 flex items-center justify-center gap-4 font-display text-xl sm:text-2xl" style={{ color: IVORY }}>
        <span>{t.groom}</span>
        <span style={{ color: GOLD }}>♡</span>
        <span>{t.bride}</span>
      </div>
      <p className="mt-4 font-roman tracking-luxe text-xs" style={{ color: GOLD }}>{dateDots}</p>

      <div className="mt-10 flex items-center gap-3">
        <Hairline className="w-10" />
        <span style={{ color: GOLD }}>✦</span>
        <Hairline className="w-10" />
      </div>
      <p className="mt-8 font-serif text-sm italic" style={{ color: IVORY_SOFT }}>{t.madeWithLove}</p>
    </section>
  );
}
