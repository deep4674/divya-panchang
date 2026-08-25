import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { GlitterCard, SectionTitle } from "@/components/GlitterUI";
import { PanchangDay } from "@/components/PanchangDay";
import { UI, useApp } from "@/lib/i18n";
import { MAX_YEAR, MIN_YEAR } from "@/lib/panchang/constants";
import { parseKey, ymdKey } from "@/lib/panchang/core";

export const Route = createFileRoute("/day/$date")({
  head: ({ params }) => ({
    meta: [
      { title: `पंचांग ${params.date} | Panchang for ${params.date} — Divya Panchang` },
      {
        name: "description",
        content: `${params.date} का सम्पूर्ण पंचांग — तिथि, नक्षत्र, योग, करण, सूर्योदय, सूर्यास्त, चंद्रोदय, राहु काल, चौघड़िया और त्योहार।`,
      },
      { property: "og:title", content: `Panchang ${params.date} | दिव्य पंचांग` },
      {
        property: "og:description",
        content: `Full panchang details for ${params.date}: tithi, nakshatra, yoga, karana, sunrise, sunset, festivals and muhurat.`,
      },
    ],
  }),
  component: DayPage,
});

function shift(date: string, days: number) {
  const p = parseKey(date);
  if (!p) return date;
  const dt = new Date(Date.UTC(p.y, p.m - 1, p.d) + days * 86400000);
  return ymdKey(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

function DayPage() {
  const { date } = Route.useParams();
  const { t, lang } = useApp();
  const parsed = parseKey(date);

  if (!parsed || parsed.y < MIN_YEAR || parsed.y > MAX_YEAR) {
    return (
      <AppShell>
        <DeityBanner />
        <GlitterCard>
          <p className="text-center text-sm">
            {lang === "hi"
              ? `कृपया ${MIN_YEAR}–${MAX_YEAR} के बीच की तिथि चुनें।`
              : `Please choose a date between ${MIN_YEAR} and ${MAX_YEAR}.`}
          </p>
        </GlitterCard>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <DeityBanner />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          to="/day/$date"
          params={{ date: shift(date, -1) }}
          className="rounded-full border border-primary bg-secondary/70 px-3 py-1 text-sm font-bold"
        >
          ← {t(UI.prev)}
        </Link>
        <SectionTitle>{date}</SectionTitle>
        <Link
          to="/day/$date"
          params={{ date: shift(date, 1) }}
          className="rounded-full border border-primary bg-secondary/70 px-3 py-1 text-sm font-bold"
        >
          {t(UI.next)} →
        </Link>
      </div>
      <PanchangDay y={parsed.y} m={parsed.m} d={parsed.d} />
    </AppShell>
  );
}
