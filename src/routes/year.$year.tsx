import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { ChoghadiyaSummary } from "@/components/ChoghadiyaSummary";
import { GlitterCard, Pill, SectionTitle } from "@/components/GlitterUI";
import { UI, useApp } from "@/lib/i18n";
import { GREGORIAN_MONTHS, MAX_YEAR, MIN_YEAR, PAKSHA } from "@/lib/panchang/constants";
import { eclipsesInYear, fmtDateTime } from "@/lib/panchang/core";
import { yearFestivals } from "@/lib/panchang/festivals";

export const Route = createFileRoute("/year/$year")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.year} त्योहार व ग्रहण सूची | ${params.year} Festival & Eclipse Calendar` },
      {
        name: "description",
        content: `वर्ष ${params.year} के सभी हिन्दू त्योहार, व्रत, संक्रांति, अमावस्या, पूर्णिमा और सूर्य-चंद्र ग्रहण — महीने के अनुसार पूरी सूची।`,
      },
      { property: "og:title", content: `${params.year} Festival & Eclipse Calendar` },
      {
        property: "og:description",
        content: `Month-wise list of every Hindu festival, vrat, sankranti and solar/lunar eclipse in ${params.year}.`,
      },
    ],
  }),
  component: YearPage,
});

function YearPage() {
  const { year } = Route.useParams();
  const { t, lang, place, mounted } = useApp();
  const navigate = useNavigate();
  const y = Math.min(MAX_YEAR, Math.max(MIN_YEAR, Number(year) || MIN_YEAR));

  const data = useMemo(() => {
    if (!mounted) return null;
    return { months: yearFestivals(y, place), eclipses: eclipsesInYear(y) };
  }, [y, place, mounted]);

  return (
    <AppShell>
      <DeityBanner />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          to="/year/$year"
          params={{ year: String(Math.max(MIN_YEAR, y - 1)) }}
          className="rounded-full border border-primary bg-secondary/70 px-3 py-1 text-sm font-bold"
        >
          ← {y - 1}
        </Link>
        <SectionTitle>
          {lang === "hi" ? `वर्ष ${y} का पर्व-ग्रहण विवरण` : `${y} Festivals & Eclipses`}
        </SectionTitle>
        <Link
          to="/year/$year"
          params={{ year: String(Math.min(MAX_YEAR, y + 1)) }}
          className="rounded-full border border-primary bg-secondary/70 px-3 py-1 text-sm font-bold"
        >
          {y + 1} →
        </Link>
      </div>

      <GlitterCard title={lang === "hi" ? "वर्ष चुनें" : "Jump to year"}>
        <input
          type="number"
          min={MIN_YEAR}
          max={MAX_YEAR}
          defaultValue={y}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const v = Number((e.target as HTMLInputElement).value);
              if (v >= MIN_YEAR && v <= MAX_YEAR) navigate({ to: "/year/$year", params: { year: String(v) } });
            }
          }}
          className="rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
        />
        <span className="ml-2 text-xs text-muted-foreground">
          {MIN_YEAR} – {MAX_YEAR}
        </span>
      </GlitterCard>

      {!data ? (
        <GlitterCard>
          <p className="text-center text-sm text-muted-foreground">{t(UI.loading)}</p>
        </GlitterCard>
      ) : (
        <>
          <GlitterCard title={`${t(UI.eclipse)} · ${y}`}>
            {data.eclipses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {lang === "hi" ? "इस वर्ष कोई ग्रहण नहीं।" : "No eclipse this year."}
              </p>
            ) : (
              <ul className="space-y-2">
                {data.eclipses.map((e) => (
                  <li key={e.peak.toISOString()} className="flex flex-wrap items-center gap-2 text-sm">
                    <Pill tone={e.type === "solar" ? "saffron" : "magenta"}>
                      {t(e.type === "solar" ? UI.solar : UI.lunar)}
                    </Pill>
                    <span className="font-semibold text-primary">{e.kind}</span>
                    <span>{fmtDateTime(e.peak, place.tz)}</span>
                    <span className="text-xs text-muted-foreground">
                      {t(GREGORIAN_MONTHS[new Date(e.peak.getTime() + place.tz * 60000).getUTCMonth()]!)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </GlitterCard>

          <ChoghadiyaSummary year={y} />

          <div className="grid gap-4 sm:grid-cols-2">
            {data.months.map((days, i) => (
              <GlitterCard key={i} title={`${t(GREGORIAN_MONTHS[i]!)} ${y}`}>
                {days.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {lang === "hi" ? "कोई प्रमुख पर्व नहीं।" : "No major festival."}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {days.map((s) => (
                      <li key={s.key} className="border-b border-primary/25 pb-2 last:border-b-0">
                        <Link
                          to="/day/$date"
                          params={{ date: s.key }}
                          className="text-sm font-bold text-primary"
                        >
                          {s.d} {t(GREGORIAN_MONTHS[i]!)}
                        </Link>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {t(s.lunarMonth)} · {t(PAKSHA[s.paksha])} · {t(s.tithiLabel)}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {s.festivals
                            .filter((f) => f.kind !== "vrat" && f.kind !== "moon")
                            .map((f) => (
                              <Pill
                                key={f.hi}
                                tone={
                                  f.kind === "major"
                                    ? "saffron"
                                    : f.kind === "sankranti"
                                      ? "emerald"
                                      : "magenta"
                                }
                              >
                                {t(f)}
                              </Pill>
                            ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </GlitterCard>
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
