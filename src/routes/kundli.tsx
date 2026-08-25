import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { GlitterCard, InfoRow, Pill, SectionTitle } from "@/components/GlitterUI";
import { UI, useApp } from "@/lib/i18n";
import { CITIES, fmtDateTime, localMidnightUTC } from "@/lib/panchang/core";
import { computeKundli } from "@/lib/panchang/kundli";
import { KundliChart } from "@/components/KundliChart";
import { fmtYears, vimshottari } from "@/lib/panchang/dasha";

export const Route = createFileRoute("/kundli")({
  head: () => ({
    meta: [
      { title: "जन्म कुंडली बनाएँ | Free Birth Kundli — Divya Panchang" },
      {
        name: "description",
        content:
          "जन्म तिथि, समय और स्थान से निःशुल्क जन्म कुंडली — लग्न, बारह भाव, नवग्रह की राशि, नक्षत्र व पद सहित सटीक निरयन गणना।",
      },
      { property: "og:title", content: "Free Birth Kundli | दिव्य पंचांग" },
      {
        property: "og:description",
        content:
          "Generate a sidereal birth chart with lagna, twelve houses, planetary rashi, nakshatra and pada.",
      },
    ],
  }),
  component: KundliPage,
});

function KundliPage() {
  const { t, lang, place } = useApp();
  const hi = lang === "hi";
  const [date, setDate] = useState("2000-01-01");
  const [time, setTime] = useState("06:00");
  const [cityId, setCityId] = useState(place.id);
  const [cityQuery, setCityQuery] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [lat, setLat] = useState("22.7196");
  const [lon, setLon] = useState("75.8577");
  const [tzHours, setTzHours] = useState("5.5");
  const [chartStyle, setChartStyle] = useState<"north" | "south">("north");
  const [submitted, setSubmitted] = useState(false);

  const city = CITIES.find((c) => c.id === cityId) ?? CITIES[0];
  const filteredCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) return CITIES as readonly (typeof CITIES)[number][];
    const hits = CITIES.filter(
      (c) => c.en.toLowerCase().includes(q) || c.hi.includes(cityQuery.trim()),
    );
    return hits.length ? hits : (CITIES as readonly (typeof CITIES)[number][]);
  }, [cityQuery]);

  const loc = useCustom
    ? {
        lat: Number(lat) || 0,
        lon: Number(lon) || 0,
        tz: Math.round((Number(tzHours) || 0) * 60),
        label: `${lat}, ${lon} (UTC${Number(tzHours) >= 0 ? "+" : ""}${tzHours})`,
      }
    : { lat: city.lat, lon: city.lon, tz: city.tz, label: hi ? city.hi : city.en };

  const result = useMemo(() => {
    if (!submitted) return null;
    const [y, m, d] = date.split("-").map(Number);
    const [hh, mm] = time.split(":").map(Number);
    if (!y || !m || !d) return null;
    const utc = new Date(
      localMidnightUTC(y, m, d, loc.tz).getTime() + ((hh ?? 0) * 60 + (mm ?? 0)) * 60000,
    );
    const k = computeKundli(utc, loc.lat, loc.lon);
    const moon = k.positions.find((p) => p.name.en === "Moon");
    return { kundli: k, utc, dasha: moon ? vimshottari(moon.lon, utc) : [] };
  }, [submitted, date, time, loc.lat, loc.lon, loc.tz]);

  const kundli = result?.kundli ?? null;

  return (
    <AppShell>
      <DeityBanner />
      <SectionTitle>{t(UI.kundli)}</SectionTitle>

      <GlitterCard title={hi ? "जन्म विवरण भरें" : "Enter birth details"}>
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "जन्म तिथि" : "Birth date"}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "जन्म समय" : "Birth time"}
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "शहर खोजें" : "Search city"}
            <input
              type="text"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              placeholder={hi ? "जैसे: इंदौर / Indore" : "e.g. Indore"}
              className="rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "जन्म स्थान" : "Birth place"}
            <select
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              className="max-w-[16rem] rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
            >
              {filteredCities.map((c) => (
                <option key={c.id} value={c.id}>
                  {hi ? c.hi : c.en}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
            />
            {hi ? "कस्टम अक्षांश/देशांतर" : "Custom lat/lon"}
          </label>
          {useCustom ? (
            <>
              <label className="flex flex-col gap-1 text-xs text-muted-foreground">
                {hi ? "अक्षांश" : "Latitude"}
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-28 rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-muted-foreground">
                {hi ? "देशांतर" : "Longitude"}
                <input
                  type="number"
                  step="0.0001"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  className="w-28 rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-muted-foreground">
                {hi ? "समय क्षेत्र (UTC±घंटे)" : "Timezone (UTC± hours)"}
                <input
                  type="number"
                  step="0.25"
                  value={tzHours}
                  onChange={(e) => setTzHours(e.target.value)}
                  className="w-28 rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground"
                />
              </label>
            </>
          ) : null}
          <button type="submit" className="gold-fill rounded-full px-5 py-2 text-sm font-bold">
            {hi ? "कुंडली बनाएँ" : "Generate Kundli"}
          </button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          {hi
            ? "समय 24 घंटे के अनुसार भरें (दोपहर 2:35 = 14:35)।"
            : "Enter time in 24-hour format (2:35 PM = 14:35)."}
        </p>
      </GlitterCard>


      {kundli && result ? (
        <>
          <GlitterCard
            title={
              hi
                ? `जन्म कुंडली चक्र · ${loc.label}`
                : `Birth chart · ${loc.label}`
            }
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {(["north", "south"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setChartStyle(s)}
                  className={`rounded-full px-4 py-1 text-xs font-bold ${
                    chartStyle === s
                      ? "gold-fill"
                      : "border border-primary/60 bg-secondary/60 text-foreground"
                  }`}
                >
                  {s === "north"
                    ? hi
                      ? "उत्तर भारतीय"
                      : "North Indian"
                    : hi
                      ? "दक्षिण भारतीय"
                      : "South Indian"}
                </button>
              ))}
              <span className="text-xs text-muted-foreground">
                {fmtDateTime(result.utc, loc.tz)}
              </span>
            </div>
            <KundliChart kundli={kundli} style={chartStyle} />
          </GlitterCard>

          <GlitterCard title={hi ? "विंशोत्तरी महादशा" : "Vimshottari Mahadasha"}>
            <ul className="space-y-1">
              {result.dasha.map((p, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-center gap-2 border-b border-primary/25 pb-1 text-sm last:border-b-0"
                >
                  <Pill tone={i === 0 ? "saffron" : "gold"}>{t(p.lord)}</Pill>
                  <span className="text-xs text-muted-foreground">
                    {fmtDateTime(p.start, loc.tz)} → {fmtDateTime(p.end, loc.tz)}
                  </span>
                  <span className="ml-auto text-xs font-semibold text-primary">
                    {fmtYears(p.years)}
                  </span>
                </li>
              ))}
            </ul>
          </GlitterCard>

          <GlitterCard title={hi ? "लग्न एवं ग्रह स्थिति" : "Lagna & planetary positions"}>
            <InfoRow
              label={hi ? "लग्न (जन्म राशि उदय)" : "Ascendant (Lagna)"}
              value={`${t(kundli.lagna.rashi)} ${kundli.lagna.degInRashi.toFixed(2)}°`}
              hint={`${t(kundli.lagna.nakshatra)} · ${hi ? "पद" : "Pada"} ${kundli.lagna.pada}`}
            />
            {kundli.positions.map((p) => (
              <InfoRow
                key={p.name.en}
                label={
                  <span className="flex items-center gap-2">
                    {t(p.name)}
                    {p.retro ? <Pill tone="magenta">{hi ? "वक्री" : "Retro"}</Pill> : null}
                  </span>
                }
                value={`${t(p.rashi)} ${p.degInRashi.toFixed(2)}°`}
                hint={`${t(p.nakshatra)} · ${hi ? "पद" : "Pada"} ${p.pada}`}
              />
            ))}
          </GlitterCard>

          <GlitterCard title={hi ? "बारह भाव चक्र" : "Twelve houses"}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {kundli.houses.map((h) => (
                <div key={h.house} className="glitter-border rounded-xl p-2">
                  <p className="glitter-text text-sm font-bold">
                    {hi ? `भाव ${h.house}` : `House ${h.house}`}
                  </p>
                  <p className="text-xs text-muted-foreground">{t(h.rashi)}</p>
                  <p className="mt-1 text-xs font-semibold text-primary">
                    {h.planets.length ? h.planets.map((p) => t(p.name)).join(", ") : "—"}
                  </p>
                </div>
              ))}
            </div>
          </GlitterCard>
        </>
      ) : null}
    </AppShell>
  );
}
