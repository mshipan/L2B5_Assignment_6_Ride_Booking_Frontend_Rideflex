/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetRiderRideHistoryQuery } from "@/redux/features/rides/rides.api";
import { format } from "date-fns";

export default function RiderHistoryPage() {
  const { data, isLoading, isError } = useGetRiderRideHistoryQuery();
  const [selectedRide, setSelectedRide] = useState<any>(null);

  const rides = data?.data || [];
  console.log("r hist", rides);
  if (isLoading) {
    return (
      <div className="space-y-2">
        <PageBreadcrumb title="Rides" pageTitle="Ride History" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
          <h1 className="text-2xl font-bold">Ride History</h1>
        </div>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <PageBreadcrumb title="Rides" pageTitle="Ride History" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
          <h1 className="text-2xl font-bold">Ride History</h1>
        </div>
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load ride history. Please try again.
          </AlertDescription>
        </Alert>
      </>
    );
  }

  if (!rides.length) {
    return (
      <>
        <PageBreadcrumb title="Rides" pageTitle="Ride History" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
          <h1 className="text-2xl font-bold">Past Ride History</h1>
        </div>
        <Alert className="mt-6">
          <AlertTitle>No rides found</AlertTitle>
          <AlertDescription>
            You don’t have any past rides yet.
          </AlertDescription>
        </Alert>
      </>
    );
  }

  const completedRides = rides?.filter((r) => r.status === "COMPLETED");
  const cancelledRides = rides?.filter((r) => r.status === "CANCELLED");

  const renderTable = (list: any[]) => {
    if (!list.length) {
      return (
        <Alert className="mt-4">
          <AlertTitle>No data</AlertTitle>
          <AlertDescription>
            No rides available in this category.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Table className="mt-4">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.map((ride) => (
            <TableRow key={ride?._id}>
              <TableCell>{ride?.pickupLocation}</TableCell>
              <TableCell>{ride?.destinationLocation}</TableCell>
              <TableCell>{ride?.driver?.name ?? "not assigned"}</TableCell>
              <TableCell>{ride?.fare} Tk</TableCell>
              <TableCell>
                {format(new Date(ride?.createdAt), "dd MMM yyyy hh:mm a")}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    ride?.status === "COMPLETED" ? "default" : "destructive"
                  }
                >
                  {ride?.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRide(ride)}
                    >
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ride Details</DialogTitle>
                    </DialogHeader>
                    {selectedRide && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <strong className="block text-muted-foreground">
                            Pickup
                          </strong>
                          <span className="font-medium">
                            {selectedRide?.pickupLocation}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <strong className="block text-muted-foreground">
                            Destination
                          </strong>
                          <span className="font-medium">
                            {selectedRide?.destinationLocation}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <strong className="block text-muted-foreground">
                            Driver
                          </strong>
                          <span className="font-medium">
                            {selectedRide?.driver?.name ?? "Not assigned"}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <strong className="block text-muted-foreground">
                            Fare
                          </strong>
                          <span className="font-medium">
                            ${selectedRide?.fare}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <strong className="block text-muted-foreground">
                            Status
                          </strong>
                          <Badge
                            variant={
                              selectedRide?.status === "COMPLETED"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {selectedRide?.status}
                          </Badge>
                        </div>

                        <div className="space-y-1">
                          <strong className="block text-muted-foreground">
                            Date
                          </strong>
                          <span className="font-medium">
                            {format(
                              new Date(selectedRide?.createdAt),
                              "dd MMM yyyy hh:mm a"
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      <PageBreadcrumb title="Rides" pageTitle="Ride History" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
        <h1 className="text-2xl font-bold">Past Ride History</h1>
      </div>

      <Tabs defaultValue="completed" className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="completed">
          {renderTable(completedRides)}
        </TabsContent>
        <TabsContent value="cancelled">
          {renderTable(cancelledRides)}
        </TabsContent>
      </Tabs>
    </>
  );
}
