import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { GlitterCard, InfoRow, Pill } from "@/components/GlitterUI";
import { UI, useApp } from "@/lib/i18n";
import {
  GREGORIAN_MONTHS,
  HIJRI_MONTHS,
  PAKSHA,
} from "@/lib/panchang/constants";
import {
  choghadiya,
  computeDay,
  eclipsesInRange,
  fmtDateTime,
  fmtTime,
  localMidnightUTC,
  nextSunriseOf,
} from "@/lib/panchang/core";
import { CHOGHADIYA_NAMES } from "@/lib/panchang/constants";
import { festivalsFor } from "@/lib/panchang/festivals";

function range(a: [Date, Date] | null, tz: number) {
  if (!a) return "—";
  return `${fmtTime(a[0], tz)} – ${fmtTime(a[1], tz)}`;
}

export function PanchangDay({ y, m, d }: { y: number; m: number; d: number }) {
  const { t, lang, place, mounted } = useApp();

  const data = useMemo(() => {
    if (!mounted) return null;
    const day = computeDay(y, m, d, place, true);
    const ch = choghadiya(day, nextSunriseOf(day));
    const start = localMidnightUTC(y, m, d, place.tz);
    const ecl = eclipsesInRange(
      new Date(start.getTime() - 2 * 86400000),
      new Date(start.getTime() + 3 * 86400000),
    ).filter((e) => Math.abs(e.peak.getTime() - start.getTime()) < 36 * 3600000);
    return { day, ch, festivals: festivalsFor(day), ecl };
  }, [y, m, d, place, mounted]);

  if (!data) {
    return (
      <GlitterCard>
        <p className="text-center text-sm text-muted-foreground">{t(UI.loading)}</p>
      </GlitterCard>
    );
  }

  const { day, ch, festivals, ecl } = data;
  const tz = place.tz;

  return (
    <div className="space-y-4">
      <GlitterCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="glitter-text text-2xl font-bold sm:text-3xl">
              {d} {t(GREGORIAN_MONTHS[m - 1]!)} {y}
            </p>
            <p className="text-sm text-muted-foreground">
              {t(day.weekdayName)} · {t(day.lunarMonth)}
              {day.adhikMaas ? (lang === "hi" ? " (अधिक मास)" : " (Adhik Maas)") : ""} ·{" "}
              {t(PAKSHA[day.tithi.paksha])}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill tone="gold">
              {t(UI.tithi)}: {t(day.tithi.name)}
            </Pill>
            <Pill tone="emerald">
              {t(UI.nakshatra)}: {t(day.nakshatra.name)}
            </Pill>
            <Pill tone="magenta">
              {t(UI.city)}: {lang === "hi" ? place.hi : place.en}
            </Pill>
          </div>
        </div>
      </GlitterCard>

      {festivals.length > 0 ? (
        <GlitterCard title={t(UI.festivals)}>
          <ul className="flex flex-wrap gap-2">
            {festivals.map((f) => (
              <li key={f.hi}>
                <Pill
                  tone={
                    f.kind === "major"
                      ? "saffron"
                      : f.kind === "sankranti"
                        ? "emerald"
                        : f.kind === "national"
                          ? "magenta"
                          : "gold"
                  }
                >
                  {t(f)}
                </Pill>
              </li>
            ))}
          </ul>
        </GlitterCard>
      ) : null}

      {ecl.length > 0 ? (
        <GlitterCard title={t(UI.eclipse)}>
          {ecl.map((e) => (
            <InfoRow
              key={e.peak.toISOString()}
              label={t(e.type === "solar" ? UI.solar : UI.lunar)}
              value={`${e.kind} · ${fmtDateTime(e.peak, tz)}`}
              hint={
                e.obscuration !== undefined
                  ? `${lang === "hi" ? "ग्रस्त भाग" : "Obscuration"}: ${Math.round(e.obscuration * 100)}%`
                  : undefined
              }
            />
          ))}
        </GlitterCard>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <GlitterCard title={lang === "hi" ? "सूर्य एवं चंद्र" : "Sun & Moon"}>
          <InfoRow label={t(UI.sunrise)} value={fmtTime(day.sunrise, tz)} />
          <InfoRow label={t(UI.sunset)} value={fmtTime(day.sunset, tz)} />
          <InfoRow label={t(UI.moonrise)} value={fmtTime(day.moonrise, tz)} />
          <InfoRow label={t(UI.moonset)} value={fmtTime(day.moonset, tz)} />
          <InfoRow label={t(UI.dayDuration)} value={day.dayDuration} />
          <InfoRow label={t(UI.moonRashi)} value={t(day.moonRashi)} />
          <InfoRow label={t(UI.sunRashi)} value={t(day.sunRashi)} />
        </GlitterCard>

        <GlitterCard title={lang === "hi" ? "पंचांग के पाँच अंग" : "Five Limbs of Panchang"}>
          <InfoRow
            label={t(UI.tithi)}
            value={t(day.tithi.name)}
            hint={
              day.tithi.endsAt
                ? `${lang === "hi" ? "समाप्ति" : "ends"} ${fmtDateTime(day.tithi.endsAt, tz)}`
                : undefined
            }
          />
          <InfoRow
            label={t(UI.nakshatra)}
            value={t(day.nakshatra.name)}
            hint={
              day.nakshatra.endsAt
                ? `${lang === "hi" ? "समाप्ति" : "ends"} ${fmtDateTime(day.nakshatra.endsAt, tz)}`
                : undefined
            }
          />
          <InfoRow
            label={t(UI.yoga)}
            value={t(day.yoga.name)}
            hint={
              day.yoga.endsAt
                ? `${lang === "hi" ? "समाप्ति" : "ends"} ${fmtDateTime(day.yoga.endsAt, tz)}`
                : undefined
            }
          />
          <InfoRow
            label={t(UI.karana)}
            value={t(day.karana.name)}
            hint={
              day.karana.endsAt
                ? `${lang === "hi" ? "समाप्ति" : "ends"} ${fmtDateTime(day.karana.endsAt, tz)}`
                : undefined
            }
          />
          <InfoRow label={t(UI.weekday)} value={t(day.weekdayName)} />
          <InfoRow label={t(UI.paksha)} value={t(PAKSHA[day.tithi.paksha])} />
        </GlitterCard>

        <GlitterCard title={lang === "hi" ? "संवत् एवं सन्" : "Samvat & Era"}>
          <InfoRow label={t(UI.vikram)} value={`${day.vikram}`} />
          <InfoRow label={t(UI.shaka)} value={`${day.shaka}`} />
          <InfoRow label={t(UI.isavi)} value={`${d}/${m}/${y}`} />
          <InfoRow
            label={t(UI.hijri)}
            value={`${day.hijri.day} ${t(HIJRI_MONTHS[day.hijri.month - 1]!)} ${day.hijri.year}`}
          />
          <InfoRow label={t(UI.lunarMonth)} value={t(day.lunarMonth)} />
        </GlitterCard>

        <GlitterCard title={lang === "hi" ? "शुभ-अशुभ काल" : "Auspicious & Inauspicious"}>
          <InfoRow label={t(UI.abhijit)} value={range(day.abhijit, tz)} />
          <InfoRow label={t(UI.rahuKaal)} value={range(day.rahuKaal, tz)} />
          <InfoRow label={t(UI.yamaganda)} value={range(day.yamaganda, tz)} />
          <InfoRow label={t(UI.gulika)} value={range(day.gulikaKaal, tz)} />
        </GlitterCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <GlitterCard title={t(UI.dayChoghadiya)}>
          {ch.day.map((c, i) => {
            const info = CHOGHADIYA_NAMES[c.key]!;
            return (
              <InfoRow
                key={i}
                label={`${fmtTime(c.start, tz)} – ${fmtTime(c.end, tz)}`}
                value={
                  <span className="flex items-center justify-end gap-2">
                    {t(info)}
                    <Pill
                      tone={
                        info.good === "shubh" ? "emerald" : info.good === "ashubh" ? "magenta" : "gold"
                      }
                    >
                      {info.good === "shubh"
                        ? lang === "hi"
                          ? "शुभ"
                          : "Good"
                        : info.good === "ashubh"
                          ? lang === "hi"
                            ? "अशुभ"
                            : "Avoid"
                          : lang === "hi"
                            ? "मध्यम"
                            : "Neutral"}
                    </Pill>
                  </span>
                }
              />
            );
          })}
        </GlitterCard>
        <GlitterCard title={t(UI.nightChoghadiya)}>
          {ch.night.map((c, i) => {
            const info = CHOGHADIYA_NAMES[c.key]!;
            return (
              <InfoRow
                key={i}
                label={`${fmtTime(c.start, tz)} – ${fmtTime(c.end, tz)}`}
                value={t(info)}
              />
            );
          })}
        </GlitterCard>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/calendar/$year/$month"
          params={{ year: String(y), month: String(m) }}
          className="gold-fill rounded-full px-4 py-2 text-sm font-bold"
        >
          {t(UI.calendar)}: {t(GREGORIAN_MONTHS[m - 1]!)} {y}
        </Link>
        <Link
          to="/year/$year"
          params={{ year: String(y) }}
          className="rounded-full border border-primary bg-secondary/70 px-4 py-2 text-sm font-bold text-foreground"
        >
          {t(UI.year)} {y}
        </Link>
      </div>
    </div>
  );
}
