import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminDashboard } from "@/types";
import { TrendingUp } from "lucide-react";

type RideOverViewStatsProps = {
  dashboard?: AdminDashboard;
};

const RideOverViewStats = ({ dashboard }: RideOverViewStatsProps) => {
  return (
    <Card className="shadow-md rounded-2xl col-span-1 md:col-span-2 xl:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between ">
        <CardTitle className="text-sm font-medium">Ride Overview</CardTitle>
        <TrendingUp className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Rides</p>
          <p className="text-xl font-bold">
            {dashboard?.rideSummary.totalRides}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-xl font-bold text-green-600">
            {dashboard?.rideSummary.completedRides}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="text-xl font-bold text-red-600">
            {dashboard?.rideSummary.cancelledRides}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Ongoing</p>
          <p className="text-xl font-bold text-blue-600">
            {dashboard?.rideSummary.ongoingRides}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideOverViewStats;
