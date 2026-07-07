"use client";

import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const compute = (target: number): TimeLeft => {
  const diff = target - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
};

/** Live countdown to the given target date. SSR-safe (starts null → hydrates). */
export function useCountdown(target: Date): TimeLeft | null {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const t = target.getTime();
    setTime(compute(t));
    const id = window.setInterval(() => setTime(compute(t)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return time;
}
