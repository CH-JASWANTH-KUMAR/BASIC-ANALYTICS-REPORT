"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion/variants";

import { AnimatedNumber } from "./animated-number";

type KpiCardProps = {
  label: string;
  value: number;
  helper?: string;
  format?: (n: number) => string;
  className?: string;
};

export function KpiCard({ label, value, helper, format, className }: KpiCardProps) {
  return (
    <motion.div variants={fadeUp}>
      <Card
        className={cn(
          "relative overflow-hidden lux-glass lux-hover-glow",
          "border-border/80 hover:border-[color:var(--lux-border-gold)]",
          "shadow-[0_16px_50px_rgba(0,0,0,0.55)]",
          "py-5",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-24 left-8 h-48 w-48 rounded-full bg-[rgba(2,132,199,0.10)] blur-3xl" />
          <div className="absolute -bottom-24 right-8 h-48 w-48 rounded-full bg-[rgba(2,132,199,0.08)] blur-3xl" />
        </div>

        <CardHeader className="px-5 pb-0">
          <div className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
            {label}
          </div>
        </CardHeader>

        <CardContent className="relative px-5 pt-2">
          <div className="font-Times New Roman text-3xl leading-none text-foreground">
            <AnimatedNumber value={value} format={format} />
          </div>
          {helper ? (
            <div className="mt-2 text-xs text-muted-foreground">{helper}</div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}
