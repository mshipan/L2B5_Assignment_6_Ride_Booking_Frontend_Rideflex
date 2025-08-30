import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import TablePagination from "@/components/shared/TablePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useGetDriverRideHistoryQuery } from "@/redux/features/driver/driver.api";
import { useGetRideDetailsQuery } from "@/redux/features/rides/rides.api";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { useState } from "react";

const DriverHistory = () => {
  const [status, setStatus] = useState<"COMPLETED" | "CANCELLED">("COMPLETED");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "status">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const limit = 5;

  const { data, isLoading, error } = useGetDriverRideHistoryQuery(
    {
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    },
    { pollingInterval: 5000 }
  );

  const { data: singleRide, isLoading: detailsLoading } =
    useGetRideDetailsQuery(selectedRideId!);

  const rides = data?.data?.filter((ride) => ride.status === status) || [];
  const meta = data?.meta;

  const rideDetails = singleRide?.data;

  return (
    <div className="space-y-6">
      <PageBreadcrumb title="Manage Rides" pageTitle="Ride History" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Ride History</h1>

        {/* Search + Sort */}
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search by location..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-56"
          />

          <Select
            value={sortBy}
            onValueChange={(val: "createdAt" | "status") => setSortBy(val)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(val: "asc" | "desc") => setSortOrder(val)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={status}
        onValueChange={(val) => {
          setStatus(val as "COMPLETED" | "CANCELLED");
          setPage(1);
        }}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={status}>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-muted rounded-xl shadow-md animate-pulse"
                >
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500 bg-red-50 dark:bg-red-900 rounded-xl">
              <p className="font-semibold">Failed to load rides.</p>
              <p>Please try again later.</p>
            </div>
          ) : rides.length === 0 ? (
            <div className="p-6 text-center text-gray-600 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <p>No rides found for "{status.toLowerCase()}" status.</p>
            </div>
          ) : (
            <Table className="mt-4 border overflow-hidden">
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Rider</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Fare</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>View Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rides.map((ride) => (
                  <TableRow key={ride._id} className="">
                    <TableCell>
                      {typeof ride.rider === "string"
                        ? "N/A"
                        : ride.rider?.name || "N/A"}
                    </TableCell>
                    <TableCell>{ride.pickupLocation}</TableCell>
                    <TableCell>{ride.destinationLocation}</TableCell>
                    <TableCell>{ride.fare} BDT</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ride.status === "COMPLETED"
                            ? "default"
                            : "destructive"
                        }
                        className="uppercase"
                      >
                        {ride.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ride.createdAt
                        ? format(
                            new Date(ride.createdAt),
                            "dd MMM yyyy hh:mm a"
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setSelectedRideId(ride._id)}
                      >
                        <Eye />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>

      {selectedRideId && (
        <Dialog
          open={!!selectedRideId}
          onOpenChange={() => setSelectedRideId(null)}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Ride Details
              </DialogTitle>
            </DialogHeader>

            <Card>
              <CardContent className="p-6">
                {detailsLoading ? (
                  <p className="text-muted-foreground">
                    Loading ride details...
                  </p>
                ) : rideDetails ? (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Rider</p>
                      <p className="font-semibold">
                        {typeof rideDetails.rider === "string"
                          ? "N/A"
                          : rideDetails.rider?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="default" className="font-semibold">
                        {rideDetails.status}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Pickup</p>
                      <p className="font-semibold">
                        {rideDetails.pickupLocation}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Destination
                      </p>
                      <p className="font-semibold">
                        {rideDetails.destinationLocation}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Fare</p>
                      <p className="font-semibold">{rideDetails.fare} BDT</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">
                        {rideDetails.createdAt
                          ? format(
                              new Date(rideDetails.createdAt),
                              "dd MMM yyyy hh:mm a"
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No details found.</p>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button
                variant="destructive"
                onClick={() => setSelectedRideId(null)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="mt-6 flex justify-center">
          <TablePagination
            currentPage={meta.page}
            setCurrentPage={setPage}
            totalPage={meta.totalPage}
          />
        </div>
      )}
    </div>
  );
};

export default DriverHistory;
