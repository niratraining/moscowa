import Link from "next/link";
import {
  Apple,
  Instagram,
  Landmark,
  Linkedin,
  Mail,
  Phone,
  PlayCircle,
  Send,
  Twitter,
} from "lucide-react";
import { siteConfig } from "@/data/homepage";

export function Footer() {
  return (
    <footer className="border-t border-moscowa-border bg-moscowa-bg-secondary">
      <div className="container-page section-spacing !py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-moscowa-purple to-moscowa-purple-dark text-white shadow-soft">
                <Landmark className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-[16px] font-bold text-moscowa-text">
                {siteConfig.name}
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-moscowa-text-secondary">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-1.5 hover:text-moscowa-purple"
              >
                <Phone className="h-3.5 w-3.5 text-moscowa-purple" />
                <span dir="ltr">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1.5 hover:text-moscowa-purple"
              >
                <Mail className="h-3.5 w-3.5 text-moscowa-purple" />
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {[Instagram, Twitter, Linkedin, Send].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="شبکه اجتماعی"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-moscowa-border bg-white text-moscowa-purple transition-colors hover:bg-moscowa-purple hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <span className="h-6 w-px bg-moscowa-border" />
            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="App Store"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-moscowa-border bg-white text-moscowa-text-secondary transition-colors hover:border-moscowa-purple/40 hover:text-moscowa-purple"
              >
                <Apple className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Google Play"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-moscowa-border bg-white text-moscowa-text-secondary transition-colors hover:border-moscowa-purple/40 hover:text-moscowa-purple"
              >
                <PlayCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-moscowa-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-moscowa-text-muted">
            © مسکوا — تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-3 text-[12px] text-moscowa-text-secondary">
            <span>فارسی</span>
            <span className="h-3 w-px bg-moscowa-border" />
            <span>تومان (IRT)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
