"use client";

import { ScrollProvider } from "@/hooks/useScroll";
import { LangProvider } from "@/hooks/useLang";
import { SiteProvider } from "@/hooks/useSite";
import type { Lang, Strings } from "@/lib/i18n";
import type { ResolvedSite } from "@/lib/siteContent";
import { Atmosphere } from "@/components/environment/Atmosphere";
import { Preloader } from "@/components/ui/Preloader";
import { LanguageGate } from "@/components/ui/LanguageGate";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { Envelope } from "@/components/scenes/Envelope";
import { ArabicCalligraphy } from "@/components/scenes/ArabicCalligraphy";
import { Meeting } from "@/components/scenes/Meeting";
import { Journey } from "@/components/scenes/Journey";
import { InvitationCard } from "@/components/scenes/InvitationCard";
import { Countdown } from "@/components/scenes/Countdown";
import { Venue } from "@/components/scenes/Venue";
import { Finale } from "@/components/scenes/Finale";

/**
 * The whole film — one continuous, scroll-driven story. The Atmosphere lives
 * behind every chapter so the world never "cuts" between sections.
 */
export function Experience({
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
        <Atmosphere />
        <CustomCursor />
        <ProgressRail />

        <main className="relative z-10">
          <Envelope />
          <ArabicCalligraphy />
          <Meeting />
          <Journey />
          <InvitationCard />
          <Countdown />
          <Venue />
          <Finale />
        </main>
      </ScrollProvider>
      </SiteProvider>
    </LangProvider>
  );
}
