import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetRideDetailsQuery,
  useGetRiderDashboardQuery,
} from "@/redux/features/rides/rides.api";
import { format } from "date-fns";
import { Activity, Car, CheckCircle2, Eye, XCircle } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const RiderHome = () => {
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const { data, isLoading } = useGetRiderDashboardQuery();

  const { data: rideData, isLoading: rideLoading } = useGetRideDetailsQuery(
    selectedRideId!,
    {
      skip: !selectedRideId,
    }
  );

  const dashboard = data?.data;

  const rideDetails = rideData?.data;

  const { data: myRides } = useGetRideDetailsQuery(
    dashboard?.riderStatus?.activeRideId ?? "",
    { skip: !dashboard?.riderStatus?.inActiveRide }
  );

  const rideStats = [
    {
      label: "Total Rides",
      value: dashboard?.rideSummary.total ?? 0,
      icon: Car,
      color: "text-orange-500",
    },
    {
      label: "Completed",
      value: dashboard?.rideSummary.completed ?? 0,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      label: "Cancelled",
      value: dashboard?.rideSummary.cancelled ?? 0,
      icon: XCircle,
      color: "text-red-500",
    },
    {
      label: "Active",
      value: dashboard?.rideSummary.active ?? 0,
      icon: Activity,
      color: "text-blue-500",
    },
  ];

  const spendingData = [
    { name: "Today", amount: dashboard?.spendingSummary.today ?? 0 },
    { name: "Week", amount: dashboard?.spendingSummary.week ?? 0 },
    { name: "Month", amount: dashboard?.spendingSummary.month ?? 0 },
    { name: "Total", amount: dashboard?.spendingSummary.total ?? 0 },
  ];

  return (
    <div>
      <PageBreadcrumb title="Dashboard" pageTitle="Analytics" />
      <div className="flex flex-col mt-6 gap-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
        {dashboard?.riderStatus?.inActiveRide && myRides?.data && (
          <Card className="border-orange-500 shadow-lg">
            <CardHeader>
              <CardTitle>Active Ride</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Driver:{" "}
                {myRides?.data?.driver ? (
                  typeof myRides.data.driver === "string" ? (
                    myRides.data.driver
                  ) : (
                    myRides.data.driver?.name
                  )
                ) : (
                  <Badge variant="secondary">Not Assigned Yet</Badge>
                )}
              </p>
              <p className="text-sm">Status: {myRides.data.status}</p>
              <p className="text-sm">Fare: {myRides.data.fare} tk</p>
            </CardContent>
          </Card>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {/* Ride Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {rideStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={i}
                  className="shadow-lg rounded-2xl border border-orange-500"
                >
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className={`${stat.color} w-5 h-5`} />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Spending Chart */}
          <div className="mt-6">
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>Spending Summary</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData} barSize={40}>
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
                    <Bar
                      dataKey="amount"
                      fill="url(#spendingGradient)"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fare</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>View</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboard?.recentActivity?.map((ride, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {ride.driver?.name || "Not assigned yet"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ride?.status === "COMPLETED"
                                ? "default"
                                : ride?.status === "CANCELLED"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {ride?.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{ride.fare} tk</TableCell>
                        <TableCell>
                          {format(
                            new Date(ride.createdAt),
                            "dd MMM yyyy hh:mm a"
                          )}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() => setSelectedRideId(ride?._id)}
                              >
                                <Eye />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="md:max-w-xl">
                              <DialogHeader>
                                <DialogTitle>Ride Details</DialogTitle>
                                <Separator />
                              </DialogHeader>
                              {rideLoading ? (
                                <p>Loading...</p>
                              ) : rideDetails ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="flex justify-between">
                                    <span className="font-semibold">
                                      Rider:
                                    </span>
                                    <span>
                                      {typeof rideDetails.rider === "string"
                                        ? rideDetails.rider
                                        : rideDetails.rider?.name}
                                    </span>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-semibold">
                                      Driver:
                                    </span>
                                    <span>
                                      {typeof rideDetails.driver === "string"
                                        ? rideDetails.driver
                                        : rideDetails.driver?.name ||
                                          "Not Assigned yet"}
                                    </span>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-semibold">
                                      Status:
                                    </span>
                                    <Badge
                                      variant={
                                        rideDetails?.status === "COMPLETED"
                                          ? "default"
                                          : rideDetails?.status === "CANCELLED"
                                          ? "destructive"
                                          : "outline"
                                      }
                                    >
                                      {rideDetails?.status}
                                    </Badge>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-semibold">Fare:</span>
                                    <span>{rideDetails?.fare} tk</span>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-semibold">
                                      Pickup:
                                    </span>
                                    <span>{rideDetails?.pickupLocation}</span>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-semibold">Drop:</span>
                                    <span>
                                      {rideDetails?.destinationLocation}
                                    </span>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-semibold">Date:</span>
                                    <span>
                                      {rideDetails?.createdAt
                                        ? format(
                                            new Date(rideDetails.createdAt),
                                            "dd MMM yyyy hh:mm a"
                                          )
                                        : "N/A"}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <p>No details available.</p>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default RiderHome;
