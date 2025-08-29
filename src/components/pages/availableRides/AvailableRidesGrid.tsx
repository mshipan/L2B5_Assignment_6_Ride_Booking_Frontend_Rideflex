/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { IRide } from "@/types";
import { useAcceptRideMutation } from "@/redux/features/driver/driver.api";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import RideSuccessModal from "@/components/shared/RideSuccessModal";

interface AvailableRidesGridProps {
  rides: IRide[];
  isLoading: boolean;
  error: any;
}

const AvailableRidesGrid = ({
  rides,
  isLoading,
  error,
}: AvailableRidesGridProps) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [acceptingRideId, setAcceptingRideId] = useState<string | null>(null);
  const [acceptRide] = useAcceptRideMutation();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading available rides...</p>;

  if (!rides.length) return <p>No rides available at the moment.</p>;

  if (error)
    return (
      <p className="text-red-500">Failed to load rides. Try again later.</p>
    );

  const handleAcceptRide = async (rideId: string) => {
    try {
      setAcceptingRideId(rideId);
      await acceptRide(rideId).unwrap();
      toast.success("Ride accepted successfully");
      setShowSuccessModal(true);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to accept ride.");
    } finally {
      setAcceptingRideId(null);
    }
  };

  const redirectToAcceptedRides = () => {
    setShowSuccessModal(false);
    navigate("/driver/active-rides");
  };

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rides?.map((ride) => (
          <Card
            key={ride?._id}
            className="hover:shadow-xl transition rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg md:text-xl font-bold text-primary flex items-center justify-between">
                <span>
                  {ride?.pickupLocation} → {ride?.destinationLocation}
                </span>
              </CardTitle>
              {ride?.createdAt && (
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(ride?.createdAt), "dd MMM yyyy hh:mm a")}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Rider</p>
                <span className="font-medium">
                  {typeof ride?.rider === "string"
                    ? "N/A"
                    : ride?.rider?.name ?? "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Fare</p>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {ride?.fare} Tk
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  variant="outline"
                  className={`px-3 py-1 rounded-full text-xs ${
                    ride?.status === "REQUESTED"
                      ? "border-yellow-400 text-yellow-500"
                      : ride?.status === "ACCEPTED"
                      ? "border-green-500 text-green-500"
                      : "border-gray-400 text-gray-500"
                  }`}
                >
                  {ride?.status}
                </Badge>
              </div>

              {ride?.status === "REQUESTED" && (
                <Button
                  variant="default"
                  className="w-full rounded-xl font-medium mt-4 bg-orange-500 hover:bg-orange-600 text-white transition cursor-pointer"
                  onClick={() => handleAcceptRide(ride._id)}
                  disabled={acceptingRideId === ride._id}
                >
                  {acceptingRideId === ride._id
                    ? "Accepting..."
                    : "Accept Ride"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      <RideSuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        title="Ride Status"
        message="The ride has been accepted successfully"
        buttonLabel="Go to Accepted Rides"
        onButtonClick={redirectToAcceptedRides}
      />
    </>
  );
};

export default AvailableRidesGrid;
