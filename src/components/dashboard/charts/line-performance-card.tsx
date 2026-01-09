"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeUp } from "@/lib/motion/variants";
import { buildMonthlySeries, dashboardMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Metric, useDashboardStore } from "@/store/dashboard-store";

import { ClientOnly } from "../client-only";
import { LuxuryTooltip } from "./chart-tooltip";

const series = buildMonthlySeries(dashboardMock);

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function metricLabel(metric: Metric) {
  if (metric === "views") return "Views";
  if (metric === "leads") return "Leads";
  return "Revenue";
}

function formatMetric(metric: Metric, value: number) {
  if (metric === "revenue") return currency.format(value);
  return new Intl.NumberFormat(undefined).format(Math.round(value));
}

export function LinePerformanceCard({ className }: { className?: string }) {
  const metric = useDashboardStore((s) => s.metric);
  const setMetric = useDashboardStore((s) => s.setMetric);

  const values = series.map((d) => d[metric] as number);
  const latest = values.at(-1) ?? 0;
  const prev = values.at(-2) ?? latest;
  const deltaPct = prev > 0 ? ((latest - prev) / prev) * 100 : 0;
  const avg = values.reduce((s, n) => s + n, 0) / Math.max(values.length, 1);
  const peakIndex = values.reduce((best, v, i) => (v > (values[best] ?? -Infinity) ? i : best), 0);
  const peakMonth = series[peakIndex]?.month ?? "—";

  return (
    <motion.div variants={fadeUp} className={cn("h-full", className)}>
      <Card
        className={cn(
          "relative h-full overflow-hidden lux-glass lux-hover-glow flex flex-col",
          "border-border/80 hover:border-[color:var(--lux-border-gold)]",
          "shadow-[0_18px_70px_rgba(0,0,0,0.60)]",
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 right-10 h-64 w-64 rounded-full bg-[rgba(2,132,199,0.08)] blur-3xl" />
        </div>

        <CardHeader className="flex flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-Times New Roman text-xl tracking-[0.05em] text-foreground">
              Performance
            </div>
            <div className="mt-1 text-xs tracking-wider text-muted-foreground">
              12-month trend · {metricLabel(metric)}
            </div>
          </div>

          <Tabs value={metric} onValueChange={(v) => setMetric(v as Metric)}>
            <TabsList className="lux-glass border border-border/60">
              <TabsTrigger value="views">Views</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="relative flex flex-1 flex-col px-3 pb-4">
          <div className="w-full flex-1 min-h-[280px] sm:min-h-[320px]">
            <ClientOnly fallback={<div className="h-full w-full" />}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series} margin={{ top: 10, right: 18, left: 0, bottom: 6 }}>
                  <defs>
                    <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--lux-gold-1)" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="var(--lux-gold-2)" stopOpacity={0.95} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="rgba(2,132,199,0.12)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "rgba(31,41,55,0.70)", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(2,132,199,0.20)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(31,41,55,0.70)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={42}
                  />
                  <Tooltip content={<LuxuryTooltip />} cursor={{ stroke: "rgba(2,132,199,0.30)" }} />

                  <Line
                    type="monotone"
                    dataKey={metric}
                    name={metricLabel(metric)}
                    stroke="url(#goldStroke)"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{
                      r: 5,
                      stroke: "var(--lux-gold-1)",
                      strokeWidth: 2,
                      fill: "#FFFFFF",
                    }}
                    isAnimationActive
                    animationDuration={950}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>

          {/* Investor takeaway strip (fills remaining space on tall rows) */}
          <div className="mt-3 rounded-xl border border-border/60 bg-white shadow-[0_2px_10px_rgba(2,132,199,0.08)] px-4 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-[rgba(2,132,199,0.12)]">
                  <TrendingUp className="h-4 w-4 text-[color:var(--lux-gold-2)]" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Momentum</div>
                  <div className="text-sm text-foreground">
                    <span className="bg-gradient-to-r from-[var(--lux-gold-1)] to-[var(--lux-gold-2)] bg-clip-text text-transparent font-medium">
                      {deltaPct >= 0 ? "+" : ""}{deltaPct.toFixed(1)}%
                    </span>{" "}
                    vs last month
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-border/50 bg-[rgba(2,132,199,0.06)] px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Peak</div>
                  <div className="text-xs font-semibold text-foreground">{peakMonth}</div>
                </div>
                <div className="rounded-lg border border-border/50 bg-[rgba(6,182,212,0.06)] px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Avg</div>
                  <div className="text-xs font-semibold text-foreground">{formatMetric(metric, avg)}</div>
                </div>
                <div className="rounded-lg border border-border/50 bg-[rgba(14,165,233,0.06)] px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Latest</div>
                  <div className="text-xs font-semibold text-foreground">{formatMetric(metric, latest)}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
