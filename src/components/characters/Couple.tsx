"use client";

import { cx } from "@/lib/utils";
import { Mohamed, type SkinTone as MohamedSkinTone, type OutfitPalette as MohamedPalette, type BeardStyle } from "./Mohamed";
import { Mariam, type SkinTone as MariamSkinTone, type OutfitPalette as MariamPalette } from "./Mariam";

interface Props {
  walking?: boolean;
  attire?: "signature" | "ceremony";
  lookingAtEachOther?: boolean;
  className?: string;
  animate?: boolean;
  groomSkinTone?: MohamedSkinTone;
  groomPalette?: MohamedPalette;
  groomBeard?: BeardStyle;
  brideSkinTone?: MariamSkinTone;
  bridePalette?: MariamPalette;
}

/**
 * Mohamed & Mariam side by side — the pair the camera follows through the
 * garden. Optionally walking (gentle bob) and gazing at one another.
 */
export function Couple({
  walking = false,
  attire = "signature",
  lookingAtEachOther = true,
  className,
  animate = true,
  groomSkinTone,
  groomPalette,
  groomBeard,
  brideSkinTone,
  bridePalette,
}: Props) {
  return (
    <div className={cx("relative flex items-end justify-center gap-2 sm:gap-4", className)}>
      <div
        className="relative h-full"
        style={walking && animate ? { animation: "walk-bob 1.1s ease-in-out infinite" } : undefined}
      >
        <Mohamed
          attire={attire}
          skinTone={groomSkinTone}
          outfitPalette={groomPalette}
          beardStyle={groomBeard}
          facing={lookingAtEachOther ? "right" : "front"}
          animate={animate}
          className="h-full"
        />
      </div>

      {/* connecting heart */}
      <div className="pointer-events-none absolute bottom-[34%] left-1/2 z-10 -translate-x-1/2">
        <span
          className={cx("block text-lg text-[color:var(--color-gold)]", animate && "anim-float")}
          style={{ animationDuration: "4s" }}
        >
          ♡
        </span>
      </div>

      <div
        className="relative h-full"
        style={
          walking && animate
            ? { animation: "walk-bob 1.1s ease-in-out 0.55s infinite" }
            : undefined
        }
      >
        <Mariam
          attire={attire}
          skinTone={brideSkinTone}
          outfitPalette={bridePalette}
          facing={lookingAtEachOther ? "left" : "front"}
          animate={animate}
          className="h-full"
        />
      </div>
    </div>
  );
}
