import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminDashboard } from "@/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type RevenueChartProps = {
  dashboard?: AdminDashboard;
};

const RevenueChart = ({ dashboard }: RevenueChartProps) => {
  const data = [
    { name: "Today", revenue: dashboard?.revenueSummary.today ?? 0 },
    { name: "Week", revenue: dashboard?.revenueSummary.week ?? 0 },
    { name: "Month", revenue: dashboard?.revenueSummary.month ?? 0 },
    { name: "Total", revenue: dashboard?.revenueSummary.total ?? 0 },
  ];
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#fb923c" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="url(#revenueGradient)"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
