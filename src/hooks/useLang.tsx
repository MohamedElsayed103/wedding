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
  /** false until the visitor has chosen (or a stored choice was found). */
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

const STORAGE_KEY = "mm-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  // SSR renders English; a stored choice is applied right after mount.
  const [lang, setLang] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ar") {
        setLang(stored);
        setReady(true);
      }
    } catch {
      /* storage unavailable — keep the gate */
    }
  }, []);

  // Reflect language + direction on <html> so CSS/RTL follow along.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const choose = useCallback((l: Lang) => {
    setLang(l);
    setReady(true);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* fine */
    }
  }, []);

  const value = useMemo<LangCtx>(
    () => ({ lang, ready, t: DICT[lang], choose }),
    [lang, ready, choose]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
