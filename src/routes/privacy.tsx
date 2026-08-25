import { createFileRoute } from "@tanstack/react-router";
import { AppShell, DeityBanner } from "@/components/AppShell";
import { GlitterCard, SectionTitle } from "@/components/GlitterUI";
import { useApp } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "गोपनीयता नीति | Privacy Policy — Divya Panchang" },
      {
        name: "description",
        content:
          "दिव्य पंचांग की गोपनीयता नीति — कोई खाता नहीं, कोई डेटा सर्वर पर नहीं भेजा जाता, जन्म विवरण केवल आपके डिवाइस पर गणना हेतु उपयोग होता है।",
      },
      { property: "og:title", content: "Privacy Policy — Divya Panchang" },
      {
        property: "og:description",
        content:
          "No accounts, no tracking, no data collection. Birth details are used only on your device to compute panchang and kundli.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

const SECTIONS: { hi: [string, string[]]; en: [string, string[]] }[] = [
  {
    hi: [
      "1. हम कौन-सा डेटा एकत्र करते हैं",
      [
        "हम कोई व्यक्तिगत डेटा एकत्र नहीं करते। कोई लॉगिन, खाता या रजिस्ट्रेशन आवश्यक नहीं है।",
        "कुंडली के लिए दर्ज जन्म तिथि, समय एवं स्थान केवल आपके डिवाइस (ब्राउज़र) में ही गणना हेतु उपयोग होते हैं और कहीं भेजे या संग्रहित नहीं किए जाते।",
        "हम आपका नाम, ईमेल, फ़ोन नंबर, संपर्क सूची, फ़ोटो या फ़ाइलें नहीं पढ़ते।",
      ],
    ],
    en: [
      "1. What data we collect",
      [
        "We collect no personal data. No login, account or registration is required.",
        "Birth date, time and place entered for Kundli are used only on your device to compute results; they are never uploaded or stored on any server.",
        "We do not read your name, email, phone number, contacts, photos or files.",
      ],
    ],
  },
  {
    hi: [
      "2. अनुमतियाँ (Permissions)",
      [
        "ऐप को किसी संवेदनशील अनुमति (कैमरा, माइक, संपर्क, SMS) की आवश्यकता नहीं है।",
        "स्थान (location) आप स्वयं शहर सूची से चुनते हैं — GPS का उपयोग नहीं किया जाता।",
      ],
    ],
    en: [
      "2. Permissions",
      [
        "The app requires no sensitive permissions (camera, microphone, contacts, SMS).",
        "Location is chosen manually from the city list — GPS is not accessed.",
      ],
    ],
  },
  {
    hi: [
      "3. संग्रहण (Storage)",
      [
        "भाषा एवं चुने हुए शहर जैसी पसंद आपके ब्राउज़र के local storage में सहेजी जा सकती है, जिससे अगली बार वही सेटिंग मिले।",
        "यह डेटा आपके डिवाइस पर ही रहता है; ऐप हटाने या ब्राउज़र डेटा साफ़ करने पर मिट जाता है।",
      ],
    ],
    en: [
      "3. Storage",
      [
        "Preferences such as language and selected city may be saved in your browser's local storage so your settings persist.",
        "This stays on your device and is erased when you uninstall the app or clear browser data.",
      ],
    ],
  },
  {
    hi: [
      "4. तृतीय पक्ष एवं विज्ञापन",
      [
        "कोई विज्ञापन नेटवर्क, कोई ट्रैकिंग SDK, कोई एनालिटिक्स प्रोफ़ाइलिंग नहीं।",
        "हम किसी को आपका डेटा बेचते या साझा नहीं करते, क्योंकि हमारे पास आपका डेटा ही नहीं होता।",
      ],
    ],
    en: [
      "4. Third parties & ads",
      [
        "No ad networks, no tracking SDKs, no behavioural profiling.",
        "We do not sell or share your data — because we never hold it.",
      ],
    ],
  },
  {
    hi: [
      "5. बच्चों की गोपनीयता",
      ["ऐप सभी आयु वर्ग के लिए सुरक्षित है और बच्चों से जानबूझकर कोई डेटा एकत्र नहीं करता।"],
    ],
    en: [
      "5. Children's privacy",
      ["The app is safe for all ages and knowingly collects no data from children."],
    ],
  },
  {
    hi: [
      "6. धार्मिक/ज्योतिषीय जानकारी हेतु सूचना",
      [
        "पंचांग एवं कुंडली की गणना आधुनिक खगोलीय एल्गोरिद्म (लाहिड़ी अयनांश, दृक् गणित) पर आधारित है और सामान्य जानकारी हेतु है।",
        "स्थानीय परंपरा या मठ-पंचांग के अनुसार तिथि/त्योहार में सूक्ष्म अंतर संभव है। महत्वपूर्ण मुहूर्त हेतु विद्वान पंडित से परामर्श करें।",
      ],
    ],
    en: [
      "6. Note on religious / astrological content",
      [
        "Panchang and Kundli are computed with modern astronomical algorithms (Lahiri ayanamsa, Drik Ganita) and are provided for general information.",
        "Minor differences from local traditions or regional panchangs are possible. Consult a qualified pandit for important muhurats.",
      ],
    ],
  },
  {
    hi: [
      "7. नीति में बदलाव व संपर्क",
      [
        "नीति बदलने पर यह पृष्ठ अद्यतन किया जाएगा।",
        "प्रश्न या अनुरोध हेतु संपर्क: divyapanchang.support@gmail.com",
      ],
    ],
    en: [
      "7. Changes & contact",
      [
        "Any change to this policy will be published on this page.",
        "For questions or requests, contact: divyapanchang.support@gmail.com",
      ],
    ],
  },
];

function Privacy() {
  const { lang } = useApp();
  const hi = lang === "hi";

  return (
    <AppShell>
      <DeityBanner />
      <SectionTitle>{hi ? "गोपनीयता नीति" : "Privacy Policy"}</SectionTitle>

      <GlitterCard title={hi ? "संक्षेप में" : "In short"}>
        <p className="text-sm">
          {hi
            ? "दिव्य पंचांग कोई व्यक्तिगत डेटा एकत्र, संग्रहित या साझा नहीं करता। सभी गणनाएँ आपके डिवाइस पर होती हैं। अंतिम अद्यतन: 19 अगस्त 2026।"
            : "Divya Panchang collects, stores and shares no personal data. All calculations happen on your device. Last updated: 19 August 2026."}
        </p>
      </GlitterCard>

      <div className="mt-4 space-y-4">
        {SECTIONS.map((s, i) => {
          const [title, points] = hi ? s.hi : s.en;
          return (
            <GlitterCard key={i} title={title}>
              <ul className="list-inside list-disc space-y-1 text-sm">
                {points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </GlitterCard>
          );
        })}
      </div>
    </AppShell>
  );
}
