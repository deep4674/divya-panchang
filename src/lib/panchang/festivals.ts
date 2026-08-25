import type { Bi } from "./constants";
import { LUNAR_MONTHS, RASHI_NAMES } from "./constants";
import {
  computeDay,
  localMidnightUTC,
  sunSidereal,
  ymdKey,
  type DayPanchang,
  type Place,
  DEFAULT_PLACE,
} from "./core";

export type FestKind = "major" | "vrat" | "moon" | "sankranti" | "national";

export type Festival = Bi & { kind: FestKind };

type Rule = {
  month: number; // amanta lunar month index, 0 = Chaitra
  paksha: "shukla" | "krishna";
  tithi: number; // 1..15 within paksha
  hi: string;
  en: string;
  kind: FestKind;
  time?: "sunrise" | "sunset" | "nishita";
};

export const FESTIVAL_RULES: Rule[] = [
  { month: 0, paksha: "shukla", tithi: 1, hi: "गुड़ी पड़वा / चैत्र नवरात्रि प्रारम्भ / हिन्दू नववर्ष", en: "Gudi Padwa / Chaitra Navratri begins / Hindu New Year", kind: "major" },
  { month: 0, paksha: "shukla", tithi: 9, hi: "राम नवमी", en: "Ram Navami", kind: "major" },
  { month: 0, paksha: "shukla", tithi: 15, hi: "हनुमान जयंती / चैत्र पूर्णिमा", en: "Hanuman Jayanti / Chaitra Purnima", kind: "major" },
  { month: 1, paksha: "shukla", tithi: 3, hi: "अक्षय तृतीया", en: "Akshaya Tritiya", kind: "major" },
  { month: 1, paksha: "shukla", tithi: 15, hi: "बुद्ध पूर्णिमा", en: "Buddha Purnima", kind: "major" },
  { month: 2, paksha: "shukla", tithi: 15, hi: "वट पूर्णिमा / ज्येष्ठ पूर्णिमा", en: "Vat Purnima / Jyeshtha Purnima", kind: "major" },
  { month: 2, paksha: "krishna", tithi: 15, hi: "शनि जयंती / ज्येष्ठ अमावस्या", en: "Shani Jayanti / Jyeshtha Amavasya", kind: "major" },
  { month: 3, paksha: "shukla", tithi: 2, hi: "जगन्नाथ रथ यात्रा", en: "Jagannath Rath Yatra", kind: "major" },
  { month: 3, paksha: "shukla", tithi: 11, hi: "देवशयनी एकादशी", en: "Devshayani Ekadashi", kind: "major" },
  { month: 3, paksha: "shukla", tithi: 15, hi: "गुरु पूर्णिमा", en: "Guru Purnima", kind: "major" },
  { month: 4, paksha: "shukla", tithi: 5, hi: "नाग पंचमी", en: "Nag Panchami", kind: "major" },
  { month: 4, paksha: "shukla", tithi: 15, hi: "रक्षा बंधन / श्रावण पूर्णिमा", en: "Raksha Bandhan / Shravana Purnima", kind: "major" },
  { month: 4, paksha: "krishna", tithi: 8, hi: "कृष्ण जन्माष्टमी", en: "Krishna Janmashtami", kind: "major" },
  { month: 5, paksha: "shukla", tithi: 3, hi: "हरतालिका तीज", en: "Hartalika Teej", kind: "major" },
  { month: 5, paksha: "shukla", tithi: 4, hi: "गणेश चतुर्थी", en: "Ganesh Chaturthi", kind: "major" },
  { month: 5, paksha: "shukla", tithi: 15, hi: "भाद्रपद पूर्णिमा / पितृ पक्ष प्रारम्भ", en: "Bhadrapada Purnima / Pitru Paksha begins", kind: "major" },
  { month: 5, paksha: "krishna", tithi: 15, hi: "सर्वपितृ अमावस्या", en: "Sarva Pitru Amavasya", kind: "major" },
  { month: 6, paksha: "shukla", tithi: 1, hi: "शारदीय नवरात्रि प्रारम्भ / घटस्थापना", en: "Sharad Navratri begins / Ghatasthapana", kind: "major" },
  { month: 6, paksha: "shukla", tithi: 8, hi: "दुर्गा अष्टमी", en: "Durga Ashtami", kind: "major" },
  { month: 6, paksha: "shukla", tithi: 9, hi: "महा नवमी", en: "Maha Navami", kind: "major" },
  { month: 6, paksha: "shukla", tithi: 10, hi: "विजयदशमी / दशहरा", en: "Vijayadashami / Dussehra", kind: "major" },
  { month: 6, paksha: "shukla", tithi: 15, hi: "शरद पूर्णिमा", en: "Sharad Purnima", kind: "major" },
  { month: 6, paksha: "krishna", tithi: 13, hi: "धनतेरस", en: "Dhanteras", kind: "major" },
  { month: 6, paksha: "krishna", tithi: 14, time: "sunset", hi: "नरक चतुर्दशी / छोटी दिवाली", en: "Narak Chaturdashi / Choti Diwali", kind: "major" },
  { month: 6, paksha: "krishna", tithi: 15, time: "sunset", hi: "दीपावली / लक्ष्मी पूजन", en: "Diwali / Lakshmi Puja", kind: "major" },
  { month: 7, paksha: "shukla", tithi: 1, hi: "गोवर्धन पूजा / अन्नकूट", en: "Govardhan Puja / Annakut", kind: "major" },
  { month: 7, paksha: "shukla", tithi: 2, hi: "भाई दूज", en: "Bhai Dooj", kind: "major" },
  { month: 7, paksha: "shukla", tithi: 6, hi: "छठ पूजा", en: "Chhath Puja", kind: "major" },
  { month: 7, paksha: "shukla", tithi: 11, hi: "देवउठनी एकादशी / तुलसी विवाह", en: "Dev Uthani Ekadashi / Tulsi Vivah", kind: "major" },
  { month: 7, paksha: "shukla", tithi: 15, hi: "कार्तिक पूर्णिमा / देव दीपावली / गुरु नानक जयंती", en: "Kartik Purnima / Dev Deepawali / Guru Nanak Jayanti", kind: "major" },
  { month: 8, paksha: "shukla", tithi: 11, hi: "गीता जयंती / मोक्षदा एकादशी", en: "Gita Jayanti / Mokshada Ekadashi", kind: "major" },
  { month: 8, paksha: "krishna", tithi: 8, hi: "कालभैरव जयंती", en: "Kalbhairav Jayanti", kind: "major" },
  { month: 9, paksha: "shukla", tithi: 15, hi: "पौष पूर्णिमा", en: "Paush Purnima", kind: "major" },
  { month: 10, paksha: "shukla", tithi: 5, hi: "वसंत पंचमी / सरस्वती पूजा", en: "Vasant Panchami / Saraswati Puja", kind: "major" },
  { month: 10, paksha: "shukla", tithi: 15, hi: "माघ पूर्णिमा", en: "Magha Purnima", kind: "major" },
  { month: 10, paksha: "krishna", tithi: 14, time: "nishita", hi: "महाशिवरात्रि", en: "Maha Shivratri", kind: "major" },
  { month: 11, paksha: "shukla", tithi: 15, hi: "होलिका दहन / फाल्गुन पूर्णिमा", en: "Holika Dahan / Phalguna Purnima", kind: "major" },
  { month: 11, paksha: "krishna", tithi: 1, hi: "होली / धुलंडी", en: "Holi / Dhulandi", kind: "major" },
  { month: 11, paksha: "krishna", tithi: 15, hi: "फाल्गुन अमावस्या", en: "Phalguna Amavasya", kind: "moon" },
];

const NATIONAL: Record<string, { hi: string; en: string }> = {
  "01-01": { hi: "अंग्रेज़ी नववर्ष", en: "New Year's Day" },
  "01-26": { hi: "गणतंत्र दिवस", en: "Republic Day" },
  "08-15": { hi: "स्वतंत्रता दिवस", en: "Independence Day" },
  "10-02": { hi: "गांधी जयंती", en: "Gandhi Jayanti" },
  "12-25": { hi: "क्रिसमस", en: "Christmas" },
};

export function festivalsFor(day: DayPanchang): Festival[] {
  const out: Festival[] = [];
  const paksha = day.tithi.paksha;
  const within = day.tithi.num <= 15 ? day.tithi.num : day.tithi.num - 15;
  const monthIndex = LUNAR_MONTHS.findIndex((m) => m.hi === day.lunarMonth.hi);
  const repeatedTithi = day.tithiPrevDayIndex === day.tithiSunriseIndex;

  const parts = (idx: number) => ({
    paksha: (idx < 15 ? "shukla" : "krishna") as "shukla" | "krishna",
    within: idx + 1 <= 15 ? idx + 1 : idx + 1 - 15,
  });

  if (!day.adhikMaas) {
    for (const r of FESTIVAL_RULES) {
      if (r.month !== monthIndex) continue;
      const when = r.time ?? "sunrise";
      const idx =
        when === "sunset"
          ? day.tithiSunsetIndex
          : when === "nishita"
            ? day.tithiNishitaIndex
            : day.tithiSunriseIndex;
      const p = parts(idx);
      if (when === "sunrise" && repeatedTithi) continue;
      if (r.paksha === p.paksha && r.tithi === p.within) {
        out.push({ hi: r.hi, en: r.en, kind: r.kind });
      }
    }
  }

  // Recurring monthly observances
  if (within === 11) out.push({ hi: "एकादशी व्रत", en: "Ekadashi Vrat", kind: "vrat" });
  if (within === 13) out.push({ hi: "प्रदोष व्रत", en: "Pradosh Vrat", kind: "vrat" });
  if (paksha === "krishna" && within === 4)
    out.push({ hi: "संकष्टी चतुर्थी", en: "Sankashti Chaturthi", kind: "vrat" });
  if (paksha === "shukla" && within === 4)
    out.push({ hi: "विनायक चतुर्थी", en: "Vinayak Chaturthi", kind: "vrat" });
  if (paksha === "krishna" && within === 14 && monthIndex !== 10)
    out.push({ hi: "मासिक शिवरात्रि", en: "Masik Shivratri", kind: "vrat" });
  if (day.isPurnima) out.push({ hi: "पूर्णिमा व्रत", en: "Purnima Vrat", kind: "moon" });
  if (day.isAmavasya) out.push({ hi: "अमावस्या", en: "Amavasya", kind: "moon" });

  const sank = sankrantiOn(day);
  if (sank) out.push(sank);

  const nat = NATIONAL[`${String(day.m).padStart(2, "0")}-${String(day.d).padStart(2, "0")}`];
  if (nat) out.push({ ...nat, kind: "national" });

  // dedupe by hi label
  const seen = new Set<string>();
  return out.filter((f) => (seen.has(f.hi) ? false : (seen.add(f.hi), true)));
}

/** True when the Sun enters a new sidereal sign during this local day. */
export function sankrantiOn(day: DayPanchang): Festival | null {
  const start = localMidnightUTC(day.y, day.m, day.d, day.place.tz);
  const end = new Date(start.getTime() + 86400000);
  const s1 = Math.floor(sunSidereal(start) / 30);
  const s2 = Math.floor(sunSidereal(end) / 30);
  if (s1 === s2) return null;
  const rashi = RASHI_NAMES[s2]!;
  if (s2 === 9)
    return { hi: "मकर संक्रांति / उत्तरायण", en: "Makar Sankranti / Uttarayan", kind: "sankranti" };
  if (s2 === 0)
    return { hi: "मेष संक्रांति / बैसाखी", en: "Mesh Sankranti / Baisakhi", kind: "sankranti" };
  return { hi: `${rashi.hi} संक्रांति`, en: `${rashi.en} Sankranti`, kind: "sankranti" };
}

export type DaySummary = {
  key: string;
  d: number;
  m: number;
  y: number;
  weekday: number;
  tithiLabel: Bi;
  paksha: "shukla" | "krishna";
  festivals: Festival[];
  isPurnima: boolean;
  isAmavasya: boolean;
  lunarMonth: Bi;
};

export function monthSummary(
  year: number,
  month: number,
  place: Place = DEFAULT_PLACE,
): DaySummary[] {
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const out: DaySummary[] = [];
  for (let d = 1; d <= days; d++) {
    const day = computeDay(year, month, d, place, false);
    out.push({
      key: ymdKey(year, month, d),
      d,
      m: month,
      y: year,
      weekday: day.weekday,
      tithiLabel: day.tithi.name,
      paksha: day.tithi.paksha,
      festivals: festivalsFor(day),
      isPurnima: day.isPurnima,
      isAmavasya: day.isAmavasya,
      lunarMonth: day.lunarMonth,
    });
  }
  return out;
}

export function yearFestivals(year: number, place: Place = DEFAULT_PLACE) {
  const byMonth: DaySummary[][] = [];
  for (let m = 1; m <= 12; m++) {
    byMonth.push(monthSummary(year, m, place).filter((s) => s.festivals.some((f) => f.kind === "major" || f.kind === "sankranti" || f.kind === "national")));
  }
  return byMonth;
}
