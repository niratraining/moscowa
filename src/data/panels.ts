import type { ComponentType } from "react";
import {
  BadgePercent,
  CreditCard,
  Headphones,
  LayoutDashboard,
  Plane,
  Settings,
  ShoppingBag,
  Ticket,
  Users,
  UserRound,
  Wallet,
  FileText,
  ChartColumnIncreasing,
} from "lucide-react";

export interface PanelNavItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export const accountNav: PanelNavItem[] = [
  { href: "/account", label: "داشبورد", icon: LayoutDashboard },
  { href: "/account/orders", label: "سفارش‌ها", icon: ShoppingBag },
  { href: "/account/wallet", label: "کیف پول", icon: Wallet },
  { href: "/account/passengers", label: "مسافران من", icon: Users },
  { href: "/account/installments", label: "اقساط", icon: CreditCard },
  { href: "/account/tickets", label: "پشتیبانی", icon: Headphones },
  { href: "/account/profile", label: "پروفایل", icon: UserRound },
];

export const adminNav: PanelNavItem[] = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/orders", label: "سفارش‌ها", icon: Ticket },
  { href: "/admin/users", label: "کاربران", icon: Users },
  { href: "/admin/inventory", label: "پرواز و هتل", icon: Plane },
  { href: "/admin/finance", label: "مالی", icon: ChartColumnIncreasing },
  { href: "/admin/promos", label: "تخفیف‌ها", icon: BadgePercent },
  { href: "/admin/support", label: "تیکت‌ها", icon: Headphones },
  { href: "/admin/reports", label: "گزارش‌ها", icon: FileText },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];

export const accountUser = {
  name: "مهدی معظمی",
  phone: "۰۹۱۲۱۲۳۴۵۶۷",
  email: "mehdi@moscowa.ir",
  tier: "نقره‌ای",
  points: 2480,
};

export const adminUser = {
  name: "ادمین مسکوا",
  role: "مدیر عملیات",
  email: "admin@moscowa.ir",
};

export interface PanelOrder {
  id: string;
  type: string;
  title: string;
  date: string;
  amount: number;
  status: "issued" | "pending" | "refunded" | "failed";
}

export const accountOrders: PanelOrder[] = [
  {
    id: "NT-482913",
    type: "پرواز",
    title: "تهران → مشهد · IR244",
    date: "۱۴۰۵/۰۵/۲۱",
    amount: 1280000,
    status: "issued",
  },
  {
    id: "NT-482640",
    type: "هتل",
    title: "هتل آسمان کیش · ۲ شب",
    date: "۱۴۰۵/۰۵/۱۸",
    amount: 6200000,
    status: "issued",
  },
  {
    id: "NT-481102",
    type: "تور",
    title: "تور ۳ روزه کیش",
    date: "۱۴۰۵/۰۵/۱۰",
    amount: 12400000,
    status: "pending",
  },
  {
    id: "NT-479880",
    type: "پرواز",
    title: "تهران → شیراز",
    date: "۱۴۰۵/۰۴/۲۸",
    amount: 980000,
    status: "refunded",
  },
];

export const accountPassengers = [
  {
    id: "p1",
    name: "مهدی معظمی",
    nationalId: "۰۰۱۰۰۰۰۰۰۱",
    gender: "مرد",
    birthDate: "۱۳۷۰/۰۲/۱۵",
  },
  {
    id: "p2",
    name: "سارا معظمی",
    nationalId: "۰۰۱۰۰۰۰۰۰۲",
    gender: "زن",
    birthDate: "۱۳۷۲/۰۸/۰۳",
  },
];

export const accountWalletTx = [
  { id: "w1", title: "شارژ کیف پول", amount: 5000000, type: "in" as const, date: "۱۴۰۵/۰۵/۲۰" },
  { id: "w2", title: "خرید پرواز IR244", amount: 1280000, type: "out" as const, date: "۱۴۰۵/۰۵/۲۱" },
  { id: "w3", title: "استرداد هتل", amount: 890000, type: "in" as const, date: "۱۴۰۵/۰۵/۲۲" },
];

export const accountInstallments = [
  {
    id: "ins1",
    title: "تور استانبول",
    total: 28900000,
    paid: 2,
    months: 12,
    nextDue: "۱۴۰۵/۰۶/۰۱",
    monthly: 2408333,
  },
];

export const accountTickets = [
  {
    id: "TK-2201",
    subject: "تغییر تاریخ پرواز مشهد",
    status: "open",
    updatedAt: "۱۴۰۵/۰۵/۲۲",
  },
  {
    id: "TK-2188",
    subject: "پیگیری استرداد هتل کیش",
    status: "answered",
    updatedAt: "۱۴۰۵/۰۵/۱۹",
  },
];

export const adminStats = [
  { id: "s1", label: "فروش امروز", value: "۱۸۶M", change: "+۱۲٪", tone: "up" as const },
  { id: "s2", label: "سفارش فعال", value: "۱٬۲۴۸", change: "+۸٪", tone: "up" as const },
  { id: "s3", label: "نرخ کنسلی", value: "۳٫۲٪", change: "-۰٫۴٪", tone: "up" as const },
  { id: "s4", label: "تیکت باز", value: "۳۷", change: "+۵", tone: "down" as const },
];

export const adminOrders: PanelOrder[] = [
  ...accountOrders,
  {
    id: "NT-483001",
    type: "قطار",
    title: "تهران → مشهد · غزال",
    date: "۱۴۰۵/۰۵/۲۳",
    amount: 1850000,
    status: "pending",
  },
  {
    id: "NT-483120",
    type: "اقامتگاه",
    title: "ویلای ساحلی کیش",
    date: "۱۴۰۵/۰۵/۲۳",
    amount: 8900000,
    status: "issued",
  },
];

export const adminUsers = [
  { id: "u1", name: "مهدی معظمی", phone: "۰۹۱۲۱۲۳۴۵۶۷", orders: 12, spend: 48200000, status: "active" },
  { id: "u2", name: "نرگس احمدی", phone: "۰۹۳۵۱۱۱۲۲۳۳", orders: 4, spend: 15600000, status: "active" },
  { id: "u3", name: "رضا کریمی", phone: "۰۹۱۹۸۸۷۷۶۶۵", orders: 1, spend: 1280000, status: "blocked" },
];

export const adminInventory = [
  { id: "i1", type: "پرواز", title: "THR → MHD · ایران‌ایر", stock: "۴۲ صندلی", price: 1280000 },
  { id: "i2", type: "هتل", title: "هتل درویشی مشهد", stock: "۱۸ اتاق", price: 4200000 },
  { id: "i3", type: "تور", title: "تور ۴ روزه استانبول", stock: "۱۲ پکیج", price: 28900000 },
];

export const adminSupport = [
  { id: "TK-3011", user: "مهدی معظمی", subject: "تأخیر در صدور بلیط", priority: "بالا", status: "open" },
  { id: "TK-3004", user: "نرگس احمدی", subject: "درخواست فاکتور رسمی", priority: "متوسط", status: "in_progress" },
  { id: "TK-2991", user: "رضا کریمی", subject: "مشکل پرداخت اقساطی", priority: "بالا", status: "resolved" },
];

export const adminSalesSeries = [
  { day: "ش", value: 42 },
  { day: "ی", value: 55 },
  { day: "د", value: 48 },
  { day: "س", value: 70 },
  { day: "چ", value: 62 },
  { day: "پ", value: 88 },
  { day: "ج", value: 76 },
];

export const orderStatusLabel: Record<PanelOrder["status"], string> = {
  issued: "صادر شده",
  pending: "در انتظار",
  refunded: "استرداد شده",
  failed: "ناموفق",
};

export const orderStatusClass: Record<PanelOrder["status"], string> = {
  issued: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  refunded: "bg-sky-50 text-sky-700",
  failed: "bg-rose-50 text-rose-700",
};
