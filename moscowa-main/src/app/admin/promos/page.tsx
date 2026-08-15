import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard } from "@/components/panel/PanelShell";

const promos = [
  { code: "MOSCOWA1405", off: "۱۰٪", usage: "۱۲۸", status: "فعال" },
  { code: "KISHVIP", off: "۵۰۰٬۰۰۰ تومان", usage: "۴۲", status: "فعال" },
  { code: "SPRING24", off: "۱۵٪", usage: "۸۹۰", status: "منقضی" },
];

export default function AdminPromosPage() {
  return (
    <PanelCard
      title="کدهای تخفیف"
      action={
        <ActionButton size="sm" message="کد تخفیف جدید ساخته شد: MOSCOWADEMO">
          کد جدید
        </ActionButton>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-right text-[13px]">
          <thead>
            <tr className="border-b border-moscowa-border text-moscowa-text-muted">
              <th className="pb-3 font-medium">کد</th>
              <th className="pb-3 font-medium">تخفیف</th>
              <th className="pb-3 font-medium">مصرف</th>
              <th className="pb-3 font-medium">وضعیت</th>
              <th className="pb-3 font-medium">اقدام</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((promo) => (
              <tr key={promo.code} className="border-b border-moscowa-border/70">
                <td className="py-3 font-medium text-moscowa-purple" dir="ltr">
                  {promo.code}
                </td>
                <td className="py-3">{promo.off}</td>
                <td className="py-3">{promo.usage}</td>
                <td className="py-3">{promo.status}</td>
                <td className="py-3">
                  <ActionButton size="sm" variant="outline" message={`کد ${promo.code} کپی شد`}>
                    کپی
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  );
}
