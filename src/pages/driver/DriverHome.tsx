import AvailabilityToggle from "@/components/shared/AvailabilityToggle";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDriverDashboardQuery } from "@/redux/features/rides/rides.api";
import { Activity, Car, CheckCircle2, Wallet, XCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const DriverHome = () => {
  const { data, isLoading } = useGetDriverDashboardQuery();
  console.log("driver dash", data);
  const dashboard = data?.data;

  const rideStats = [
    { label: "Total Rides", value: dashboard?.rideSummary.total, icon: Car },
    {
      label: "Completed",
      value: dashboard?.rideSummary.completed,
      icon: CheckCircle2,
    },
    {
      label: "Cancelled",
      value: dashboard?.rideSummary.cancelled,
      icon: XCircle,
    },
    { label: "Active", value: dashboard?.rideSummary.active, icon: Activity },
  ];

  const earningStats = [
    {
      label: "Today",
      value: `${dashboard?.earningsSummary.today} tk`,
      icon: Wallet,
    },
    {
      label: "Week",
      value: `${dashboard?.earningsSummary.week} tk`,
      icon: Wallet,
    },
    {
      label: "Month",
      value: `${dashboard?.earningsSummary.month} tk`,
      icon: Wallet,
    },
    {
      label: "Total",
      value: `${dashboard?.earningsSummary.total} tk`,
      icon: Wallet,
    },
  ];

  const chartData = [
    { name: "Today", earnings: dashboard?.earningsSummary.today },
    { name: "Week", earnings: dashboard?.earningsSummary.week },
    { name: "Month", earnings: dashboard?.earningsSummary.month },
  ];

  return (
    <div className="">
      {/* Breadcrumb */}
      <PageBreadcrumb title="Dashboard" pageTitle="Analytics" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground text-sm">
            Monitor your rides, earnings, and availability status in real time.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant={
              dashboard?.driverStatus?.isOnline ? "default" : "secondary"
            }
            className={`text-sm ${
              dashboard?.driverStatus?.isOnline ? "bg-green-500" : "bg-muted"
            }`}
          >
            {dashboard?.driverStatus?.isOnline
              ? "Currently Online"
              : "Currently Offline"}
          </Badge>
          <AvailabilityToggle
            initialOnline={dashboard?.driverStatus?.isOnline ?? false}
          />
        </div>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {/* Ride Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {rideStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={i}
                  className="shadow rounded-2xl border-l-4 border-orange-500"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className="h-5 w-5 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Earnings Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {earningStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={i}
                  className="shadow rounded-2xl border-l-4 border-green-500"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Earnings Chart */}
          <Card className="mt-6 shadow rounded-2xl">
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <p className="text-muted-foreground text-sm">
                Track your income progress across different periods.
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barSize={40}>
                    <defs>
                      <linearGradient
                        id="spendingGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#f97316"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor="#fb923c"
                          stopOpacity={0.7}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend />
                    <Bar
                      dataKey="earnings"
                      fill="url(#spendingGradient)"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default DriverHome;
