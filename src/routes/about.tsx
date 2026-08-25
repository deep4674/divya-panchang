import { createFileRoute } from "@tanstack/react-router";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { GlitterCard, Pill, SectionTitle } from "@/components/GlitterUI";
import { UI, useApp } from "@/lib/i18n";
import { MAX_YEAR, MIN_YEAR } from "@/lib/panchang/constants";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "परिचय व गणना विधि | About Divya Panchang" },
      {
        name: "description",
        content:
          "दिव्य पंचांग की गणना विधि — लाहिड़ी अयनांश, दृक् गणित सूर्य-चंद्र स्थिति, अमांत मास पद्धति, तथा 1926–2126 तक की सम्पूर्ण जानकारी।",
      },
      { property: "og:title", content: "About Divya Panchang — Method & Accuracy" },
      {
        property: "og:description",
        content:
          "How Divya Panchang computes tithi, nakshatra, sunrise and eclipses using Lahiri ayanamsa and modern astronomical algorithms.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { lang, t } = useApp();
  const hi = lang === "hi";

  return (
    <AppShell>
      <DeityBanner />
      <SectionTitle>{t(UI.about)}</SectionTitle>

      <GlitterCard title={hi ? "यह ऐप क्या देता है" : "What this app gives you"}>
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li>{hi ? `${MIN_YEAR} से ${MAX_YEAR} तक — पूरे 200 वर्ष का पंचांग` : `Full panchang for ${MIN_YEAR}–${MAX_YEAR} (200 years)`}</li>
          <li>{hi ? "तिथि, नक्षत्र, योग, करण एवं उनका समाप्ति समय" : "Tithi, nakshatra, yoga, karana with end times"}</li>
          <li>{hi ? "सूर्योदय, सूर्यास्त, चंद्रोदय, चंद्रास्त, दिनमान" : "Sunrise, sunset, moonrise, moonset, day length"}</li>
          <li>{hi ? "विक्रम संवत, शक संवत, ईसवी सन् एवं हिजरी सन्" : "Vikram Samvat, Shaka Samvat, Gregorian and Hijri dates"}</li>
          <li>{hi ? "त्योहार, व्रत, अमावस्या, पूर्णिमा, एकादशी, संक्रांति" : "Festivals, vrat, amavasya, purnima, ekadashi, sankranti"}</li>
          <li>{hi ? "सूर्य एवं चंद्र ग्रहण — किस महीने में कौन सा ग्रहण" : "Solar and lunar eclipses, month-wise"}</li>
          <li>{hi ? "दिन-रात का चौघड़िया, राहु काल, अभिजित मुहूर्त" : "Day/night choghadiya, Rahu Kaal, Abhijit Muhurat"}</li>
          <li>{hi ? "जन्म कुंडली — लग्न, ग्रह, राशि, नक्षत्र, पद" : "Birth kundli — lagna, planets, rashi, nakshatra, pada"}</li>
        </ul>
      </GlitterCard>

      <GlitterCard title={hi ? "गणना विधि (शुद्धता)" : "Computation method (accuracy)"}>
        <p className="text-sm">
          {hi
            ? "सभी गणनाएँ दृक् गणित (drik ganita) पर आधारित हैं। सूर्य एवं चंद्र की स्थिति VSOP87/ELP आधारित खगोलीय एल्गोरिद्म से निकाली जाती है, और सायन देशांतर से लाहिड़ी (चित्रपक्ष) अयनांश घटाकर निरयन (सिद्धांतिक) देशांतर प्राप्त किया जाता है।"
            : "Every value is computed with drik ganita. Sun and Moon positions come from VSOP87/ELP-class astronomical algorithms; sidereal longitudes are obtained by subtracting the Lahiri (Chitrapaksha) ayanamsa from apparent tropical longitudes."}
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          <li>{hi ? "तिथि = (चंद्र − सूर्य) देशांतर ÷ 12°" : "Tithi = (Moon − Sun) longitude ÷ 12°"}</li>
          <li>{hi ? "नक्षत्र = निरयन चंद्र देशांतर ÷ 13°20′" : "Nakshatra = sidereal Moon longitude ÷ 13°20′"}</li>
          <li>{hi ? "योग = (सूर्य + चंद्र) ÷ 13°20′, करण = तिथि का अर्ध" : "Yoga = (Sun + Moon) ÷ 13°20′, Karana = half a tithi"}</li>
          <li>{hi ? "चंद्र मास अमांत पद्धति से, अधिक मास स्वतः पहचाना जाता है" : "Amanta lunar months, with Adhik Maas detected automatically"}</li>
          <li>{hi ? "त्योहार सूर्योदय/प्रदोष/निशीथ काल की तिथि के अनुसार" : "Festivals resolved by tithi at sunrise, pradosh or nishita as tradition requires"}</li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill tone="emerald">{hi ? "स्थान अनुसार समय" : "Location-aware timings"}</Pill>
          <Pill tone="saffron">{hi ? "ऑफ़लाइन गणना" : "Offline computation"}</Pill>
          <Pill tone="magenta">{hi ? "इंस्टॉल करने योग्य PWA" : "Installable PWA"}</Pill>
        </div>
      </GlitterCard>

      <GlitterCard title={hi ? "ऐप इंस्टॉल कैसे करें" : "How to install the app"}>
        <p className="text-sm">
          {hi
            ? "ब्राउज़र मेन्यू में 'Add to Home screen' / 'Install app' चुनें। ऐप इंस्टॉल होने के बाद बिना इंटरनेट भी पूरा पंचांग काम करता है, क्योंकि सारी गणना आपके फ़ोन में ही होती है।"
            : "Choose 'Add to Home screen' / 'Install app' from the browser menu. Once installed the panchang works without internet, because all computation happens on your device."}
        </p>
      </GlitterCard>
    </AppShell>
  );
}
