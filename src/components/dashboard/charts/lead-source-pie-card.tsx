"use client";

import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fadeUp } from "@/lib/motion/variants";
import { dashboardMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { ClientOnly } from "../client-only";
import { LuxuryTooltip } from "./chart-tooltip";

const fills = [
  "rgba(2,132,199,0.92)",
  "rgba(6,182,212,0.88)",
  "rgba(14,165,233,0.85)",
  "rgba(56,189,248,0.82)",
  "rgba(125,211,252,0.78)",
];

export function LeadSourcePieCard({ className }: { className?: string }) {
  return (
    <motion.div variants={fadeUp} className={cn("h-full", className)}>
      <Card
        className={cn(
          "relative h-full overflow-hidden lux-glass lux-hover-glow",
          "border-border/80 hover:border-[color:var(--lux-border-gold)]",
          "shadow-[0_18px_70px_rgba(0,0,0,0.60)]",
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-10 h-56 w-56 rounded-full bg-[rgba(2,132,199,0.08)] blur-3xl" />
        </div>

        <CardHeader className="px-6">
          <div className="font-Times New Roman text-lg tracking-[0.05em] text-foreground">Lead Source Share</div>
          <div className="mt-1 text-xs tracking-wider text-muted-foreground">Distribution by channel</div>
        </CardHeader>

        <CardContent className="relative px-2 pb-6">
          <div className="h-[240px] w-full">
            <ClientOnly fallback={<div className="h-full w-full" />}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<LuxuryTooltip />} />
                  <Pie
                    data={dashboardMock.leadSources}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={56}
                    outerRadius={92}
                    paddingAngle={2}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  >
                    {dashboardMock.leadSources.map((_, i) => (
                      <Cell key={i} fill={fills[i % fills.length]} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>

          <div className="mt-2 grid gap-2 px-4">
            {dashboardMock.leadSources.slice(0, 3).map((s, i) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: fills[i] }} />
                  <div className="text-xs text-foreground/90">{s.name}</div>
                </div>
                <div className="text-xs text-muted-foreground">{s.value}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
