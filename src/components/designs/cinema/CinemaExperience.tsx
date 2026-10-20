"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { LangProvider, useLang } from "@/hooks/useLang";
import { SiteProvider, useSite } from "@/hooks/useSite";
import { ScrollProvider, useLenis } from "@/hooks/useScroll";
import { Preloader } from "@/components/ui/Preloader";
import { AutoPlay } from "@/components/ui/AutoPlay";
import { LanguageGate } from "@/components/ui/LanguageGate";
import { CustomCursor } from "@/components/ui/CustomCursor";
import type { Lang, Strings } from "@/lib/i18n";
import type { ResolvedSite } from "@/lib/siteContent";
import type { CinemaTheme } from "./theme";

/**
 * ONE premium, photo-driven film — re-skinned by a `theme` into many templates.
 * It shows the couple's own photos/videos when provided and degrades to an
 * elegant typographic version when they aren't, so every theme previews fine
 * before any media is uploaded.
 */
export function CinemaExperience({
  dict,
  site,
  theme,
}: {
  dict: Record<Lang, Strings>;
  site: ResolvedSite;
  theme: CinemaTheme;
}) {
  return (
    <LangProvider dict={dict} defaultLang={site.defaultLanguage}>
      <SiteProvider site={site}>
        <ScrollProvider>
          {/* The theme overrides the global --color-* tokens here, so the shared
              preloader + language gate re-colour themselves to match. */}
          <div
            className="cinema relative min-h-screen"
            style={{ ...theme.vars, background: "var(--color-ivory)", color: "var(--color-ink)" }}
          >
            <Preloader />
            <AutoPlay />
            <Unlocker />
            <LanguageGate />
            <CustomCursor />
            <main className="relative z-10">
              <Hero theme={theme} />
              <Verse theme={theme} />
              <Story theme={theme} />
              <Gallery theme={theme} />
              <Countdown theme={theme} />
              <Venue theme={theme} />
              <Finale theme={theme} />
            </main>
          </div>
        </ScrollProvider>
      </SiteProvider>
    </LangProvider>
  );
}

/** The cinema engine has no envelope/overture to break, so release the scroll
 *  lock as soon as the guest has chosen a language. */
function Unlocker() {
  const { ready } = useLang();
  const { unlockScroll } = useLenis();
  useEffect(() => {
    if (ready) unlockScroll();
  }, [ready, unlockScroll]);
  return null;
}

/* ----------------------------- helpers ----------------------------- */

const rise = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12% 0px" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
};

function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={"font-roman uppercase tracking-luxe text-[0.68rem] text-[color:var(--color-gold)] " + className}>
      {children}
    </p>
  );
}

/** A hairline ornament with a centred diamond. */
function Ornament() {
  return (
    <div className="my-6 flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-12 bg-[color:var(--color-gold)]/50" />
      <span className="rotate-45 text-[color:var(--color-gold)]">◆</span>
      <span className="h-px w-12 bg-[color:var(--color-gold)]/50" />
    </div>
  );
}

const L = (lang: Lang, en: string, ar: string) => (lang === "ar" ? ar : en);

/* ------------------------------- hero ------------------------------ */

function Hero({ theme }: { theme: CinemaTheme }) {
  const { t, lang } = useLang();
  const { media } = useSite();
  const hasPhoto = !!(media.heroVideo || media.heroImage);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden safe-x">
      {/* media layer */}
      {media.heroVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster={media.heroImage}
        />
      ) : media.heroImage ? (
        <motion.img
          src={media.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 16, ease: "easeOut" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 30%, var(--color-cream), var(--color-ivory) 70%)",
          }}
        />
      )}

      {/* legibility overlay only when there's a photo */}
      {hasPhoto && <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />}

      {/* content */}
      <div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ color: hasPhoto ? "#f6efe3" : "var(--color-ink)" }}
      >
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>
          <Kicker>{t.youAreInvited}</Kicker>
        </motion.div>

        <motion.h1
          className={theme.display + " mt-6 text-5xl leading-[1.05] sm:text-7xl lg:text-8xl"}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.groom}
          <span className="mx-3 text-[color:var(--color-gold)]">&amp;</span>
          {t.bride}
        </motion.h1>

        <motion.div
          className="mt-7 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <span className="h-px w-10 bg-current/50" />
          <span className="font-roman tracking-wide-2 text-sm sm:text-base">{t.dateLabel}</span>
          <span className="h-px w-10 bg-current/50" />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ color: hasPhoto ? "#f6efe3" : "var(--color-ink-soft)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1], y: [0, 6, 0] }}
        transition={{ delay: 1.4, duration: 2.4, repeat: Infinity, repeatDelay: 0.3 }}
      >
        <span className="font-roman text-[0.6rem] uppercase tracking-luxe">{L(lang, "scroll", "مرِّر")}</span>
        <div className="mx-auto mt-2 h-8 w-px bg-current/40" />
      </motion.div>
    </section>
  );
}

/* ------------------------------ verse ------------------------------ */

function Verse({ theme }: { theme: CinemaTheme }) {
  const { t } = useLang();
  return (
    <section className="cv-auto relative flex min-h-[70svh] items-center justify-center px-6 py-24 safe-x">
      <motion.div className="max-w-2xl text-center" {...rise}>
        <Kicker>{t.calligraphyLabel}</Kicker>
        <Ornament />
        {t.verseTranslation && (
          <p className={theme.display + " text-2xl leading-relaxed text-[color:var(--color-ink)] sm:text-3xl"}>
            {t.verseTranslation}
          </p>
        )}
        <p className="mt-6 font-roman tracking-wide-2 text-xs text-[color:var(--color-gold-deep)]">
          {t.verseReference}
        </p>
      </motion.div>
    </section>
  );
}

/* ------------------------------ story ------------------------------ */

function Story({ theme }: { theme: CinemaTheme }) {
  const { t, lang } = useLang();
  const { media } = useSite();
  const portrait = media.portrait;

  return (
    <section className="cv-auto relative px-6 py-24 safe-x">
      <motion.div className="mx-auto mb-14 max-w-xl text-center" {...rise}>
        <Kicker>{L(lang, "Our Story", "حكايتنا")}</Kicker>
        <h2 className={theme.script + " mt-3 text-4xl text-[color:var(--color-gold-deep)] sm:text-5xl"}>
          {L(lang, "How it began", "كيف بدأت")}
        </h2>
      </motion.div>

      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        {t.chapters.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <motion.div
              key={c.id}
              className={"flex flex-col items-center gap-8 md:flex-row " + (flip ? "md:flex-row-reverse" : "")}
              {...rise}
            >
              {portrait && (
                <div className="w-full md:w-1/2">
                  <div className="overflow-hidden rounded-2xl" style={{ boxShadow: "0 24px 60px -30px rgba(0,0,0,0.5)" }}>
                    <img src={portrait} alt="" className="aspect-[4/5] h-full w-full object-cover" />
                  </div>
                </div>
              )}
              <div className={"w-full " + (portrait ? "md:w-1/2" : "mx-auto max-w-2xl text-center")}>
                <span className="font-roman tracking-wide-2 text-xs uppercase text-[color:var(--color-gold)]">
                  {c.label}
                </span>
                <p className={theme.display + " mt-3 text-2xl leading-snug text-[color:var(--color-ink)] sm:text-3xl"}>
                  {c.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------- gallery ----------------------------- */

function Gallery({ theme }: { theme: CinemaTheme }) {
  const { lang } = useLang();
  const { media } = useSite();
  const shots = media.gallery ?? [];
  if (shots.length === 0) return null;

  return (
    <section className="cv-auto relative px-6 py-24 safe-x">
      <motion.div className="mx-auto mb-12 max-w-xl text-center" {...rise}>
        <Kicker>{L(lang, "Moments, Framed", "لحظات لا تُنسى")}</Kicker>
        <h2 className={theme.script + " mt-3 text-4xl text-[color:var(--color-gold-deep)] sm:text-5xl"}>
          {L(lang, "A few of ours", "من أجمل لحظاتنا")}
        </h2>
      </motion.div>

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {shots.map((src, i) => (
          <motion.div
            key={i}
            className={"group overflow-hidden rounded-xl " + (i % 5 === 0 ? "col-span-2 md:col-span-1" : "")}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={src}
              alt=""
              className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- countdown ---------------------------- */

function useCountdown(iso: string) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });
  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setLeft({ d: 0, h: 0, m: 0, s: 0, done: true });
        return;
      }
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
        done: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  return left;
}

function Countdown({ theme }: { theme: CinemaTheme }) {
  const { t } = useLang();
  const { weddingDate } = useSite();
  const c = useCountdown(weddingDate);
  const cells = [
    { v: c.d, l: t.days },
    { v: c.h, l: t.hours },
    { v: c.m, l: t.minutes },
    { v: c.s, l: t.seconds },
  ];
  return (
    <section className="cv-auto relative flex min-h-[70svh] items-center justify-center px-6 py-24 safe-x">
      <motion.div className="text-center" {...rise}>
        <Kicker>{t.countingLabel}</Kicker>
        <h2 className={theme.display + " mt-3 text-3xl text-[color:var(--color-ink)] sm:text-4xl"}>
          {t.countingTitle}
        </h2>
        <div className="mt-10 flex items-start justify-center gap-5 sm:gap-9">
          {cells.map((cell) => (
            <div key={cell.l} className="min-w-[3.5rem]">
              <div className={theme.display + " text-4xl tabular-nums text-[color:var(--color-gold-deep)] sm:text-6xl"}>
                {String(cell.v).padStart(2, "0")}
              </div>
              <div className="mt-2 font-roman text-[0.6rem] uppercase tracking-luxe text-[color:var(--color-ink-soft)]">
                {cell.l}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------ venue ------------------------------ */

function Venue({ theme }: { theme: CinemaTheme }) {
  const { t } = useLang();
  const { mapsUrl } = useSite();
  return (
    <section className="cv-auto relative flex min-h-[70svh] items-center justify-center px-6 py-24 safe-x">
      <motion.div className="max-w-xl text-center" {...rise}>
        <Kicker>{t.venueLabel}</Kicker>
        <h2 className={theme.display + " mt-4 text-3xl text-[color:var(--color-ink)] sm:text-5xl"}>
          {t.venueName}
        </h2>
        {t.venueCity && (
          <p className="mt-2 font-serif text-lg italic text-[color:var(--color-ink-soft)]">{t.venueCity}</p>
        )}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full border border-[color:var(--color-gold)]/50 px-8 py-3 font-roman text-xs uppercase tracking-luxe text-[color:var(--color-gold-deep)] transition-colors hover:bg-[color:var(--color-gold)]/10"
          >
            {t.directions}
          </a>
        )}
      </motion.div>
    </section>
  );
}

/* ------------------------------ finale ----------------------------- */

function Finale({ theme }: { theme: CinemaTheme }) {
  const { t } = useLang();
  return (
    <section className="relative flex min-h-[90svh] items-center justify-center px-6 py-24 text-center safe-x">
      <motion.div {...rise}>
        <h2 className={theme.script + " text-5xl text-[color:var(--color-gold-deep)] sm:text-7xl"}>
          {t.foreverBegins}
        </h2>
        <Ornament />
        <p className={theme.display + " text-2xl text-[color:var(--color-ink)] sm:text-3xl"}>
          {t.coupleNames}
        </p>
        <p className="mt-6 font-serif text-base italic text-[color:var(--color-ink-soft)]">
          {t.madeWithLove}
        </p>
      </motion.div>
    </section>
  );
}
