/* eslint-disable @typescript-eslint/no-explicit-any */
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useCancelRideByDriverMutation,
  useCompleteRideMutation,
  useGetDriverRideHistoryQuery,
  useInTransitRideMutation,
  usePickupRideMutation,
} from "@/redux/features/driver/driver.api";
import { Ghost } from "lucide-react";
import { toast } from "sonner";

const DriverRide = () => {
  const { data, isLoading, isError } = useGetDriverRideHistoryQuery();

  const [pickupRide, { isLoading: isPickingUp }] = usePickupRideMutation();

  const [inTransitRide, { isLoading: isStartingTransit }] =
    useInTransitRideMutation();

  const [completeRide, { isLoading: isCompletingRide }] =
    useCompleteRideMutation();

  const [cancelRideByDriver, { isLoading: isCancelling }] =
    useCancelRideByDriverMutation();

  const ride =
    data?.data?.find(
      (r: any) =>
        r?.status && ["ACCEPTED", "PICKED_UP", "IN_TRANSIT"].includes(r.status)
    ) || null;

  const rideStatus: string = ride?.status ?? "";
  const canCancel = rideStatus === "ACCEPTED" || rideStatus === "REQUESTED";

  const riderInfo =
    ride?.rider && typeof ride?.rider !== "string" ? ride?.rider : null;

  const handlePickup = async () => {
    if (!ride?._id) return;
    try {
      await pickupRide(ride._id).unwrap();
      toast.success("Ride picked up successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to pick up ride.");
    }
  };

  const handleStartTransit = async () => {
    if (!ride?._id) return;
    try {
      await inTransitRide(ride._id).unwrap();
      toast.success("Ride is in transit now!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to start transit.");
    }
  };

  const handleCompleteRide = async () => {
    if (!ride?._id) return;
    try {
      await completeRide(ride._id).unwrap();
      toast.success("Ride completed successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to complete ride.");
    }
  };

  const handleCancelRide = async () => {
    if (!ride?._id) return;

    const toastId = toast.loading("Cancelling...");

    try {
      await cancelRideByDriver(ride._id).unwrap();

      toast.success("Ride cancelled successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel ride.", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <PageBreadcrumb title="Manage Rides" pageTitle="Active Ride" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
        <h1 className="text-2xl font-bold">Active Ride</h1>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
        {isLoading && <p className="text-center">Loading active ride...</p>}

        {isError && (
          <p className="text-red-500 text-center">Failed to load rides.</p>
        )}

        {!ride && !isLoading && !isError && (
          <Card className="mx-auto max-w-md border border-dashed shadow-sm rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur">
            <CardContent className="flex flex-col items-center justify-center space-y-4 p-10">
              <div className="p-4 rounded-full bg-muted">
                <Ghost className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                No active ride
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                You don’t have any active rides right now. When a ride starts,
                it will appear here.
              </p>
            </CardContent>
          </Card>
        )}

        {ride && (
          <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden">
            {/* Ride Header */}
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {ride.pickupLocation} → {ride.destinationLocation}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ride Info */}
                <div className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow-md space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Pickup</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {ride.pickupLocation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">
                      Destination
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {ride.destinationLocation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Fare</span>
                    <span className="font-semibold text-green-600">
                      {ride.fare} BDT
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Status</span>
                    <Badge
                      variant={
                        ["ACCEPTED", "PICKED_UP", "IN_TRANSIT"].includes(
                          rideStatus
                        )
                          ? "outline"
                          : ride.status === "COMPLETED"
                          ? "default"
                          : "destructive"
                      }
                      className="text-sm px-4 py-1 rounded-full"
                    >
                      {rideStatus.replaceAll("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Distance</span>
                    <span>{ride.distanceInKm} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Duration</span>
                    <span>{ride.durationInMinutes} mins</span>
                  </div>
                </div>

                {/* Rider Info */}
                {riderInfo && (
                  <div className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow-md space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Rider Info
                    </h2>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Name</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {riderInfo.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Phone</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {riderInfo.phone || "N/A"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                {rideStatus === "ACCEPTED" && (
                  <Button
                    className="flex-1 font-bold rounded-xl shadow-lg cursor-pointer"
                    onClick={handlePickup}
                    disabled={isPickingUp}
                  >
                    {" "}
                    {isPickingUp ? "Picking up..." : "Pick Up"}{" "}
                  </Button>
                )}{" "}
                {rideStatus === "PICKED_UP" && (
                  <Button
                    className="flex-1 font-bold rounded-xl shadow-lg cursor-pointer"
                    onClick={handleStartTransit}
                    disabled={isStartingTransit}
                  >
                    {" "}
                    {isStartingTransit
                      ? "Starting Transit..."
                      : "Start Transit"}{" "}
                  </Button>
                )}{" "}
                {rideStatus === "IN_TRANSIT" && (
                  <Button
                    className="flex-1 font-bold rounded-xl shadow-lg cursor-pointer"
                    onClick={handleCompleteRide}
                    disabled={isCompletingRide}
                  >
                    {" "}
                    {isCompletingRide ? "Completing..." : "Complete Ride"}{" "}
                  </Button>
                )}
                <Button
                  variant="destructive"
                  className="flex-1 font-bold rounded-xl shadow-lg cursor-pointer"
                  disabled={!canCancel || isCancelling}
                  onClick={handleCancelRide}
                >
                  {isCancelling ? "Cancelling..." : "Cancel Ride"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DriverRide;
