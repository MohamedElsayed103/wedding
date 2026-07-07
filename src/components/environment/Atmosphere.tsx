"use client";

import { Sky } from "./Sky";
import { ParticleField } from "./ParticleField";
import { Butterflies } from "./Butterflies";
import { Fireflies } from "./Fireflies";

/**
 * The persistent world that never breaks between "sections" — this is what
 * makes the whole site feel like one continuous film. It lives behind all
 * content and evolves purely from scroll progress.
 */
export function Atmosphere() {
  return (
    <>
      <Sky />
      <ParticleField />
      <Butterflies />
      <Fireflies />
      {/* Gentle vignette to keep the eye centred, cinematic framing */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(130% 100% at 50% 42%, transparent 55%, rgba(74,66,53,0.14) 100%)",
        }}
      />
    </>
  );
}
