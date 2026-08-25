export type Bi = { hi: string; en: string };

export const TITHI_NAMES: Bi[] = [
  { hi: "प्रतिपदा", en: "Pratipada" },
  { hi: "द्वितीया", en: "Dwitiya" },
  { hi: "तृतीया", en: "Tritiya" },
  { hi: "चतुर्थी", en: "Chaturthi" },
  { hi: "पंचमी", en: "Panchami" },
  { hi: "षष्ठी", en: "Shashthi" },
  { hi: "सप्तमी", en: "Saptami" },
  { hi: "अष्टमी", en: "Ashtami" },
  { hi: "नवमी", en: "Navami" },
  { hi: "दशमी", en: "Dashami" },
  { hi: "एकादशी", en: "Ekadashi" },
  { hi: "द्वादशी", en: "Dwadashi" },
  { hi: "त्रयोदशी", en: "Trayodashi" },
  { hi: "चतुर्दशी", en: "Chaturdashi" },
];

export const PURNIMA: Bi = { hi: "पूर्णिमा", en: "Purnima" };
export const AMAVASYA: Bi = { hi: "अमावस्या", en: "Amavasya" };

export const PAKSHA: Record<"shukla" | "krishna", Bi> = {
  shukla: { hi: "शुक्ल पक्ष", en: "Shukla Paksha" },
  krishna: { hi: "कृष्ण पक्ष", en: "Krishna Paksha" },
};

export const NAKSHATRA_NAMES: Bi[] = [
  { hi: "अश्विनी", en: "Ashwini" },
  { hi: "भरणी", en: "Bharani" },
  { hi: "कृत्तिका", en: "Krittika" },
  { hi: "रोहिणी", en: "Rohini" },
  { hi: "मृगशिरा", en: "Mrigashira" },
  { hi: "आर्द्रा", en: "Ardra" },
  { hi: "पुनर्वसु", en: "Punarvasu" },
  { hi: "पुष्य", en: "Pushya" },
  { hi: "आश्लेषा", en: "Ashlesha" },
  { hi: "मघा", en: "Magha" },
  { hi: "पूर्वा फाल्गुनी", en: "Purva Phalguni" },
  { hi: "उत्तरा फाल्गुनी", en: "Uttara Phalguni" },
  { hi: "हस्त", en: "Hasta" },
  { hi: "चित्रा", en: "Chitra" },
  { hi: "स्वाति", en: "Swati" },
  { hi: "विशाखा", en: "Vishakha" },
  { hi: "अनुराधा", en: "Anuradha" },
  { hi: "ज्येष्ठा", en: "Jyeshtha" },
  { hi: "मूल", en: "Mula" },
  { hi: "पूर्वाषाढ़ा", en: "Purva Ashadha" },
  { hi: "उत्तराषाढ़ा", en: "Uttara Ashadha" },
  { hi: "श्रवण", en: "Shravana" },
  { hi: "धनिष्ठा", en: "Dhanishtha" },
  { hi: "शतभिषा", en: "Shatabhisha" },
  { hi: "पूर्वा भाद्रपद", en: "Purva Bhadrapada" },
  { hi: "उत्तरा भाद्रपद", en: "Uttara Bhadrapada" },
  { hi: "रेवती", en: "Revati" },
];

export const YOGA_NAMES: Bi[] = [
  { hi: "विष्कम्भ", en: "Vishkambha" },
  { hi: "प्रीति", en: "Priti" },
  { hi: "आयुष्मान", en: "Ayushman" },
  { hi: "सौभाग्य", en: "Saubhagya" },
  { hi: "शोभन", en: "Shobhana" },
  { hi: "अतिगण्ड", en: "Atiganda" },
  { hi: "सुकर्मा", en: "Sukarma" },
  { hi: "धृति", en: "Dhriti" },
  { hi: "शूल", en: "Shula" },
  { hi: "गण्ड", en: "Ganda" },
  { hi: "वृद्धि", en: "Vriddhi" },
  { hi: "ध्रुव", en: "Dhruva" },
  { hi: "व्याघात", en: "Vyaghata" },
  { hi: "हर्षण", en: "Harshana" },
  { hi: "वज्र", en: "Vajra" },
  { hi: "सिद्धि", en: "Siddhi" },
  { hi: "व्यतिपात", en: "Vyatipata" },
  { hi: "वरीयान", en: "Variyana" },
  { hi: "परिघ", en: "Parigha" },
  { hi: "शिव", en: "Shiva" },
  { hi: "सिद्ध", en: "Siddha" },
  { hi: "साध्य", en: "Sadhya" },
  { hi: "शुभ", en: "Shubha" },
  { hi: "शुक्ल", en: "Shukla" },
  { hi: "ब्रह्म", en: "Brahma" },
  { hi: "ऐन्द्र", en: "Aindra" },
  { hi: "वैधृति", en: "Vaidhriti" },
];

export const KARANA_NAMES: Bi[] = [
  { hi: "बव", en: "Bava" },
  { hi: "बालव", en: "Balava" },
  { hi: "कौलव", en: "Kaulava" },
  { hi: "तैतिल", en: "Taitila" },
  { hi: "गर", en: "Gara" },
  { hi: "वणिज", en: "Vanija" },
  { hi: "विष्टि", en: "Vishti (Bhadra)" },
];
export const KARANA_FIXED: Record<number, Bi> = {
  0: { hi: "किंस्तुघ्न", en: "Kimstughna" },
  57: { hi: "शकुनि", en: "Shakuni" },
  58: { hi: "चतुष्पद", en: "Chatushpada" },
  59: { hi: "नाग", en: "Naga" },
};

/** Amanta lunar months, index 0 = Chaitra */
export const LUNAR_MONTHS: Bi[] = [
  { hi: "चैत्र", en: "Chaitra" },
  { hi: "वैशाख", en: "Vaishakha" },
  { hi: "ज्येष्ठ", en: "Jyeshtha" },
  { hi: "आषाढ़", en: "Ashadha" },
  { hi: "श्रावण", en: "Shravana" },
  { hi: "भाद्रपद", en: "Bhadrapada" },
  { hi: "आश्विन", en: "Ashwin" },
  { hi: "कार्तिक", en: "Kartik" },
  { hi: "मार्गशीर्ष", en: "Margashirsha" },
  { hi: "पौष", en: "Paush" },
  { hi: "माघ", en: "Magha" },
  { hi: "फाल्गुन", en: "Phalguna" },
];

export const RASHI_NAMES: Bi[] = [
  { hi: "मेष", en: "Aries" },
  { hi: "वृषभ", en: "Taurus" },
  { hi: "मिथुन", en: "Gemini" },
  { hi: "कर्क", en: "Cancer" },
  { hi: "सिंह", en: "Leo" },
  { hi: "कन्या", en: "Virgo" },
  { hi: "तुला", en: "Libra" },
  { hi: "वृश्चिक", en: "Scorpio" },
  { hi: "धनु", en: "Sagittarius" },
  { hi: "मकर", en: "Capricorn" },
  { hi: "कुम्भ", en: "Aquarius" },
  { hi: "मीन", en: "Pisces" },
];

export const WEEKDAYS: Bi[] = [
  { hi: "रविवार", en: "Sunday" },
  { hi: "सोमवार", en: "Monday" },
  { hi: "मंगलवार", en: "Tuesday" },
  { hi: "बुधवार", en: "Wednesday" },
  { hi: "गुरुवार", en: "Thursday" },
  { hi: "शुक्रवार", en: "Friday" },
  { hi: "शनिवार", en: "Saturday" },
];

export const GREGORIAN_MONTHS: Bi[] = [
  { hi: "जनवरी", en: "January" },
  { hi: "फरवरी", en: "February" },
  { hi: "मार्च", en: "March" },
  { hi: "अप्रैल", en: "April" },
  { hi: "मई", en: "May" },
  { hi: "जून", en: "June" },
  { hi: "जुलाई", en: "July" },
  { hi: "अगस्त", en: "August" },
  { hi: "सितम्बर", en: "September" },
  { hi: "अक्टूबर", en: "October" },
  { hi: "नवम्बर", en: "November" },
  { hi: "दिसम्बर", en: "December" },
];

export const HIJRI_MONTHS: Bi[] = [
  { hi: "मुहर्रम", en: "Muharram" },
  { hi: "सफ़र", en: "Safar" },
  { hi: "रबीउल अव्वल", en: "Rabi' al-Awwal" },
  { hi: "रबीउस सानी", en: "Rabi' al-Thani" },
  { hi: "जमादिउल अव्वल", en: "Jumada al-Awwal" },
  { hi: "जमादिउस सानी", en: "Jumada al-Thani" },
  { hi: "रजब", en: "Rajab" },
  { hi: "शाबान", en: "Sha'ban" },
  { hi: "रमज़ान", en: "Ramadan" },
  { hi: "शव्वाल", en: "Shawwal" },
  { hi: "ज़िलक़ाद", en: "Dhu al-Qi'dah" },
  { hi: "ज़िलहिज्ज", en: "Dhu al-Hijjah" },
];

export const CHOGHADIYA_NAMES: Record<string, Bi & { good: "shubh" | "ashubh" | "madhyam" }> = {
  Udveg: { hi: "उद्वेग", en: "Udveg", good: "ashubh" },
  Char: { hi: "चर", en: "Char", good: "madhyam" },
  Labh: { hi: "लाभ", en: "Labh", good: "shubh" },
  Amrit: { hi: "अमृत", en: "Amrit", good: "shubh" },
  Kaal: { hi: "काल", en: "Kaal", good: "ashubh" },
  Shubh: { hi: "शुभ", en: "Shubh", good: "shubh" },
  Rog: { hi: "रोग", en: "Rog", good: "ashubh" },
};

// Day choghadiya order per weekday (Sun..Sat)
export const DAY_CHOGHADIYA: string[][] = [
  ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"],
  ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit"],
  ["Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog"],
  ["Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh"],
  ["Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh"],
  ["Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char"],
  ["Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal"],
];

export const NIGHT_CHOGHADIYA: string[][] = [
  ["Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh"],
  ["Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char"],
  ["Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal"],
  ["Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg"],
  ["Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit"],
  ["Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog"],
  ["Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh"],
];

// Rahu Kaal part index (1-based of 8) per weekday Sun..Sat
export const RAHU_PART = [8, 2, 7, 5, 6, 4, 3];
export const YAMA_PART = [5, 4, 3, 2, 1, 7, 6];
export const GULIKA_PART = [7, 6, 5, 4, 3, 2, 1];

export const MIN_YEAR = 1926;
export const MAX_YEAR = 2126;
