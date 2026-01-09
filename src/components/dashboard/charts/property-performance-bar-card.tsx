"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fadeUp } from "@/lib/motion/variants";
import { dashboardMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { ClientOnly } from "../client-only";
import { LuxuryTooltip } from "./chart-tooltip";

const data = dashboardMock.properties.map((p) => ({
  name: p.name,
  score: p.score,
}));

export function PropertyPerformanceBarCard({ className }: { className?: string }) {
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
          <div className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-[rgba(2,132,199,0.08)] blur-3xl" />
        </div>

        <CardHeader className="px-6">
          <div className="font-Times New Roman text-lg tracking-[0.05em] text-foreground">Property Performance</div>
          <div className="mt-1 text-xs tracking-wider text-muted-foreground">Top listings score</div>
        </CardHeader>

        <CardContent className="relative px-3 pb-6">
          <div className="h-[240px] w-full">
            <ClientOnly fallback={<div className="h-full w-full" />}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--lux-gold-2)" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="var(--lux-gold-1)" stopOpacity={0.65} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="rgba(2,132,199,0.12)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={false}
                    axisLine={{ stroke: "rgba(2,132,199,0.20)" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: "rgba(31,41,55,0.70)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={34}
                  />
                  <Tooltip content={<LuxuryTooltip />} cursor={{ fill: "rgba(2,132,199,0.06)" }} />

                  <Bar
                    dataKey="score"
                    name="Score"
                    fill="url(#goldBar)"
                    radius={[10, 10, 10, 10]}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>

          <div className="mt-2 space-y-2 px-3">
            {dashboardMock.properties.slice(0, 3).map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="text-xs text-foreground/90 truncate pr-4">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.score}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
