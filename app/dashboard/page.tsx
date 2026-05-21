import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ExpensesChart from "@/components/dashboard/ExpensesChart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-gray-900">Overview</h1>
      <div className="grid grid-cols-3 gap-4">
        <KPICard
          title="Total Balance"
          value="$12,450.00"
          trend="8.2%"
          trendUp={true}
        />
        <KPICard
          title="Total Income"
          value="$4,200.00"
          trend="3.1%"
          trendUp={true}
        />
        <KPICard
          title="Total Expenses"
          value="$1,890.00"
          trend="1.4%"
          trendUp={false}
        />
      </div>
      <RevenueChart />
      <ExpensesChart />
    </div>
  );
}
