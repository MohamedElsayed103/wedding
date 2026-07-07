"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { AddToCalendar } from "@/components/ui/AddToCalendar";
import { Flower } from "@/components/environment/GardenElements";
import { COUPLE } from "@/lib/constants";
import { seededRandom } from "@/lib/utils";

type Attendance = "joyfully" | "regretfully" | "";

export function Rsvp() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [attendance, setAttendance] = useState<Attendance>("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please share your name.");
    if (!attendance) return setError("Will you be joining us?");
    setError("");
    try {
      localStorage.setItem(
        "mm-rsvp",
        JSON.stringify({ name, guests, attendance, notes, at: new Date().toISOString() })
      );
    } catch {
      /* storage optional */
    }
    setSent(true);
  };

  const burst = (() => {
    const rnd = seededRandom(42);
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: (rnd() - 0.5) * 320,
      y: -60 - rnd() * 220,
      r: rnd() * 360,
      d: 0.6 + rnd() * 0.6,
      white: rnd() > 0.5,
      size: 16 + rnd() * 18,
    }));
  })();

  return (
    <section
      id="rsvp"
      className="relative flex min-h-[100svh] items-center justify-center py-24 safe-x"
    >
      <div className="w-full max-w-md">
        <Reveal className="mb-8 text-center">
          <p className="font-roman tracking-luxe text-[0.65rem] text-[color:var(--color-gold-deep)]">
            KINDLY RESPOND
          </p>
          <h2 className="mt-3 font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
            Will you celebrate with us?
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass relative overflow-hidden rounded-2xl p-7 sm:p-9">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={submit}
                  className="flex flex-col gap-5"
                >
                  <Field label="Guest Name">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="lux-input"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Number of Guests">
                    <div className="flex items-center gap-4">
                      <Stepper value={guests} onChange={setGuests} />
                    </div>
                  </Field>

                  <Field label="Attendance">
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          ["joyfully", "Joyfully accept"],
                          ["regretfully", "Regretfully decline"],
                        ] as [Attendance, string][]
                      ).map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAttendance(val)}
                          className={`rounded-xl border px-3 py-3 font-body text-sm transition-all active:scale-[0.98] ${
                            attendance === val
                              ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold-deep)]"
                              : "border-[color:var(--color-gold)]/25 text-[color:var(--color-ink-soft)] hover:bg-white/50"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Special Notes">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="A wish, a dietary note, a song request…"
                      className="lux-input resize-none"
                    />
                  </Field>

                  {error && (
                    <p className="font-body text-xs text-[#b5654a]">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="lux-button group relative mt-1 overflow-hidden rounded-full px-8 py-4 font-roman text-xs tracking-luxe text-[#3c2c20]"
                  >
                    <span className="relative z-10">SEND OUR RSVP</span>
                  </button>

                  <div className="mt-1">
                    <AddToCalendar />
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center py-8 text-center"
                >
                  {/* petal burst */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    {burst.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
                        animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.r, scale: 1 }}
                        transition={{ duration: p.d + 0.6, ease: "easeOut" }}
                        className="absolute"
                      >
                        <Flower size={p.size} sway={false} bloom={false} color={p.white ? "#fbf7ef" : "#f0d9c4"} />
                      </motion.div>
                    ))}
                  </div>

                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
                    className="text-5xl text-[color:var(--color-gold)]"
                  >
                    ❧
                  </motion.span>
                  <h3 className="mt-5 font-display text-2xl text-[color:var(--color-ink)]">
                    {attendance === "joyfully"
                      ? "Our hearts are full"
                      : "You'll be dearly missed"}
                  </h3>
                  <p className="mt-3 font-serif text-base italic text-[color:var(--color-ink-soft)]">
                    Thank you, {name.split(" ")[0] || "dear friend"}.
                    {attendance === "joyfully"
                      ? ` ${COUPLE.groom} & ${COUPLE.bride} can't wait to see you.`
                      : " You'll be with us in spirit."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 font-body text-xs tracking-wide-2 text-[color:var(--color-gold-deep)] underline underline-offset-4"
                  >
                    edit response
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block font-roman text-[0.6rem] tracking-luxe text-[color:var(--color-ink-soft)]">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}

function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label="Fewer guests"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="h-10 w-10 rounded-full border border-[color:var(--color-gold)]/30 text-lg text-[color:var(--color-gold-deep)] transition-all hover:bg-white/60 active:scale-95"
      >
        −
      </button>
      <span className="min-w-8 text-center font-display text-2xl text-[color:var(--color-ink)]">
        {value}
      </span>
      <button
        type="button"
        aria-label="More guests"
        onClick={() => onChange(Math.min(12, value + 1))}
        className="h-10 w-10 rounded-full border border-[color:var(--color-gold)]/30 text-lg text-[color:var(--color-gold-deep)] transition-all hover:bg-white/60 active:scale-95"
      >
        +
      </button>
    </div>
  );
}
