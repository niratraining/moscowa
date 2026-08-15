"use client";

import { useEffect, useState } from "react";

export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    function onToast(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      setMessage(detail);
      window.setTimeout(() => setMessage(null), 2200);
    }
    window.addEventListener("moscowa-toast", onToast);
    return () => window.removeEventListener("moscowa-toast", onToast);
  }, []);

  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-2xl bg-moscowa-purple px-5 py-3 text-[13px] font-medium text-white shadow-card"
    >
      {message}
    </div>
  );
}
