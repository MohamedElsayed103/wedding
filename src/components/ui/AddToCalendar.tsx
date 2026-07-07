"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import {
  downloadIcs,
  googleCalendarUrl,
  outlookCalendarUrl,
} from "@/lib/calendar";

export function AddToCalendar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const items = [
    { label: "Google Calendar", action: () => window.open(googleCalendarUrl(), "_blank") },
    { label: "Apple Calendar (.ics)", action: () => downloadIcs() },
    { label: "Outlook", action: () => window.open(outlookCalendarUrl(), "_blank") },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--color-gold)]/40 bg-white/40 px-6 py-3 font-roman text-xs tracking-wide-2 text-[color:var(--color-gold-deep)] transition-all hover:bg-white/70 active:scale-[0.98]"
      >
        <FiCalendar className="text-sm" />
        ADD TO CALENDAR
        <FiChevronDown
          className={`text-sm transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass absolute left-1/2 top-full z-30 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-xl py-1"
          >
            {items.map((it) => (
              <li key={it.label}>
                <button
                  type="button"
                  onClick={() => {
                    it.action();
                    setOpen(false);
                  }}
                  className="block w-full px-5 py-3 text-left font-body text-sm text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-gold)]/12"
                >
                  {it.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
