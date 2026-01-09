"use client";

import { motion } from "framer-motion";

import { buildMonthlySeries, dashboardMock } from "@/lib/mock-data";
import { stagger } from "@/lib/motion/variants";
import { useDashboardStore } from "@/store/dashboard-store";

import { FooterActions } from "./footer-actions";
import { KpiCard } from "./kpi-card";
import { LinePerformanceCard } from "./charts/line-performance-card";
import { LeadSourcePieCard } from "./charts/lead-source-pie-card";
import { PropertyPerformanceBarCard } from "./charts/property-performance-bar-card";
import { DashboardNavbar } from "./navbar";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function sum(nums: readonly number[]) {
  return nums.reduce((s, n) => s + n, 0);
}

export function DashboardScreen() {
  const timeRange = useDashboardStore((s) => s.timeRange);

  const viewsLast = dashboardMock.views.at(-1) ?? 0;
  const leadsLast = dashboardMock.leads.at(-1) ?? 0;

  const views =
    timeRange === "year" ? sum(dashboardMock.views) : timeRange === "month" ? viewsLast : Math.round(viewsLast / 4);

  const leads =
    timeRange === "year" ? sum(dashboardMock.leads) : timeRange === "month" ? leadsLast : Math.round(leadsLast / 4);

  const conversion = views > 0 ? (leads / views) * 100 : 0;
  const bookings = Math.round(leads * 0.18);

  const series = buildMonthlySeries(dashboardMock);
  const revenueLast = series.at(-1)?.revenue ?? 0;

  return (
    <div className="relative min-h-screen">
      <DashboardNavbar />

      <motion.main
        initial="hidden"
        animate="show"
        variants={stagger}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-6"
      >
        <div className="mb-6">
          <div className="font-Times New Roman text-2xl tracking-[0.08em] text-foreground">
            Basic Analytics Report
          </div>
          <div className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Investor-grade visibility into demand, lead flow, and portfolio momentum — presented with cinematic clarity.
          </div>
        </div>

        {/* KPI Area */}
        <motion.section
          variants={stagger}
          className="grid grid-cols-2 gap-4 max-[420px]:grid-cols-1 lg:grid-cols-4"
        >
          <KpiCard label="Total Property Views" value={views} helper="High-intent traffic" />
          <KpiCard label="Monthly Leads" value={leads} helper="Inbound inquiries" />
          <KpiCard
            label="Conversion %"
            value={conversion}
            helper="Leads / Views"
            format={(n) => `${n.toFixed(1)}%`}
          />
          <KpiCard label="Bookings This Month" value={bookings} helper="Projected from lead quality" />
        </motion.section>

        {/* Charts */}
        <motion.section className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-8">
            <LinePerformanceCard />
          </div>

          <div className="col-span-12 grid gap-4 xl:col-span-4">
            <LeadSourcePieCard />
            <PropertyPerformanceBarCard />
          </div>
        </motion.section>

        {/* Footer Actions */}
        <FooterActions className="mt-4" />

        <div className="mt-6 text-xs text-muted-foreground">
          Revenue reference: <span className="text-foreground">{currency.format(revenueLast)}</span> last month · mock data
        </div>
      </motion.main>
    </div>
  );
}
