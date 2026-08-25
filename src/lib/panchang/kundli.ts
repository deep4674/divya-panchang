import * as A from "astronomy-engine";
import { NAKSHATRA_NAMES, RASHI_NAMES, type Bi } from "./constants";
import { ayanamsa, moonSidereal, planetSidereal, sunSidereal } from "./core";

const D2R = Math.PI / 180;
const norm360 = (x: number) => ((x % 360) + 360) % 360;

export type PlanetPos = {
  name: Bi;
  lon: number;
  rashi: Bi;
  degInRashi: number;
  nakshatra: Bi;
  pada: number;
  retro: boolean;
};

const PLANETS: { body: A.Body; name: Bi }[] = [
  { body: A.Body.Sun, name: { hi: "सूर्य", en: "Sun" } },
  { body: A.Body.Moon, name: { hi: "चन्द्र", en: "Moon" } },
  { body: A.Body.Mars, name: { hi: "मंगल", en: "Mars" } },
  { body: A.Body.Mercury, name: { hi: "बुध", en: "Mercury" } },
  { body: A.Body.Jupiter, name: { hi: "गुरु", en: "Jupiter" } },
  { body: A.Body.Venus, name: { hi: "शुक्र", en: "Venus" } },
  { body: A.Body.Saturn, name: { hi: "शनि", en: "Saturn" } },
];

function decorate(name: Bi, lon: number, retro: boolean): PlanetPos {
  const rIndex = Math.floor(lon / 30);
  const nIndex = Math.floor(lon / (360 / 27));
  return {
    name,
    lon,
    rashi: RASHI_NAMES[rIndex]!,
    degInRashi: lon - rIndex * 30,
    nakshatra: NAKSHATRA_NAMES[nIndex]!,
    pada: Math.floor((lon % (360 / 27)) / (360 / 108)) + 1,
    retro,
  };
}

/** Mean lunar node (Rahu) sidereal longitude. */
function rahuLon(date: Date): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const t = (jd - 2451545.0) / 36525;
  const mean = 125.0445479 - 1934.1362891 * t + 0.0020754 * t * t;
  return norm360(mean - ayanamsa(date));
}

export function ascendant(date: Date, lat: number, lon: number): number {
  const gst = A.SiderealTime(date); // hours
  const ramc = norm360((gst + lon / 15) * 15);
  const eps = 23.439291 * D2R;
  const phi = lat * D2R;
  const r = ramc * D2R;
  const asc =
    Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / D2R;
  return norm360(norm360(asc) - ayanamsa(date));
}

export type Kundli = {
  positions: PlanetPos[];
  lagna: PlanetPos;
  houses: { house: number; rashi: Bi; planets: PlanetPos[] }[];
};

export function computeKundli(date: Date, lat: number, lon: number): Kundli {
  const positions: PlanetPos[] = PLANETS.map((p) => {
    const l =
      p.body === A.Body.Sun
        ? sunSidereal(date)
        : p.body === A.Body.Moon
          ? moonSidereal(date)
          : planetSidereal(p.body, date);
    let retro = false;
    if (p.body !== A.Body.Sun && p.body !== A.Body.Moon) {
      const before = planetSidereal(p.body, new Date(date.getTime() - 86400000));
      retro = norm360(l - before) > 180;
    }
    return decorate(p.name, l, retro);
  });

  const rl = rahuLon(date);
  positions.push(decorate({ hi: "राहु", en: "Rahu" }, rl, true));
  positions.push(decorate({ hi: "केतु", en: "Ketu" }, norm360(rl + 180), true));

  const ascLon = ascendant(date, lat, lon);
  const lagna = decorate({ hi: "लग्न", en: "Ascendant" }, ascLon, false);
  const lagnaSign = Math.floor(ascLon / 30);

  const houses = Array.from({ length: 12 }, (_, i) => {
    const signIndex = (lagnaSign + i) % 12;
    return {
      house: i + 1,
      rashi: RASHI_NAMES[signIndex]!,
      planets: positions.filter((p) => Math.floor(p.lon / 30) === signIndex),
    };
  });

  return { positions, lagna, houses };
}
