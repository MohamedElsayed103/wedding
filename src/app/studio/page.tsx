import Link from "next/link";
import type { Metadata } from "next";
import { Couple } from "@/components/characters/Couple";
import {
  BRAND,
  DIFFERENTIATORS,
  FAQ,
  HOW_IT_WORKS,
  PRICING,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: `${BRAND.name} — cinematic wedding invitation films`,
  description: BRAND.subtitle,
};

const mailto = `mailto:${BRAND.email}?subject=${encodeURIComponent(
  "I'd like a Reverie invitation"
)}`;

export default function Landing() {
  return (
    <div className="min-h-screen bg-[color:var(--color-ivory)] text-[color:var(--color-ink)]">
      {/* ---- Nav ---- */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--color-gold)]/15 bg-[color:var(--color-ivory)]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 safe-x">
          <span className="font-script text-2xl text-[color:var(--color-gold-deep)]">
            {BRAND.wordmark}
          </span>
          <div className="hidden items-center gap-8 font-body text-sm text-[color:var(--color-ink-soft)] sm:flex">
            <a href="#story" className="hover:text-[color:var(--color-ink)]">Story</a>
            <a href="#templates" className="hover:text-[color:var(--color-ink)]">Templates</a>
            <a href="#pricing" className="hover:text-[color:var(--color-ink)]">Pricing</a>
            <a href="#faq" className="hover:text-[color:var(--color-ink)]">FAQ</a>
          </div>
          <Link
            href="/demo"
            className="rounded-full border border-[color:var(--color-gold)]/40 px-5 py-2 font-roman text-xs tracking-wide-2 text-[color:var(--color-gold-deep)] transition-colors hover:bg-[color:var(--color-gold)]/10"
          >
            LIVE DEMO
          </Link>
        </nav>
      </header>

      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 30%, rgba(232,206,143,0.35), transparent 70%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 safe-x sm:py-24 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="font-roman tracking-luxe text-[0.7rem] text-[color:var(--color-gold-deep)]">
              WEDDING INVITATION FILMS
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-[color:var(--color-ink)] sm:text-6xl">
              {BRAND.tagline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-serif text-lg leading-relaxed text-[color:var(--color-ink-soft)] lg:mx-0">
              {BRAND.subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/demo"
                className="lux-button w-full rounded-full px-8 py-4 text-center font-roman text-xs tracking-luxe text-[#3c2c20] sm:w-auto"
              >
                WATCH A LIVE INVITATION
              </Link>
              <a
                href="#pricing"
                className="w-full rounded-full border border-[color:var(--color-gold)]/40 px-8 py-4 text-center font-roman text-xs tracking-luxe text-[color:var(--color-gold-deep)] transition-colors hover:bg-[color:var(--color-gold)]/10 sm:w-auto"
              >
                SEE PRICING
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[46vh] max-h-[440px] min-h-[280px]">
            <Couple lookingAtEachOther className="h-full" />
          </div>
        </div>
      </section>

      {/* ---- Story ---- */}
      <section id="story" className="border-t border-[color:var(--color-gold)]/15 bg-[color:var(--color-cream)]/60">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center safe-x">
          <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
            WHAT WE DO
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
            An invitation you keep, not one you throw away
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            Most invitations are read once and forgotten. We believe the invitation should be
            the first memory of your wedding — a little film of your love story that your family
            replays, screenshots, and remembers years later. That&apos;s what {BRAND.name} makes.
          </p>
        </div>
      </section>

      {/* ---- Differentiators ---- */}
      <section className="mx-auto max-w-6xl px-5 py-20 safe-x">
        <h2 className="text-center font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
          What you won&apos;t find anywhere else
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title} className="glass rounded-2xl p-6 text-center">
              <span className="text-3xl">{d.icon}</span>
              <h3 className="mt-4 font-display text-xl text-[color:var(--color-ink)]">{d.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                {d.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Templates ---- */}
      <section id="templates" className="border-y border-[color:var(--color-gold)]/15 bg-[color:var(--color-cream)]/60">
        <div className="mx-auto max-w-6xl px-5 py-20 safe-x">
          <div className="text-center">
            <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
              CHOOSE YOUR STYLE
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
              Our templates
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/demo"
              className="group glass overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
            >
              <div
                className="flex h-56 items-end justify-center"
                style={{ background: "linear-gradient(180deg,#cfe1ea,#e9eede 55%,#f7f0e2)" }}
              >
                <Couple animate={false} className="h-48" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-[color:var(--color-ink)]">The Enchanted Garden</h3>
                <p className="mt-1 font-body text-sm text-[color:var(--color-ink-soft)]">
                  A golden-hour garden film — envelope, calligraphy, the walk, the vows.
                </p>
                <span className="mt-3 inline-block font-roman text-xs tracking-wide-2 text-[color:var(--color-gold-deep)] group-hover:underline">
                  WATCH LIVE →
                </span>
              </div>
            </Link>

            <div className="glass flex flex-col items-center justify-center rounded-2xl p-8 text-center">
              <span className="text-3xl">✦</span>
              <h3 className="mt-3 font-display text-xl text-[color:var(--color-ink)]">More coming</h3>
              <p className="mt-1 font-body text-sm text-[color:var(--color-ink-soft)]">
                New template films are added regularly. Want a specific vibe? We build custom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- How it works ---- */}
      <section className="mx-auto max-w-5xl px-5 py-20 safe-x">
        <h2 className="text-center font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
          How it works
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.step} className="text-center">
              <span className="font-script text-4xl text-[color:var(--color-gold)]">{s.step}</span>
              <h3 className="mt-2 font-display text-xl text-[color:var(--color-ink)]">{s.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Pricing ---- */}
      <section id="pricing" className="border-y border-[color:var(--color-gold)]/15 bg-[color:var(--color-cream)]/60">
        <div className="mx-auto max-w-6xl px-5 py-20 safe-x">
          <div className="text-center">
            <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
              SIMPLE, ONE-TIME PRICING
            </p>
            <h2 className="mt-3 font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
              Choose your invitation
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PRICING.map((tier) => (
              <div
                key={tier.id}
                className={
                  "glass relative flex flex-col rounded-2xl p-7 " +
                  (tier.featured ? "ring-2 ring-[color:var(--color-gold)]" : "")
                }
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--color-gold)] px-3 py-1 font-roman text-[0.6rem] tracking-wide-2 text-[#3c2c20]">
                    MOST LOVED
                  </span>
                )}
                <h3 className="font-display text-2xl text-[color:var(--color-ink)]">{tier.name}</h3>
                <p className="mt-1 font-serif italic text-[color:var(--color-ink-soft)]">{tier.tagline}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-[color:var(--color-gold-deep)]">{tier.price}</span>
                  <span className="font-body text-xs text-[color:var(--color-ink-soft)]">{tier.cadence}</span>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 font-body text-sm text-[color:var(--color-ink-soft)]">
                      <span className="text-[color:var(--color-gold)]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={mailto}
                  className={
                    "mt-7 rounded-full px-6 py-3 text-center font-roman text-xs tracking-luxe " +
                    (tier.featured
                      ? "lux-button text-[#3c2c20]"
                      : "border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold)]/10")
                  }
                >
                  START
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-20 safe-x">
        <h2 className="text-center font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
          Common questions
        </h2>
        <div className="mt-10 divide-y divide-[color:var(--color-gold)]/15">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-[color:var(--color-ink)]">
                {item.q}
                <span className="ml-4 text-[color:var(--color-gold)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 font-body text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="relative overflow-hidden border-t border-[color:var(--color-gold)]/15">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 80% at 50% 100%, rgba(201,162,75,0.25), transparent 65%)" }}
        />
        <div className="mx-auto max-w-2xl px-5 py-24 text-center safe-x">
          <h2 className="font-script text-5xl text-[color:var(--color-gold-deep)] sm:text-6xl">
            Your story deserves this.
          </h2>
          <p className="mt-4 font-serif text-lg text-[color:var(--color-ink-soft)]">
            See a real invitation, then let&apos;s make yours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/demo" className="lux-button w-full rounded-full px-8 py-4 font-roman text-xs tracking-luxe text-[#3c2c20] sm:w-auto">
              WATCH THE DEMO
            </Link>
            <a href={mailto} className="w-full rounded-full border border-[color:var(--color-gold)]/40 px-8 py-4 font-roman text-xs tracking-luxe text-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold)]/10 sm:w-auto">
              GET YOURS
            </a>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-[color:var(--color-gold)]/15 bg-[color:var(--color-cream)]/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-center safe-x sm:flex-row sm:text-left">
          <span className="font-script text-2xl text-[color:var(--color-gold-deep)]">{BRAND.wordmark}</span>
          <p className="font-body text-xs text-[color:var(--color-ink-soft)]">
            © {new Date().getFullYear()} {BRAND.name}. The invitation is a memory.
          </p>
          <a href={mailto} className="font-body text-xs text-[color:var(--color-gold-deep)] hover:underline">
            {BRAND.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
