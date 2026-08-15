"use client";

import { PanelShell } from "@/components/panel/PanelShell";
import { accountNav, accountUser } from "@/data/panels";

export function AccountPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelShell
      title="حساب کاربری"
      subtitle="مدیریت سفارش‌ها، کیف پول و پروفایل"
      nav={accountNav}
      brandHref="/account"
      brandLabel="پنل مسافر"
      userName={accountUser.name}
      userMeta={accountUser.tier}
      homeHref="/"
    >
      {children}
    </PanelShell>
  );
}
