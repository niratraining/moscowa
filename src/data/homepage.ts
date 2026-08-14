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
}

export interface TrustMetric {
  id: string;
  value: string;
  label: string;
  icon: "experience" | "hotels" | "airlines" | "price" | "support" | "customers";
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
    "رزرو پرواز، هتل، تور، قطار و اتوبوس با قیمت واقعی، پشتیبانی ۲۴/۷ و امکان سفر اقساطی.",
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
    id: "istanbul",
    city: "استانبول",
    origin: "از تهران",
    priceFrom: 6890000,
    type: "international",
    image: "/images/destinations/istanbul.jpg",
    href: "/search/flights?origin=THR&destination=IST",
  },
  {
    id: "isfahan",
    city: "اصفهان",
    origin: "از تهران",
    priceFrom: 2350000,
    type: "domestic",
    image: "/images/destinations/isfahan-mosque.jpg",
    href: "/search/flights?origin=THR&destination=IFN",
  },
  {
    id: "shiraz",
    city: "شیراز",
    origin: "از تهران",
    priceFrom: 2180000,
    type: "domestic",
    image: "/images/destinations/shiraz-hafez.jpg",
    href: "/search/flights?origin=THR&destination=SYZ",
  },
  {
    id: "kish",
    city: "کیش",
    origin: "از تهران",
    priceFrom: 3120000,
    type: "domestic",
    image: "/images/mood/coastal-resort.jpg",
    href: "/search/flights?origin=THR&destination=KIH",
  },
  {
    id: "mashhad",
    city: "مشهد",
    origin: "از تهران",
    priceFrom: 1280000,
    type: "domestic",
    image: "/images/destinations/mashhad-shrine.jpg",
    href: "/search/flights?origin=THR&destination=MHD",
  },
];

/**
 * PLACEHOLDER METRICS — verify before production.
 * These values are for UI layout and marketing mock presentation only.
 */
export const trustMetrics: TrustMetric[] = [
  {
    id: "experience",
    value: "۱۴+",
    label: "سال تجربه در صنعت سفر",
    icon: "experience",
  },
  {
    id: "hotels",
    value: "+۱ میلیون",
    label: "هتل در سراسر دنیا",
    icon: "hotels",
  },
  {
    id: "airlines",
    value: "+۷۰۰",
    label: "هواپیمای داخلی و خارجی",
    icon: "airlines",
  },
  {
    id: "price",
    value: "بهترین قیمت",
    label: "مقایسه سریع و شفاف",
    icon: "price",
  },
  {
    id: "support",
    value: "۲۴/۷",
    label: "پشتیبانی آنلاین",
    icon: "support",
  },
  {
    id: "customers",
    value: "+۱ میلیون",
    label: "مشتری راضی",
    icon: "customers",
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

export const footerColumns = {
  services: [
    { label: "پرواز", href: "/flights" },
    { label: "هتل", href: "/hotels" },
    { label: "تور", href: "/tours" },
    { label: "قطار", href: "/trains" },
    { label: "اتوبوس", href: "/buses" },
    { label: "بیمه مسافرتی", href: "/insurance" },
  ],
  guide: [
    { label: "راهنمای خرید", href: "/guide/buying" },
    { label: "قوانین استرداد", href: "/guide/refund-policy" },
    { label: "سوالات متداول", href: "/faq" },
    { label: "پشتیبانی", href: "/support" },
  ],
  company: [
    { label: "درباره ما", href: "/about" },
    { label: "همکاری با ما", href: "/partners" },
    { label: "سفر سازمانی", href: "/corporate" },
    { label: "فرصت‌های شغلی", href: "/careers" },
    { label: "پنل کاربری", href: "/account" },
    { label: "پنل ادمین", href: "/admin" },
  ],
};
