import * as A from "astronomy-engine";
import {
  AMAVASYA,
  DAY_CHOGHADIYA,
  GULIKA_PART,
  KARANA_FIXED,
  KARANA_NAMES,
  LUNAR_MONTHS,
  NAKSHATRA_NAMES,
  NIGHT_CHOGHADIYA,
  PURNIMA,
  RAHU_PART,
  RASHI_NAMES,
  TITHI_NAMES,
  WEEKDAYS,
  YAMA_PART,
  YOGA_NAMES,
  type Bi,
} from "./constants";
import { gregorianToJdn, jdnToHijri } from "./hijri";

export const CITIES = [
  { id: "delhi", hi: "नई दिल्ली", en: "New Delhi", lat: 28.6139, lon: 77.209, tz: 330 },
  { id: "mumbai", hi: "मुंबई", en: "Mumbai", lat: 19.076, lon: 72.8777, tz: 330 },
  { id: "kolkata", hi: "कोलकाता", en: "Kolkata", lat: 22.5726, lon: 88.3639, tz: 330 },
  { id: "chennai", hi: "चेन्नई", en: "Chennai", lat: 13.0827, lon: 80.2707, tz: 330 },
  { id: "bengaluru", hi: "बेंगलुरु", en: "Bengaluru", lat: 12.9716, lon: 77.5946, tz: 330 },
  { id: "hyderabad", hi: "हैदराबाद", en: "Hyderabad", lat: 17.385, lon: 78.4867, tz: 330 },
  { id: "pune", hi: "पुणे", en: "Pune", lat: 18.5204, lon: 73.8567, tz: 330 },
  { id: "ahmedabad", hi: "अहमदाबाद", en: "Ahmedabad", lat: 23.0225, lon: 72.5714, tz: 330 },
  { id: "surat", hi: "सूरत", en: "Surat", lat: 21.1702, lon: 72.8311, tz: 330 },
  { id: "vadodara", hi: "वडोदरा", en: "Vadodara", lat: 22.3072, lon: 73.1812, tz: 330 },
  { id: "rajkot", hi: "राजकोट", en: "Rajkot", lat: 22.3039, lon: 70.8022, tz: 330 },
  { id: "bhavnagar", hi: "भावनगर", en: "Bhavnagar", lat: 21.7645, lon: 72.1519, tz: 330 },
  { id: "jamnagar", hi: "जामनगर", en: "Jamnagar", lat: 22.4707, lon: 70.0577, tz: 330 },
  { id: "gandhinagar", hi: "गांधीनगर", en: "Gandhinagar", lat: 23.2156, lon: 72.6369, tz: 330 },
  { id: "dwarka", hi: "द्वारका", en: "Dwarka", lat: 22.2394, lon: 68.9678, tz: 330 },
  { id: "somnath", hi: "सोमनाथ", en: "Somnath", lat: 20.888, lon: 70.401, tz: 330 },
  { id: "indore", hi: "इंदौर", en: "Indore", lat: 22.7196, lon: 75.8577, tz: 330 },
  { id: "bhopal", hi: "भोपाल", en: "Bhopal", lat: 23.2599, lon: 77.4126, tz: 330 },
  { id: "ujjain", hi: "उज्जैन", en: "Ujjain", lat: 23.1793, lon: 75.7849, tz: 330 },
  { id: "jabalpur", hi: "जबलपुर", en: "Jabalpur", lat: 23.1815, lon: 79.9864, tz: 330 },
  { id: "gwalior", hi: "ग्वालियर", en: "Gwalior", lat: 26.2183, lon: 78.1828, tz: 330 },
  { id: "sagar", hi: "सागर", en: "Sagar", lat: 23.8388, lon: 78.7378, tz: 330 },
  { id: "satna", hi: "सतना", en: "Satna", lat: 24.5854, lon: 80.8322, tz: 330 },
  { id: "rewa", hi: "रीवा", en: "Rewa", lat: 24.5373, lon: 81.3042, tz: 330 },
  { id: "ratlam", hi: "रतलाम", en: "Ratlam", lat: 23.3315, lon: 75.0367, tz: 330 },
  { id: "dewas", hi: "देवास", en: "Dewas", lat: 22.9676, lon: 76.0534, tz: 330 },
  { id: "khandwa", hi: "खंडवा", en: "Khandwa", lat: 21.8257, lon: 76.3521, tz: 330 },
  { id: "chhindwara", hi: "छिंदवाड़ा", en: "Chhindwara", lat: 22.0574, lon: 78.9382, tz: 330 },
  { id: "omkareshwar", hi: "ओंकारेश्वर", en: "Omkareshwar", lat: 22.2453, lon: 76.1509, tz: 330 },
  { id: "maheshwar", hi: "महेश्वर", en: "Maheshwar", lat: 22.1762, lon: 75.5883, tz: 330 },
  { id: "jaipur", hi: "जयपुर", en: "Jaipur", lat: 26.9124, lon: 75.7873, tz: 330 },
  { id: "jodhpur", hi: "जोधपुर", en: "Jodhpur", lat: 26.2389, lon: 73.0243, tz: 330 },
  { id: "udaipur", hi: "उदयपुर", en: "Udaipur", lat: 24.5854, lon: 73.7125, tz: 330 },
  { id: "kota", hi: "कोटा", en: "Kota", lat: 25.2138, lon: 75.8648, tz: 330 },
  { id: "ajmer", hi: "अजमेर", en: "Ajmer", lat: 26.4499, lon: 74.6399, tz: 330 },
  { id: "bikaner", hi: "बीकानेर", en: "Bikaner", lat: 28.0229, lon: 73.3119, tz: 330 },
  { id: "alwar", hi: "अलवर", en: "Alwar", lat: 27.553, lon: 76.6346, tz: 330 },
  { id: "bharatpur", hi: "भरतपुर", en: "Bharatpur", lat: 27.2173, lon: 77.4901, tz: 330 },
  { id: "pushkar", hi: "पुष्कर", en: "Pushkar", lat: 26.4899, lon: 74.5511, tz: 330 },
  { id: "lucknow", hi: "लखनऊ", en: "Lucknow", lat: 26.8467, lon: 80.9462, tz: 330 },
  { id: "kanpur", hi: "कानपुर", en: "Kanpur", lat: 26.4499, lon: 80.3319, tz: 330 },
  { id: "varanasi", hi: "वाराणसी", en: "Varanasi", lat: 25.3176, lon: 82.9739, tz: 330 },
  { id: "prayagraj", hi: "प्रयागराज", en: "Prayagraj", lat: 25.4358, lon: 81.8463, tz: 330 },
  { id: "agra", hi: "आगरा", en: "Agra", lat: 27.1767, lon: 78.0081, tz: 330 },
  { id: "mathura", hi: "मथुरा", en: "Mathura", lat: 27.4924, lon: 77.6737, tz: 330 },
  { id: "vrindavan", hi: "वृंदावन", en: "Vrindavan", lat: 27.582, lon: 77.7, tz: 330 },
  { id: "ayodhya", hi: "अयोध्या", en: "Ayodhya", lat: 26.7994, lon: 82.2047, tz: 330 },
  { id: "gorakhpur", hi: "गोरखपुर", en: "Gorakhpur", lat: 26.7606, lon: 83.3732, tz: 330 },
  { id: "meerut", hi: "मेरठ", en: "Meerut", lat: 28.9845, lon: 77.7064, tz: 330 },
  { id: "ghaziabad", hi: "गाज़ियाबाद", en: "Ghaziabad", lat: 28.6692, lon: 77.4538, tz: 330 },
  { id: "noida", hi: "नोएडा", en: "Noida", lat: 28.5355, lon: 77.391, tz: 330 },
  { id: "bareilly", hi: "बरेली", en: "Bareilly", lat: 28.367, lon: 79.4304, tz: 330 },
  { id: "aligarh", hi: "अलीगढ़", en: "Aligarh", lat: 27.8974, lon: 78.088, tz: 330 },
  { id: "moradabad", hi: "मुरादाबाद", en: "Moradabad", lat: 28.8386, lon: 78.7733, tz: 330 },
  { id: "jhansi", hi: "झाँसी", en: "Jhansi", lat: 25.4484, lon: 78.5685, tz: 330 },
  { id: "chitrakoot", hi: "चित्रकूट", en: "Chitrakoot", lat: 25.2, lon: 80.8667, tz: 330 },
  { id: "naimisharanya", hi: "नैमिषारण्य", en: "Naimisharanya", lat: 27.35, lon: 80.4667, tz: 330 },
  { id: "patna", hi: "पटना", en: "Patna", lat: 25.5941, lon: 85.1376, tz: 330 },
  { id: "gaya", hi: "गया", en: "Gaya", lat: 24.7955, lon: 85.0002, tz: 330 },
  { id: "muzaffarpur", hi: "मुज़फ़्फ़रपुर", en: "Muzaffarpur", lat: 26.1197, lon: 85.391, tz: 330 },
  { id: "darbhanga", hi: "दरभंगा", en: "Darbhanga", lat: 26.1542, lon: 85.8918, tz: 330 },
  { id: "bhagalpur", hi: "भागलपुर", en: "Bhagalpur", lat: 25.2445, lon: 86.9718, tz: 330 },
  { id: "sitamarhi", hi: "सीतामढ़ी", en: "Sitamarhi", lat: 26.595, lon: 85.49, tz: 330 },
  { id: "ranchi", hi: "रांची", en: "Ranchi", lat: 23.3441, lon: 85.3096, tz: 330 },
  { id: "jamshedpur", hi: "जमशेदपुर", en: "Jamshedpur", lat: 22.8046, lon: 86.2029, tz: 330 },
  { id: "dhanbad", hi: "धनबाद", en: "Dhanbad", lat: 23.7957, lon: 86.4304, tz: 330 },
  { id: "deoghar", hi: "देवघर", en: "Deoghar", lat: 24.4823, lon: 86.6968, tz: 330 },
  { id: "raipur", hi: "रायपुर", en: "Raipur", lat: 21.2514, lon: 81.6296, tz: 330 },
  { id: "bilaspur-cg", hi: "बिलासपुर", en: "Bilaspur (CG)", lat: 22.0797, lon: 82.1409, tz: 330 },
  { id: "durg", hi: "दुर्ग", en: "Durg", lat: 21.1904, lon: 81.2849, tz: 330 },
  { id: "bhubaneswar", hi: "भुवनेश्वर", en: "Bhubaneswar", lat: 20.2961, lon: 85.8245, tz: 330 },
  { id: "puri", hi: "पुरी", en: "Puri", lat: 19.8135, lon: 85.8312, tz: 330 },
  { id: "cuttack", hi: "कटक", en: "Cuttack", lat: 20.4625, lon: 85.883, tz: 330 },
  { id: "rourkela", hi: "राउरकेला", en: "Rourkela", lat: 22.2604, lon: 84.8536, tz: 330 },
  { id: "berhampur", hi: "बरहमपुर", en: "Berhampur", lat: 19.315, lon: 84.7941, tz: 330 },
  { id: "howrah", hi: "हावड़ा", en: "Howrah", lat: 22.5958, lon: 88.2636, tz: 330 },
  { id: "durgapur", hi: "दुर्गापुर", en: "Durgapur", lat: 23.5204, lon: 87.3119, tz: 330 },
  { id: "asansol", hi: "आसनसोल", en: "Asansol", lat: 23.6739, lon: 86.9524, tz: 330 },
  { id: "siliguri", hi: "सिलीगुड़ी", en: "Siliguri", lat: 26.7271, lon: 88.3953, tz: 330 },
  { id: "darjeeling", hi: "दार्जिलिंग", en: "Darjeeling", lat: 27.036, lon: 88.2627, tz: 330 },
  { id: "kalyan", hi: "कल्याण", en: "Kalyan", lat: 19.2403, lon: 73.1305, tz: 330 },
  { id: "nashik", hi: "नासिक", en: "Nashik", lat: 19.9975, lon: 73.7898, tz: 330 },
  { id: "nagpur", hi: "नागपुर", en: "Nagpur", lat: 21.1458, lon: 79.0882, tz: 330 },
  { id: "aurangabad", hi: "औरंगाबाद (छ. संभाजीनगर)", en: "Aurangabad", lat: 19.8762, lon: 75.3433, tz: 330 },
  { id: "solapur", hi: "सोलापुर", en: "Solapur", lat: 17.6599, lon: 75.9064, tz: 330 },
  { id: "kolhapur", hi: "कोल्हापुर", en: "Kolhapur", lat: 16.705, lon: 74.2433, tz: 330 },
  { id: "amravati", hi: "अमरावती", en: "Amravati", lat: 20.9374, lon: 77.7796, tz: 330 },
  { id: "shirdi", hi: "शिरडी", en: "Shirdi", lat: 19.7645, lon: 74.4762, tz: 330 },
  { id: "nanded", hi: "नांदेड़", en: "Nanded", lat: 19.1383, lon: 77.321, tz: 330 },
  { id: "thane", hi: "ठाणे", en: "Thane", lat: 19.2183, lon: 72.9781, tz: 330 },
  { id: "panaji", hi: "पणजी", en: "Panaji", lat: 15.4909, lon: 73.8278, tz: 330 },
  { id: "chandigarh", hi: "चंडीगढ़", en: "Chandigarh", lat: 30.7333, lon: 76.7794, tz: 330 },
  { id: "ludhiana", hi: "लुधियाना", en: "Ludhiana", lat: 30.901, lon: 75.8573, tz: 330 },
  { id: "amritsar", hi: "अमृतसर", en: "Amritsar", lat: 31.634, lon: 74.8723, tz: 330 },
  { id: "jalandhar", hi: "जालंधर", en: "Jalandhar", lat: 31.326, lon: 75.5762, tz: 330 },
  { id: "patiala", hi: "पटियाला", en: "Patiala", lat: 30.3398, lon: 76.3869, tz: 330 },
  { id: "bathinda", hi: "बठिंडा", en: "Bathinda", lat: 30.211, lon: 74.9455, tz: 330 },
  { id: "shimla", hi: "शिमला", en: "Shimla", lat: 31.1048, lon: 77.1734, tz: 330 },
  { id: "dharamshala", hi: "धर्मशाला", en: "Dharamshala", lat: 32.219, lon: 76.3234, tz: 330 },
  { id: "manali", hi: "मनाली", en: "Manali", lat: 32.2432, lon: 77.1892, tz: 330 },
  { id: "kullu", hi: "कुल्लू", en: "Kullu", lat: 31.9578, lon: 77.1093, tz: 330 },
  { id: "mandi", hi: "मंडी", en: "Mandi", lat: 31.708, lon: 76.9318, tz: 330 },
  { id: "dehradun", hi: "देहरादून", en: "Dehradun", lat: 30.3165, lon: 78.0322, tz: 330 },
  { id: "haridwar", hi: "हरिद्वार", en: "Haridwar", lat: 29.9457, lon: 78.1642, tz: 330 },
  { id: "rishikesh", hi: "ऋषिकेश", en: "Rishikesh", lat: 30.0869, lon: 78.2676, tz: 330 },
  { id: "nainital", hi: "नैनीताल", en: "Nainital", lat: 29.3803, lon: 79.4636, tz: 330 },
  { id: "haldwani", hi: "हल्द्वानी", en: "Haldwani", lat: 29.2183, lon: 79.513, tz: 330 },
  { id: "badrinath", hi: "बद्रीनाथ", en: "Badrinath", lat: 30.7433, lon: 79.4938, tz: 330 },
  { id: "kedarnath", hi: "केदारनाथ", en: "Kedarnath", lat: 30.7346, lon: 79.0669, tz: 330 },
  { id: "srinagar", hi: "श्रीनगर", en: "Srinagar", lat: 34.0837, lon: 74.7973, tz: 330 },
  { id: "jammu", hi: "जम्मू", en: "Jammu", lat: 32.7266, lon: 74.857, tz: 330 },
  { id: "leh", hi: "लेह", en: "Leh", lat: 34.1526, lon: 77.5771, tz: 330 },
  { id: "katra", hi: "कटरा", en: "Katra", lat: 32.9917, lon: 74.9319, tz: 330 },
  { id: "gurugram", hi: "गुरुग्राम", en: "Gurugram", lat: 28.4595, lon: 77.0266, tz: 330 },
  { id: "faridabad", hi: "फरीदाबाद", en: "Faridabad", lat: 28.4089, lon: 77.3178, tz: 330 },
  { id: "hisar", hi: "हिसार", en: "Hisar", lat: 29.1492, lon: 75.7217, tz: 330 },
  { id: "rohtak", hi: "रोहतक", en: "Rohtak", lat: 28.8955, lon: 76.6066, tz: 330 },
  { id: "panipat", hi: "पानीपत", en: "Panipat", lat: 29.3909, lon: 76.9635, tz: 330 },
  { id: "karnal", hi: "करनाल", en: "Karnal", lat: 29.6857, lon: 76.9905, tz: 330 },
  { id: "kurukshetra", hi: "कुरुक्षेत्र", en: "Kurukshetra", lat: 29.9695, lon: 76.8783, tz: 330 },
  { id: "ambala", hi: "अंबाला", en: "Ambala", lat: 30.3782, lon: 76.7767, tz: 330 },
  { id: "visakhapatnam", hi: "विशाखापत्तनम", en: "Visakhapatnam", lat: 17.6868, lon: 83.2185, tz: 330 },
  { id: "vijayawada", hi: "विजयवाड़ा", en: "Vijayawada", lat: 16.5062, lon: 80.648, tz: 330 },
  { id: "guntur", hi: "गुंटूर", en: "Guntur", lat: 16.3067, lon: 80.4365, tz: 330 },
  { id: "tirupati", hi: "तिरुपति", en: "Tirupati", lat: 13.6288, lon: 79.4192, tz: 330 },
  { id: "nellore", hi: "नेल्लोर", en: "Nellore", lat: 14.4426, lon: 79.9865, tz: 330 },
  { id: "rajahmundry", hi: "राजमुंदरी", en: "Rajahmundry", lat: 17.0005, lon: 81.804, tz: 330 },
  { id: "kurnool", hi: "कुरनूल", en: "Kurnool", lat: 15.8281, lon: 78.0373, tz: 330 },
  { id: "warangal", hi: "वारंगल", en: "Warangal", lat: 17.9689, lon: 79.5941, tz: 330 },
  { id: "nizamabad", hi: "निज़ामाबाद", en: "Nizamabad", lat: 18.6725, lon: 78.0941, tz: 330 },
  { id: "karimnagar", hi: "करीमनगर", en: "Karimnagar", lat: 18.4386, lon: 79.1288, tz: 330 },
  { id: "mysuru", hi: "मैसूर", en: "Mysuru", lat: 12.2958, lon: 76.6394, tz: 330 },
  { id: "mangaluru", hi: "मंगलुरु", en: "Mangaluru", lat: 12.9141, lon: 74.856, tz: 330 },
  { id: "hubballi", hi: "हुबली", en: "Hubballi", lat: 15.3647, lon: 75.124, tz: 330 },
  { id: "belagavi", hi: "बेलगावी", en: "Belagavi", lat: 15.8497, lon: 74.4977, tz: 330 },
  { id: "davanagere", hi: "दावणगेरे", en: "Davanagere", lat: 14.4644, lon: 75.9218, tz: 330 },
  { id: "udupi", hi: "उडुपी", en: "Udupi", lat: 13.3409, lon: 74.7421, tz: 330 },
  { id: "hampi", hi: "हम्पी", en: "Hampi", lat: 15.335, lon: 76.46, tz: 330 },
  { id: "kochi", hi: "कोच्चि", en: "Kochi", lat: 9.9312, lon: 76.2673, tz: 330 },
  { id: "thiruvananthapuram", hi: "तिरुवनंतपुरम", en: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366, tz: 330 },
  { id: "kozhikode", hi: "कोझिकोड", en: "Kozhikode", lat: 11.2588, lon: 75.7804, tz: 330 },
  { id: "thrissur", hi: "त्रिशूर", en: "Thrissur", lat: 10.5276, lon: 76.2144, tz: 330 },
  { id: "kollam", hi: "कोल्लम", en: "Kollam", lat: 8.8932, lon: 76.6141, tz: 330 },
  { id: "guruvayur", hi: "गुरुवायूर", en: "Guruvayur", lat: 10.5949, lon: 76.04, tz: 330 },
  { id: "coimbatore", hi: "कोयंबटूर", en: "Coimbatore", lat: 11.0168, lon: 76.9558, tz: 330 },
  { id: "madurai", hi: "मदुरै", en: "Madurai", lat: 9.9252, lon: 78.1198, tz: 330 },
  { id: "tiruchirappalli", hi: "तिरुचिरापल्ली", en: "Tiruchirappalli", lat: 10.7905, lon: 78.7047, tz: 330 },
  { id: "salem", hi: "सेलम", en: "Salem", lat: 11.6643, lon: 78.146, tz: 330 },
  { id: "tirunelveli", hi: "तिरुनेलवेली", en: "Tirunelveli", lat: 8.7139, lon: 77.7567, tz: 330 },
  { id: "rameswaram", hi: "रामेश्वरम", en: "Rameswaram", lat: 9.2876, lon: 79.3129, tz: 330 },
  { id: "kanyakumari", hi: "कन्याकुमारी", en: "Kanyakumari", lat: 8.0883, lon: 77.5385, tz: 330 },
  { id: "vellore", hi: "वेल्लोर", en: "Vellore", lat: 12.9165, lon: 79.1325, tz: 330 },
  { id: "puducherry", hi: "पुडुचेरी", en: "Puducherry", lat: 11.9416, lon: 79.8083, tz: 330 },
  { id: "guwahati", hi: "गुवाहाटी", en: "Guwahati", lat: 26.1445, lon: 91.7362, tz: 330 },
  { id: "dibrugarh", hi: "डिब्रूगढ़", en: "Dibrugarh", lat: 27.4728, lon: 94.912, tz: 330 },
  { id: "silchar", hi: "सिलचर", en: "Silchar", lat: 24.8333, lon: 92.7789, tz: 330 },
  { id: "shillong", hi: "शिलांग", en: "Shillong", lat: 25.5788, lon: 91.8933, tz: 330 },
  { id: "imphal", hi: "इम्फाल", en: "Imphal", lat: 24.817, lon: 93.9368, tz: 330 },
  { id: "aizawl", hi: "आइजोल", en: "Aizawl", lat: 23.7271, lon: 92.7176, tz: 330 },
  { id: "kohima", hi: "कोहिमा", en: "Kohima", lat: 25.6751, lon: 94.1086, tz: 330 },
  { id: "agartala", hi: "अगरतला", en: "Agartala", lat: 23.8315, lon: 91.2868, tz: 330 },
  { id: "itanagar", hi: "ईटानगर", en: "Itanagar", lat: 27.0844, lon: 93.6053, tz: 330 },
  { id: "gangtok", hi: "गंगटोक", en: "Gangtok", lat: 27.3389, lon: 88.6065, tz: 330 },
  { id: "port-blair", hi: "पोर्ट ब्लेयर", en: "Port Blair", lat: 11.6234, lon: 92.7265, tz: 330 },
  { id: "bhilai", hi: "भिलाई", en: "Bhilai", lat: 21.1938, lon: 81.3509, tz: 330 },
  { id: "jalgaon", hi: "जलगांव", en: "Jalgaon", lat: 21.0077, lon: 75.5626, tz: 330 },
  { id: "akola", hi: "अकोला", en: "Akola", lat: 20.7002, lon: 77.0082, tz: 330 },
  { id: "ratnagiri", hi: "रत्नागिरी", en: "Ratnagiri", lat: 16.9902, lon: 73.312, tz: 330 },
  { id: "srikakulam", hi: "श्रीकाकुलम", en: "Srikakulam", lat: 18.2969, lon: 83.8938, tz: 330 },
  { id: "kathmandu", hi: "काठमांडू", en: "Kathmandu", lat: 27.7172, lon: 85.324, tz: 345 },
  { id: "colombo", hi: "कोलंबो", en: "Colombo", lat: 6.9271, lon: 79.8612, tz: 330 },
  { id: "dhaka", hi: "ढाका", en: "Dhaka", lat: 23.8103, lon: 90.4125, tz: 360 },
  { id: "karachi", hi: "कराची", en: "Karachi", lat: 24.8607, lon: 67.0011, tz: 300 },
  { id: "lahore", hi: "लाहौर", en: "Lahore", lat: 31.5204, lon: 74.3587, tz: 300 },
  { id: "kabul", hi: "काबुल", en: "Kabul", lat: 34.5553, lon: 69.2075, tz: 270 },
  { id: "dubai", hi: "दुबई", en: "Dubai", lat: 25.2048, lon: 55.2708, tz: 240 },
  { id: "abu-dhabi", hi: "अबू धाबी", en: "Abu Dhabi", lat: 24.4539, lon: 54.3773, tz: 240 },
  { id: "doha", hi: "दोहा", en: "Doha", lat: 25.2854, lon: 51.531, tz: 180 },
  { id: "riyadh", hi: "रियाद", en: "Riyadh", lat: 24.7136, lon: 46.6753, tz: 180 },
  { id: "muscat", hi: "मस्कट", en: "Muscat", lat: 23.588, lon: 58.3829, tz: 240 },
  { id: "kuwait-city", hi: "कुवैत सिटी", en: "Kuwait City", lat: 29.3759, lon: 47.9774, tz: 180 },
  { id: "manama", hi: "मनामा", en: "Manama", lat: 26.2285, lon: 50.586, tz: 180 },
  { id: "singapore", hi: "सिंगापुर", en: "Singapore", lat: 1.3521, lon: 103.8198, tz: 480 },
  { id: "kuala-lumpur", hi: "कुआलालंपुर", en: "Kuala Lumpur", lat: 3.139, lon: 101.6869, tz: 480 },
  { id: "bangkok", hi: "बैंकॉक", en: "Bangkok", lat: 13.7563, lon: 100.5018, tz: 420 },
  { id: "jakarta", hi: "जकार्ता", en: "Jakarta", lat: -6.2088, lon: 106.8456, tz: 420 },
  { id: "hong-kong", hi: "हांगकांग", en: "Hong Kong", lat: 22.3193, lon: 114.1694, tz: 480 },
  { id: "tokyo", hi: "टोक्यो", en: "Tokyo", lat: 35.6762, lon: 139.6503, tz: 540 },
  { id: "seoul", hi: "सियोल", en: "Seoul", lat: 37.5665, lon: 126.978, tz: 540 },
  { id: "beijing", hi: "बीजिंग", en: "Beijing", lat: 39.9042, lon: 116.4074, tz: 480 },
  { id: "sydney", hi: "सिडनी", en: "Sydney", lat: -33.8688, lon: 151.2093, tz: 600 },
  { id: "melbourne", hi: "मेलबर्न", en: "Melbourne", lat: -37.8136, lon: 144.9631, tz: 600 },
  { id: "perth", hi: "पर्थ", en: "Perth", lat: -31.9505, lon: 115.8605, tz: 480 },
  { id: "auckland", hi: "ऑकलैंड", en: "Auckland", lat: -36.8485, lon: 174.7633, tz: 720 },
  { id: "london", hi: "लंदन", en: "London", lat: 51.5074, lon: -0.1278, tz: 0 },
  { id: "birmingham-uk", hi: "बर्मिंघम", en: "Birmingham (UK)", lat: 52.4862, lon: -1.8904, tz: 0 },
  { id: "dublin", hi: "डबलिन", en: "Dublin", lat: 53.3498, lon: -6.2603, tz: 0 },
  { id: "paris", hi: "पेरिस", en: "Paris", lat: 48.8566, lon: 2.3522, tz: 60 },
  { id: "frankfurt", hi: "फ्रैंकफर्ट", en: "Frankfurt", lat: 50.1109, lon: 8.6821, tz: 60 },
  { id: "amsterdam", hi: "एम्स्टर्डम", en: "Amsterdam", lat: 52.3676, lon: 4.9041, tz: 60 },
  { id: "zurich", hi: "ज्यूरिक", en: "Zurich", lat: 47.3769, lon: 8.5417, tz: 60 },
  { id: "rome", hi: "रोम", en: "Rome", lat: 41.9028, lon: 12.4964, tz: 60 },
  { id: "moscow", hi: "मॉस्को", en: "Moscow", lat: 55.7558, lon: 37.6173, tz: 180 },
  { id: "istanbul", hi: "इस्तांबुल", en: "Istanbul", lat: 41.0082, lon: 28.9784, tz: 180 },
  { id: "nairobi", hi: "नैरोबी", en: "Nairobi", lat: -1.2921, lon: 36.8219, tz: 180 },
  { id: "johannesburg", hi: "जोहानसबर्ग", en: "Johannesburg", lat: -26.2041, lon: 28.0473, tz: 120 },
  { id: "durban", hi: "डरबन", en: "Durban", lat: -29.8587, lon: 31.0218, tz: 120 },
  { id: "port-louis", hi: "पोर्ट लुइस", en: "Port Louis", lat: -20.1609, lon: 57.5012, tz: 240 },
  { id: "new-york", hi: "न्यूयॉर्क", en: "New York", lat: 40.7128, lon: -74.006, tz: -300 },
  { id: "new-jersey", hi: "न्यू जर्सी (एडिसन)", en: "New Jersey (Edison)", lat: 40.5187, lon: -74.4121, tz: -300 },
  { id: "chicago", hi: "शिकागो", en: "Chicago", lat: 41.8781, lon: -87.6298, tz: -360 },
  { id: "houston", hi: "ह्यूस्टन", en: "Houston", lat: 29.7604, lon: -95.3698, tz: -360 },
  { id: "dallas", hi: "डलास", en: "Dallas", lat: 32.7767, lon: -96.797, tz: -360 },
  { id: "atlanta", hi: "अटलांटा", en: "Atlanta", lat: 33.749, lon: -84.388, tz: -300 },
  { id: "los-angeles", hi: "लॉस एंजेलिस", en: "Los Angeles", lat: 34.0522, lon: -118.2437, tz: -480 },
  { id: "san-francisco", hi: "सैन फ्रांसिस्को", en: "San Francisco", lat: 37.7749, lon: -122.4194, tz: -480 },
  { id: "seattle", hi: "सिएटल", en: "Seattle", lat: 47.6062, lon: -122.3321, tz: -480 },
  { id: "toronto", hi: "टोरंटो", en: "Toronto", lat: 43.6532, lon: -79.3832, tz: -300 },
  { id: "vancouver", hi: "वैंकूवर", en: "Vancouver", lat: 49.2827, lon: -123.1207, tz: -480 },
  { id: "mexico-city", hi: "मेक्सिको सिटी", en: "Mexico City", lat: 19.4326, lon: -99.1332, tz: -360 },
  { id: "sao-paulo", hi: "साओ पाउलो", en: "Sao Paulo", lat: -23.5505, lon: -46.6333, tz: -180 },
  { id: "buenos-aires", hi: "ब्यूनस आयर्स", en: "Buenos Aires", lat: -34.6037, lon: -58.3816, tz: -180 },
  { id: "georgetown", hi: "जॉर्जटाउन", en: "Georgetown", lat: 6.8013, lon: -58.1553, tz: -240 },
  { id: "paramaribo", hi: "पारामारिबो", en: "Paramaribo", lat: 5.852, lon: -55.2038, tz: -180 },
  { id: "suva", hi: "सुवा", en: "Suva", lat: -18.1416, lon: 178.4419, tz: 720 },
] as const;

export type Place = { lat: number; lon: number; tz: number; hi: string; en: string; id: string };
export const INDIA_CITIES = CITIES.filter((c) => c.tz === 330);
export const INTL_CITIES = CITIES.filter((c) => c.tz !== 330);

export const DEFAULT_PLACE: Place = { ...CITIES[0] };

const norm360 = (x: number) => ((x % 360) + 360) % 360;
const signedDiff = (x: number) => {
  const v = norm360(x);
  return v > 180 ? v - 360 : v;
};

/* ---------------- date helpers (local civil time in the place's fixed offset) --------------- */

export function localMidnightUTC(y: number, m: number, d: number, tz: number): Date {
  return new Date(Date.UTC(y, m - 1, d) - tz * 60000);
}
export function ymdKey(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
export function parseKey(key: string): { y: number; m: number; d: number } | null {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!mt) return null;
  return { y: +mt[1]!, m: +mt[2]!, d: +mt[3]! };
}
export function fmtTime(date: Date | null | undefined, tz: number): string {
  if (!date) return "—";
  const local = new Date(date.getTime() + tz * 60000);
  const h = local.getUTCHours();
  const mi = local.getUTCMinutes();
  const ampm = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, "0")}:${String(mi).padStart(2, "0")} ${ampm}`;
}
export function fmtDateTime(date: Date | null | undefined, tz: number): string {
  if (!date) return "—";
  const local = new Date(date.getTime() + tz * 60000);
  return `${String(local.getUTCDate()).padStart(2, "0")}/${String(local.getUTCMonth() + 1).padStart(2, "0")}/${local.getUTCFullYear()} ${fmtTime(date, tz)}`;
}

/* ---------------- astronomy primitives ---------------- */

/** Lahiri (Chitrapaksha) ayanamsa in degrees. */
export function ayanamsa(date: Date): number {
  const t = (date.getTime() / 86400000 + 2440587.5 - 2451545.0) / 36525;
  return 23.853316 + 1.39644 * t + 0.000308 * t * t;
}

export function sunTropical(date: Date): number {
  return norm360(A.SunPosition(date).elon);
}
export function moonTropical(date: Date): number {
  return norm360(A.EclipticGeoMoon(date).lon);
}
export function sunSidereal(date: Date): number {
  return norm360(sunTropical(date) - ayanamsa(date));
}
export function moonSidereal(date: Date): number {
  return norm360(moonTropical(date) - ayanamsa(date));
}
export function planetSidereal(body: A.Body, date: Date): number {
  const vec = A.GeoVector(body, date, true);
  return norm360(A.Ecliptic(vec).elon - ayanamsa(date));
}

/** Find the first moment at/after `start` where angleFn(date) crosses `target` (degrees, increasing). */
function findCrossing(
  angleFn: (d: Date) => number,
  target: number,
  start: Date,
  maxDays: number,
  stepDays = 0.02,
): Date | null {
  let t0 = start.getTime();
  let f0 = signedDiff(angleFn(new Date(t0)) - target);
  const end = start.getTime() + maxDays * 86400000;
  const step = stepDays * 86400000;
  while (t0 < end) {
    const t1 = Math.min(t0 + step, end);
    const f1 = signedDiff(angleFn(new Date(t1)) - target);
    if (f0 < 0 && f1 >= 0) {
      let a = t0;
      let b = t1;
      for (let i = 0; i < 40; i++) {
        const mid = (a + b) / 2;
        const fm = signedDiff(angleFn(new Date(mid)) - target);
        if (fm < 0) a = mid;
        else b = mid;
      }
      return new Date((a + b) / 2);
    }
    t0 = t1;
    f0 = f1;
  }
  return null;
}

const elongation = (d: Date) => norm360(moonTropical(d) - sunTropical(d));

function riseSet(body: A.Body, obs: A.Observer, start: Date, dir: 1 | -1): Date | null {
  const t = A.SearchRiseSet(body, obs, dir, start, 1.2);
  return t ? t.date : null;
}

/* ---------------- lunar month / samvat ---------------- */

/** New moon at or before `date`. */
function prevNewMoon(date: Date): Date {
  const t = A.SearchMoonPhase(0, new Date(date.getTime() - 31 * 86400000), 32);
  let best = t ? t.date : null;
  let cur = best;
  while (cur) {
    const next = A.SearchMoonPhase(0, new Date(cur.getTime() + 86400000), 32);
    if (!next || next.date.getTime() > date.getTime()) break;
    best = next.date;
    cur = next.date;
  }
  return best ?? date;
}
function nextNewMoon(date: Date): Date {
  const t = A.SearchMoonPhase(0, new Date(date.getTime() + 3600000), 40);
  return t ? t.date : date;
}

/** Amanta lunar month index (0=Chaitra) for a given moment, plus adhik (leap) flag. */
export function lunarMonthOf(date: Date): { index: number; adhik: boolean } {
  const nm = prevNewMoon(date);
  const nm2 = nextNewMoon(nm);
  const s1 = Math.floor(sunSidereal(nm) / 30);
  const s2 = Math.floor(sunSidereal(nm2) / 30);
  // Month named by the solar sign the sun enters during the month:
  // sun in Meena (11) at new moon => Chaitra (0)
  const index = (s1 + 1) % 12;
  const adhik = s1 === s2; // no sankranti inside this lunar month => Adhik maas
  return { index, adhik };
}

/** Vikram Samvat & Shaka Samvat (Chaitra new-year based). */
export function samvat(date: Date, lunarIndex: number): { vikram: number; shaka: number } {
  const localYear = date.getUTCFullYear();
  const nm = prevNewMoon(date);
  // Before Chaitra Shukla Pratipada the samvat still belongs to the previous year
  const beforeNewYear = nm.getUTCMonth() < 2 || (lunarIndex >= 9 && nm.getUTCMonth() <= 2);
  const y = beforeNewYear ? localYear - 1 : localYear;
  return { vikram: y + 57, shaka: y - 78 };
}

/* ---------------- panchang ---------------- */

export type TithiInfo = {
  num: number; // 1..30 continuous
  name: Bi;
  paksha: "shukla" | "krishna";
  endsAt: Date | null;
};

export function tithiAt(date: Date): { num: number; index: number } {
  const e = elongation(date);
  const index = Math.floor(e / 12); // 0..29
  return { num: index + 1, index };
}

export function tithiName(index: number): { name: Bi; paksha: "shukla" | "krishna" } {
  const paksha: "shukla" | "krishna" = index < 15 ? "shukla" : "krishna";
  const within = index % 15;
  if (index === 14) return { name: PURNIMA, paksha };
  if (index === 29) return { name: AMAVASYA, paksha };
  return { name: TITHI_NAMES[within]!, paksha };
}

export type Segment = { name: Bi; endsAt: Date | null; num: number };

export type DayPanchang = {
  key: string;
  y: number;
  m: number;
  d: number;
  weekday: number;
  weekdayName: Bi;
  place: Place;
  sunrise: Date | null;
  sunset: Date | null;
  moonrise: Date | null;
  moonset: Date | null;
  tithi: Segment & { paksha: "shukla" | "krishna" };
  nextTithi?: (Segment & { paksha: "shukla" | "krishna" }) | undefined;
  nakshatra: Segment;
  nextNakshatra?: Segment | undefined;
  yoga: Segment;
  karana: Segment;
  lunarMonth: Bi;
  adhikMaas: boolean;
  vikram: number;
  shaka: number;
  hijri: { year: number; month: number; day: number };
  moonRashi: Bi;
  sunRashi: Bi;
  rahuKaal: [Date, Date] | null;
  yamaganda: [Date, Date] | null;
  gulikaKaal: [Date, Date] | null;
  abhijit: [Date, Date] | null;
  dayDuration: string;
  tithiSunriseIndex: number;
  tithiSunsetIndex: number;
  tithiNishitaIndex: number;
  tithiPrevDayIndex: number;
  isAmavasya: boolean;
  isPurnima: boolean;
  isEkadashi: boolean;
};

function partRange(
  sunrise: Date | null,
  sunset: Date | null,
  part: number,
): [Date, Date] | null {
  if (!sunrise || !sunset) return null;
  const dur = (sunset.getTime() - sunrise.getTime()) / 8;
  return [
    new Date(sunrise.getTime() + dur * (part - 1)),
    new Date(sunrise.getTime() + dur * part),
  ];
}

export function computeDay(
  y: number,
  m: number,
  d: number,
  place: Place = DEFAULT_PLACE,
  full = true,
): DayPanchang {
  const midnight = localMidnightUTC(y, m, d, place.tz);
  const obs = new A.Observer(place.lat, place.lon, 0);
  const sunrise = riseSet(A.Body.Sun, obs, midnight, 1);
  const sunset = sunrise ? riseSet(A.Body.Sun, obs, sunrise, -1) : riseSet(A.Body.Sun, obs, midnight, -1);
  const moonrise = full ? riseSet(A.Body.Moon, obs, midnight, 1) : null;
  const moonset = full ? riseSet(A.Body.Moon, obs, midnight, -1) : null;

  const ref = sunrise ?? new Date(midnight.getTime() + 6 * 3600000);
  const weekday = new Date(ref.getTime() + place.tz * 60000).getUTCDay();

  const { index: tIndex } = tithiAt(ref);
  const tn = tithiName(tIndex);
  const tithiEnd = full ? findCrossing(elongation, (tIndex + 1) * 12 % 360, ref, 2) : null;

  const mSid = moonSidereal(ref);
  const nIndex = Math.floor(mSid / (360 / 27));
  const nakEnd = full
    ? findCrossing(moonSidereal, ((nIndex + 1) * (360 / 27)) % 360, ref, 2)
    : null;

  const yogaVal = norm360(mSid + sunSidereal(ref));
  const yIndex = Math.floor(yogaVal / (360 / 27));
  const yogaEnd = full
    ? findCrossing((dt) => norm360(moonSidereal(dt) + sunSidereal(dt)), ((yIndex + 1) * (360 / 27)) % 360, ref, 3)
    : null;

  const e = elongation(ref);
  const kIndex = Math.floor(e / 6); // 0..59
  const karanaName =
    KARANA_FIXED[kIndex] ?? KARANA_NAMES[(kIndex - 1) % 7]!;
  const karanaEnd = full ? findCrossing(elongation, ((kIndex + 1) * 6) % 360, ref, 2) : null;

  const lm = lunarMonthOf(ref);
  const sam = samvat(new Date(ref.getTime() + place.tz * 60000), lm.index);
  const hijri = jdnToHijri(gregorianToJdn(y, m, d));

  const rahu = partRange(sunrise, sunset, RAHU_PART[weekday]!);
  const yama = partRange(sunrise, sunset, YAMA_PART[weekday]!);
  const gulika = partRange(sunrise, sunset, GULIKA_PART[weekday]!);

  let abhijit: [Date, Date] | null = null;
  let dayDuration = "—";
  if (sunrise && sunset) {
    const mid = (sunrise.getTime() + sunset.getTime()) / 2;
    const unit = (sunset.getTime() - sunrise.getTime()) / 15;
    abhijit = [new Date(mid - unit / 2), new Date(mid + unit / 2)];
    const total = Math.round((sunset.getTime() - sunrise.getTime()) / 60000);
    dayDuration = `${Math.floor(total / 60)}h ${total % 60}m`;
  }

  const tithiSunsetIndex = tithiAt(sunset ?? new Date(midnight.getTime() + 18 * 3600000)).index;
  const nishita = sunset
    ? new Date(sunset.getTime() + (new Date(midnight.getTime() + 30 * 3600000).getTime() - sunset.getTime()) / 2)
    : new Date(midnight.getTime() + 24 * 3600000);
  const tithiNishitaIndex = tithiAt(nishita).index;
  const tithiPrevDayIndex = tithiAt(new Date(ref.getTime() - 86400000)).index;

  const nextTIndex = (tIndex + 1) % 30;
  const nextNIndex = (nIndex + 1) % 27;

  return {
    key: ymdKey(y, m, d),
    y,
    m,
    d,
    weekday,
    weekdayName: WEEKDAYS[weekday]!,
    place,
    sunrise,
    sunset,
    moonrise,
    moonset,
    tithi: { name: tn.name, paksha: tn.paksha, endsAt: tithiEnd, num: tIndex + 1 },
    nextTithi: full
      ? {
          ...tithiName(nextTIndex),
          endsAt: null,
          num: nextTIndex + 1,
        }
      : undefined,
    nakshatra: { name: NAKSHATRA_NAMES[nIndex]!, endsAt: nakEnd, num: nIndex + 1 },
    nextNakshatra: full
      ? { name: NAKSHATRA_NAMES[nextNIndex]!, endsAt: null, num: nextNIndex + 1 }
      : undefined,
    yoga: { name: YOGA_NAMES[yIndex]!, endsAt: yogaEnd, num: yIndex + 1 },
    karana: { name: karanaName, endsAt: karanaEnd, num: kIndex + 1 },
    lunarMonth: LUNAR_MONTHS[lm.index]!,
    adhikMaas: lm.adhik,
    vikram: sam.vikram,
    shaka: sam.shaka,
    hijri,
    moonRashi: RASHI_NAMES[Math.floor(mSid / 30)]!,
    sunRashi: RASHI_NAMES[Math.floor(sunSidereal(ref) / 30)]!,
    rahuKaal: rahu,
    yamaganda: yama,
    gulikaKaal: gulika,
    abhijit,
    dayDuration,
    tithiSunriseIndex: tIndex,
    tithiSunsetIndex,
    tithiNishitaIndex,
    tithiPrevDayIndex,
    isAmavasya: tIndex === 29,
    isPurnima: tIndex === 14,
    isEkadashi: tIndex % 15 === 10,
  };
}

/* ---------------- choghadiya ---------------- */

export type Chogh = { key: string; start: Date; end: Date };

export function choghadiya(day: DayPanchang, nextSunrise: Date | null) {
  const out: { day: Chogh[]; night: Chogh[] } = { day: [], night: [] };
  if (!day.sunrise || !day.sunset) return out;
  const dayUnit = (day.sunset.getTime() - day.sunrise.getTime()) / 8;
  DAY_CHOGHADIYA[day.weekday]!.forEach((key, i) => {
    out.day.push({
      key,
      start: new Date(day.sunrise!.getTime() + dayUnit * i),
      end: new Date(day.sunrise!.getTime() + dayUnit * (i + 1)),
    });
  });
  if (nextSunrise) {
    const nightUnit = (nextSunrise.getTime() - day.sunset.getTime()) / 8;
    NIGHT_CHOGHADIYA[day.weekday]!.forEach((key, i) => {
      out.night.push({
        key,
        start: new Date(day.sunset!.getTime() + nightUnit * i),
        end: new Date(day.sunset!.getTime() + nightUnit * (i + 1)),
      });
    });
  }
  return out;
}

export function nextSunriseOf(day: DayPanchang): Date | null {
  const obs = new A.Observer(day.place.lat, day.place.lon, 0);
  const from = day.sunset ?? localMidnightUTC(day.y, day.m, day.d, day.place.tz);
  const t = A.SearchRiseSet(A.Body.Sun, obs, 1, from, 1.5);
  return t ? t.date : null;
}

/* ---------------- eclipses ---------------- */

export type Eclipse = {
  type: "solar" | "lunar";
  kind: string;
  peak: Date;
  obscuration?: number | undefined;
  lat?: number | undefined;
  lon?: number | undefined;
};

export function eclipsesInRange(start: Date, end: Date): Eclipse[] {
  const out: Eclipse[] = [];
  try {
    let s = A.SearchGlobalSolarEclipse(start);
    let guard = 0;
    while (s && s.peak.date.getTime() <= end.getTime() && guard++ < 12) {
      out.push({
        type: "solar",
        kind: s.kind,
        peak: s.peak.date,
        obscuration: s.obscuration ?? undefined,
        lat: s.latitude ?? undefined,
        lon: s.longitude ?? undefined,
      });
      s = A.NextGlobalSolarEclipse(s.peak);
    }
  } catch {
    /* ignore */
  }
  try {
    let l = A.SearchLunarEclipse(start);
    let guard = 0;
    while (l && l.peak.date.getTime() <= end.getTime() && guard++ < 12) {
      out.push({
        type: "lunar",
        kind: l.kind,
        peak: l.peak.date,
        obscuration: l.obscuration ?? undefined,
      });
      l = A.NextLunarEclipse(l.peak);
    }
  } catch {
    /* ignore */
  }
  return out.sort((a, b) => a.peak.getTime() - b.peak.getTime());
}

export function eclipsesInYear(year: number): Eclipse[] {
  return eclipsesInRange(new Date(Date.UTC(year, 0, 1)), new Date(Date.UTC(year, 11, 31, 23, 59)));
}
