import RecentActivity from "@/components/pages/admin/adminHome/RecentActivity";
import RevenueChart from "@/components/pages/admin/adminHome/RevenueChart";
import RideOverViewStats from "@/components/pages/admin/adminHome/RideOverVIewStats";
import RideSummaryPieChart from "@/components/pages/admin/adminHome/RideSummaryPieChart";
import TopDriverByEarning from "@/components/pages/admin/adminHome/TopDriverByEarning";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAdminDashboardQuery } from "@/redux/features/rides/rides.api";
import { Activity, Car, DollarSign, Users } from "lucide-react";

const AdminHome = () => {
  const { data, isLoading } = useGetAdminDashboardQuery();

  const dashboard = data?.data;

  return (
    <div>
      <PageBreadcrumb title="Dashboard" pageTitle="Analytics" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5">
            {/* Riders */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Total Riders
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboard?.userSummary.totalRiders}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboard?.userSummary.blockedRiders} blocked
                </p>
              </CardContent>
            </Card>

            {/* Drivers */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Total Drivers
                </CardTitle>
                <Car className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboard?.userSummary.totalDrivers}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboard?.userSummary.suspendedDrivers} suspended
                </p>
              </CardContent>
            </Card>

            {/* Active Drivers */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between ">
                <CardTitle className="text-sm font-medium">
                  Active Drivers
                </CardTitle>
                <Activity className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboard?.userSummary.activeDrivers}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(dashboard?.userSummary?.totalDrivers ?? 0) -
                    (dashboard?.userSummary?.activeDrivers ?? 0)}{" "}
                  inactive
                </p>
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between ">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboard?.revenueSummary.total} tk
                </div>
                <p className="text-xs text-muted-foreground">
                  Daily: {dashboard?.revenueSummary.today} tk | Monthly:{" "}
                  {dashboard?.revenueSummary.month} tk
                </p>
              </CardContent>
            </Card>

            {/* Ride Overview Stats */}
            <RideOverViewStats dashboard={dashboard} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-6">
            <RevenueChart dashboard={dashboard} />
            <RideSummaryPieChart dashboard={dashboard} />
            <TopDriverByEarning dashboard={dashboard} />
          </div>

          {/* Recent Activity */}
          <RecentActivity dashboard={dashboard} />
        </>
      )}
    </div>
  );
};

export default AdminHome;
