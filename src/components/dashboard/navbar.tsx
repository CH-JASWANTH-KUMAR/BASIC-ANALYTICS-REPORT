"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TimeRange, useDashboardStore } from "@/store/dashboard-store";

const ranges: { label: string; value: TimeRange }[] = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

export function DashboardNavbar() {
  const timeRange = useDashboardStore((s) => s.timeRange);
  const setTimeRange = useDashboardStore((s) => s.setTimeRange);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 240], [0, -6]);

  const timeLabel = useMemo(
    () => ranges.find((r) => r.value === timeRange)?.label ?? "Month",
    [timeRange],
  );

  return (
    <header className="sticky top-0 z-20">
      <div className="relative z-10 border-b border-border/60 bg-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-9 w-9 rounded-xl lux-glass lux-gold-stroke lux-hover-glow grid place-items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-[#0284C7] shadow-[0_0_14px_rgba(2,132,199,0.4)]" />
            </div>

            <div className="min-w-0">
              <motion.div style={{ y: titleY }}>
                <div className="truncate font-Times New Roman text-lg tracking-[0.08em] text-foreground">
                  <span className="bg-gradient-to-r from-[var(--lux-gold-1)] to-[var(--lux-gold-2)] bg-clip-text text-transparent">
                    Analytics Report
                  </span>
                </div>
              </motion.div>
              <div className="text-xs tracking-wider text-muted-foreground">Basic Analytics Dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop segmented filters */}
            <div className="hidden min-[520px]:flex items-center gap-2">
              {ranges.map((r) => (
                <Button
                  key={r.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setTimeRange(r.value)}
                  className={cn(
                    "lux-glass border-border/70 text-foreground/90 hover:text-foreground",
                    "hover:border-[color:var(--lux-border-gold)] hover:shadow-[0_0_24px_var(--lux-glow-gold)]",
                    r.value === timeRange &&
                      "border-[color:var(--lux-border-gold)] bg-[rgba(2,132,199,0.10)]",
                  )}
                >
                  {r.label}
                </Button>
              ))}
            </div>

            {/* Mobile dropdown filter */}
            <div className="min-[520px]:hidden">
              <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
                <SelectTrigger className="w-[132px] lux-glass border-border/70">
                  <SelectValue placeholder="Range" />
                </SelectTrigger>
                <SelectContent>
                  {ranges.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lux-glass border-border/70 hover:border-[color:var(--lux-border-gold)]"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-[rgba(2,132,199,0.12)] text-[11px] tracking-wider font-semibold text-foreground">
                      CX
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-xs text-muted-foreground">{timeLabel}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="lux-glass">
                <DropdownMenuLabel className="text-xs tracking-wider text-muted-foreground">
                  Profile
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
