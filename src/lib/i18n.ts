/**
 * Bilingual dictionary — every visitor-facing string lives here.
 * `ar` mirrors `en` key-for-key (enforced by the type), so a missing
 * translation is a compile error.
 */

export type Lang = "en" | "ar";

export interface Memory {
  id: string;
  icon: string;
  title: string;
  caption: string;
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

  // meeting
  chapterOne: "CHAPTER ONE",
  chapterOneTitle: "Two paths, one garden",

  // journey memories
  memories: [
    {
      id: "met",
      icon: "✦",
      title: "The First Hello",
      caption: "Two strangers, one glance — and the garden held its breath.",
    },
    {
      id: "laughter",
      icon: "❀",
      title: "A Thousand Small Laughs",
      caption: "Ordinary days turned golden simply because we shared them.",
    },
    {
      id: "promise",
      icon: "☾",
      title: "The Quiet Promise",
      caption: "Beneath the olive branches, forever began to feel possible.",
    },
  ] as Memory[],

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
  tipParkingText: "Street and courtyard parking available around the mosque.",
  tipArrivalTitle: "ARRIVAL",
  tipArrivalText: "Doors open 30 minutes before the ceremony begins.",
  tipDressTitle: "DRESS",
  tipDressText: "Elegant and modest — the evening is celebrated in the mosque.",

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

  chapterOne: "الفصل الأول",
  chapterOneTitle: "طريقان… وحديقة واحدة",

  memories: [
    {
      id: "met",
      icon: "✦",
      title: "اللقاء الأول",
      caption: "غريبان ونظرة واحدة — فحبست الحديقة أنفاسها.",
    },
    {
      id: "laughter",
      icon: "❀",
      title: "ألف ضحكة صغيرة",
      caption: "أيامٌ عادية صارت ذهبية لأننا عشناها معًا.",
    },
    {
      id: "promise",
      icon: "☾",
      title: "الوعد الهادئ",
      caption: "تحت أغصان الزيتون، بدأ الأبد يبدو ممكنًا.",
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
  tipParkingText: "تتوفر مواقف في الشارع وحول المسجد.",
  tipArrivalTitle: "الوصول",
  tipArrivalText: "تُفتح الأبواب قبل بدء الحفل بثلاثين دقيقة.",
  tipDressTitle: "الملابس",
  tipDressText: "أناقة واحتشام — فالفرحة تُقام في رحاب المسجد.",

  foreverBegins: "ويبدأ الأبد",
  madeWithLove: "صُنع بحبٍ، لمن نُحب.",
};

export const DICT: Record<Lang, Strings> = { en, ar };
