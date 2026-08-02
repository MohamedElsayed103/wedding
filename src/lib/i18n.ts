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
      text: "We walked different paths… until God brought us together to write one beautiful story.",
    },
    {
      id: "ch2",
      label: "Chapter Two",
      text: "Some stories don't need time — when you know, you know.",
    },
    {
      id: "ch3",
      label: "Chapter Three",
      text: "With every smile, every prayer, and every conversation that never seemed to end, our story grew.",
    },
    {
      id: "ch4",
      label: "Chapter Four",
      text: "From the prayers of yesterday… to the joy of today, our most beautiful chapter begins.",
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
  tipArrivalText: "Doors open 30 minutes before the ceremony begins.",
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
  tipArrivalText: "تُفتح الأبواب قبل بدء الحفل بثلاثين دقيقة.",
  tipDressTitle: "الملابس",
  tipDressText: "أناقة تليق بالاحتفال.",

  foreverBegins: "ويبدأ الأبد",
  madeWithLove: "صُنع بحبٍ، لمن نُحب.",
};

export const DICT: Record<Lang, Strings> = { en, ar };
