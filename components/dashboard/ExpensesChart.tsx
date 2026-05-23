"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetCategoriesQuery } from "@/store/api/dashboardApi";

const COLORS = ["#2563EB", "#7C3AED", "#EF4444", "#F59E0B", "#10B981"];

export default function ExpensesChart() {
  const { data, isLoading } = useGetCategoriesQuery();

  // Add debug logging
  console.log("Categories data:", data);

  if (isLoading)
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm h-[350px] flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );

  // Transform data to ensure values are numbers
  const chartData = data
    ?.map((item: any) => ({
      name: item.name,
      value: Number(item.value) || 0,
    }))
    .filter((item: any) => item.value > 0);

  // Check if data exists and has items
  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm h-[350px] flex items-center justify-center">
        <p className="text-sm text-gray-400">No expense data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-medium text-gray-500 mb-6">
        Expenses Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            nameKey="name"
            label
          >
            {data?.map((_: any, index: number) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
