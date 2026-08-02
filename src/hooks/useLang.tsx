"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DICT, type Lang, type Strings } from "@/lib/i18n";

interface LangCtx {
  lang: Lang;
  /** false until the visitor has chosen a language this visit. */
  ready: boolean;
  t: Strings;
  choose: (lang: Lang) => void;
}

const Ctx = createContext<LangCtx>({
  lang: "en",
  ready: false,
  t: DICT.en,
  choose: () => {},
});

export const useLang = () => useContext(Ctx);

/**
 * No persistence by design: the language gate greets every guest on every
 * visit (shared family devices, returning guests), so nothing is written to
 * storage — a refresh always re-asks.
 *
 * `dict` lets a per-couple dictionary (built from the DB record via
 * buildDict) override the static template copy. Falls back to DICT.
 */
export function LangProvider({
  children,
  dict = DICT,
  defaultLang = "en",
}: {
  children: ReactNode;
  dict?: Record<Lang, Strings>;
  defaultLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const choose = useCallback((l: Lang) => {
    setLang(l);
    setReady(true);
  }, []);

  const value = useMemo<LangCtx>(
    () => ({ lang, ready, t: dict[lang], choose }),
    [lang, ready, choose, dict]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
