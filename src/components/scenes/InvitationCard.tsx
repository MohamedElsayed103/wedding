"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { COUPLE, WEDDING_DATE_LABEL, VENUE } from "@/lib/constants";
import { OliveBranch } from "@/components/environment/GardenElements";

/** The floating, luxurious wedding invitation. */
export function InvitationCard() {
  return (
    <section
      id="invitation"
      className="relative flex min-h-[90svh] items-center justify-center py-16 safe-x"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1000 }}
        className="glass anim-float relative w-full max-w-md rounded-2xl px-8 py-14 text-center"
      >
        {/* corner olive flourishes */}
        <OliveBranch className="absolute -top-6 left-1/2 w-40 -translate-x-1/2 opacity-80" />

        <Reveal delay={0.1}>
          <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
            TOGETHER WITH THEIR FAMILIES
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 className="mt-8 font-script text-5xl leading-tight text-[color:var(--color-gold-deep)] sm:text-6xl">
            {COUPLE.groom}
          </h2>
          <p className="my-2 font-serif text-2xl text-[color:var(--color-ink-soft)]">&amp;</p>
          <h2 className="font-script text-5xl leading-tight text-[color:var(--color-gold-deep)] sm:text-6xl">
            {COUPLE.bride}
          </h2>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mx-auto my-8 flex items-center justify-center gap-3">
            <span className="gold-hairline w-16" />
            <span className="text-[color:var(--color-gold)]">❧</span>
            <span className="gold-hairline w-16" />
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="font-serif text-lg italic text-[color:var(--color-ink-soft)]">
            request the honour of your presence
          </p>
          <p className="mt-6 font-display text-2xl tracking-wide-2 text-[color:var(--color-ink)] sm:text-3xl">
            {WEDDING_DATE_LABEL}
          </p>
          <p className="mt-2 font-body text-sm tracking-wide-2 text-[color:var(--color-ink-soft)]">
            {VENUE.name} · {VENUE.city}
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}
