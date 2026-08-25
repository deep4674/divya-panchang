import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { GlitterCard, Pill, SectionTitle } from "@/components/GlitterUI";
import { PanchangDay } from "@/components/PanchangDay";
import { UI, useApp } from "@/lib/i18n";
import { MAX_YEAR, MIN_YEAR } from "@/lib/panchang/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divya Panchang 1926–2126 | दिव्य पंचांग व हिन्दू कैलेंडर" },
      {
        name: "description",
        content:
          "200 साल का सम्पूर्ण हिन्दू पंचांग: तिथि, नक्षत्र, योग, करण, सूर्योदय, चंद्रोदय, त्योहार, ग्रहण, चौघड़िया और कुंडली — 1926 से 2126 तक।",
      },
      { property: "og:title", content: "Divya Panchang 1926–2126 | दिव्य पंचांग" },
      {
        property: "og:description",
        content:
          "Complete Hindu Panchang & Calendar for 200 years with tithi, nakshatra, festivals, eclipses, choghadiya and kundli.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useApp();
  const navigate = useNavigate();
  const [today, setToday] = useState<{ y: number; m: number; d: number } | null>(null);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const now = new Date();
    const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
    setToday({ y: ist.getFullYear(), m: ist.getMonth() + 1, d: ist.getDate() });
    setDateStr(
      `${ist.getFullYear()}-${String(ist.getMonth() + 1).padStart(2, "0")}-${String(ist.getDate()).padStart(2, "0")}`,
    );
  }, []);

  return (
    <AppShell>
      <DeityBanner />
      <div className="space-y-2 text-center">
        <SectionTitle>{t(UI.appName)}</SectionTitle>
        <p className="text-sm text-muted-foreground">{t(UI.tagline)}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Pill tone="saffron">{lang === "hi" ? "पंचांग पोथी" : "Panchang Pothi"}</Pill>
          <Pill tone="emerald">{lang === "hi" ? "त्योहार व ग्रहण" : "Festivals & Eclipses"}</Pill>
          <Pill tone="magenta">{lang === "hi" ? "कुंडली व चौघड़िया" : "Kundli & Choghadiya"}</Pill>
        </div>
      </div>

      <GlitterCard title={lang === "hi" ? "कोई भी तिथि खोजें" : "Search any date"}>
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (dateStr) navigate({ to: "/day/$date", params: { date: dateStr } });
          }}
        >
          <input
            type="date"
            value={dateStr}
            min={`${MIN_YEAR}-01-01`}
            max={`${MAX_YEAR}-12-31`}
            onChange={(e) => setDateStr(e.target.value)}
            className="rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
          />
          <button type="submit" className="gold-fill rounded-full px-4 py-2 text-sm font-bold">
            {t(UI.goto)}
          </button>
          {today ? (
            <Link
              to="/year/$year"
              params={{ year: String(today.y) }}
              className="rounded-full border border-primary bg-secondary/70 px-4 py-2 text-sm font-bold"
            >
              {lang === "hi" ? "वार्षिक सारणी" : "Yearly summary"} {today.y}
            </Link>
          ) : null}
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          {lang === "hi"
            ? `उपलब्ध वर्ष: ${MIN_YEAR} से ${MAX_YEAR} तक (200 वर्ष)`
            : `Available years: ${MIN_YEAR} to ${MAX_YEAR} (200 years)`}
        </p>
      </GlitterCard>

      <h2 className="glitter-text text-center text-xl font-bold">{t(UI.today)}</h2>
      {today ? <PanchangDay y={today.y} m={today.m} d={today.d} /> : null}
    </AppShell>
  );
}
