"use client";

import { PanelShell } from "@/components/panel/PanelShell";
import { adminNav, adminUser } from "@/data/panels";

export function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelShell
      title="پنل مدیریت"
      subtitle="عملیات، مالی و پشتیبانی مسکوا"
      nav={adminNav}
      brandHref="/admin"
      brandLabel="ادمین"
      userName={adminUser.name}
      userMeta={adminUser.role}
      homeHref="/"
    >
      {children}
    </PanelShell>
  );
}
