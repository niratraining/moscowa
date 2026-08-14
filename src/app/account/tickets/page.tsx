"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard } from "@/components/panel/PanelShell";
import { accountTickets } from "@/data/panels";

const statusMap: Record<string, string> = {
  open: "باز",
  answered: "پاسخ داده شده",
};

export default function AccountTicketsPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [tickets, setTickets] = useState(accountTickets);

  function submitTicket() {
    if (!subject.trim() || !body.trim()) {
      window.dispatchEvent(
        new CustomEvent("moscowa-toast", { detail: "موضوع و توضیحات را کامل کنید" }),
      );
      return;
    }
    setTickets((prev) => [
      {
        id: `TK-${2200 + prev.length + 1}`,
        subject: subject.trim(),
        status: "open",
        updatedAt: "همین الان",
      },
      ...prev,
    ]);
    setSubject("");
    setBody("");
    window.dispatchEvent(
      new CustomEvent("moscowa-toast", { detail: "تیکت با موفقیت ثبت شد" }),
    );
  }

  return (
    <div className="space-y-6">
      <PanelCard
        title="تیکت‌های پشتیبانی"
        action={
          <Button
            size="sm"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            تیکت جدید
          </Button>
        }
      >
        <div className="space-y-3">
          {tickets.map((ticket) => (
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
                <p className="mt-1 text-[12px] text-moscowa-text-secondary">
                  آخرین بروزرسانی: {ticket.updatedAt}
                </p>
              </div>
              <span className="rounded-full bg-moscowa-bg-secondary px-3 py-1 text-[12px] font-medium text-moscowa-purple">
                {statusMap[ticket.status] ?? ticket.status}
              </span>
            </article>
          ))}
        </div>
      </PanelCard>

      <div ref={formRef}>
        <PanelCard title="ثبت تیکت جدید">
          <div className="grid gap-3">
            <input
              className="h-11 rounded-xl border border-moscowa-border px-3 text-[14px]"
              placeholder="موضوع"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="min-h-[120px] rounded-xl border border-moscowa-border px-3 py-3 text-[14px]"
              placeholder="توضیحات"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <ActionButton className="w-fit" onClick={submitTicket} message="تیکت ارسال شد">
              ارسال
            </ActionButton>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
