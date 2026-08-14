import { formatToman, toPersianDigits } from "@/lib/utils";

export type SortOption = "cheapest" | "fastest" | "recommended";

export interface DemoFlight {
  id: string;
  airline: string;
  flightNo: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  cabin: string;
  price: number;
  seatsLeft?: number;
  badge?: string;
}

export interface DemoHotelRoom {
  id: string;
  name: string;
  capacity: number;
  board: string;
  price: number;
  remaining: number;
}

export interface DemoHotel {
  id: string;
  name: string;
  city: string;
  address: string;
  stars: number;
  score: number;
  reviews: number;
  priceFrom: number;
  image: string;
  gallery: string[];
  tags: string[];
  board: string;
  description: string;
  amenities: string[];
  rooms: DemoHotelRoom[];
}

export interface DemoTourDay {
  day: number;
  title: string;
  body: string;
}

export interface DemoTour {
  id: string;
  title: string;
  nights: number;
  days: number;
  origin: string;
  destination: string;
  priceFrom: number;
  image: string;
  gallery: string[];
  includes: string[];
  excludes: string[];
  departure: string;
  nextDates: string[];
  description: string;
  itinerary: DemoTourDay[];
}

export interface DemoStay {
  id: string;
  title: string;
  city: string;
  neighborhood: string;
  type: string;
  guests: number;
  rooms: number;
  beds: number;
  baths: number;
  priceFrom: number;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  host: string;
  description: string;
  amenities: string[];
  rules: string[];
}

export interface DemoTransport {
  id: string;
  company: string;
  origin: string;
  destination: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  seatClass: string;
  price: number;
}

export const demoFlights: DemoFlight[] = [
  {
    id: "f1",
    airline: "ایران‌ایر",
    flightNo: "IR244",
    origin: "تهران",
    originCode: "THR",
    destination: "مشهد",
    destinationCode: "MHD",
    departTime: "۰۶:۳۰",
    arriveTime: "۰۷:۵۵",
    duration: "۱س ۲۵د",
    stops: 0,
    cabin: "اکونومی",
    price: 1280000,
    seatsLeft: 4,
    badge: "پیشنهادی",
  },
  {
    id: "f2",
    airline: "ماهان",
    flightNo: "W51012",
    origin: "تهران",
    originCode: "THR",
    destination: "مشهد",
    destinationCode: "MHD",
    departTime: "۰۹:۱۵",
    arriveTime: "۱۰:۴۰",
    duration: "۱س ۲۵د",
    stops: 0,
    cabin: "اکونومی",
    price: 1450000,
  },
  {
    id: "f3",
    airline: "آسمان",
    flightNo: "EP882",
    origin: "تهران",
    originCode: "THR",
    destination: "مشهد",
    destinationCode: "MHD",
    departTime: "۱۴:۲۰",
    arriveTime: "۱۵:۵۰",
    duration: "۱س ۳۰د",
    stops: 0,
    cabin: "اکونومی",
    price: 1190000,
    badge: "ارزان‌ترین",
  },
  {
    id: "f4",
    airline: "قشم‌ایر",
    flightNo: "QB1205",
    origin: "تهران",
    originCode: "THR",
    destination: "مشهد",
    destinationCode: "MHD",
    departTime: "۱۹:۴۵",
    arriveTime: "۲۱:۱۰",
    duration: "۱س ۲۵د",
    stops: 0,
    cabin: "بیزینس",
    price: 2890000,
    badge: "بیزینس",
  },
  {
    id: "f5",
    airline: "ترکیش",
    flightNo: "TK873",
    origin: "تهران",
    originCode: "IKA",
    destination: "استانبول",
    destinationCode: "IST",
    departTime: "۰۳:۴۰",
    arriveTime: "۰۶:۱۵",
    duration: "۳س ۳۵د",
    stops: 0,
    cabin: "اکونومی",
    price: 6890000,
    badge: "خارجی",
  },
];

export const demoHotels: DemoHotel[] = [
  {
    id: "h1",
    name: "هتل درویشی مشهد",
    city: "مشهد",
    address: "خیابان امام رضا، نزدیک حرم",
    stars: 5,
    score: 8.9,
    reviews: 1240,
    priceFrom: 4200000,
    image: "/images/destinations/mashhad.jpg",
    gallery: [
      "/images/destinations/mashhad.jpg",
      "/images/articles/flights.jpg",
      "/images/destinations/shiraz.jpg",
    ],
    tags: ["مرکز شهر", "صبحانه"],
    board: "با صبحانه",
    description:
      "هتل لوکس با دسترسی آسان به حرم، اتاق‌های جادار و خدمات Concierge برای مسافران زیارتی و گردشگری.",
    amenities: ["وای‌فای رایگان", "پارکینگ", "رستوران", "اسپا", "ترانسفر فرودگاه"],
    rooms: [
      {
        id: "h1r1",
        name: "اتاق دبل استاندارد",
        capacity: 2,
        board: "با صبحانه",
        price: 4200000,
        remaining: 6,
      },
      {
        id: "h1r2",
        name: "اتاق تریپل ویو حرم",
        capacity: 3,
        board: "با صبحانه",
        price: 5850000,
        remaining: 2,
      },
    ],
  },
  {
    id: "h2",
    name: "هتل آسمان کیش",
    city: "کیش",
    address: "بلوار ساحلی، نزدیک پلاژ بانوان",
    stars: 4,
    score: 8.4,
    reviews: 860,
    priceFrom: 3100000,
    image: "/images/destinations/kish.jpg",
    gallery: [
      "/images/destinations/kish.jpg",
      "/images/articles/kish.jpg",
      "/images/destinations/istanbul.jpg",
    ],
    tags: ["نزدیک ساحل", "استخر"],
    board: "فقط اقامت",
    description:
      "هتل ساحلی با استخر روباز، مناسب سفر خانوادگی و اقامت کوتاه‌مدت در کیش.",
    amenities: ["استخر", "نزدیک ساحل", "صبحانه اختیاری", "پارکینگ", "باشگاه"],
    rooms: [
      {
        id: "h2r1",
        name: "اتاق دبل دریا",
        capacity: 2,
        board: "فقط اقامت",
        price: 3100000,
        remaining: 8,
      },
      {
        id: "h2r2",
        name: "سوئیت خانوادگی",
        capacity: 4,
        board: "با صبحانه",
        price: 5200000,
        remaining: 3,
      },
    ],
  },
  {
    id: "h3",
    name: "هتل زندیه شیراز",
    city: "شیراز",
    address: "خیابان زند، جنب بازار وکیل",
    stars: 5,
    score: 9.1,
    reviews: 640,
    priceFrom: 3850000,
    image: "/images/destinations/shiraz.jpg",
    gallery: [
      "/images/destinations/shiraz.jpg",
      "/images/articles/istanbul.jpg",
      "/images/destinations/mashhad.jpg",
    ],
    tags: ["لوکس", "اسپا"],
    board: "با صبحانه",
    description:
      "هتل بوتیک با معماری ایرانی، اسپا و دسترسی عالی به جاذبه‌های تاریخی شیراز.",
    amenities: ["اسپا", "رستوران سنتی", "لانژ", "وای‌فای", "خدمت در اتاق"],
    rooms: [
      {
        id: "h3r1",
        name: "اتاق جونیور سوئیت",
        capacity: 2,
        board: "با صبحانه",
        price: 3850000,
        remaining: 5,
      },
      {
        id: "h3r2",
        name: "سوئیت پرزیدنتال",
        capacity: 3,
        board: "صبحانه + شام",
        price: 7900000,
        remaining: 1,
      },
    ],
  },
  {
    id: "h4",
    name: "هتل پارک استانبول",
    city: "استانبول",
    address: "بی اوغلو، نزدیک میدان تکسیم",
    stars: 4,
    score: 8.7,
    reviews: 2100,
    priceFrom: 5600000,
    image: "/images/destinations/istanbul.jpg",
    gallery: [
      "/images/destinations/istanbul.jpg",
      "/images/articles/istanbul.jpg",
      "/images/promo/tours.jpg",
    ],
    tags: ["بی اوغلو", "مترو"],
    board: "با صبحانه",
    description:
      "موقعیت عالی در مرکز استانبول با دسترسی مترو، مناسب خرید و گشت‌های شهری.",
    amenities: ["صبحانه بوفه", "نزدیک مترو", "میز کار", "لاندری", "پذیرش ۲۴ ساعته"],
    rooms: [
      {
        id: "h4r1",
        name: "اتاق استاندارد سیتی‌ویو",
        capacity: 2,
        board: "با صبحانه",
        price: 5600000,
        remaining: 7,
      },
      {
        id: "h4r2",
        name: "اتاق دلوکس بالکن‌دار",
        capacity: 2,
        board: "با صبحانه",
        price: 6900000,
        remaining: 4,
      },
    ],
  },
];

export const demoTours: DemoTour[] = [
  {
    id: "t1",
    title: "تور ۴ روزه استانبول",
    nights: 3,
    days: 4,
    origin: "تهران",
    destination: "استانبول",
    priceFrom: 28900000,
    image: "/images/destinations/istanbul.jpg",
    gallery: [
      "/images/destinations/istanbul.jpg",
      "/images/articles/istanbul.jpg",
      "/images/promo/tours.jpg",
    ],
    includes: ["پرواز", "هتل ۳ شب", "ترانسفر"],
    excludes: ["هزینه شخصی", "بیمه اختیاری", "گشت‌های اضافه"],
    departure: "هر جمعه",
    nextDates: ["۲۹ مرداد", "۵ شهریور", "۱۲ شهریور"],
    description:
      "تور ترکیبی خرید و گشت تاریخی استانبول با اقامت در منطقه بی اوغلو و ترانسفر فرودگاهی.",
    itinerary: [
      {
        day: 1,
        title: "ورود و گشت سبک",
        body: "استقبال در فرودگاه، ترانسفر به هتل و گشت کوتاه در تکسیم.",
      },
      {
        day: 2,
        title: "استانبول تاریخی",
        body: "بازدید از ایاصوفیه، مسجد آبی و بازار بزرگ.",
      },
      {
        day: 3,
        title: "تنگه بسفر",
        body: "کروز بسفر و وقت آزاد برای خرید در ایستیکلال.",
      },
      {
        day: 4,
        title: "بازگشت",
        body: "ترانسفر به فرودگاه و پرواز برگشت به تهران.",
      },
    ],
  },
  {
    id: "t2",
    title: "تور ۳ روزه کیش",
    nights: 2,
    days: 3,
    origin: "تهران",
    destination: "کیش",
    priceFrom: 12400000,
    image: "/images/destinations/kish.jpg",
    gallery: [
      "/images/destinations/kish.jpg",
      "/images/articles/kish.jpg",
      "/images/destinations/shiraz.jpg",
    ],
    includes: ["پرواز", "هتل ۲ شب", "بیمه"],
    excludes: ["غذای ناهار و شام", "تفریحات آبی"],
    departure: "روزانه",
    nextDates: ["فردا", "پس‌فردا", "۳۰ مرداد"],
    description:
      "فرار کوتاه به جزیره کیش با پرواز رفت‌وبرگشت، اقامت ساحلی و بیمه مسافرتی پایه.",
    itinerary: [
      {
        day: 1,
        title: "پرواز و چک‌این",
        body: "پرواز صبحگاهی، ترانسفر و استراحت در هتل.",
      },
      {
        day: 2,
        title: "ساحل و بازار",
        body: "وقت آزاد ساحل، بازار پردیس و اختیاری تفریحات آبی.",
      },
      {
        day: 3,
        title: "بازگشت",
        body: "تحویل اتاق و پرواز برگشت به تهران.",
      },
    ],
  },
  {
    id: "t3",
    title: "تور شیراز گردی",
    nights: 2,
    days: 3,
    origin: "تهران",
    destination: "شیراز",
    priceFrom: 9800000,
    image: "/images/destinations/shiraz.jpg",
    gallery: [
      "/images/destinations/shiraz.jpg",
      "/images/articles/budget.jpg",
      "/images/destinations/mashhad.jpg",
    ],
    includes: ["پرواز", "هتل", "گشت شهری"],
    excludes: ["وعده‌های غذایی", "ورودی برخی اماکن"],
    departure: "پنجشنبه",
    nextDates: ["پنجشنبه آینده", "۵ شهریور"],
    description:
      "تور فرهنگی شیراز با تمرکز روی حافظیه، سعدیه و بافت تاریخی زندیه.",
    itinerary: [
      {
        day: 1,
        title: "ورود به شیراز",
        body: "ترانسفر فرودگاه و بازدید عصرگاهی از حافظیه.",
      },
      {
        day: 2,
        title: "گشت کامل",
        body: "بازدید از سعدیه، ارگ کریم‌خان و بازار وکیل.",
      },
      {
        day: 3,
        title: "بازگشت",
        body: "وقت آزاد کوتاه و پرواز برگشت.",
      },
    ],
  },
];

export const demoStays: DemoStay[] = [
  {
    id: "s1",
    title: "ویلای ساحلی دوخوابه",
    city: "کیش",
    neighborhood: "سفین",
    type: "ویلا",
    guests: 6,
    rooms: 2,
    beds: 3,
    baths: 2,
    priceFrom: 8900000,
    image: "/images/destinations/kish.jpg",
    gallery: [
      "/images/destinations/kish.jpg",
      "/images/articles/kish.jpg",
      "/images/destinations/tabriz.jpg",
    ],
    rating: 4.8,
    reviews: 96,
    host: "میزبان تایید‌شده · سارا",
    description:
      "ویلای دوبلکس نزدیک ساحل با حیاط و باربیکیو؛ مناسب خانواده و گروه‌های کوچک.",
    amenities: ["آشپزخانه کامل", "پارکینگ", "وای‌فای", "باربیکیو", "نزدیک ساحل"],
    rules: ["ورود از ۱۵:۰۰", "خروج تا ۱۲:۰۰", "مهمانی شبانه ممنوع"],
  },
  {
    id: "s2",
    title: "سوئیت مدرن مرکز شهر",
    city: "تبریز",
    neighborhood: "آبرسان",
    type: "سوئیت",
    guests: 3,
    rooms: 1,
    beds: 2,
    baths: 1,
    priceFrom: 2400000,
    image: "/images/destinations/tabriz.jpg",
    gallery: [
      "/images/destinations/tabriz.jpg",
      "/images/articles/flights.jpg",
      "/images/destinations/mashhad.jpg",
    ],
    rating: 4.6,
    reviews: 54,
    host: "میزبان حرفه‌ای · رضا",
    description:
      "سوئیت جمع‌وجور و تمیز در مرکز تبریز با دسترسی آسان به مترو و مراکز خرید.",
    amenities: ["آشپزخانه کوچک", "ماشین لباسشویی", "وای‌فای", "تلویزیون", "آسانسور"],
    rules: ["ورود از ۱۴:۰۰", "خروج تا ۱۱:۰۰", "بدون حیوان خانگی"],
  },
  {
    id: "s3",
    title: "اقامتگاه سنتی حیاط‌دار",
    city: "شیراز",
    neighborhood: "سنگ‌سیاه",
    type: "اقامتگاه",
    guests: 8,
    rooms: 3,
    beds: 5,
    baths: 2,
    priceFrom: 5100000,
    image: "/images/destinations/shiraz.jpg",
    gallery: [
      "/images/destinations/shiraz.jpg",
      "/images/articles/budget.jpg",
      "/images/promo/tours.jpg",
    ],
    rating: 4.9,
    reviews: 128,
    host: "میزبان محلی · مریم",
    description:
      "خانه سنتی بازسازی‌شده با حوض و حیاط؛ تجربه‌ای اصیل از اقامت در بافت تاریخی شیراز.",
    amenities: ["حیاط", "صبحانه محلی", "تهویه", "پارکینگ محدود", "راهنمای محلی"],
    rules: ["ورود از ۱۵:۰۰", "خروج تا ۱۲:۰۰", "سکوت بعد از ۲۳:۰۰"],
  },
];

export function getDemoHotel(id: string) {
  return demoHotels.find((item) => item.id === id);
}

export function getDemoTour(id: string) {
  return demoTours.find((item) => item.id === id);
}

export function getDemoStay(id: string) {
  return demoStays.find((item) => item.id === id);
}

export const demoTrains: DemoTransport[] = [
  {
    id: "tr1",
    company: "رجا · زندگی",
    origin: "تهران",
    destination: "مشهد",
    departTime: "۱۷:۳۰",
    arriveTime: "۰۵:۱۰",
    duration: "۱۱س ۴۰د",
    seatClass: "۴ تخته",
    price: 980000,
  },
  {
    id: "tr2",
    company: "رجا · غزال",
    origin: "تهران",
    destination: "مشهد",
    departTime: "۲۱:۰۰",
    arriveTime: "۰۷:۲۰",
    duration: "۱۰س ۲۰د",
    seatClass: "۱ تخته",
    price: 1850000,
  },
  {
    id: "tr3",
    company: "فدک",
    origin: "تهران",
    destination: "اصفهان",
    departTime: "۰۷:۱۵",
    arriveTime: "۱۲:۴۰",
    duration: "۵س ۲۵د",
    seatClass: "۵ ستاره",
    price: 720000,
  },
];

export const demoBuses: DemoTransport[] = [
  {
    id: "b1",
    company: "همسفر",
    origin: "تهران",
    destination: "اصفهان",
    departTime: "۰۸:۰۰",
    arriveTime: "۱۲:۳۰",
    duration: "۴س ۳۰د",
    seatClass: "VIP ۲۵ نفره",
    price: 420000,
  },
  {
    id: "b2",
    company: "ایران‌پیما",
    origin: "تهران",
    destination: "شیراز",
    departTime: "۲۱:۳۰",
    arriveTime: "۰۶:۴۵",
    duration: "۹س ۱۵د",
    seatClass: "معمولی",
    price: 380000,
  },
  {
    id: "b3",
    company: "سیر و سفر",
    origin: "تهران",
    destination: "تبریز",
    departTime: "۲۳:۰۰",
    arriveTime: "۰۸:۲۰",
    duration: "۹س ۲۰د",
    seatClass: "VIP",
    price: 510000,
  },
];

export function priceLabel(amount: number) {
  return `${formatToman(amount)} تومان`;
}

export function starsLabel(stars: number) {
  return `${toPersianDigits(stars)} ستاره`;
}
