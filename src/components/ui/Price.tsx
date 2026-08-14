import { formatToman } from "@/lib/utils";

interface PriceProps {
  amount: number;
  prefix?: string;
  className?: string;
}

export function Price({
  amount,
  prefix = "از",
  className,
}: PriceProps) {
  return (
    <div className={className}>
      <span className="text-[13px] text-moscowa-text-muted">{prefix} </span>
      <span className="text-[16px] font-bold text-moscowa-purple">
        {formatToman(amount)}
      </span>
      <span className="mr-1 text-[12px] text-moscowa-text-secondary">تومان</span>
    </div>
  );
}
