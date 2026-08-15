import { Button } from "@/components/ui/Button";
import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard, StatCard } from "@/components/panel/PanelShell";
import { accountWalletTx } from "@/data/panels";
import { formatToman } from "@/lib/utils";

export default function AccountWalletPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="موجودی قابل استفاده" value={formatToman(4610000)} hint="تومان" />
        <StatCard label="شارژ این ماه" value={formatToman(5000000)} />
        <StatCard label="پرداخت از کیف پول" value={formatToman(1280000)} />
      </div>

      <PanelCard
        title="تراکنش‌ها"
        action={
          <ActionButton size="sm" message="درگاه شارژ کیف پول باز شد (دمو)" successLabel="ثبت شد">
            شارژ کیف پول
          </ActionButton>
        }
      >
        <ul className="space-y-3">
          {accountWalletTx.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between rounded-2xl bg-moscowa-bg-secondary px-4 py-3"
            >
              <div>
                <p className="text-[14px] font-semibold text-moscowa-text">{tx.title}</p>
                <p className="text-[12px] text-moscowa-text-muted">{tx.date}</p>
              </div>
              <p
                className={`text-[14px] font-bold ${
                  tx.type === "in" ? "text-emerald-600" : "text-moscowa-text"
                }`}
              >
                {tx.type === "in" ? "+" : "-"}
                {formatToman(tx.amount)}
              </p>
            </li>
          ))}
        </ul>
        <Button href="/wallet" variant="outline" className="mt-4">
          صفحه عمومی کیف پول
        </Button>
      </PanelCard>
    </div>
  );
}
