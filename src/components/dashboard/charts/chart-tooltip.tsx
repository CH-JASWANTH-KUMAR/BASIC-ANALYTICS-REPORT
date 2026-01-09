"use client";

type LuxuryTooltipProps = {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    dataKey?: string | number;
  }>;
  label?: string | number;
};

export function LuxuryTooltip({ active, payload, label }: LuxuryTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="lux-glass lux-hover-glow lux-gold-stroke rounded-xl px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
      <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-1 space-y-1">
        {payload.map((p, i) => (
          <div
            key={(p.dataKey ?? p.name ?? i).toString()}
            className="flex items-center justify-between gap-4"
          >
            <div className="text-xs text-foreground/90">{p.name}</div>
            <div className="text-xs font-medium text-foreground">
              {typeof p.value === "number" ? new Intl.NumberFormat(undefined).format(p.value) : p.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
