"use client";

import { cx } from "@/lib/utils";
import { Mohamed } from "./Mohamed";
import { Mariam } from "./Mariam";

interface Props {
  outfit?: "casual" | "wedding";
  walking?: boolean;
  lookingAtEachOther?: boolean;
  className?: string;
  animate?: boolean;
}

/**
 * Mohamed & Mariam side by side — the pair the camera follows through the
 * garden. Optionally walking (gentle bob) and gazing at one another.
 */
export function Couple({
  outfit = "casual",
  walking = false,
  lookingAtEachOther = true,
  className,
  animate = true,
}: Props) {
  return (
    <div className={cx("relative flex items-end justify-center gap-2 sm:gap-4", className)}>
      <div
        className={cx("relative h-full", walking && animate && "anim-walk")}
        style={walking && animate ? { animation: "walk-bob 1.1s ease-in-out infinite" } : undefined}
      >
        <Mohamed
          outfit={outfit}
          facing={lookingAtEachOther ? "right" : "front"}
          animate={animate}
          className="h-full"
        />
      </div>

      {/* clasped hands / connecting heart */}
      <div className="pointer-events-none absolute bottom-[34%] left-1/2 z-10 -translate-x-1/2">
        <span
          className={cx("block text-lg text-[color:var(--color-gold)]", animate && "anim-float")}
          style={{ animationDuration: "4s" }}
        >
          ♡
        </span>
      </div>

      <div
        className={cx("relative h-full")}
        style={
          walking && animate
            ? { animation: "walk-bob 1.1s ease-in-out 0.55s infinite" }
            : undefined
        }
      >
        <Mariam
          outfit={outfit}
          facing={lookingAtEachOther ? "left" : "front"}
          animate={animate}
          className="h-full"
        />
      </div>
    </div>
  );
}
