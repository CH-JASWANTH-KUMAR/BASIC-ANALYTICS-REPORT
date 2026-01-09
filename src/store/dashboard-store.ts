import { create } from "zustand";

export type TimeRange = "week" | "month" | "year";
export type Metric = "views" | "leads" | "revenue";

type DashboardState = {
  timeRange: TimeRange;
  metric: Metric;
  setTimeRange: (timeRange: TimeRange) => void;
  setMetric: (metric: Metric) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  timeRange: "month",
  metric: "views",
  setTimeRange: (timeRange) => set({ timeRange }),
  setMetric: (metric) => set({ metric }),
}));
