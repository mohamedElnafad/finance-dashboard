interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export default function KPICard({
  title,
  value,
  trend,
  trendUp,
}: KPICardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-2 shadow-sm">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p
        className={`text-xs font-medium ${trendUp ? "text-green-500" : "text-red-500"}`}
      >
        {trendUp ? "↑" : "↓"} {trend} vs last month
      </p>
    </div>
  );
}
