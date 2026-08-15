import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  CreditCard,
  Gift,
  Headphones,
  Plane,
  ShieldCheck,
  Wallet,
  Briefcase,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ActionButton } from "@/components/ui/ActionButton";
import { PageHero } from "@/components/layout/PageHero";
import { FaqAccordionDemo } from "@/components/demo/FaqAccordionDemo";
import { InstallmentCalculatorDemo } from "@/components/demo/InstallmentCalculatorDemo";
import { formatToman } from "@/lib/utils";

function DemoBadge() {
  return (
    <span className="inline-flex rounded-full bg-moscowa-orange/10 px-3 py-1 text-[12px] font-medium text-moscowa-orange">
      نسخه دمو · داده نمونه
    </span>
  );
}

export function WalletDemoPage() {
  const tx = [
    {
      id: 1,
      title: "شارژ کیف پول",
      amount: 5000000,
      type: "in" as const,
      date: "۱۴۰۵/۰۵/۲۰",
    },
    {
      id: 2,
      title: "خرید پرواز IR244",
      amount: 1280000,
      type: "out" as const,
      date: "۱۴۰۵/۰۵/۲۱",
    },
    {
      id: 3,
      title: "استرداد هتل کیش",
      amount: 890000,
      type: "in" as const,
      date: "۱۴۰۵/۰۵/۲۲",
    },
  ];

  return (
    <>
      <PageHero
        title="کیف پول مسکوا"
        description="موجودی را شارژ کنید و رزروها را سریع‌تر پرداخت کنید."
        breadcrumbs={[{ label: "کیف پول" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[24px] bg-[linear-gradient(145deg,#4f2f7c,#6b4a96)] p-6 text-white sm:p-8">
            <div className="flex items-center gap-3">
              <Wallet className="h-6 w-6" />
              <p className="text-[14px] text-white/80">موجودی قابل برداشت</p>
            </div>
            <p className="mt-4 text-[36px] font-bold">
              {formatToman(4610000)}
              <span className="mr-2 text-[16px] font-medium">تومان</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/account/wallet" variant="white">
                شارژ کیف پول
              </Button>
              <Button href="/account/wallet" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                انتقال
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[1000000, 2000000, 5000000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="rounded-xl bg-white/10 px-2 py-3 text-[12px] font-medium backdrop-blur-sm hover:bg-white/15"
                >
                  {formatToman(amount)}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-moscowa-border bg-white p-5 sm:p-6">
            <h2 className="text-[18px] font-bold text-moscowa-text">تراکنش‌های اخیر</h2>
            <ul className="mt-4 space-y-3">
              {tx.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-moscowa-bg-secondary px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                        item.type === "in"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-orange-50 text-moscowa-orange"
                      }`}
                    >
                      {item.type === "in" ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-moscowa-text">
                        {item.title}
                      </p>
                      <p className="text-[12px] text-moscowa-text-muted">{item.date}</p>
                    </div>
                  </div>
                  <p
                    className={`text-[14px] font-bold ${
                      item.type === "in" ? "text-emerald-600" : "text-moscowa-text"
                    }`}
                  >
                    {item.type === "in" ? "+" : "-"}
                    {formatToman(item.amount)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export function ClubDemoPage() {
  const tiers = [
    { name: "برنزی", points: "۰–۹۹۹", perk: "۵٪ امتیاز بیشتر" },
    { name: "نقره‌ای", points: "۱٬۰۰۰–۴٬۹۹۹", perk: "اولویت پشتیبانی" },
    { name: "طلایی", points: "۵٬۰۰۰+", perk: "تخفیف ویژه تور" },
  ];

  return (
    <>
      <PageHero
        title="باشگاه مشتریان"
        description="با هر رزرو امتیاز بگیرید و به سفر بعدی پاداش تبدیل کنید."
        breadcrumbs={[{ label: "باشگاه مشتریان" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="rounded-[24px] border border-moscowa-border bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[13px] text-moscowa-orange">سطح فعلی: نقره‌ای</p>
              <h2 className="mt-1 text-[24px] font-bold text-moscowa-text">
                ۲٬۴۸۰ امتیاز
              </h2>
              <p className="mt-2 text-[14px] text-moscowa-text-secondary">
                تا سطح طلایی ۲٬۵۲۰ امتیاز مانده
              </p>
            </div>
            <Button href="/account">مشاهده پاداش‌ها</Button>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-moscowa-bg-secondary">
            <div className="h-full w-[49%] rounded-full bg-[linear-gradient(90deg,#4f2f7c,#f84209)]" />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-[20px] border border-moscowa-border bg-white p-5"
            >
              <Gift className="h-5 w-5 text-moscowa-purple" />
              <h3 className="mt-3 text-[17px] font-bold text-moscowa-text">
                {tier.name}
              </h3>
              <p className="mt-1 text-[13px] text-moscowa-text-muted">{tier.points}</p>
              <p className="mt-3 text-[14px] text-moscowa-text-secondary">{tier.perk}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function InstallmentDemoPage() {
  return (
    <>
      <PageHero
        title="سفر اقساطی"
        description="الان سفر کنید و هزینه را در چند قسط بپردازید."
        breadcrumbs={[{ label: "سفر اقساطی" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <InstallmentCalculatorDemo />
      </section>
    </>
  );
}

export function RefundDemoPage() {
  const steps = ["انتخاب سفارش", "بررسی قوانین", "ثبت درخواست", "واریز وجه"];
  const tickets = [
    {
      id: "RF-1024",
      product: "پرواز تهران → مشهد",
      status: "در حال بررسی",
      amount: 1280000,
    },
    {
      id: "RF-1011",
      product: "هتل آسمان کیش",
      status: "واریز شده",
      amount: 3100000,
    },
  ];

  return (
    <>
      <PageHero
        title="استرداد آنلاین"
        description="درخواست استرداد را آنلاین ثبت کنید و وضعیت را مرحله‌به‌مرحله ببینید."
        breadcrumbs={[{ label: "استرداد آنلاین" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="grid gap-3 sm:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-2xl border border-moscowa-border bg-white p-4 text-center"
            >
              <p className="text-[12px] text-moscowa-orange">
                مرحله {(index + 1).toLocaleString("fa-IR")}
              </p>
              <p className="mt-1 text-[14px] font-bold text-moscowa-text">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {tickets.map((ticket) => (
            <article
              key={ticket.id}
              className="flex flex-col gap-4 rounded-[20px] border border-moscowa-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[12px] text-moscowa-text-muted" dir="ltr">
                  {ticket.id}
                </p>
                <h3 className="mt-1 text-[16px] font-bold text-moscowa-text">
                  {ticket.product}
                </h3>
                <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                  مبلغ: {formatToman(ticket.amount)} تومان
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-moscowa-bg-secondary px-3 py-1 text-[12px] font-medium text-moscowa-purple">
                  {ticket.status}
                </span>
                <Button href={`/account/orders`} size="sm" variant="outline">
                  جزئیات
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Button href="/guide/refund-policy" variant="outline">
            قوانین استرداد
          </Button>
        </div>
      </section>
    </>
  );
}

export function InsuranceDemoPage() {
  const plans = [
    {
      name: "پایه",
      price: 890000,
      cover: "تا ۵۰٬۰۰۰ یورو",
      items: ["درمان سرپایی", "بیمارستانی", "گم شدن چمدان"],
    },
    {
      name: "استاندارد",
      price: 1450000,
      cover: "تا ۱۰۰٬۰۰۰ یورو",
      items: ["همه پوشش‌های پایه", "تأخیر پرواز", "لغو سفر"],
      featured: true,
    },
    {
      name: "کامل",
      price: 2290000,
      cover: "تا ۲۵۰٬۰۰۰ یورو",
      items: ["پوشش کامل", "ورزش‌های تفریحی", "پشتیبانی ۲۴/۷"],
    },
  ];

  return (
    <>
      <PageHero
        title="بیمه مسافرتی"
        description="سفر را با آرامش بیشتر برنامه‌ریزی کنید؛ طرح مناسب مقصدتان را انتخاب کنید."
        breadcrumbs={[{ label: "بیمه مسافرتی" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[22px] border p-6 ${
                plan.featured
                  ? "border-moscowa-purple bg-[color-mix(in_srgb,var(--color-moscowa-purple)_6%,white)] shadow-card"
                  : "border-moscowa-border bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-moscowa-purple" />
                <h2 className="text-[18px] font-bold text-moscowa-text">{plan.name}</h2>
              </div>
              <p className="mt-4 text-[28px] font-bold text-moscowa-purple">
                {formatToman(plan.price)}
              </p>
              <p className="text-[13px] text-moscowa-text-muted">پوشش {plan.cover}</p>
              <ul className="mt-5 space-y-2 text-[14px] text-moscowa-text-secondary">
                {plan.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <ActionButton className="mt-6 w-full" variant={plan.featured ? "primary" : "outline"} message={`طرح ${plan.name} انتخاب شد`}>
                انتخاب طرح
              </ActionButton>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function ServicesHubDemoPage() {
  const items = [
    { href: "/wallet", title: "کیف پول", desc: "شارژ و پرداخت سریع", icon: Wallet },
    { href: "/club", title: "باشگاه مشتریان", desc: "امتیاز و پاداش سفر", icon: Gift },
    { href: "/refund", title: "استرداد", desc: "پیگیری آنلاین", icon: CreditCard },
    { href: "/installment", title: "سفر اقساطی", desc: "پرداخت منعطف", icon: Plane },
    { href: "/insurance", title: "بیمه", desc: "پوشش درمانی سفر", icon: ShieldCheck },
    { href: "/support", title: "پشتیبانی", desc: "۲۴/۷ همراه شما", icon: Headphones },
  ];

  return (
    <>
      <PageHero
        title="خدمات سفر"
        description="همه ابزارهای مکمل سفر در یکجا؛ از کیف پول تا اقساط و پشتیبانی."
        breadcrumbs={[{ label: "خدمات سفر" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[20px] border border-moscowa-border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-moscowa-purple)_10%,white)] text-moscowa-purple">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-[17px] font-bold text-moscowa-text group-hover:text-moscowa-purple">
                  {item.title}
                </h2>
                <p className="mt-1 text-[14px] text-moscowa-text-secondary">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function CorporateDemoPage() {
  return (
    <>
      <PageHero
        title="سفر سازمانی"
        description="مدیریت متمرکز سفر کارکنان، کنترل هزینه و گزارش‌گیری در یک پنل."
        breadcrumbs={[{ label: "سفر سازمانی" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "سفر این ماه", value: "۱۲۴" },
            { label: "صرفه‌جویی تقریبی", value: "۱۸٪" },
            { label: "در انتظار تأیید", value: "۹" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[20px] border border-moscowa-border bg-white p-5"
            >
              <p className="text-[13px] text-moscowa-text-muted">{stat.label}</p>
              <p className="mt-2 text-[28px] font-bold text-moscowa-purple">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-[22px] border border-moscowa-border bg-white">
          <div className="border-b border-moscowa-border px-5 py-4">
            <h2 className="text-[16px] font-bold text-moscowa-text">
              درخواست‌های اخیر (دمو)
            </h2>
          </div>
          <div className="divide-y divide-moscowa-border">
            {[
              ["واحد فروش", "تهران → دبی", "در انتظار"],
              ["منابع انسانی", "تهران → مشهد", "تأیید شده"],
              ["فناوری", "تهران → استانبول", "صادر شده"],
            ].map(([team, route, status]) => (
              <div
                key={route + team}
                className="grid gap-2 px-5 py-4 text-[14px] sm:grid-cols-3"
              >
                <span className="font-medium text-moscowa-text">{team}</span>
                <span className="text-moscowa-text-secondary">{route}</span>
                <span className="text-moscowa-purple sm:text-left">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <Button href="/corporate/request" size="lg" className="mt-8">
          درخواست پنل سازمانی
        </Button>
      </section>
    </>
  );
}

export function AboutDemoPage() {
  return (
    <>
      <PageHero
        title="درباره مسکوا"
        description="پلتفرم Travel-Tech برای رزرو هوشمند پرواز، هتل، تور و خدمات سفر."
        breadcrumbs={[{ label: "درباره ما" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { value: "۱M+", label: "رزرو سالانه (هدف)" },
            { value: "۲۴/۷", label: "پشتیبانی واقعی" },
            { value: "۶+", label: "خدمت اصلی سفر" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[20px] bg-[linear-gradient(160deg,#f7f4fb,#fff)] border border-moscowa-border p-6 text-center"
            >
              <p className="text-[28px] font-bold text-moscowa-purple">{item.value}</p>
              <p className="mt-1 text-[13px] text-moscowa-text-secondary">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "ماموریت",
              body: "ساده‌سازی سفر با قیمت شفاف و تجربه کاربری مدرن.",
            },
            {
              title: "ارزش‌ها",
              body: "اعتماد، سرعت، پشتیبانی واقعی و نوآوری محصول.",
            },
            {
              title: "چشم‌انداز",
              body: "مرجع هوشمند سفر در بازار ایران با تمرکز بر اقساط و سازمانی.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[20px] border border-moscowa-border bg-white p-5"
            >
              <Building2 className="h-5 w-5 text-moscowa-purple" />
              <h2 className="mt-3 text-[17px] font-bold text-moscowa-text">
                {item.title}
              </h2>
              <p className="mt-2 text-[14px] leading-7 text-moscowa-text-secondary">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function PartnersDemoPage() {
  return (
    <>
      <PageHero
        title="همکاری با ما"
        description="آژانس، تأمین‌کننده یا شریک فناوری؛ با مسکوا رشد کنید."
        breadcrumbs={[{ label: "همکاری با ما" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Plane,
              title: "تأمین‌کنندگان",
              body: "ظرفیت پرواز، هتل و تور را به شبکه فروش ما وصل کنید.",
            },
            {
              icon: Users,
              title: "آژانس‌ها",
              body: "ابزار فروش، کمیسیون شفاف و مدیریت رزرو متمرکز.",
            },
            {
              icon: Building2,
              title: "فناوری",
              body: "یکپارچه‌سازی API و همکاری محصولی مشترک.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[20px] border border-moscowa-border bg-white p-5"
              >
                <Icon className="h-5 w-5 text-moscowa-purple" />
                <h2 className="mt-3 text-[17px] font-bold text-moscowa-text">
                  {item.title}
                </h2>
                <p className="mt-2 text-[14px] leading-7 text-moscowa-text-secondary">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 rounded-[22px] border border-moscowa-border bg-moscowa-bg-secondary p-6 sm:p-8">
          <h2 className="text-[20px] font-bold text-moscowa-text">فرم درخواست همکاری (دمو)</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              className="h-12 rounded-xl border border-moscowa-border bg-white px-4 text-[14px]"
              placeholder="نام شرکت"
            />
            <input
              className="h-12 rounded-xl border border-moscowa-border bg-white px-4 text-[14px]"
              placeholder="شماره تماس"
            />
            <select className="h-12 rounded-xl border border-moscowa-border bg-white px-4 text-[14px] sm:col-span-2">
              <option>نوع همکاری</option>
              <option>تأمین‌کننده</option>
              <option>آژانس</option>
              <option>فناوری</option>
            </select>
          </div>
          <ActionButton className="mt-5" message="درخواست همکاری ارسال شد">
            ارسال درخواست
          </ActionButton>
        </div>
      </section>
    </>
  );
}

export function CareersDemoPage() {
  const jobs = [
    {
      title: "Product Designer",
      team: "محصول",
      type: "تمام‌وقت · تهران / دورکاری",
    },
    {
      title: "Frontend Engineer",
      team: "مهندسی",
      type: "تمام‌وقت · تهران",
    },
    {
      title: "Customer Support Lead",
      team: "عملیات",
      type: "تمام‌وقت · تهران",
    },
  ];

  return (
    <>
      <PageHero
        title="فرصت‌های شغلی"
        description="روی محصول Travel-Tech کار کنید و تجربه سفر میلیون‌ها نفر را بسازید."
        breadcrumbs={[{ label: "فرصت‌های شغلی" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="space-y-4">
          {jobs.map((job) => (
            <article
              key={job.title}
              className="flex flex-col gap-4 rounded-[20px] border border-moscowa-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-moscowa-purple)_10%,white)] text-moscowa-purple">
                  <Briefcase className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-[16px] font-bold text-moscowa-text">
                    {job.title}
                  </h2>
                  <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                    {job.team} · {job.type}
                  </p>
                </div>
              </div>
              <ActionButton size="sm" message={`رزومه برای ${job.title} ارسال شد`}>
                ارسال رزومه
              </ActionButton>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function FaqDemoPage() {
  return (
    <>
      <PageHero
        title="سوالات متداول"
        description="پاسخ پرسش‌های پرتکرار درباره رزرو، پرداخت، استرداد و پشتیبانی."
        breadcrumbs={[{ label: "سوالات متداول" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <FaqAccordionDemo />
        <div className="mt-8 text-center">
          <Button href="/support" variant="outline">
            هنوز سوال دارید؟ پشتیبانی
          </Button>
        </div>
      </section>
    </>
  );
}

export function SupportDemoPage() {
  return (
    <>
      <PageHero
        title="پشتیبانی مسکوا"
        description="تیم پشتیبانی ۲۴/۷ آماده پاسخگویی و پیگیری سفارش‌هاست."
        breadcrumbs={[{ label: "پشتیبانی" }]}
      >
        <DemoBadge />
      </PageHero>
      <section className="container-page section-spacing !pt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Headphones, title: "تلفن", value: "۰۲۱-۴۱۵۶۷" },
            { icon: FileText, title: "ایمیل", value: "support@moscowa.ir" },
            { icon: Users, title: "ساعات پاسخگویی", value: "۲۴ ساعته" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[20px] border border-moscowa-border bg-white p-5"
              >
                <Icon className="h-5 w-5 text-moscowa-purple" />
                <p className="mt-3 text-[13px] text-moscowa-text-muted">{item.title}</p>
                <p className="mt-1 text-[16px] font-bold text-moscowa-text">{item.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[22px] border border-moscowa-border bg-white p-6 sm:p-8">
          <h2 className="text-[18px] font-bold text-moscowa-text">ثبت تیکت (دمو)</h2>
          <div className="mt-4 grid gap-3">
            <input
              className="h-12 rounded-xl border border-moscowa-border px-4 text-[14px]"
              placeholder="موضوع"
            />
            <textarea
              className="min-h-[120px] rounded-xl border border-moscowa-border px-4 py-3 text-[14px]"
              placeholder="توضیحات مشکل یا درخواست"
            />
            <ActionButton className="w-fit" message="تیکت پشتیبانی ثبت شد">
              ارسال تیکت
            </ActionButton>
          </div>
        </div>
      </section>
    </>
  );
}
