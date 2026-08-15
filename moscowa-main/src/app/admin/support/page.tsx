import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard } from "@/components/panel/PanelShell";
import { adminSupport } from "@/data/panels";

const statusLabel: Record<string, string> = {
  open: "باز",
  in_progress: "در حال پیگیری",
  resolved: "بسته شده",
};

export default function AdminSupportPage() {
  return (
    <PanelCard title="تیکت‌های پشتیبانی">
      <div className="space-y-3">
        {adminSupport.map((ticket) => (
          <article
            key={ticket.id}
            className="flex flex-col gap-3 rounded-2xl border border-moscowa-border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-[12px] text-moscowa-text-muted" dir="ltr">
                {ticket.id}
              </p>
              <h3 className="mt-1 text-[15px] font-bold text-moscowa-text">
                {ticket.subject}
              </h3>
              <p className="mt-1 text-[13px] text-moscowa-text-secondary">
                {ticket.user} · اولویت {ticket.priority}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-moscowa-bg-secondary px-3 py-1 text-[12px] text-moscowa-purple">
                {statusLabel[ticket.status]}
              </span>
              <ActionButton
                size="sm"
                variant="outline"
                message={`پاسخ برای ${ticket.id} ثبت شد`}
              >
                پاسخ
              </ActionButton>
            </div>
          </article>
        ))}
      </div>
    </PanelCard>
  );
}
