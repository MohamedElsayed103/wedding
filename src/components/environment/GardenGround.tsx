"use client";

import { cx } from "@/lib/utils";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { Flower, FoliageRow, Lantern, OliveBranch } from "./GardenElements";

/**
 * The garden floor — a layered band of foliage, roses, olive branches and
 * lanterns anchored to the bottom of a scene. Shared across chapters so the
 * ground never "cuts", reinforcing the single-continuous-film feeling.
 *
 * Every flower/lantern here is a permanently-animating element, and this
 * component is mounted several times across the page — so its count scales
 * down automatically on weaker/mobile devices on top of each scene's own
 * density hint.
 */
export function GardenGround({
  className,
  lanterns = true,
  density = 1,
}: {
  className?: string;
  lanterns?: boolean;
  density?: number;
}) {
  const { density: tierDensity } = useDeviceTier();
  const effectiveDensity = density * tierDensity;

  return (
    <div
      className={cx(
        "pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none",
        className
      )}
      aria-hidden
    >
      {/* hanging lanterns from the top of the scene */}
      {lanterns && (
        <>
          <Lantern
            className="pointer-events-none absolute -top-[42vh] left-[8%] opacity-90"
            size={44}
            style={{ animationDelay: "0.4s" }}
          />
          <Lantern
            className="pointer-events-none absolute -top-[52vh] right-[10%] opacity-90"
            size={52}
            style={{ animationDelay: "1.1s" }}
          />
        </>
      )}

      {/* far foliage */}
      <FoliageRow className="absolute bottom-[64px] h-[120px] opacity-70" color="#9caa7d" />
      {/* mid foliage */}
      <FoliageRow className="absolute bottom-[38px] h-[140px] opacity-90" color="#7d8a5f" />

      {/* olive branches leaning in */}
      <OliveBranch className="absolute bottom-[110px] left-[-30px] w-[220px] opacity-80" />
      <OliveBranch className="absolute bottom-[130px] right-[-30px] w-[220px] opacity-80" flip />

      {/* scattered roses along the floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px]">
        {Array.from({ length: Math.max(3, Math.round(6 * effectiveDensity)) }).map((_, i) => {
          const n = Math.max(3, Math.round(6 * effectiveDensity));
          const left = Math.round(((i / n) * 100 + (i % 2 ? 3 : -2)) * 100) / 100;
          const size = 30 + (i % 4) * 10;
          const white = i % 3 !== 0;
          return (
            <Flower
              key={i}
              className="pointer-events-auto absolute bottom-0"
              style={{
                left: `${Math.max(0, Math.min(96, left))}%`,
                animationDelay: `${((i % 5) * 4) / 10}s`,
                zIndex: i % 2,
              }}
              size={size}
              color={white ? "#fbf7ef" : "#f0d9c4"}
            />
          );
        })}
      </div>

      {/* front grass band */}
      <FoliageRow className="absolute bottom-0 h-[70px]" color="#5c6a44" />
    </div>
  );
}
