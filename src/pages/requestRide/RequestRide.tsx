/* eslint-disable @typescript-eslint/no-explicit-any */
import EstimateFareDialog from "@/components/pages/requestRide/EstimateFareDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRequestARideMutation } from "@/redux/features/rides/rides.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type RideRequestFormValues = {
  pickupLocation: string;
  destinationLocation: string;
};

const RequestRide = () => {
  const form = useForm<RideRequestFormValues>({
    defaultValues: {
      pickupLocation: "",
      destinationLocation: "",
    },
  });

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [requestRide] = useRequestARideMutation();

  const handleConfirmRide = async (fareData: any) => {
    const toastId = toast.loading("Requesting...");
    try {
      await requestRide({
        pickupLocation: fareData.pickupLocation,
        destinationLocation: fareData.destinationLocation,
        fare: fareData.estimatedFare,
      }).unwrap();

      toast.success("Ride requested successfully!", { id: toastId });

      form.reset();
      setOpen(false);
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || "Failed to create ride. Please try again.",
        { id: toastId }
      );
    }
  };

  const onSubmit = (values: RideRequestFormValues) => {
    setPickupLocation(values.pickupLocation);
    setDestinationLocation(values.destinationLocation);
    setOpen(true);
  };

  const redirectToActiveRides = () => {
    setShowSuccessModal(false);
    navigate("/rider/my-ride");
  };

  return (
    <div className="flex flex-col pb-12 space-y-20">
      {/* Banner Section */}
      <section className="relative bg-gray-200 dark:bg-gray-900 text-primary py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl md:text-5xl font-bold">Request a Ride</h1>
          <p className="text-md md:text-xl leading-relaxed">
            Enter your pickup and destination locations to request a ride
            quickly and safely.
          </p>
        </div>
      </section>

      {/* Ride Request Form */}
      <section className="w-full max-w-3xl mx-auto">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Ride Request Form</CardTitle>
            <CardDescription>
              Fill in the details below to request your ride.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="pickupLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter pickup location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destinationLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter destination" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-2 cursor-pointer">
                  Request Ride
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>

      {/* Estimate Fare Dialog */}
      <EstimateFareDialog
        open={open}
        setOpen={setOpen}
        pickupLocation={pickupLocation}
        destinationLocation={destinationLocation}
        handleConfirmRide={handleConfirmRide}
      />

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ride Status</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p>Your ride has been requested successfully!</p>
          </div>
          <DialogFooter>
            <Button
              onClick={redirectToActiveRides}
              className="w-full cursor-pointer"
            >
              Go to Active Rides
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* More Section */}
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Safe Rides</CardTitle>
            </CardHeader>
            <CardContent>
              Our drivers are verified and trained to ensure you reach safely.
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Transparent Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              Know your fare before you ride. No hidden charges.
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              Our support team is available around the clock for any issues.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RequestRide;
