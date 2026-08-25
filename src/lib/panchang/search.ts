import { NAKSHATRA_NAMES, TITHI_NAMES, PURNIMA, AMAVASYA, WEEKDAYS, type Bi } from "./constants";
import { computeDay, ymdKey, type Place, DEFAULT_PLACE } from "./core";
import { festivalsFor, type Festival } from "./festivals";
import { MAX_YEAR, MIN_YEAR } from "./constants";

export type SearchQuery = {
  fromYear: number;
  toYear: number;
  text?: string | undefined; // festival / free text
  tithi?: number | undefined; // 0..29 continuous index
  weekday?: number | undefined; // 0..6
  nakshatra?: number | undefined; // 0..26
  paksha?: "shukla" | "krishna" | "" | undefined;
  onlyPurnima?: boolean | undefined;
  onlyAmavasya?: boolean | undefined;
  onlyEkadashi?: boolean | undefined;
  limit?: number | undefined;
};

export type SearchHit = {
  key: string;
  y: number;
  m: number;
  d: number;
  weekday: number;
  weekdayName: Bi;
  tithiLabel: Bi;
  paksha: "shukla" | "krishna";
  nakshatra: Bi;
  lunarMonth: Bi;
  festivals: Festival[];
};

/** Continuous tithi label list, index 0..29 (0-14 shukla, 15-29 krishna). */
export const TITHI_OPTIONS: { index: number; label: Bi; paksha: "shukla" | "krishna" }[] =
  Array.from({ length: 30 }, (_, i) => {
    const paksha: "shukla" | "krishna" = i < 15 ? "shukla" : "krishna";
    const within = i % 15;
    const label = i === 14 ? PURNIMA : i === 29 ? AMAVASYA : TITHI_NAMES[within]!;
    return { index: i, label, paksha };
  });

export const NAKSHATRA_OPTIONS = NAKSHATRA_NAMES.map((n, i) => ({ index: i, label: n }));
export const WEEKDAY_OPTIONS = WEEKDAYS.map((w, i) => ({ index: i, label: w }));

function matchText(text: string, hit: { festivals: Festival[]; tithiLabel: Bi; nakshatra: Bi; lunarMonth: Bi }) {
  const q = text.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    ...hit.festivals.flatMap((f) => [f.hi, f.en]),
    hit.tithiLabel.hi,
    hit.tithiLabel.en,
    hit.nakshatra.hi,
    hit.nakshatra.en,
    hit.lunarMonth.hi,
    hit.lunarMonth.en,
  ]
    .join(" | ")
    .toLowerCase();
  return hay.includes(q);
}

/** Scan the given year range day by day and return matching days. */
export function searchDays(q: SearchQuery, place: Place = DEFAULT_PLACE): SearchHit[] {
  const limit = q.limit ?? 120;
  const from = Math.max(MIN_YEAR, Math.min(MAX_YEAR, q.fromYear));
  const to = Math.max(from, Math.min(MAX_YEAR, q.toYear));
  const out: SearchHit[] = [];

  for (let y = from; y <= to && out.length < limit; y++) {
    for (let m = 1; m <= 12 && out.length < limit; m++) {
      const dim = new Date(Date.UTC(y, m, 0)).getUTCDate();
      for (let d = 1; d <= dim && out.length < limit; d++) {
        const day = computeDay(y, m, d, place, false);

        if (q.weekday !== undefined && day.weekday !== q.weekday) continue;
        if (q.tithi !== undefined && day.tithiSunriseIndex !== q.tithi) continue;
        if (q.paksha && day.tithi.paksha !== q.paksha) continue;
        if (q.onlyPurnima && !day.isPurnima) continue;
        if (q.onlyAmavasya && !day.isAmavasya) continue;
        if (q.onlyEkadashi && !day.isEkadashi) continue;
        if (q.nakshatra !== undefined && day.nakshatra.num - 1 !== q.nakshatra) continue;

        const festivals = festivalsFor(day);
        const hit: SearchHit = {
          key: ymdKey(y, m, d),
          y,
          m,
          d,
          weekday: day.weekday,
          weekdayName: day.weekdayName,
          tithiLabel: day.tithi.name,
          paksha: day.tithi.paksha,
          nakshatra: day.nakshatra.name,
          lunarMonth: day.lunarMonth,
          festivals,
        };
        if (q.text && !matchText(q.text, hit)) continue;
        if (q.text && festivals.length === 0 && !matchText(q.text, hit)) continue;
        out.push(hit);
      }
    }
  }
  return out;
}
