import Link from "next/link";
import {
  Instagram,
  Landmark,
  Linkedin,
  Mail,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { siteConfig } from "@/data/homepage";

export function Footer() {
  return (
    <footer className="border-t border-moscowa-border bg-moscowa-bg-secondary">
      <div className="container-page section-spacing !pb-10 !pt-14">
        <div className="max-w-xl">
          <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-moscowa-purple to-moscowa-purple-dark text-white shadow-soft">
              <Landmark className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-[20px] font-bold text-moscowa-text">
              {siteConfig.name}
            </span>
          </Link>
          <p className="max-w-md text-[14px] leading-8 text-moscowa-text-secondary">
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
          <div className="mt-5 flex items-center gap-2">
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
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-moscowa-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-moscowa-text-muted">
            © مسکوا — تمامی حقوق محفوظ است.
          </p>
          <div className="flex flex-wrap gap-2">
            {["نماد اعتماد", "پرداخت امن", "عضویت انجمن"].map((item) => (
              <span
                key={item}
                className="rounded-xl border border-moscowa-border bg-white px-3 py-2 text-[12px] text-moscowa-text-secondary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
