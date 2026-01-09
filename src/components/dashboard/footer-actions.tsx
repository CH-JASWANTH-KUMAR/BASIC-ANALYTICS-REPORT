"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fadeUp } from "@/lib/motion/variants";
import { buildMonthlySeries, dashboardMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function downloadText(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
  };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

export function FooterActions({ className }: { className?: string }) {
  const series = buildMonthlySeries(dashboardMock);

  const last3 = dashboardMock.leads.slice(-3);
  const prev3 = dashboardMock.leads.slice(-6, -3);
  const avg = (a: readonly number[]) => a.reduce((s, n) => s + n, 0) / Math.max(a.length, 1);
  const growth = ((avg(last3) - avg(prev3)) / Math.max(avg(prev3), 1)) * 100;
  const growthRounded = Math.round(growth);

  return (
    <motion.div variants={fadeUp} className={cn(className)}>
      <Card
        className={cn(
          "lux-glass lux-hover-glow",
          "border-border/80 hover:border-[color:var(--lux-border-gold)]",
          "shadow-[0_18px_70px_rgba(0,0,0,0.60)]",
          "flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div>
          <div className="font-Times New Roman text-lg tracking-[0.05em] text-foreground">
            Executive Insight
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            <span className="text-foreground">+{growthRounded}%</span> lead velocity vs prior quarter · momentum is compounding.
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => window.print()}
            className="bg-[linear-gradient(90deg,var(--lux-gold-1),var(--lux-gold-2))] text-white hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => downloadText("basic-analytics-report.csv", toCsv(series), "text/csv")}
            className="lux-glass border-border/70 hover:border-[color:var(--lux-border-gold)]"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
