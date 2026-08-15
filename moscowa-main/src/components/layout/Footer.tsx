import Link from "next/link";
import {
  Apple,
  BadgeCheck,
  Building2,
  Instagram,
  Landmark,
  Linkedin,
  Mail,
  Percent,
  Phone,
  PlayCircle,
  Send,
  Twitter,
} from "lucide-react";
import { footerLinkGroups, siteConfig } from "@/data/homepage";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="border-t border-moscowa-border bg-moscowa-bg-secondary">
      <div className="container-page section-spacing !pb-8 !pt-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-moscowa-purple to-moscowa-purple-dark text-white shadow-soft">
                <Landmark className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-[20px] font-bold text-moscowa-text">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-[14px] leading-8 text-moscowa-text-secondary">
              {siteConfig.description}
            </p>
            <div className="mt-5 space-y-2 text-[14px] text-moscowa-text-secondary">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 hover:text-moscowa-purple"
              >
                <Phone className="h-4 w-4 text-moscowa-purple" />
                <span dir="ltr">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-moscowa-purple"
              >
                <Mail className="h-4 w-4 text-moscowa-purple" />
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="w-full rounded-[20px] border border-moscowa-border bg-white p-5 sm:p-6 lg:w-[380px] lg:shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-moscowa-purple)_8%,white)] text-moscowa-purple">
                <Building2 className="h-4 w-4" />
              </span>
              <p className="text-[15px] font-bold text-moscowa-text">
                پنل آژانس‌های همکار
              </p>
            </div>
            <p className="mt-3 text-[12.5px] leading-6 text-moscowa-text-secondary">
              آژانس مسافرتی خود را ثبت کنید، با برند اختصاصی واچر صادر کنید و
              از هر رزرو کمیسیون همکاری دریافت کنید.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-moscowa-bg-secondary px-2.5 py-1.5 text-[11.5px] font-medium text-moscowa-text-secondary">
                <BadgeCheck className="h-3.5 w-3.5 text-moscowa-purple" />
                واچر با لوگوی شما
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-moscowa-bg-secondary px-2.5 py-1.5 text-[11.5px] font-medium text-moscowa-text-secondary">
                <Percent className="h-3.5 w-3.5 text-moscowa-purple" />
                کمیسیون هر رزرو
              </span>
            </div>
            <Button href="/partners/agencies" size="md" className="mt-4 w-full">
              ثبت‌نام آژانس همکار
            </Button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-moscowa-border pt-10 sm:grid-cols-4">
          {footerLinkGroups.map((group) => (
            <div key={group.id}>
              <p className="text-[13px] font-bold text-moscowa-text">
                {group.title}
              </p>
              <ul className="mt-3.5 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-moscowa-text-secondary transition-colors hover:text-moscowa-purple"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-moscowa-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {[Instagram, Twitter, Linkedin, Send].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="شبکه اجتماعی"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-moscowa-border bg-white text-moscowa-purple transition-colors hover:bg-moscowa-purple hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-moscowa-border bg-white px-3.5 py-2.5 text-[12.5px] font-medium text-moscowa-text transition-colors hover:border-moscowa-purple/40 hover:text-moscowa-purple"
            >
              <Apple className="h-4 w-4" />
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-moscowa-border bg-white px-3.5 py-2.5 text-[12.5px] font-medium text-moscowa-text transition-colors hover:border-moscowa-purple/40 hover:text-moscowa-purple"
            >
              <PlayCircle className="h-4 w-4" />
              Google Play
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-moscowa-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-moscowa-text-muted">
            © مسکوا — تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-3 text-[12.5px] text-moscowa-text-secondary">
            <span>فارسی</span>
            <span className="h-3 w-px bg-moscowa-border" />
            <span>تومان (IRT)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
