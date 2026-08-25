import { useApp } from "@/lib/i18n";
import type { Kundli } from "@/lib/panchang/kundli";

const NORTH_POS: [number, number][] = [
  [150, 62],
  [78, 36],
  [36, 78],
  [80, 150],
  [36, 222],
  [78, 264],
  [150, 238],
  [222, 264],
  [264, 222],
  [220, 150],
  [264, 78],
  [222, 36],
];

const SOUTH_GRID: (number | null)[] = [
  11, 0, 1, 2,
  10, null, null, 3,
  9, null, null, 4,
  8, 7, 6, 5,
];

function shortName(en: string) {
  return en.slice(0, 2);
}

/** North Indian (diamond) and South Indian (grid) chart renderers. */
export function KundliChart({ kundli, style }: { kundli: Kundli; style: "north" | "south" }) {
  const { t, lang } = useApp();
  const lagnaSign = Math.floor(kundli.lagna.lon / 30);

  const planetsIn = (signIndex: number) =>
    kundli.positions.filter((p) => Math.floor(p.lon / 30) === signIndex);

  if (style === "north") {
    return (
      <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-md" role="img"
        aria-label={lang === "hi" ? "उत्तर भारतीय जन्म कुंडली चक्र" : "North Indian birth chart"}>
        <rect x="4" y="4" width="292" height="292" rx="8" className="fill-secondary/40 stroke-primary" strokeWidth="2" />
        <path d="M4 4 L296 296 M296 4 L4 296 M150 4 L296 150 L150 296 L4 150 Z"
          className="stroke-primary/80" strokeWidth="1.5" fill="none" />
        {kundli.houses.map((h, i) => {
          const [x, y] = NORTH_POS[i]!;
          const ps = planetsIn((lagnaSign + i) % 12);
          return (
            <g key={h.house}>
              <text x={x} y={y - 8} textAnchor="middle" className="fill-primary" fontSize="11" fontWeight="700">
                {h.house}. {shortName(h.rashi.en)}
              </text>
              {ps.slice(0, 4).map((p, j) => (
                <text key={p.name.en} x={x} y={y + 6 + j * 11} textAnchor="middle"
                  className="fill-foreground" fontSize="10">
                  {shortName(p.name.en)}
                  {p.retro ? "ᴿ" : ""} {p.degInRashi.toFixed(0)}°
                </text>
              ))}
            </g>
          );
        })}
        <text x="150" y="155" textAnchor="middle" className="fill-primary" fontSize="10" fontWeight="700">
          {lang === "hi" ? "लग्न" : "Lagna"} {t(kundli.lagna.rashi)}
        </text>
      </svg>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-1">
      {SOUTH_GRID.map((sign, i) => {
        if (sign === null) {
          return i === 5 ? (
            <div key={i} className="col-span-2 row-span-2 flex flex-col items-center justify-center rounded-lg border border-primary/50 bg-secondary/40 p-2 text-center">
              <span className="glitter-text text-sm font-bold">{lang === "hi" ? "लग्न" : "Lagna"}</span>
              <span className="text-xs text-primary">{t(kundli.lagna.rashi)}</span>
              <span className="text-xs text-muted-foreground">
                {kundli.lagna.degInRashi.toFixed(1)}°
              </span>
            </div>
          ) : null;
        }
        const house = ((sign - Math.floor(kundli.lagna.lon / 30) + 12) % 12) + 1;
        const ps = planetsIn(sign);
        return (
          <div key={i} className="min-h-[70px] rounded-lg border border-primary/50 bg-secondary/30 p-1">
            <p className="text-[10px] font-bold text-primary">
              {house}. {t(kundli.houses[house - 1]!.rashi)}
            </p>
            <p className="text-[10px] text-foreground">
              {ps.length ? ps.map((p) => `${shortName(p.name.en)}${p.retro ? "ᴿ" : ""}`).join(" ") : "—"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
