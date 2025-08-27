import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IRide } from "@/types";
import clsx from "clsx";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  REQUESTED: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PICKED_UP: "bg-purple-100 text-purple-800",
  IN_TRANSIT: "bg-indigo-100 text-indigo-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

interface RidesTableProps {
  rides: IRide[];
}

const AllRidesTable: React.FC<RidesTableProps> = ({ rides }) => {
  if (!rides || rides.length === 0) {
    return (
      <p className="text-center py-10 text-muted-foreground">No rides found.</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>#</TableHead>
          <TableHead>Pickup</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Fare</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Rider</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Distance (km)</TableHead>
          <TableHead>Duration (min)</TableHead>
          <TableHead>Requested At</TableHead>
          <TableHead>Picked Up At</TableHead>
          <TableHead>Completed At</TableHead>
          <TableHead>Cancelled At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rides.map((ride, index) => (
          <TableRow key={ride._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{ride.pickupLocation}</TableCell>
            <TableCell>{ride.destinationLocation}</TableCell>
            <TableCell>{ride.fare ?? "N/A"}</TableCell>
            <TableCell>
              <span
                className={clsx(
                  "px-2 py-1 rounded-full text-xs font-semibold",
                  statusColors[ride.status as string] ||
                    "bg-gray-100 text-gray-800"
                )}
              >
                {ride.status ?? "N/A"}
              </span>
            </TableCell>
            <TableCell>
              {ride.rider && typeof ride.rider !== "string" ? (
                ride.rider.name
              ) : (
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                  N/A
                </span>
              )}
            </TableCell>
            <TableCell>
              {ride.driver && typeof ride.driver !== "string" ? (
                ride.driver.name
              ) : (
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                  Unassigned
                </span>
              )}
            </TableCell>
            <TableCell>{ride.distanceInKm ?? "0"}</TableCell>
            <TableCell>{ride.durationInMinutes ?? "0"}</TableCell>
            <TableCell>
              {ride.requestedAt
                ? format(new Date(ride.requestedAt), "dd MMM yyyy hh:mm a")
                : "N/A"}
            </TableCell>
            <TableCell>
              {ride.pickedUpAt
                ? format(new Date(ride.pickedUpAt), "dd MMM yyyy hh:mm a")
                : "N/A"}
            </TableCell>
            <TableCell>
              {ride.completedAt
                ? format(new Date(ride.completedAt), "dd MMM yyyy hh:mm a")
                : "N/A"}
            </TableCell>
            <TableCell>
              {ride.cancelledAt
                ? format(new Date(ride.cancelledAt), "dd MMM yyyy hh:mm a")
                : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllRidesTable;
