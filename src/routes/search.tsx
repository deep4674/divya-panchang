import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { GlitterCard, Pill, SectionTitle } from "@/components/GlitterUI";
import { useApp } from "@/lib/i18n";
import { GREGORIAN_MONTHS, MAX_YEAR, MIN_YEAR, PAKSHA } from "@/lib/panchang/constants";
import {
  NAKSHATRA_OPTIONS,
  TITHI_OPTIONS,
  WEEKDAY_OPTIONS,
  searchDays,
  type SearchHit,
} from "@/lib/panchang/search";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "पंचांग खोज | Search by Tithi, Vaar, Nakshatra & Festival — Divya Panchang" },
      {
        name: "description",
        content:
          "तिथि, वार, नक्षत्र, पक्ष, त्योहार या तारीख से 1926–2126 तक किसी भी दिन को खोजें — एकादशी, पूर्णिमा, अमावस्या फ़िल्टर सहित।",
      },
      { property: "og:title", content: "Panchang Search | पंचांग खोज" },
      {
        property: "og:description",
        content:
          "Search any day between 1926 and 2126 by tithi, weekday, nakshatra, paksha or festival name.",
      },
    ],
  }),
  component: SearchPage,
});

const inputCls =
  "rounded-full border border-primary/70 bg-input px-4 py-2 text-sm font-semibold text-foreground";

function SearchPage() {
  const { lang, place, t } = useApp();
  const hi = lang === "hi";
  const [fromYear, setFromYear] = useState(2026);
  const [toYear, setToYear] = useState(2027);
  const [text, setText] = useState("");
  const [tithi, setTithi] = useState("");
  const [weekday, setWeekday] = useState("");
  const [nakshatra, setNakshatra] = useState("");
  const [paksha, setPaksha] = useState<"" | "shukla" | "krishna">("");
  const [flag, setFlag] = useState<"" | "purnima" | "amavasya" | "ekadashi">("");
  const [busy, setBusy] = useState(false);
  const [hits, setHits] = useState<SearchHit[] | null>(null);

  function run() {
    setBusy(true);
    setTimeout(() => {
      const res = searchDays(
        {
          fromYear,
          toYear,
          text: text.trim() || undefined,
          tithi: tithi === "" ? undefined : Number(tithi),
          weekday: weekday === "" ? undefined : Number(weekday),
          nakshatra: nakshatra === "" ? undefined : Number(nakshatra),
          paksha,
          onlyPurnima: flag === "purnima",
          onlyAmavasya: flag === "amavasya",
          onlyEkadashi: flag === "ekadashi",
          limit: 150,
        },
        place,
      );
      setHits(res);
      setBusy(false);
    }, 30);
  }

  return (
    <AppShell>
      <DeityBanner />
      <SectionTitle>{hi ? "सम्पूर्ण खोज" : "Advanced Search"}</SectionTitle>
      <p className="text-sm text-muted-foreground">
        {hi
          ? "तारीख, तिथि, वार, नक्षत्र, पक्ष या त्योहार के नाम से 1926–2126 तक कोई भी दिन खोजें।"
          : "Find any day from 1926 to 2126 by date, tithi, weekday, nakshatra, paksha or festival name."}
      </p>

      <GlitterCard title={hi ? "खोज विकल्प" : "Search filters"}>
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
        >
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "वर्ष से" : "From year"}
            <input
              type="number"
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={fromYear}
              onChange={(e) => setFromYear(Number(e.target.value))}
              className={`${inputCls} w-28`}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "वर्ष तक" : "To year"}
            <input
              type="number"
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={toYear}
              onChange={(e) => setToYear(Number(e.target.value))}
              className={`${inputCls} w-28`}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "त्योहार / नाम" : "Festival / keyword"}
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={hi ? "जैसे: दीपावली" : "e.g. Diwali"}
              className={inputCls}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "तिथि" : "Tithi"}
            <select value={tithi} onChange={(e) => setTithi(e.target.value)} className={inputCls}>
              <option value="">{hi ? "कोई भी" : "Any"}</option>
              {TITHI_OPTIONS.map((o) => (
                <option key={o.index} value={o.index}>
                  {t(o.label)} · {t(PAKSHA[o.paksha])}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "वार" : "Weekday"}
            <select value={weekday} onChange={(e) => setWeekday(e.target.value)} className={inputCls}>
              <option value="">{hi ? "कोई भी" : "Any"}</option>
              {WEEKDAY_OPTIONS.map((o) => (
                <option key={o.index} value={o.index}>
                  {t(o.label)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "नक्षत्र" : "Nakshatra"}
            <select
              value={nakshatra}
              onChange={(e) => setNakshatra(e.target.value)}
              className={inputCls}
            >
              <option value="">{hi ? "कोई भी" : "Any"}</option>
              {NAKSHATRA_OPTIONS.map((o) => (
                <option key={o.index} value={o.index}>
                  {t(o.label)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "पक्ष" : "Paksha"}
            <select
              value={paksha}
              onChange={(e) => setPaksha(e.target.value as "" | "shukla" | "krishna")}
              className={inputCls}
            >
              <option value="">{hi ? "कोई भी" : "Any"}</option>
              <option value="shukla">{t(PAKSHA.shukla)}</option>
              <option value="krishna">{t(PAKSHA.krishna)}</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            {hi ? "विशेष" : "Special"}
            <select
              value={flag}
              onChange={(e) => setFlag(e.target.value as typeof flag)}
              className={inputCls}
            >
              <option value="">{hi ? "कोई भी" : "Any"}</option>
              <option value="purnima">{hi ? "पूर्णिमा" : "Purnima"}</option>
              <option value="amavasya">{hi ? "अमावस्या" : "Amavasya"}</option>
              <option value="ekadashi">{hi ? "एकादशी" : "Ekadashi"}</option>
            </select>
          </label>
          <button type="submit" className="gold-fill rounded-full px-5 py-2 text-sm font-bold">
            {hi ? "खोजें" : "Search"}
          </button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          {hi
            ? "सुझाव: एक बार में 1–3 वर्ष चुनें, गणना खगोलीय रूप से होती है।"
            : "Tip: pick a 1–3 year span at a time; every day is computed astronomically."}
        </p>
      </GlitterCard>

      {busy ? (
        <GlitterCard>
          <p className="text-center text-sm text-muted-foreground">
            {hi ? "खोज हो रही है…" : "Searching…"}
          </p>
        </GlitterCard>
      ) : hits ? (
        <GlitterCard
          title={
            hi ? `परिणाम: ${hits.length} दिन` : `Results: ${hits.length} day${hits.length === 1 ? "" : "s"}`
          }
        >
          {hits.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {hi ? "कोई मेल नहीं मिला, फ़िल्टर बदलें।" : "No match found, try other filters."}
            </p>
          ) : (
            <ul className="space-y-2">
              {hits.map((h) => (
                <li key={h.key} className="border-b border-primary/25 pb-2 last:border-b-0">
                  <Link to="/day/$date" params={{ date: h.key }} className="text-sm font-bold text-primary">
                    {h.d} {t(GREGORIAN_MONTHS[h.m - 1]!)} {h.y} · {t(h.weekdayName)}
                  </Link>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {t(h.lunarMonth)} · {t(PAKSHA[h.paksha])} · {t(h.tithiLabel)} · {t(h.nakshatra)}
                  </span>
                  {h.festivals.length ? (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {h.festivals.map((f) => (
                        <Pill
                          key={f.hi}
                          tone={f.kind === "major" ? "saffron" : f.kind === "sankranti" ? "emerald" : "magenta"}
                        >
                          {t(f)}
                        </Pill>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </GlitterCard>
      ) : null}
    </AppShell>
  );
}
