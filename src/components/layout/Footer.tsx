import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { footerColumns, siteConfig } from "@/data/homepage";

export function Footer() {
  return (
    <footer className="border-t border-moscowa-border bg-moscowa-bg-secondary">
      <div className="container-page section-spacing !pb-10 !pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="relative mb-4 inline-block h-14 w-[200px]">
              <Image
                src="/brand/logo-horizontal.png"
                alt={siteConfig.name}
                fill
                className="object-contain object-right"
                sizes="200px"
              />
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

          <FooterColumn title="خدمات" links={footerColumns.services} />
          <FooterColumn title="راهنما" links={footerColumns.guide} />
          <FooterColumn title="مسکوا" links={footerColumns.company} />
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-[15px] font-bold text-moscowa-text">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14px] text-moscowa-text-secondary transition-colors hover:text-moscowa-purple"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
