"use client";

import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ExpensesChart from "@/components/dashboard/ExpensesChart";
import { useGetKPIQuery } from "@/store/api/dashboardApi";

export default function DashboardPage() {
  const { data: kpi, isLoading } = useGetKPIQuery();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-gray-900">Overview</h1>

      {isLoading ? (
        <div className="text-sm text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <KPICard
            title="Total Balance"
            value={`$${kpi?.balance}`}
            trend="8.2%"
            trendUp={true}
          />
          <KPICard
            title="Total Income"
            value={`$${kpi?.income}`}
            trend="3.1%"
            trendUp={true}
          />
          <KPICard
            title="Total Expenses"
            value={`$${kpi?.expenses}`}
            trend="1.4%"
            trendUp={false}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <RevenueChart />
        <ExpensesChart />
      </div>
    </div>
  );
}
