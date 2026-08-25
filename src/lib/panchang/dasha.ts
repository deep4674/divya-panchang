import type { Bi } from "./constants";

const NAK_SPAN = 360 / 27;

export const DASHA_LORDS: { name: Bi; years: number }[] = [
  { name: { hi: "केतु", en: "Ketu" }, years: 7 },
  { name: { hi: "शुक्र", en: "Venus" }, years: 20 },
  { name: { hi: "सूर्य", en: "Sun" }, years: 6 },
  { name: { hi: "चन्द्र", en: "Moon" }, years: 10 },
  { name: { hi: "मंगल", en: "Mars" }, years: 7 },
  { name: { hi: "राहु", en: "Rahu" }, years: 18 },
  { name: { hi: "गुरु", en: "Jupiter" }, years: 16 },
  { name: { hi: "शनि", en: "Saturn" }, years: 19 },
  { name: { hi: "बुध", en: "Mercury" }, years: 17 },
];

const YEAR_MS = 365.25 * 86400000;

export type DashaPeriod = { lord: Bi; start: Date; end: Date; years: number };

/** Vimshottari Mahadasha sequence from the sidereal Moon longitude at birth. */
export function vimshottari(moonLon: number, birth: Date, count = 9): DashaPeriod[] {
  const nak = Math.floor(moonLon / NAK_SPAN);
  const startIdx = nak % 9;
  const fraction = (moonLon - nak * NAK_SPAN) / NAK_SPAN; // elapsed part of nakshatra
  const first = DASHA_LORDS[startIdx]!;
  const balance = first.years * (1 - fraction);

  const out: DashaPeriod[] = [];
  let cursor = birth.getTime();
  out.push({
    lord: first.name,
    start: new Date(cursor),
    end: new Date(cursor + balance * YEAR_MS),
    years: balance,
  });
  cursor += balance * YEAR_MS;

  for (let i = 1; i < count; i++) {
    const l = DASHA_LORDS[(startIdx + i) % 9]!;
    out.push({
      lord: l.name,
      start: new Date(cursor),
      end: new Date(cursor + l.years * YEAR_MS),
      years: l.years,
    });
    cursor += l.years * YEAR_MS;
  }
  return out;
}

export function fmtYears(years: number) {
  const y = Math.floor(years);
  const months = Math.round((years - y) * 12);
  return `${y}y ${months}m`;
}
