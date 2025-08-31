import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import type { AdminDashboard } from "@/types";
import { useState } from "react";
import { useGetRideDetailsQuery } from "@/redux/features/rides/rides.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type RecentActivityProps = {
  dashboard?: AdminDashboard;
};

const RecentActivity = ({ dashboard }: RecentActivityProps) => {
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

  const { data: rideData, isLoading } = useGetRideDetailsQuery(
    selectedRideId!,
    {
      skip: !selectedRideId,
    }
  );

  const rideDetails = rideData?.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>#</TableHead>
              <TableHead>Rider</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboard?.recentActivity?.map((a, i) => (
              <TableRow key={a._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{a.rider?.name}</TableCell>
                <TableCell>{a.driver?.name || "Not Assigned yet"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      a?.status === "COMPLETED"
                        ? "default"
                        : a?.status === "CANCELLED"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {a?.status}
                  </Badge>
                </TableCell>
                <TableCell>{a.fare} tk</TableCell>
                <TableCell>
                  {format(new Date(a.createdAt), "dd MMM yyyy hh:mm a")}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setSelectedRideId(a._id)}
                      >
                        <Eye />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="md:max-w-xl">
                      <DialogHeader>
                        <DialogTitle>Ride Details</DialogTitle>
                        <Separator />
                      </DialogHeader>
                      {isLoading ? (
                        <p>Loading...</p>
                      ) : rideDetails ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex justify-between">
                            <span className="font-semibold">Rider:</span>
                            <span>
                              {typeof rideDetails.rider === "string"
                                ? rideDetails.rider
                                : rideDetails.rider?.name}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-semibold">Driver:</span>
                            <span>
                              {typeof rideDetails.driver === "string"
                                ? rideDetails.driver
                                : rideDetails.driver?.name ||
                                  "Not Assigned yet"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-semibold">Status:</span>
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
                            <span className="font-semibold">Pickup:</span>
                            <span>{rideDetails?.pickupLocation}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-semibold">Drop:</span>
                            <span>{rideDetails?.destinationLocation}</span>
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
  );
};

export default RecentActivity;
