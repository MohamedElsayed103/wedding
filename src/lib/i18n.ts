/**
 * Bilingual dictionary — every visitor-facing string lives here.
 * `ar` mirrors `en` key-for-key (enforced by the type), so a missing
 * translation is a compile error.
 */

export type Lang = "en" | "ar";

/** A chapter of the couple's story (display shape, resolved per language). */
export interface Chapter {
  id: string;
  label: string; // e.g. "Chapter One"
  text: string;
}

const en = {
  // language gate
  chooseLanguage: "Choose your language",

  // preloader
  tagline: "a love story unfolds…",

  // envelope
  youAreInvited: "YOU ARE INVITED",
  tapToOpen: "tap the seal to open",
  scrollToBegin: "scroll to begin the story",
  togetherWithFamilies: "TOGETHER WITH THEIR FAMILIES",

  // couple
  groom: "Mohamed",
  bride: "Mariam",
  and: "&",
  coupleNames: "Mohamed & Mariam",

  // date / venue
  dateLabel: "27 August 2026",
  venueName: "Al-Farouq Mosque",
  venueCity: "Sheraton, Cairo",

  // calligraphy scene
  calligraphyLabel: "IN THE NAME OF LOVE & MERCY",
  verseTranslation: "“And He placed between you affection and mercy.”",
  verseReference: "Sūrah ar-Rūm · 30:21",

  // the story — chapter one shows in the meeting scene, the rest along the journey
  chapters: [
    {
      id: "ch1",
      label: "Chapter One",
      text: "Different paths, one beautiful story.",
    },
    {
      id: "ch2",
      label: "Chapter Two",
      text: "Some stories don't need time — when you know, you know.",
    },
    {
      id: "ch3",
      label: "Chapter Three",
      text: "Our story grew with every smile, prayer, and endless conversation",
    },
    {
      id: "ch4",
      label: "Chapter Four",
      text: "From yesterday's prayers to today's joy, our best chapter begins.",
    },
  ] as Chapter[],

  // invitation card
  honourOfPresence: "request the honour of your presence",

  // countdown
  countingLabel: "COUNTING THE MOMENTS",
  countingTitle: "Until we say “forever”",
  days: "DAYS",
  hours: "HOURS",
  minutes: "MINUTES",
  seconds: "SECONDS",

  // venue
  venueLabel: "WHERE FOREVER BEGINS",
  directions: "GET DIRECTIONS",
  tipParkingTitle: "PARKING",
  tipParkingText: "Parking is available near the venue.",
  tipArrivalTitle: "ARRIVAL",
  tipArrivalText: "Doors open at 8:30 PM",
  tipDressTitle: "DRESS",
  tipDressText: "Elegant attire — dress to celebrate.",

  // finale
  foreverBegins: "Forever Begins",
  madeWithLove: "Made with love, for the ones we love.",
};

export type Strings = typeof en;

const ar: Strings = {
  chooseLanguage: "اختر لغتك",

  tagline: "حكاية حبٍ تُروى…",

  youAreInvited: "أنتم مدعوون",
  tapToOpen: "اضغط على الختم لفتح الدعوة",
  scrollToBegin: "مرِّر لتبدأ الحكاية",
  togetherWithFamilies: "بمشيئة الله وبفرحة عائلتيهما",

  groom: "محمد",
  bride: "مريم",
  and: "و",
  coupleNames: "محمد ومريم",

  dateLabel: "27 أغسطس 2026",
  venueName: "مسجد الفاروق",
  venueCity: "شيراتون، القاهرة",

  calligraphyLabel: "بِالمَوَدَّةِ وَالرَّحْمَة",
  verseTranslation: "",
  verseReference: "سورة الروم · الآية 21",

  chapters: [
    {
      id: "ch1",
      label: "الفصل الأول",
      text: "كان لكل منا طريقه.. حتى جمعنا الله لنكتب حكاية واحدة جميلة.",
    },
    {
      id: "ch2",
      label: "الفصل الثاني",
      text: "بعض الحكايات تبدأ بيقين... لا بمرور الوقت.",
    },
    {
      id: "ch3",
      label: "الفصل الثالث",
      text: "كبرت حكايتنا مع كل ضحكة، وكل دعوة، وكل حديث لا ينتهي.",
    },
    {
      id: "ch4",
      label: "الفصل الرابع",
      text: "بين دعاء الأمس.. وفرحة اليوم، تبدأ أجمل فصول حكايتنا.",
    },
  ],

  honourOfPresence: "يتشرفان بدعوتكم لمشاركتهما فرحة زفافهما",

  countingLabel: "نَعُدُّ اللحظات",
  countingTitle: "حتى نقول «إلى الأبد»",
  days: "يوم",
  hours: "ساعة",
  minutes: "دقيقة",
  seconds: "ثانية",

  venueLabel: "حيث يبدأ الأبد",
  directions: "الاتجاهات إلى المكان",
  tipParkingTitle: "مواقف السيارات",
  tipParkingText: "تتوفر مواقف للسيارات بالقرب من المكان.",
  tipArrivalTitle: "الوصول",
  tipArrivalText: "الابواب تفتح عند الساعة 8:30 مساءً",
  tipDressTitle: "الملابس",
  tipDressText: "أناقة تليق بالاحتفال.",

  foreverBegins: "ويبدأ الأبد",
  madeWithLove: "صُنع بحبٍ، لمن نُحب.",
};

export const DICT: Record<Lang, Strings> = { en, ar };

/**
 * The visitor-facing template strings a couple can override per-site from the
 * admin editor. (Names, date, venue and chapters have their own dedicated Site
 * fields, so they're intentionally excluded here.) Anything left blank in the
 * editor falls back to the DICT default above.
 */
export type TextKey =
  | "chooseLanguage"
  | "tagline"
  | "youAreInvited"
  | "tapToOpen"
  | "scrollToBegin"
  | "togetherWithFamilies"
  | "calligraphyLabel"
  | "verseTranslation"
  | "verseReference"
  | "honourOfPresence"
  | "countingLabel"
  | "countingTitle"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "venueLabel"
  | "directions"
  | "tipParkingTitle"
  | "tipParkingText"
  | "tipArrivalTitle"
  | "tipArrivalText"
  | "tipDressTitle"
  | "tipDressText"
  | "foreverBegins"
  | "madeWithLove";

export type TextOverrides = Partial<Record<TextKey, string>>;

/** Grouped by scene, with friendly labels, for the admin "Wording" editor. */
export const EDITABLE_TEXT: { group: string; keys: { key: TextKey; label: string; multiline?: boolean }[] }[] = [
  { group: "Language & intro", keys: [
    { key: "chooseLanguage", label: "Choose-language prompt" },
    { key: "tagline", label: "Loader tagline" },
  ] },
  { group: "Envelope (opening)", keys: [
    { key: "youAreInvited", label: "You are invited" },
    { key: "tapToOpen", label: "Tap-to-open hint" },
    { key: "scrollToBegin", label: "Scroll-to-begin hint" },
    { key: "togetherWithFamilies", label: "Together with families" },
  ] },
  { group: "Calligraphy / verse", keys: [
    { key: "calligraphyLabel", label: "Calligraphy label" },
    { key: "verseTranslation", label: "Verse translation", multiline: true },
    { key: "verseReference", label: "Verse reference" },
  ] },
  { group: "Invitation card", keys: [
    { key: "honourOfPresence", label: "Honour of presence", multiline: true },
  ] },
  { group: "Countdown", keys: [
    { key: "countingLabel", label: "Countdown label" },
    { key: "countingTitle", label: "Countdown title" },
    { key: "days", label: "“Days”" },
    { key: "hours", label: "“Hours”" },
    { key: "minutes", label: "“Minutes”" },
    { key: "seconds", label: "“Seconds”" },
  ] },
  { group: "Venue & tips", keys: [
    { key: "venueLabel", label: "Venue label" },
    { key: "directions", label: "Directions button" },
    { key: "tipParkingTitle", label: "Parking — title" },
    { key: "tipParkingText", label: "Parking — text", multiline: true },
    { key: "tipArrivalTitle", label: "Arrival — title" },
    { key: "tipArrivalText", label: "Arrival — text", multiline: true },
    { key: "tipDressTitle", label: "Dress — title" },
    { key: "tipDressText", label: "Dress — text", multiline: true },
  ] },
  { group: "Finale", keys: [
    { key: "foreverBegins", label: "Forever begins" },
    { key: "madeWithLove", label: "Made-with-love line", multiline: true },
  ] },
];
