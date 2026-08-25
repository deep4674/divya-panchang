import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { GlitterCard, InfoRow, Pill, SectionTitle } from "@/components/GlitterUI";
import { UI, useApp } from "@/lib/i18n";
import { CHOGHADIYA_NAMES } from "@/lib/panchang/constants";
import {
  choghadiya,
  computeDay,
  fmtTime,
  nextSunriseOf,
  parseKey,
  ymdKey,
} from "@/lib/panchang/core";

export const Route = createFileRoute("/choghadiya")({
  head: () => ({
    meta: [
      { title: "चौघड़िया मुहूर्त | Choghadiya & Rahu Kaal — Divya Panchang" },
      {
        name: "description",
        content:
          "आज का दिन एवं रात्रि चौघड़िया, शुभ-अशुभ मुहूर्त, राहु काल, यमगण्ड, गुलिक काल और अभिजित मुहूर्त — अपने शहर के अनुसार सटीक समय।",
      },
      { property: "og:title", content: "Choghadiya & Rahu Kaal | दिव्य पंचांग" },
      {
        property: "og:description",
        content:
          "Day and night choghadiya with Rahu Kaal, Yamaganda, Gulika Kaal and Abhijit Muhurat for your city.",
      },
    ],
  }),
  component: ChoghadiyaPage,
});

function ChoghadiyaPage() {
  const { t, lang, place, mounted } = useApp();
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const now = new Date();
    const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
    setDateStr(ymdKey(ist.getFullYear(), ist.getMonth() + 1, ist.getDate()));
  }, []);

  const data = useMemo(() => {
    if (!mounted || !dateStr) return null;
    const p = parseKey(dateStr);
    if (!p) return null;
    const day = computeDay(p.y, p.m, p.d, place, true);
    return { day, ch: choghadiya(day, nextSunriseOf(day)) };
  }, [dateStr, place, mounted]);

  const tz = place.tz;

  return (
    <AppShell>
      <DeityBanner />
      <SectionTitle>{t(UI.choghadiya)}</SectionTitle>

      <GlitterCard>
        <input
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          className="rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
        />
        <span className="ml-2 text-xs text-muted-foreground">
          {lang === "hi" ? place.hi : place.en}
        </span>
      </GlitterCard>

      {!data ? (
        <GlitterCard>
          <p className="text-center text-sm text-muted-foreground">{t(UI.loading)}</p>
        </GlitterCard>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlitterCard title={t(UI.dayChoghadiya)}>
              {data.ch.day.map((c, i) => {
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
                            info.good === "shubh"
                              ? "emerald"
                              : info.good === "ashubh"
                                ? "magenta"
                                : "gold"
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
              {data.ch.night.map((c, i) => {
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
                            info.good === "shubh"
                              ? "emerald"
                              : info.good === "ashubh"
                                ? "magenta"
                                : "gold"
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
          </div>

          <GlitterCard title={lang === "hi" ? "अन्य काल" : "Other periods"}>
            <InfoRow label={t(UI.sunrise)} value={fmtTime(data.day.sunrise, tz)} />
            <InfoRow label={t(UI.sunset)} value={fmtTime(data.day.sunset, tz)} />
            <InfoRow
              label={t(UI.abhijit)}
              value={
                data.day.abhijit
                  ? `${fmtTime(data.day.abhijit[0], tz)} – ${fmtTime(data.day.abhijit[1], tz)}`
                  : "—"
              }
            />
            <InfoRow
              label={t(UI.rahuKaal)}
              value={
                data.day.rahuKaal
                  ? `${fmtTime(data.day.rahuKaal[0], tz)} – ${fmtTime(data.day.rahuKaal[1], tz)}`
                  : "—"
              }
            />
            <InfoRow
              label={t(UI.yamaganda)}
              value={
                data.day.yamaganda
                  ? `${fmtTime(data.day.yamaganda[0], tz)} – ${fmtTime(data.day.yamaganda[1], tz)}`
                  : "—"
              }
            />
            <InfoRow
              label={t(UI.gulika)}
              value={
                data.day.gulikaKaal
                  ? `${fmtTime(data.day.gulikaKaal[0], tz)} – ${fmtTime(data.day.gulikaKaal[1], tz)}`
                  : "—"
              }
            />
          </GlitterCard>
        </>
      )}
    </AppShell>
  );
}
