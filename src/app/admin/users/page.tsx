import { Button } from "@/components/ui/Button";
import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard } from "@/components/panel/PanelShell";
import { adminUsers } from "@/data/panels";
import { formatToman } from "@/lib/utils";

export default function AdminUsersPage() {
  return (
    <PanelCard title="کاربران">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-right text-[13px]">
          <thead>
            <tr className="border-b border-moscowa-border text-moscowa-text-muted">
              <th className="pb-3 font-medium">نام</th>
              <th className="pb-3 font-medium">موبایل</th>
              <th className="pb-3 font-medium">تعداد سفارش</th>
              <th className="pb-3 font-medium">مجموع خرید</th>
              <th className="pb-3 font-medium">وضعیت</th>
              <th className="pb-3 font-medium">اقدام</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user.id} className="border-b border-moscowa-border/70">
                <td className="py-3 font-medium text-moscowa-text">{user.name}</td>
                <td className="py-3" dir="ltr">
                  {user.phone}
                </td>
                <td className="py-3">{user.orders.toLocaleString("fa-IR")}</td>
                <td className="py-3">{formatToman(user.spend)}</td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      user.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {user.status === "active" ? "فعال" : "مسدود"}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <Button href="/admin/orders" size="sm" variant="outline">
                      سفارش‌ها
                    </Button>
                    <ActionButton
                      size="sm"
                      variant="ghost"
                      message={
                        user.status === "active"
                          ? `${user.name} مسدود شد`
                          : `${user.name} فعال شد`
                      }
                    >
                      {user.status === "active" ? "مسدود" : "فعال‌سازی"}
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  );
}
