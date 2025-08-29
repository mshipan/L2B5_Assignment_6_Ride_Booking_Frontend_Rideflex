/* eslint-disable @typescript-eslint/no-explicit-any */
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCancelRideMutation,
  useGetMyRidesQuery,
  useGetRideDetailsQuery,
} from "@/redux/features/rides/rides.api";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MyRides = () => {
  const [selectedRideId, setSelectedRideId] = useState<string>("");
  const [localRideData, setLocalRideData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const { data, isLoading, error } = useGetMyRidesQuery();
  const {
    data: rideDetails,
    isLoading: detailsLoading,
    refetch,
  } = useGetRideDetailsQuery(selectedRideId);

  const [cancelRide, { isLoading: cancelLoading }] = useCancelRideMutation();

  const handleCancelRide = async (rideId: string) => {
    try {
      await cancelRide(rideId).unwrap();
      toast.success("Ride cancelled successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel ride");
    }
  };

  useEffect(() => {
    if (selectedRideId) {
      refetch();
    }
  }, [selectedRideId, refetch]);

  useEffect(() => {
    if (rideDetails?.data) {
      setLocalRideData(rideDetails.data);
    }
  }, [rideDetails]);

  const rideStatuses = [
    "ALL",
    "REQUESTED",
    "ONGOING",
    "ACCEPTED",
    "PICKED_UP",
    "IN_TRANSIT",
    "COMPLETED",
    "CANCELLED",
  ] as const;

  const filterRides = (status: string) => {
    if (!data?.data) return [];
    if (status === "ALL") return data.data;
    if (status === "ONGOING")
      return data.data.filter((r: any) =>
        ["ACCEPTED", "PICKED_UP", "IN_TRANSIT"].includes(r.status)
      );
    return data.data.filter((r: any) => r.status === status);
  };

  const rideCounts = {
    requested: filterRides("REQUESTED").length,
    ongoing: filterRides("ONGOING").length,
    completed: filterRides("COMPLETED").length,
    cancelled: filterRides("CANCELLED").length,
  };

  return (
    <div>
      <PageBreadcrumb title="Rides" pageTitle="My Rides" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
        <h1 className="text-2xl font-bold">My Rides</h1>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 space-y-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Requested</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{rideCounts.requested}</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Ongoing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{rideCounts.ongoing}</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{rideCounts.completed}</p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{rideCounts.cancelled}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for ride statuses */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          defaultValue="ALL"
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-8 gap-2 w-full mb-20 md:mb-0">
            {rideStatuses.map((status) => (
              <TabsTrigger key={status} value={status}>
                {status.replaceAll("_", " ")}
              </TabsTrigger>
            ))}
          </TabsList>

          {rideStatuses.map((status) => {
            const rides = filterRides(status);
            return (
              <TabsContent key={status} value={status}>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>
                      {status === "ALL"
                        ? "All Rides"
                        : status.replaceAll("_", " ")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <Skeleton
                            key={i}
                            className="h-12 w-full rounded-lg"
                          />
                        ))}
                      </div>
                    ) : error ? (
                      <p className="text-red-500 text-center">
                        Failed to load rides.
                      </p>
                    ) : rides.length === 0 ? (
                      <p className="text-gray-600 text-center">
                        No rides found.
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted">
                            <TableHead>Pickup</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Fare (BDT)</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Distance</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">
                              View Details
                            </TableHead>
                            {activeTab === "REQUESTED" && (
                              <TableHead className="text-right">
                                Cancel Ride
                              </TableHead>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rides.map((ride: any) => (
                            <TableRow key={ride._id}>
                              <TableCell>{ride.pickupLocation}</TableCell>
                              <TableCell>{ride.destinationLocation}</TableCell>
                              <TableCell>{ride.fare}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    ride.status === "REQUESTED"
                                      ? "secondary"
                                      : [
                                          "ACCEPTED",
                                          "PICKED_UP",
                                          "IN_TRANSIT",
                                        ].includes(ride.status)
                                      ? "outline"
                                      : ride.status === "COMPLETED"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {ride.status.replaceAll("_", " ")}
                                </Badge>
                              </TableCell>
                              <TableCell>{ride.distanceInKm} km</TableCell>
                              <TableCell>
                                {ride.durationInMinutes} mins
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  className="cursor-pointer"
                                  onClick={() => setSelectedRideId(ride._id)}
                                >
                                  <Eye />
                                </Button>
                              </TableCell>
                              {activeTab === "REQUESTED" && (
                                <TableCell className="text-right">
                                  {activeTab === "REQUESTED" && (
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      disabled={cancelLoading}
                                      onClick={() => handleCancelRide(ride._id)}
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
      <Dialog
        open={!!selectedRideId}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRideId("");
          }
        }}
      >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Ride Details</DialogTitle>
          </DialogHeader>
          <Separator />
          {detailsLoading || !localRideData ? (
            // Skeleton Loader for Dialog
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              {/* Right Column Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) : rideDetails?.data ? (
            // Actual Ride Details
            <div className="grid grid-cols-1 gap-6">
              {/* Ride Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Pickup:</span>
                    <span>{rideDetails.data.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Destination:</span>
                    <span>{rideDetails.data.destinationLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Fare:</span>
                    <span>{rideDetails.data.fare} BDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge
                      variant={
                        rideDetails.data.status === "REQUESTED"
                          ? "secondary"
                          : ["ACCEPTED", "PICKED_UP", "IN_TRANSIT"].includes(
                              rideDetails.data.status || ""
                            )
                          ? "outline"
                          : rideDetails.data.status === "COMPLETED"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {(rideDetails.data.status ?? "N/A").replaceAll("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Distance:</span>
                    <span>{rideDetails.data.distanceInKm} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Duration:</span>
                    <span>{rideDetails.data.durationInMinutes} mins</span>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              {rideDetails.data.driver &&
                typeof rideDetails.data.driver !== "string" && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Driver Info</h2>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Name:</span>
                        <span>{rideDetails.data.driver.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Phone:</span>
                        <span>{rideDetails.data.driver.phone}</span>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <p className="text-center py-4 text-red-500">
              Failed to load ride details.
            </p>
          )}

          <DialogFooter>
            <DialogClose className="mt-8 bg-muted hover:bg-muted-foreground px-4 py-2 rounded cursor-pointer">
              Close
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyRides;
