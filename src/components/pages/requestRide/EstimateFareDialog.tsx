/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useEstimateFareMutation } from "@/redux/features/rides/rides.api";
import { useEffect, useState } from "react";

type FareEstimate = {
  pickupLocation: string;
  destinationLocation: string;
  distanceInKm: number;
  durationInMinutes: number;
  estimatedFare: number;
};

interface EstimateFareDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  pickupLocation: string;
  destinationLocation: string;
  handleConfirmRide: (fareData: FareEstimate) => void;
}

const EstimateFareDialog = ({
  open,
  setOpen,
  pickupLocation,
  destinationLocation,
  handleConfirmRide,
}: EstimateFareDialogProps) => {
  const [fareData, setFareData] = useState<FareEstimate | null>(null);
  const [estimateFare, { isLoading, error }] = useEstimateFareMutation();

  useEffect(() => {
    const fetchFare = async () => {
      if (!open) return;

      try {
        const result = await estimateFare({
          pickupLocation,
          destinationLocation,
        }).unwrap();

        setFareData({
          ...result.data,
          pickupLocation,
          destinationLocation,
        });
      } catch (err: any) {
        console.error("Failed to estimate fare:", err);
        setFareData(null);
      }
    };

    fetchFare();
  }, [open, pickupLocation, destinationLocation, estimateFare]);

  const handleConfirm = () => {
    if (fareData) handleConfirmRide(fareData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Estimated Ride Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {(error as any)?.data?.message || "Something went wrong"}
            </AlertDescription>
          </Alert>
        ) : fareData ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Pickup:</p>
              <p>{fareData.pickupLocation}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">Destination:</p>
              <p>{fareData.destinationLocation}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">Estimated Fare:</p>
              <p>{fareData.estimatedFare} BDT</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Distance:</p>
                <p>{fareData.distanceInKm} km</p>
              </div>
              <div>
                <p className="font-semibold">Time:</p>
                <p>{fareData.durationInMinutes} mins</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}

        <DialogFooter>
          {fareData && (
            <Button
              className="w-full cursor-pointer"
              size="lg"
              onClick={handleConfirm}
            >
              Confirm Ride
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EstimateFareDialog;
