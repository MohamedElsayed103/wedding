import { CALENDAR_EVENT } from "./constants";

/** Format a Date as an iCal/Google UTC stamp: YYYYMMDDTHHMMSSZ. */
const toStamp = (d: Date): string => {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    p(d.getUTCMonth() + 1) +
    p(d.getUTCDate()) +
    "T" +
    p(d.getUTCHours()) +
    p(d.getUTCMinutes()) +
    p(d.getUTCSeconds()) +
    "Z"
  );
};

const enc = encodeURIComponent;

export function googleCalendarUrl(): string {
  const { title, description, location, start, end } = CALENDAR_EVENT;
  const dates = `${toStamp(start)}/${toStamp(end)}`;
  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${enc(title)}` +
    `&dates=${dates}` +
    `&details=${enc(description)}` +
    `&location=${enc(location)}`
  );
}

export function outlookCalendarUrl(): string {
  const { title, description, location, start, end } = CALENDAR_EVENT;
  return (
    "https://outlook.live.com/calendar/0/action/compose?rru=addevent" +
    `&subject=${enc(title)}` +
    `&startdt=${enc(start.toISOString())}` +
    `&enddt=${enc(end.toISOString())}` +
    `&body=${enc(description)}` +
    `&location=${enc(location)}`
  );
}

/** Build a downloadable .ics file (Apple Calendar / Outlook desktop). */
export function icsContent(): string {
  const { title, description, location, start, end } = CALENDAR_EVENT;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mohamed & Mariam//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:mohamed-mariam-2026@wedding`,
    `DTSTAMP:${toStamp(start)}`,
    `DTSTART:${toStamp(start)}`,
    `DTEND:${toStamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/,/g, "\\,")}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(): void {
  const blob = new Blob([icsContent()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mohamed-mariam-wedding.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
