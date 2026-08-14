"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ActionButton } from "@/components/ui/ActionButton";
import { PanelCard } from "@/components/panel/PanelShell";
import { accountPassengers } from "@/data/panels";

export default function AccountPassengersPage() {
  const [passengers, setPassengers] = useState(accountPassengers);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  function addPassenger() {
    if (!name.trim()) {
      window.dispatchEvent(
        new CustomEvent("moscowa-toast", { detail: "نام مسافر را وارد کنید" }),
      );
      return;
    }
    setPassengers((prev) => [
      ...prev,
      {
        id: `p${Date.now()}`,
        name: name.trim(),
        nationalId: "۰۰۰۰۰۰۰۰۰۰",
        gender: "مرد",
        birthDate: "۱۳۷۰/۰۱/۰۱",
      },
    ]);
    setName("");
    setShowForm(false);
    window.dispatchEvent(
      new CustomEvent("moscowa-toast", { detail: "مسافر اضافه شد" }),
    );
  }

  return (
    <PanelCard
      title="مسافران ذخیره‌شده"
      action={
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "بستن فرم" : "افزودن مسافر"}
        </Button>
      }
    >
      {showForm ? (
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-moscowa-border bg-moscowa-bg-secondary p-4 sm:flex-row">
          <input
            className="h-11 flex-1 rounded-xl border border-moscowa-border bg-white px-3 text-[14px]"
            placeholder="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={addPassenger}>ذخیره</Button>
        </div>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        {passengers.map((passenger) => (
          <article
            key={passenger.id}
            className="rounded-2xl border border-moscowa-border bg-moscowa-bg-secondary p-4"
          >
            <h3 className="text-[15px] font-bold text-moscowa-text">{passenger.name}</h3>
            <dl className="mt-3 space-y-1 text-[13px] text-moscowa-text-secondary">
              <div className="flex justify-between gap-3">
                <dt>کد ملی</dt>
                <dd dir="ltr">{passenger.nationalId}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>جنسیت</dt>
                <dd>{passenger.gender}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>تاریخ تولد</dt>
                <dd>{passenger.birthDate}</dd>
              </div>
            </dl>
            <div className="mt-4 flex gap-2">
              <ActionButton size="sm" variant="outline" message="فرم ویرایش باز شد (دمو)">
                ویرایش
              </ActionButton>
              <ActionButton
                size="sm"
                variant="ghost"
                message={`${passenger.name} حذف شد`}
                onClick={() =>
                  setPassengers((prev) => prev.filter((p) => p.id !== passenger.id))
                }
              >
                حذف
              </ActionButton>
            </div>
          </article>
        ))}
      </div>
    </PanelCard>
  );
}
