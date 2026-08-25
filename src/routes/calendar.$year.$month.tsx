import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { GlitterCard, Pill, SectionTitle } from "@/components/GlitterUI";
import { UI, useApp } from "@/lib/i18n";
import {
  GREGORIAN_MONTHS,
  MAX_YEAR,
  MIN_YEAR,
  PAKSHA,
  WEEKDAYS,
} from "@/lib/panchang/constants";
import { eclipsesInRange, fmtDateTime, localMidnightUTC } from "@/lib/panchang/core";
import { monthSummary } from "@/lib/panchang/festivals";

export const Route = createFileRoute("/calendar/$year/$month")({
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.month}/${params.year} हिन्दू कैलेंडर | Hindu Calendar & Panchang`,
      },
      {
        name: "description",
        content: `${params.month}/${params.year} का हिन्दू कैलेंडर — प्रत्येक दिन की तिथि, पक्ष, त्योहार, अमावस्या, पूर्णिमा, एकादशी और ग्रहण की जानकारी।`,
      },
      { property: "og:title", content: `Hindu Calendar ${params.month}/${params.year}` },
      {
        property: "og:description",
        content: `Monthly Hindu calendar with tithi, paksha, festivals, amavasya, purnima and eclipses for ${params.month}/${params.year}.`,
      },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const { year, month } = Route.useParams();
  const { t, lang, place, mounted } = useApp();
  const y = Math.min(MAX_YEAR, Math.max(MIN_YEAR, Number(year) || MIN_YEAR));
  const m = Math.min(12, Math.max(1, Number(month) || 1));

  const data = useMemo(() => {
    if (!mounted) return null;
    const days = monthSummary(y, m, place);
    const start = localMidnightUTC(y, m, 1, place.tz);
    const end = new Date(localMidnightUTC(y, m, days.length, place.tz).getTime() + 86400000);
    return { days, eclipses: eclipsesInRange(start, end) };
  }, [y, m, place, mounted]);

  const prev = m === 1 ? { y: y - 1, m: 12 } : { y, m: m - 1 };
  const next = m === 12 ? { y: y + 1, m: 1 } : { y, m: m + 1 };
  const lead = data ? data.days[0]!.weekday : 0;

  return (
    <AppShell>
      <DeityBanner />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          to="/calendar/$year/$month"
          params={{ year: String(prev.y), month: String(prev.m) }}
          className="rounded-full border border-primary bg-secondary/70 px-3 py-1 text-sm font-bold"
        >
          ← {t(GREGORIAN_MONTHS[prev.m - 1]!)}
        </Link>
        <SectionTitle>
          {t(GREGORIAN_MONTHS[m - 1]!)} {y}
        </SectionTitle>
        <Link
          to="/calendar/$year/$month"
          params={{ year: String(next.y), month: String(next.m) }}
          className="rounded-full border border-primary bg-secondary/70 px-3 py-1 text-sm font-bold"
        >
          {t(GREGORIAN_MONTHS[next.m - 1]!)} →
        </Link>
      </div>

      {!data ? (
        <GlitterCard>
          <p className="text-center text-sm text-muted-foreground">{t(UI.loading)}</p>
        </GlitterCard>
      ) : (
        <>
          <GlitterCard>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-primary sm:text-sm">
              {WEEKDAYS.map((w) => (
                <div key={w.en}>{lang === "hi" ? w.hi.slice(0, 3) : w.en.slice(0, 3)}</div>
              ))}
              {Array.from({ length: lead }).map((_, i) => (
                <div key={`lead-${i}`} />
              ))}
              {data.days.map((s) => (
                <Link
                  key={s.key}
                  to="/day/$date"
                  params={{ date: s.key }}
                  className="glitter-border flex min-h-[74px] flex-col rounded-xl p-1 text-left transition-transform hover:scale-[1.03] sm:min-h-[92px]"
                >
                  <span className="glitter-text text-base font-bold sm:text-lg">{s.d}</span>
                  <span className="text-[9px] leading-tight text-muted-foreground sm:text-[11px]">
                    {t(s.tithiLabel)}
                  </span>
                  <span className="mt-auto text-[9px] font-semibold leading-tight text-accent sm:text-[10px]">
                    {s.festivals
                      .filter((f) => f.kind === "major" || f.kind === "sankranti")
                      .slice(0, 1)
                      .map((f) => t(f))}
                  </span>
                  {s.isPurnima ? <span className="text-[9px] text-primary">●{lang === "hi" ? " पू." : " P"}</span> : null}
                  {s.isAmavasya ? <span className="text-[9px] text-magenta">○{lang === "hi" ? " अ." : " A"}</span> : null}
                </Link>
              ))}
            </div>
          </GlitterCard>

          <GlitterCard title={t(UI.festivals)}>
            <ul className="space-y-2">
              {data.days
                .filter((s) => s.festivals.some((f) => f.kind !== "vrat"))
                .map((s) => (
                  <li key={s.key} className="flex flex-wrap items-center gap-2 border-b border-primary/25 pb-2">
                    <Link
                      to="/day/$date"
                      params={{ date: s.key }}
                      className="text-sm font-bold text-primary"
                    >
                      {s.d} {t(GREGORIAN_MONTHS[m - 1]!)}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {t(s.lunarMonth)} · {t(PAKSHA[s.paksha])} · {t(s.tithiLabel)}
                    </span>
                    {s.festivals
                      .filter((f) => f.kind !== "vrat")
                      .map((f) => (
                        <Pill key={f.hi} tone={f.kind === "major" ? "saffron" : "emerald"}>
                          {t(f)}
                        </Pill>
                      ))}
                  </li>
                ))}
            </ul>
          </GlitterCard>

          {data.eclipses.length > 0 ? (
            <GlitterCard title={t(UI.eclipse)}>
              <ul className="space-y-2">
                {data.eclipses.map((e) => (
                  <li key={e.peak.toISOString()} className="text-sm">
                    <Pill tone={e.type === "solar" ? "saffron" : "magenta"}>
                      {t(e.type === "solar" ? UI.solar : UI.lunar)}
                    </Pill>{" "}
                    <span className="font-semibold text-primary">{e.kind}</span> ·{" "}
                    {fmtDateTime(e.peak, place.tz)}
                  </li>
                ))}
              </ul>
            </GlitterCard>
          ) : null}
        </>
      )}
    </AppShell>
  );
}
