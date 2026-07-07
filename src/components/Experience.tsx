"use client";

import { ScrollProvider } from "@/hooks/useScroll";
import { Atmosphere } from "@/components/environment/Atmosphere";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { Envelope } from "@/components/scenes/Envelope";
import { ArabicCalligraphy } from "@/components/scenes/ArabicCalligraphy";
import { Meeting } from "@/components/scenes/Meeting";
import { Journey } from "@/components/scenes/Journey";
import { Transformation } from "@/components/scenes/Transformation";
import { InvitationCard } from "@/components/scenes/InvitationCard";
import { Countdown } from "@/components/scenes/Countdown";
import { Venue } from "@/components/scenes/Venue";
import { Finale } from "@/components/scenes/Finale";

/**
 * The whole film — one continuous, scroll-driven story. The Atmosphere lives
 * behind every chapter so the world never "cuts" between sections.
 */
export function Experience() {
  return (
    <ScrollProvider>
      <Preloader />
      <Atmosphere />
      <CustomCursor />
      <ProgressRail />
      <AudioToggle />

      <main className="relative z-10">
        <Envelope />
        <ArabicCalligraphy />
        <Meeting />
        <Journey />
        <Transformation />
        <InvitationCard />
        <Countdown />
        <Venue />
        <Finale />
      </main>
    </ScrollProvider>
  );
}
