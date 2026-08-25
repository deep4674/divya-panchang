import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Bi } from "./panchang/constants";
import { CITIES, DEFAULT_PLACE, type Place } from "./panchang/core";

export type Lang = "hi" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (b: Bi) => string;
  place: Place;
  setPlaceId: (id: string) => void;
  mounted: boolean;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("hi");
  const [place, setPlace] = useState<Place>(DEFAULT_PLACE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const l = localStorage.getItem("dp-lang");
      if (l === "hi" || l === "en") setLang(l);
      const p = localStorage.getItem("dp-place");
      const found = CITIES.find((c) => c.id === p);
      if (found) setPlace({ ...found });
    } catch {
      /* ignore */
    }
  }, []);

  const setLangPersist = useCallback((l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("dp-lang", l);
    } catch {
      /* ignore */
    }
  }, []);

  const setPlaceId = useCallback((id: string) => {
    const found = CITIES.find((c) => c.id === id);
    if (!found) return;
    setPlace({ ...found });
    try {
      localStorage.setItem("dp-place", id);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: setLangPersist,
      toggleLang: () => setLangPersist(lang === "hi" ? "en" : "hi"),
      t: (b: Bi) => (lang === "hi" ? b.hi : b.en),
      place,
      setPlaceId,
      mounted,
    }),
    [lang, place, mounted, setLangPersist, setPlaceId],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

/** Small inline bilingual label helper: "हिन्दी / English" */
export function bi(b: Bi, lang: Lang) {
  return lang === "hi" ? b.hi : b.en;
}

export const UI = {
  appName: { hi: "दिव्य पंचांग", en: "Divya Panchang" },
  tagline: { hi: "1926 – 2126 · 200 वर्ष का सम्पूर्ण पंचांग", en: "1926 – 2126 · 200 Years of Complete Panchang" },
  home: { hi: "मुख्य पृष्ठ", en: "Home" },
  calendar: { hi: "कैलेंडर", en: "Calendar" },
  year: { hi: "वार्षिक", en: "Yearly" },
  choghadiya: { hi: "चौघड़िया", en: "Choghadiya" },
  kundli: { hi: "कुंडली", en: "Kundli" },
  about: { hi: "परिचय", en: "About" },
  today: { hi: "आज का पंचांग", en: "Today's Panchang" },
  city: { hi: "स्थान", en: "Place" },
  sunrise: { hi: "सूर्योदय", en: "Sunrise" },
  sunset: { hi: "सूर्यास्त", en: "Sunset" },
  moonrise: { hi: "चंद्रोदय", en: "Moonrise" },
  moonset: { hi: "चंद्रास्त", en: "Moonset" },
  tithi: { hi: "तिथि", en: "Tithi" },
  nakshatra: { hi: "नक्षत्र", en: "Nakshatra" },
  yoga: { hi: "योग", en: "Yoga" },
  karana: { hi: "करण", en: "Karana" },
  paksha: { hi: "पक्ष", en: "Paksha" },
  lunarMonth: { hi: "चंद्र मास", en: "Lunar Month" },
  vikram: { hi: "विक्रम संवत", en: "Vikram Samvat" },
  shaka: { hi: "शक संवत", en: "Shaka Samvat" },
  isavi: { hi: "ईसवी सन्", en: "Gregorian (Isavi)" },
  hijri: { hi: "हिजरी सन्", en: "Hijri" },
  weekday: { hi: "वार", en: "Weekday" },
  festivals: { hi: "पर्व एवं त्योहार", en: "Festivals & Vrat" },
  eclipse: { hi: "ग्रहण", en: "Eclipse" },
  rahuKaal: { hi: "राहु काल", en: "Rahu Kaal" },
  yamaganda: { hi: "यमगण्ड", en: "Yamaganda" },
  gulika: { hi: "गुलिक काल", en: "Gulika Kaal" },
  abhijit: { hi: "अभिजित मुहूर्त", en: "Abhijit Muhurat" },
  dayDuration: { hi: "दिनमान", en: "Day Duration" },
  moonRashi: { hi: "चंद्र राशि", en: "Moon Sign" },
  sunRashi: { hi: "सूर्य राशि", en: "Sun Sign" },
  dayChoghadiya: { hi: "दिन का चौघड़िया", en: "Day Choghadiya" },
  nightChoghadiya: { hi: "रात्रि का चौघड़िया", en: "Night Choghadiya" },
  solar: { hi: "सूर्य ग्रहण", en: "Solar Eclipse" },
  lunar: { hi: "चंद्र ग्रहण", en: "Lunar Eclipse" },
  loading: { hi: "गणना हो रही है…", en: "Calculating…" },
  openDay: { hi: "पूरा पंचांग देखें", en: "View full panchang" },
  prev: { hi: "पिछला", en: "Previous" },
  next: { hi: "अगला", en: "Next" },
  goto: { hi: "जाएँ", en: "Go" },
  amavasya: { hi: "अमावस्या", en: "Amavasya" },
  purnima: { hi: "पूर्णिमा", en: "Purnima" },
  install: { hi: "ऐप इंस्टॉल करें", en: "Install App" },
} satisfies Record<string, Bi>;
