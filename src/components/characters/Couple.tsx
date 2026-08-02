"use client";

import { cx } from "@/lib/utils";
import { Avatar } from "./avatar/Avatar";
import {
  BRIDE_DEFAULT_LOOK,
  GROOM_DEFAULT_LOOK,
  type AvatarLook,
} from "./avatar/types";

interface Props {
  groomLook?: AvatarLook;
  brideLook?: AvatarLook;
  attire?: "signature" | "ceremony";
  walking?: boolean;
  lookingAtEachOther?: boolean;
  className?: string;
  animate?: boolean;
}

/** Mohamed & Mariam (or any couple) side by side. */
export function Couple({
  groomLook = GROOM_DEFAULT_LOOK,
  brideLook = BRIDE_DEFAULT_LOOK,
  attire = "signature",
  walking = false,
  lookingAtEachOther = true,
  className,
  animate = true,
}: Props) {
  return (
    <div className={cx("relative flex items-end justify-center gap-2 sm:gap-4", className)}>
      <div
        className="relative h-full"
        style={walking && animate ? { animation: "walk-bob 1.1s ease-in-out infinite" } : undefined}
      >
        <Avatar
          config={{ ...groomLook, role: "groom", attire }}
          facing={lookingAtEachOther ? "right" : "front"}
          animate={animate}
          className="h-full"
        />
      </div>

      <div className="pointer-events-none absolute bottom-[34%] left-1/2 z-10 -translate-x-1/2">
        <span className={cx("block text-lg text-[color:var(--color-gold)]", animate && "anim-float")} style={{ animationDuration: "4s" }}>
          ♡
        </span>
      </div>

      <div
        className="relative h-full"
        style={walking && animate ? { animation: "walk-bob 1.1s ease-in-out 0.55s infinite" } : undefined}
      >
        <Avatar
          config={{ ...brideLook, role: "bride", attire }}
          facing={lookingAtEachOther ? "left" : "front"}
          animate={animate}
          className="h-full"
        />
      </div>
    </div>
  );
}
