"use client";

import { FiMapPin, FiNavigation } from "react-icons/fi";
import { Reveal } from "@/components/ui/Reveal";
import { useLang } from "@/hooks/useLang";
import { useSite } from "@/hooks/useSite";

export function Venue() {
  const { t } = useLang();
  const { mapsUrl } = useSite();
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${t.venueName} ${t.venueCity}`
  )}&z=14&output=embed`;

  const tips = [
    { icon: "🅿️", title: t.tipParkingTitle, text: t.tipParkingText },
    { icon: "🕰️", title: t.tipArrivalTitle, text: t.tipArrivalText },
    { icon: "🌿", title: t.tipDressTitle, text: t.tipDressText },
  ];

  return (
    <section
      id="venue"
      className="cv-auto relative flex min-h-[90svh] items-center justify-center py-16 safe-x"
    >
      <div className="w-full max-w-2xl">
        <Reveal className="mb-8 text-center">
          <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
            {t.venueLabel}
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
            {t.venueName}
          </h2>
          <p className="mt-2 font-serif text-lg italic text-[color:var(--color-ink-soft)]">
            {t.venueCity}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass relative overflow-hidden rounded-2xl p-3">
            <div className="relative overflow-hidden rounded-xl">
              {/* custom marker floating over the map */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full">
                <div className="relative flex flex-col items-center">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white shadow-lg"
                    style={{ background: "linear-gradient(140deg,#e8ce8f,#c9a24b)" }}
                  >
                    <FiMapPin className="text-white" />
                  </div>
                  <div className="h-3 w-3 -mt-1 rotate-45 bg-[color:var(--color-gold)] shadow" />
                  <span className="mt-1 h-2 w-6 rounded-full bg-black/20 blur-[2px]" />
                </div>
                <span className="absolute left-1/2 top-0 h-11 w-11 -translate-x-1/2 rounded-full border-2 border-[color:var(--color-gold)]" style={{ animation: "pulse-ring 2.4s ease-out infinite" }} />
              </div>

              <iframe
                title="Wedding venue map"
                src={embedSrc}
                className="h-[300px] w-full border-0 sm:h-[360px]"
                style={{ filter: "sepia(0.18) saturate(0.9) contrast(0.96)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-button mt-3 flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-roman text-xs tracking-luxe text-[#3c2c20]"
            >
              <FiNavigation />
              {t.directions}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {tips.map((tip) => (
              <div key={tip.title} className="glass rounded-xl p-5 text-center">
                <span className="text-2xl">{tip.icon}</span>
                <h4 className="mt-2 font-roman text-xs tracking-wide-2 text-[color:var(--color-gold-deep)]">
                  {tip.title}
                </h4>
                <p className="mt-1 font-body text-xs leading-relaxed text-[color:var(--color-ink-soft)]">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
