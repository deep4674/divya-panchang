import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import shiva from "@/assets/shiva-glitter.jpg";
import hanuman from "@/assets/hanuman-glitter.jpg";
import { UI, useApp } from "@/lib/i18n";
import { INDIA_CITIES, INTL_CITIES } from "@/lib/panchang/core";

function DeityAvatar({ src, alt, size = 56 }: { src: string; alt: string; size?: number }) {
  return (
    <span
      className="inline-block shrink-0 rounded-full p-[2px] gold-fill"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1024}
        height={1024}
        className="h-full w-full rounded-full object-cover"
      />
    </span>
  );
}

export function DeityBanner() {
  const { lang } = useApp();
  return (
    <div className="glitter-panel sparkle flex items-center justify-center gap-4 rounded-2xl p-3">
      <DeityAvatar
        src={shiva}
        alt={lang === "hi" ? "भगवान शिव का चित्र" : "Lord Shiva glitter portrait"}
        size={72}
      />
      <p className="glitter-text text-center text-base font-bold sm:text-xl">
        {lang === "hi" ? "ॐ नमः शिवाय · जय श्री हनुमान" : "Om Namah Shivaya · Jai Shri Hanuman"}
      </p>
      <DeityAvatar
        src={hanuman}
        alt={lang === "hi" ? "श्री हनुमान जी का चित्र" : "Lord Hanuman glitter portrait"}
        size={72}
      />
    </div>
  );
}

const NAV = [
  { to: "/", label: UI.home },
  { to: "/calendar", label: UI.calendar },
  { to: "/year", label: UI.year },
  { to: "/choghadiya", label: UI.choghadiya },
  { to: "/search", label: { hi: "खोज", en: "Search" } },
  { to: "/kundli", label: UI.kundli },
  { to: "/about", label: UI.about },
  { to: "/privacy", label: { hi: "गोपनीयता", en: "Privacy" } },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { lang, t, toggleLang, place, setPlaceId } = useApp();

  return (
    <div className="min-h-screen">
      <header className="glitter-panel sparkle sticky top-0 z-30 rounded-b-3xl px-3 py-2 backdrop-blur">
        <div className="relative z-10 mx-auto flex max-w-5xl flex-wrap items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <DeityAvatar src={shiva} alt={lang === "hi" ? "शिव जी" : "Shiva"} size={40} />
            <span className="glitter-text text-lg font-bold sm:text-2xl">{t(UI.appName)}</span>
            <DeityAvatar src={hanuman} alt={lang === "hi" ? "हनुमान जी" : "Hanuman"} size={40} />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <select
              aria-label={t(UI.city)}
              value={place.id}
              onChange={(e) => setPlaceId(e.target.value)}
              className="rounded-full border border-primary/70 bg-input px-3 py-1 text-xs font-semibold text-foreground sm:text-sm"
            >
              <optgroup label={lang === "hi" ? "भारत" : "India"}>
                {INDIA_CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {lang === "hi" ? c.hi : c.en}
                  </option>
                ))}
              </optgroup>
              <optgroup label={lang === "hi" ? "अंतरराष्ट्रीय" : "International"}>
                {INTL_CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {lang === "hi" ? c.hi : c.en}
                  </option>
                ))}
              </optgroup>
            </select>
            <button
              type="button"
              onClick={toggleLang}
              className="gold-fill rounded-full px-3 py-1 text-xs font-bold sm:text-sm"
            >
              {lang === "hi" ? "English" : "हिन्दी"}
            </button>
          </div>
          <nav className="w-full overflow-x-auto">
            <ul className="flex gap-2 pt-1">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="inline-block whitespace-nowrap rounded-full border border-primary/50 bg-secondary/60 px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-primary/30 sm:text-sm"
                    activeProps={{ className: "gold-fill border-primary" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {t(n.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 px-3 py-4">{children}</main>

      <footer className="glitter-panel sparkle mt-6 rounded-t-3xl px-4 py-6">
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-4">
            <DeityAvatar src={shiva} alt={lang === "hi" ? "शिव जी" : "Shiva"} size={64} />
            <DeityAvatar src={hanuman} alt={lang === "hi" ? "हनुमान जी" : "Hanuman"} size={64} />
          </div>
          <p className="glitter-text text-lg font-bold">{t(UI.appName)}</p>
          <p className="max-w-xl text-xs text-muted-foreground">
            {lang === "hi"
              ? "सूर्य-चंद्र की खगोलीय गणना पर आधारित सम्पूर्ण पंचांग · 1926 से 2126 तक · तिथि, नक्षत्र, योग, करण, त्योहार, ग्रहण, चौघड़िया एवं कुंडली"
              : "Complete panchang from real astronomical computation · 1926 to 2126 · tithi, nakshatra, yoga, karana, festivals, eclipses, choghadiya and kundli"}
          </p>
        </div>
      </footer>
    </div>
  );
}
