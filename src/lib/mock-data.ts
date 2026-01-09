export type LeadSource = { name: string; value: number };
export type PropertyPerformance = { name: string; score: number };

export const dashboardMock = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  views: [12840, 14110, 15250, 16890, 16210, 17940, 19120, 20410, 21980, 23140, 24890, 26510],
  leads: [186, 201, 224, 246, 239, 271, 288, 307, 336, 354, 381, 412],
  revenue: [92_000, 97_500, 105_200, 112_800, 109_300, 121_400, 130_900, 139_700, 151_200, 159_400, 168_900, 182_600],
  leadSources: [
    { name: "Organic Search", value: 38 },
    { name: "Referrals", value: 22 },
    { name: "Paid Social", value: 18 },
    { name: "Direct", value: 14 },
    { name: "Email", value: 8 },
  ] satisfies LeadSource[],
  properties: [
    { name: "Penthouse – Marina", score: 92 },
    { name: "Modern Villa – Hills", score: 88 },
    { name: "Heritage Estate", score: 84 },
    { name: "Skyline Loft", score: 79 },
    { name: "Beachfront Residence", score: 74 },
  ] satisfies PropertyPerformance[],
} as const;

export type DashboardMock = typeof dashboardMock;

export function buildMonthlySeries(mock: DashboardMock) {
  return mock.months.map((m, i) => ({
    month: m,
    views: mock.views[i] ?? 0,
    leads: mock.leads[i] ?? 0,
    revenue: mock.revenue[i] ?? 0,
  }));
}
