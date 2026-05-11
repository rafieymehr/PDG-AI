"use client";

interface UsageBarProps {
  used: number;
  limit: number;
}

export default function UsageBar({ used, limit }: UsageBarProps) {
  const pct = Math.min((used / limit) * 100, 100);
  const remaining = limit - used;
  const isNearLimit = remaining <= 3;
  const isAtLimit = remaining <= 0;

  return (
    <div className="mt-4 px-1">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-slate-500">
          {isAtLimit
            ? "Free limit reached"
            : `${used} / ${limit} generations used this month`}
        </span>
        {!isAtLimit && (
          <span className={`text-xs font-medium ${isNearLimit ? "text-amber-600" : "text-slate-400"}`}>
            {remaining} left
          </span>
        )}
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isAtLimit ? "bg-red-500" : isNearLimit ? "bg-amber-400" : "bg-indigo-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
