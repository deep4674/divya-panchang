import { GlitterCard, Pill } from "@/components/GlitterUI";
import { useApp } from "@/lib/i18n";
import {
  CHOGHADIYA_NAMES,
  DAY_CHOGHADIYA,
  GREGORIAN_MONTHS,
  NIGHT_CHOGHADIYA,
  WEEKDAYS,
} from "@/lib/panchang/constants";

function tone(good: string) {
  return good === "shubh" ? "emerald" : good === "madhyam" ? "saffron" : "magenta";
}

function Row({ keys }: { keys: string[] }) {
  const { t } = useApp();
  return (
    <div className="flex flex-wrap gap-1">
      {keys.slice(0, 8).map((k, i) => {
        const c = CHOGHADIYA_NAMES[k]!;
        return (
          <Pill key={`${k}-${i}`} tone={tone(c.good) as "emerald" | "saffron" | "magenta"}>
            {t(c)}
          </Pill>
        );
      })}
    </div>
  );
}

/** Month-wise choghadiya sequence reference (order repeats by weekday). */
export function ChoghadiyaSummary({ year, month }: { year: number; month?: number }) {
  const { lang, t } = useApp();
  const hi = lang === "hi";
  const title = hi
    ? `चौघड़िया क्रम ${month ? `· ${t(GREGORIAN_MONTHS[month - 1]!)} ` : ""}${year}`
    : `Choghadiya order ${month ? `· ${t(GREGORIAN_MONTHS[month - 1]!)} ` : ""}${year}`;

  return (
    <GlitterCard title={title}>
      <p className="mb-2 text-xs text-muted-foreground">
        {hi
          ? "प्रत्येक माह के हर दिन का चौघड़िया क्रम वार के अनुसार होता है — दिन का क्रम सूर्योदय से सूर्यास्त तक 8 भागों में, रात का सूर्यास्त से अगले सूर्योदय तक।"
          : "In every month the choghadiya order depends on the weekday — 8 day parts from sunrise to sunset and 8 night parts from sunset to next sunrise."}
      </p>
      <div className="space-y-3">
        {WEEKDAYS.map((w, i) => (
          <div key={w.en} className="border-b border-primary/25 pb-2 last:border-b-0">
            <p className="glitter-text text-sm font-bold">{t(w)}</p>
            <p className="mt-1 text-xs text-muted-foreground">{hi ? "दिन" : "Day"}</p>
            <Row keys={DAY_CHOGHADIYA[i]!} />
            <p className="mt-1 text-xs text-muted-foreground">{hi ? "रात" : "Night"}</p>
            <Row keys={NIGHT_CHOGHADIYA[i]!} />
          </div>
        ))}
      </div>
    </GlitterCard>
  );
}
