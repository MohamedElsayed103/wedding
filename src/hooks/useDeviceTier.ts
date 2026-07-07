"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "low" | "mid" | "high";

interface DeviceInfo {
  tier: DeviceTier;
  /** Multiplier applied to particle counts (0.35 – 1). */
  density: number;
  isTouch: boolean;
  ready: boolean;
}

/**
 * Estimates the device's graphics budget so particle systems can scale
 * automatically. Weaker phones get fewer petals/fireflies to hold 60fps.
 */
export function useDeviceTier(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    tier: "mid",
    density: 0.7,
    isTouch: false,
    ready: false,
  });

  useEffect(() => {
    const cores =
      (navigator as Navigator & { hardwareConcurrency?: number })
        .hardwareConcurrency ?? 4;
    const mem =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.innerWidth < 640;

    let score = 0;
    if (cores >= 8) score += 2;
    else if (cores >= 4) score += 1;
    if (mem >= 8) score += 2;
    else if (mem >= 4) score += 1;
    if (!isTouch) score += 1;
    if (narrow) score -= 1;

    let tier: DeviceTier = "mid";
    let density = 0.7;
    if (score >= 4) {
      tier = "high";
      density = 1;
    } else if (score <= 1) {
      tier = "low";
      density = 0.38;
    }

    setInfo({ tier, density, isTouch, ready: true });
  }, []);

  return info;
}
