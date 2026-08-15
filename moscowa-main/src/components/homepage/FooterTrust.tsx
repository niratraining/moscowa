import { trustPoints } from "@/data/homepage";

export function FooterTrust() {
  return (
    <section className="border-y border-moscowa-border bg-white" aria-label="اعتماد و
      اطمینان">
      <div className="container-page py-8 sm:py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustPoints.map((point) => (
            <li key={point.id} className="min-w-0">
              <p className="text-[14px] font-semibold text-moscowa-text">
                {point.title}
              </p>
              <p className="mt-1 text-[12.5px] leading-6 text-moscowa-text-secondary">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
