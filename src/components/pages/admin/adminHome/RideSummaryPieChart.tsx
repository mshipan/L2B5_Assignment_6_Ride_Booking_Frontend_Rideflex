import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminDashboard } from "@/types";

type RideSummaryPieChartProps = {
  dashboard?: AdminDashboard;
};

const RideSummaryPieChart = ({ dashboard }: RideSummaryPieChartProps) => {
  const data = [
    { name: "Completed", value: dashboard?.rideSummary.completedRides ?? 0 },
    { name: "Cancelled", value: dashboard?.rideSummary.cancelledRides ?? 0 },
    { name: "Ongoing", value: dashboard?.rideSummary.ongoingRides ?? 0 },
  ];

  const COLORS = ["#10B981", "#EF4444", "#f97316"];

  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle>Ride Summary</CardTitle>
      </CardHeader>
      <CardContent className="h-72 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              paddingAngle={4}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RideSummaryPieChart;
