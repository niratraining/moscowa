/**
 * Homepage content & marketing metrics.
 *
 * IMPORTANT: Numeric marketing claims (years of experience, hotel counts,
 * airline counts, customer counts, etc.) are CONFIGURABLE PLACEHOLDERS.
 * Replace with verified business data before production launch.
 */

export type DestinationType = "domestic" | "international";

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface QuickService {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "club" | "wallet" | "refund" | "insurance" | "hotel" | "installment";
}

export interface PopularDestination {
  id: string;
  city: string;
  origin: string;
  priceFrom: number;
  type: DestinationType;
  image: string;
  href: string;
  hotelCount: number;
}

export interface TrustMetric {
  id: string;
  title: string;
  description: string;
  icon: "direct" | "voucher" | "price" | "support";
}

export interface TrustPoint {
  id: string;
  title: string;
  description: string;
}

export interface TravelArticle {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  image: string;
  href: string;
}

export interface CityOption {
  code: string;
  name: string;
  subtitle?: string;
}

export const siteConfig = {
  name: "مسکوا",
  nameEn: "Moscowa",
  description:
    "رزرو هتل‌های روسیه، از مسکو تا سن‌پترزبورگ، با قیمت واقعی، پشتیبانی ۲۴/۷ و امکان سفر اقساطی.",
  url: "https://moscowa.ir",
  phone: "۰۲۱-۴۱۵۶۷",
  phoneHref: "tel:+982141567",
  email: "support@moscowa.ir",
  supportHours: "۲۴/۷",
};

export const mainNav: NavItem[] = [
  { id: "home", label: "صفحه اصلی", href: "/" },
  { id: "flights", label: "پرواز", href: "/flights" },
  { id: "hotels", label: "هتل", href: "/hotels" },
  { id: "tours", label: "تور", href: "/tours" },
  { id: "stays", label: "اقامتگاه", href: "/stays" },
  { id: "trains", label: "قطار", href: "/trains" },
  { id: "buses", label: "اتوبوس", href: "/buses" },
  { id: "insurance", label: "بیمه مسافرتی", href: "/insurance" },
  { id: "services", label: "خدمات سفر", href: "/services" },
  { id: "guide", label: "راهنما", href: "/guide" },
];

export interface FooterLinkGroup {
  id: string;
  title: string;
  links: NavItem[];
}

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    id: "company",
    title: "مسکوا",
    links: [
      { id: "about", label: "درباره ما", href: "/about" },
      { id: "careers", label: "فرصت‌های شغلی", href: "/careers" },
      { id: "guide", label: "راهنمای سفر", href: "/guide" },
      { id: "support", label: "تماس با ما", href: "/support" },
    ],
  },
  {
    id: "services",
    title: "خدمات",
    links: [
      { id: "flights", label: "بلیط پرواز", href: "/flights" },
      { id: "hotels", label: "رزرو هتل", href: "/hotels" },
      { id: "tours", label: "تور مسافرتی", href: "/tours" },
      { id: "trains", label: "بلیط قطار", href: "/trains" },
      { id: "buses", label: "بلیط اتوبوس", href: "/buses" },
    ],
  },
  {
    id: "support",
    title: "پشتیبانی",
    links: [
      { id: "faq", label: "سوالات متداول", href: "/faq" },
      { id: "refund", label: "قوانین استرداد", href: "/refund" },
      { id: "insurance", label: "بیمه مسافرتی", href: "/insurance" },
      { id: "installment", label: "خرید اقساطی", href: "/installment" },
    ],
  },
  {
    id: "business",
    title: "همکاری با ما",
    links: [
      { id: "partners", label: "معرفی همکاری", href: "/partners" },
      { id: "agency", label: "ثبت‌نام آژانس همکار", href: "/partners/agencies" },
      { id: "corporate", label: "سفر سازمانی", href: "/corporate" },
      { id: "club", label: "باشگاه مشتریان", href: "/club" },
    ],
  },
];

export const cities: CityOption[] = [
  { code: "THR", name: "تهران", subtitle: "تهران (همه فرودگاه‌ها)" },
  { code: "MHD", name: "مشهد", subtitle: "مشهد" },
  { code: "IFN", name: "اصفهان", subtitle: "اصفهان" },
  { code: "SYZ", name: "شیراز", subtitle: "شیراز" },
  { code: "TBZ", name: "تبریز", subtitle: "تبریز" },
  { code: "KIH", name: "کیش", subtitle: "کیش" },
  { code: "IST", name: "استانبول", subtitle: "استانبول (همه فرودگاه‌ها)" },
  { code: "DXB", name: "دبی", subtitle: "دبی" },
  { code: "AYT", name: "آنتالیا", subtitle: "آنتالیا" },
];

export const hotelCities: CityOption[] = [
  { code: "MOW", name: "مسکو", subtitle: "مسکو، روسیه" },
  { code: "LED", name: "سن پترزبورگ", subtitle: "سن پترزبورگ، روسیه" },
  { code: "AER", name: "سوچی", subtitle: "سوچی، روسیه" },
  { code: "KZN", name: "کازان", subtitle: "کازان، روسیه" },
];

export interface HotelDirectoryItem {
  id: string;
  name: string;
  cityCode: string;
  cityName: string;
  area?: string;
  stars?: number;
}

export const hotelDirectory: HotelDirectoryItem[] = [
  { id: "mow-ritz", name: "The Ritz-Carlton Moscow", cityCode: "MOW", cityName: "مسکو", area: "میدان سرخ", stars: 5 },
  { id: "mow-metropol", name: "Hotel Metropol Moscow", cityCode: "MOW", cityName: "مسکو", area: "مرکز شهر", stars: 5 },
  { id: "mow-national", name: "Hotel National Moscow", cityCode: "MOW", cityName: "مسکو", area: "کرملین", stars: 5 },
  { id: "mow-izmailovo", name: "Izmailovo Cosmos Hotel", cityCode: "MOW", cityName: "مسکو", area: "ایزمایلوو", stars: 4 },
  { id: "led-astoria", name: "Hotel Astoria", cityCode: "LED", cityName: "سن پترزبورگ", area: "میدان سنت آیزاک", stars: 5 },
  { id: "led-kempinski", name: "Kempinski Hotel Moika 22", cityCode: "LED", cityName: "سن پترزبورگ", area: "نوسکی پراسپکت", stars: 5 },
  { id: "led-corinthia", name: "Corinthia Hotel St. Petersburg", cityCode: "LED", cityName: "سن پترزبورگ", area: "نوسکی پراسپکت", stars: 5 },
  { id: "aer-radisson", name: "Radisson Collection Paradise Resort & Spa", cityCode: "AER", cityName: "سوچی", area: "ساحل", stars: 5 },
  { id: "aer-rodina", name: "Rodina Grand Hotel & Spa", cityCode: "AER", cityName: "سوچی", area: "مرکز شهر", stars: 5 },
  { id: "kzn-mirage", name: "Mirage Hotel Kazan", cityCode: "KZN", cityName: "کازان", area: "مرکز شهر", stars: 4 },
  { id: "kzn-ramada", name: "Ramada by Wyndham Kazan City Center", cityCode: "KZN", cityName: "کازان", area: "مرکز شهر", stars: 4 },
];

export const quickServices: QuickService[] = [
  {
    id: "club",
    title: "باشگاه مشتریان",
    description: "امتیاز بگیرید، سفر رایگان",
    href: "/club",
    icon: "club",
  },
  {
    id: "wallet",
    title: "کیف پول",
    description: "شارژ و پرداخت آسان",
    href: "/wallet",
    icon: "wallet",
  },
  {
    id: "refund",
    title: "استرداد آنلاین",
    description: "سریع، شفاف و بدون دردسر",
    href: "/refund",
    icon: "refund",
  },
  {
    id: "insurance",
    title: "بیمه مسافرتی",
    description: "سفر امن‌تر، آرامش بیشتر",
    href: "/insurance",
    icon: "insurance",
  },
  {
    id: "hotel-intl",
    title: "هتل خارجی",
    description: "رزرو بهترین هتل‌ها",
    href: "/hotels?scope=international",
    icon: "hotel",
  },
  {
    id: "installment",
    title: "سفر اقساطی",
    description: "سفر کنید، پرداخت بعد",
    href: "/installment",
    icon: "installment",
  },
];

export const popularDestinations: PopularDestination[] = [
  {
    id: "moscow",
    city: "مسکو",
    origin: "روسیه",
    priceFrom: 4200000,
    type: "international",
    image: "/images/hero/moscow-red-square.jpg",
    href: "/search/hotels?destination=مسکو",
    hotelCount: 128,
  },
  {
    id: "saint-petersburg",
    city: "سن پترزبورگ",
    origin: "روسیه",
    priceFrom: 3850000,
    type: "international",
    image: "/images/hero/historical-museum-facade.jpg",
    href: "/search/hotels?destination=سن پترزبورگ",
    hotelCount: 96,
  },
  {
    id: "kazan",
    city: "کازان",
    origin: "روسیه",
    priceFrom: 3100000,
    type: "international",
    image: "/images/hero/kul-sharif-mosque.jpg",
    href: "/search/hotels?destination=کازان",
    hotelCount: 54,
  },
  {
    id: "sochi",
    city: "سوچی",
    origin: "روسیه",
    priceFrom: 3450000,
    type: "international",
    image: "/images/mood/coastal-resort.jpg",
    href: "/search/hotels?destination=سوچی",
    hotelCount: 71,
  },
];

export interface TripVibe {
  id: string;
  label: string;
  icon: "landmark" | "church" | "waves";
}

export interface VibePlace {
  id: string;
  vibeId: string;
  name: string;
  cityLabel: "مسکو" | "سن‌پترزبورگ";
  area: string;
  proximity: string;
  /** Omit when no verified photo is available yet — renders an icon placeholder instead. */
  image?: string;
  href: string;
}

/**
 * PLACEHOLDER PROXIMITY LABELS — verify walking times before production.
 * Only landmarks in Moscow and Saint Petersburg. Entries without an `image`
 * don't have a verified photo yet — swap one in at the given path and it
 * will render automatically. Each href routes to hotel results filtered
 * near that specific landmark.
 */
export const tripVibes: TripVibe[] = [
  { id: "historical", label: "تاریخی و میراث فرهنگی", icon: "landmark" },
  { id: "religious", label: "کلیساها و اماکن مذهبی", icon: "church" },
  { id: "riverside", label: "کنار رودخانه و غروب", icon: "waves" },
];

export const vibePlaces: VibePlace[] = [
  // --- تاریخی و میراث فرهنگی ---
  {
    id: "saint-basils",
    vibeId: "historical",
    name: "کلیسای سنت باسیل",
    cityLabel: "مسکو",
    area: "میدان سرخ",
    proximity: "هتل‌های نزدیک میدان سرخ",
    image: "/images/hero/moscow-red-square.jpg",
    href: "/search/hotels?destination=مسکو&near=saint-basils",
  },
  {
    id: "historical-museum",
    vibeId: "historical",
    name: "موزه ملی تاریخ روسیه",
    cityLabel: "مسکو",
    area: "میدان سرخ",
    proximity: "هتل‌های نزدیک میدان سرخ",
    image: "/images/hero/historical-museum-facade.jpg",
    href: "/search/hotels?destination=مسکو&near=historical-museum",
  },
  {
    id: "winter-palace",
    vibeId: "historical",
    name: "کاخ زمستانی و موزه ارمیتاژ",
    cityLabel: "سن‌پترزبورگ",
    area: "میدان کاخ",
    proximity: "هتل‌های نزدیک میدان کاخ",
    href: "/search/hotels?destination=سن پترزبورگ&near=winter-palace",
  },
  {
    id: "peter-paul-fortress",
    vibeId: "historical",
    name: "قلعه پطر و پولس",
    cityLabel: "سن‌پترزبورگ",
    area: "جزیره زایاچی",
    proximity: "هتل‌های نزدیک جزیره زایاچی",
    href: "/search/hotels?destination=سن پترزبورگ&near=peter-paul-fortress",
  },

  // --- کلیساها و اماکن مذهبی ---
  {
    id: "christ-saviour",
    vibeId: "religious",
    name: "کلیسای مسیح ناجی",
    cityLabel: "مسکو",
    area: "نزدیک خیابان آربات",
    proximity: "هتل‌های نزدیک این کلیسا",
    image: "/images/hero/christ-saviour-cathedral.jpg",
    href: "/search/hotels?destination=مسکو&near=christ-saviour",
  },
  {
    id: "savior-on-blood",
    vibeId: "religious",
    name: "کلیسای نجات‌دهنده خون‌ریخته‌شده",
    cityLabel: "سن‌پترزبورگ",
    area: "کنار کانال گریبایدوف",
    proximity: "هتل‌های نزدیک این کلیسا",
    href: "/search/hotels?destination=سن پترزبورگ&near=savior-on-blood",
  },
  {
    id: "kazan-cathedral-spb",
    vibeId: "religious",
    name: "کلیسای جامع کازان",
    cityLabel: "سن‌پترزبورگ",
    area: "خیابان نوسکی پراسپکت",
    proximity: "هتل‌های نزدیک نوسکی پراسپکت",
    href: "/search/hotels?destination=سن پترزبورگ&near=kazan-cathedral-spb",
  },

  // --- کنار رودخانه و غروب ---
  {
    id: "moskva-embankment",
    vibeId: "riverside",
    name: "ساحل رود مسکوا",
    cityLabel: "مسکو",
    area: "نزدیک کرملین",
    proximity: "هتل‌های نزدیک این ساحل",
    image: "/images/hero/moscow-river-embankment.jpg",
    href: "/search/hotels?destination=مسکو&near=moskva-embankment",
  },
  {
    id: "neva-embankment",
    vibeId: "riverside",
    name: "ساحل رود نوا",
    cityLabel: "سن‌پترزبورگ",
    area: "نزدیک کاخ زمستانی",
    proximity: "هتل‌های نزدیک این ساحل",
    href: "/search/hotels?destination=سن پترزبورگ&near=neva-embankment",
  },
  {
    id: "peterhof",
    vibeId: "riverside",
    name: "کاخ و باغ‌های پترهوف",
    cityLabel: "سن‌پترزبورگ",
    area: "کنار خلیج فنلاند",
    proximity: "هتل‌های نزدیک پترهوف",
    href: "/search/hotels?destination=سن پترزبورگ&near=peterhof",
  },
];

/**
 * PLACEHOLDER METRICS — verify before production.
 * These values are for UI layout and marketing mock presentation only.
 */
export const trustMetrics: TrustMetric[] = [
  {
    id: "direct",
    title: "رزرو مستقیم",
    description: "ارتباط مستقیم با هتل‌های روسیه، بدون واسطه‌ی اضافه",
    icon: "direct",
  },
  {
    id: "voucher",
    title: "واچر آنی",
    description: "بلافاصله بعد از رزرو، واچر معتبر هتل صادر می‌شود",
    icon: "voucher",
  },
  {
    id: "price",
    title: "نرخ رقابتی",
    description: "چون مستقیم رزرو می‌کنیم، قیمت واقعی‌تری می‌بینید",
    icon: "price",
  },
  {
    id: "support",
    title: "پشتیبانی محلی",
    description: "تیم ما در مسکو و سن‌پترزبورگ همراه شماست",
    icon: "support",
  },
];

export interface LoyaltyTier {
  id: string;
  level: number;
  status: "unlocked" | "locked";
  title: string;
  requirement: string;
  discount: string;
}

export const loyaltyTiers: LoyaltyTier[] = [
  {
    id: "level-1",
    level: 1,
    status: "unlocked",
    title: "ثبت‌نام و ورود",
    requirement: "همین حالا با ثبت‌نام رایگان فعال می‌شود",
    discount: "۵٪ تخفیف",
  },
  {
    id: "level-2",
    level: 2,
    status: "locked",
    title: "مسافر همیشگی",
    requirement: "بعد از ۲ رزرو تکمیل‌شده باز می‌شود",
    discount: "۷٪ تخفیف",
  },
  {
    id: "level-3",
    level: 3,
    status: "locked",
    title: "عضو طلایی",
    requirement: "بعد از ۵ رزرو تکمیل‌شده باز می‌شود",
    discount: "۱۰ تا ۱۵٪ تخفیف",
  },
];

export interface LoyaltyPerk {
  id: string;
  title: string;
  description: string;
  icon: "cancel" | "support" | "priority" | "gift";
}

export const loyaltyPerks: LoyaltyPerk[] = [
  {
    id: "cancel",
    title: "لغو رایگان",
    description: "کنسلی بدون جریمه در بیشتر هتل‌های همکار",
    icon: "cancel",
  },
  {
    id: "support",
    title: "پشتیبانی اختصاصی",
    description: "اولویت پاسخ‌گویی برای اعضای باشگاه",
    icon: "support",
  },
  {
    id: "priority",
    title: "دسترسی زودتر",
    description: "دیدن تخفیف‌های ویژه پیش از انتشار عمومی",
    icon: "priority",
  },
  {
    id: "gift",
    title: "هدیه تولد",
    description: "کد تخفیف اختصاصی در ماه تولد شما",
    icon: "gift",
  },
];

export interface FeaturedHotel {
  id: string;
  name: string;
  nameEn?: string;
  city: string;
  stars: number;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  amenities: ("wifi" | "breakfast" | "parking" | "gym" | "pool")[];
  image: string;
  originalPrice: number;
  memberPrice: number;
  href: string;
}

export const featuredHotels: FeaturedHotel[] = [
  {
    id: "bolshoy-moscow",
    name: "هتل بولشوی مسکو",
    nameEn: "Bolshoy Hotel Moscow",
    city: "مسکو، روسیه",
    stars: 5,
    rating: 9.1,
    ratingLabel: "عالی",
    reviewCount: 842,
    amenities: ["wifi", "breakfast", "gym"],
    image: "/images/hero/moscow-river-embankment.jpg",
    originalPrice: 4900000,
    memberPrice: 4200000,
    href: "/hotels/bolshoy-moscow",
  },
  {
    id: "neva-premium-petersburg",
    name: "هتل نوا پرمیوم",
    nameEn: "Neva Premium Hotel",
    city: "سن‌پترزبورگ، روسیه",
    stars: 4,
    rating: 8.8,
    ratingLabel: "خیلی خوب",
    reviewCount: 613,
    amenities: ["wifi", "parking", "breakfast"],
    image: "/images/hero/villa-terrace.jpg",
    originalPrice: 4300000,
    memberPrice: 3850000,
    href: "/hotels/neva-premium-petersburg",
  },
  {
    id: "kazan-palace",
    name: "هتل کازان پالاس",
    nameEn: "Kazan Palace Hotel",
    city: "کازان، روسیه",
    stars: 4,
    rating: 8.6,
    ratingLabel: "خیلی خوب",
    reviewCount: 401,
    amenities: ["wifi", "pool", "parking"],
    image: "/images/hero/christ-saviour-cathedral.jpg",
    originalPrice: 3600000,
    memberPrice: 3100000,
    href: "/hotels/kazan-palace",
  },
];

export const trustPoints: TrustPoint[] = [
  {
    id: "refund",
    title: "استرداد شفاف",
    description: "فرآیند استرداد آنلاین با وضعیت قابل پیگیری",
  },
  {
    id: "final-price",
    title: "قیمت نهایی بدون هزینه پنهان",
    description: "همان قیمتی که می‌بینید، همان مبلغ پرداختی است",
  },
  {
    id: "real-support",
    title: "پشتیبانی واقعی",
    description: "همراهی انسانی در تمام مسیر سفر",
  },
  {
    id: "secure-pay",
    title: "پرداخت امن",
    description: "درگاه‌های معتبر و رمزنگاری‌شده",
  },
  {
    id: "tracking",
    title: "پیگیری آنلاین سفارش",
    description: "وضعیت رزرو و بلیط همیشه در دسترس شماست",
  },
];

export const corporateFeatures = [
  "مدیریت کاربران سازمان",
  "سقف و سیاست سفر",
  "گزارش هزینه",
  "صورتحساب تجمیعی",
  "پشتیبانی اختصاصی",
  "پرداخت اعتباری",
];

export const installmentHighlights = [
  { id: "months", title: "تا ۱۲ ماه", description: "بازپرداخت منعطف" },
  {
    id: "online",
    title: "ثبت درخواست آنلاین",
    description: "بدون مراجعه حضوری",
  },
  {
    id: "simple",
    title: "بدون پیچیدگی بانکی",
    description: "فرآیند ساده و شفاف",
  },
];

export const travelArticles: TravelArticle[] = [
  {
    id: "istanbul-guide",
    title: "راهنمای سفر به استانبول",
    category: "مقاصد خارجی",
    readingTime: "۸ دقیقه مطالعه",
    image: "/images/articles/istanbul.jpg",
    href: "/guide/istanbul",
  },
  {
    id: "kish-season",
    title: "بهترین زمان سفر به کیش",
    category: "مقاصد داخلی",
    readingTime: "۵ دقیقه مطالعه",
    image: "/images/articles/kish.jpg",
    href: "/guide/kish-best-time",
  },
  {
    id: "cheap-flights",
    title: "راهنمای انتخاب پرواز ارزان",
    category: "نکات سفر",
    readingTime: "۶ دقیقه مطالعه",
    image: "/images/articles/flights.jpg",
    href: "/guide/cheap-flights",
  },
  {
    id: "budget-travel",
    title: "چطور هزینه سفر را مدیریت کنیم؟",
    category: "بودجه‌بندی",
    readingTime: "۷ دقیقه مطالعه",
    image: "/images/articles/budget.jpg",
    href: "/guide/budget-travel",
  },
];

export interface RussianDish {
  id: string;
  name: string;
  nameRu: string;
  city: "مسکو" | "سن پترزبورگ" | "سراسر روسیه";
  category: string;
  description: string;
  image: string;
}

export const russianDishes: RussianDish[] = [
  {
    id: "borscht",
    name: "بورش",
    nameRu: "Борщ",
    city: "سراسر روسیه",
    category: "سوپ",
    description: "سوپ چغندر قرمز با خامه ترش، معروف‌ترین غذای خانگی روسیه.",
    image: "/images/food/borscht.jpg",
  },
  {
    id: "pelmeni",
    name: "پلمنی",
    nameRu: "Пельмени",
    city: "سراسر روسیه",
    category: "غذای اصلی",
    description: "خمیر گوشت به شکل خوشه، شبیه پیراشکی سیبری، سرو با خامه ترش.",
    image: "/images/food/pelmeni.jpg",
  },
  {
    id: "beef-stroganoff",
    name: "استروگانف گوشت",
    nameRu: "Бефстроганов",
    city: "مسکو",
    category: "غذای اصلی",
    description: "تکه‌های نازک گوشت گاو در سس خامه‌ای، از غذاهای کلاسیک مسکو.",
    image: "/images/food/beef-stroganoff.jpg",
  },
  {
    id: "shuba",
    name: "سالاد شوبا",
    nameRu: "Селёдка под шубой",
    city: "سراسر روسیه",
    category: "پیش‌غذا",
    description: "سالاد لایه‌ای شاه‌ماهی دودی، چغندر و سیب‌زمینی؛ ثابت سفره‌های جشن.",
    image: "/images/food/shuba.jpg",
  },
  {
    id: "olivier",
    name: "سالاد الویه",
    nameRu: "Оливье",
    city: "سراسر روسیه",
    category: "پیش‌غذا",
    description: "سالاد سیب‌زمینی، مرغ، تخم‌مرغ و نخود‌فرنگی با سس مایونز.",
    image: "/images/food/olivier.jpg",
  },
  {
    id: "solyanka",
    name: "سولیانکا",
    nameRu: "Солянка",
    city: "سن پترزبورگ",
    category: "سوپ",
    description: "سوپ ترش و تند با انواع گوشت یا ماهی، پرطرفدار در فصل سرد.",
    image: "/images/food/solyanka.jpg",
  },
  {
    id: "blini",
    name: "بلینی",
    nameRu: "Блины",
    city: "سراسر روسیه",
    category: "صبحانه",
    description: "کرپ نازک روسی، سرو شده با خاویار، عسل یا خامه ترش.",
    image: "/images/food/blini.jpg",
  },
  {
    id: "pirozhki",
    name: "پیراشکی",
    nameRu: "Пирожки",
    city: "سن پترزبورگ",
    category: "میان‌وعده",
    description: "نان کوچک پرشده با گوشت، سیب‌زمینی یا کلم، غذای خیابانی محبوب.",
    image: "/images/food/pirozhki.jpg",
  },
];
