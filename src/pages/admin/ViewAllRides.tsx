import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import TablePagination from "@/components/shared/TablePagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllRidesQuery } from "@/redux/features/rides/rides.api";
import { useState } from "react";
import AllRidesTable from "@/components/pages/admin/viewAllRides/AllRidesTable";

const statusColors: Record<string, string> = {
  REQUESTED: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PICKED_UP: "bg-purple-100 text-purple-800",
  IN_TRANSIT: "bg-indigo-100 text-indigo-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const ViewAllRides = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    driverName: "",
    riderName: "",
    date: "",
  });

  const { data, isLoading, error } = useGetAllRidesQuery(filters);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const filteredRides = data?.data.filter((ride) => {
    const rideDate = ride.requestedAt ? new Date(ride.requestedAt) : null;
    const filterDate = filters.date ? new Date(filters.date) : null;

    const statusMatch = filters.status ? ride.status === filters.status : true;
    const driverMatch = filters.driverName
      ? ride.driver &&
        typeof ride.driver !== "string" &&
        ride.driver.name
          .toLowerCase()
          .includes(filters.driverName.toLowerCase())
      : true;
    const riderMatch = filters.riderName
      ? ride.rider &&
        typeof ride.rider !== "string" &&
        ride.rider.name.toLowerCase().includes(filters.riderName.toLowerCase())
      : true;
    const dateMatch = filterDate ? rideDate! >= filterDate : true;

    return statusMatch && driverMatch && riderMatch && dateMatch;
  });

  const statuses = ["all", "REQUESTED", "COMPLETED", "CANCELLED"];

  return (
    <div>
      <PageBreadcrumb title="Manage Rides" pageTitle="All Rides" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
        <h1 className="text-2xl font-bold">All Rides</h1>
      </div>

      <Tabs
        value={filters.status || "all"}
        onValueChange={(val) =>
          setFilters((prev) => ({
            ...prev,
            status: val === "all" ? "" : val,
            page: 1,
          }))
        }
        className="mt-6 w-full"
      >
        <TabsList className="grid grid-cols-4 w-full md:w-[600px] rounded-lg border bg-muted/10">
          {statuses.map((status) => (
            <TabsTrigger key={status} value={status}>
              {status === "all"
                ? "All Rides"
                : status.charAt(0) + status.slice(1).toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {statuses.map((status) => {
          const ridesForTab =
            status === "all"
              ? filteredRides ?? []
              : (filteredRides ?? []).filter((ride) => ride.status === status);

          return (
            <TabsContent key={status} value={status} className="mt-6">
              {/* Filters (keep as-is) */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <Input
                    value={filters.driverName}
                    onChange={(e) =>
                      handleFilterChange("driverName", e.target.value)
                    }
                    placeholder="Driver Name"
                  />
                  <Input
                    value={filters.riderName}
                    onChange={(e) =>
                      handleFilterChange("riderName", e.target.value)
                    }
                    placeholder="Rider Name"
                  />
                  <div className="md:flex md:justify-end">
                    <Input
                      type="date"
                      value={filters.date}
                      onChange={(e) =>
                        handleFilterChange("date", e.target.value)
                      }
                      placeholder="Filter by Date"
                      className="w-fit"
                    />
                  </div>
                </div>

                <Select
                  value={filters.status || "all"}
                  onValueChange={(val) =>
                    handleFilterChange("status", val === "all" ? "" : val)
                  }
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="all">All Status</SelectItem>
                      {Object.keys(statusColors).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              {isLoading ? (
                <p className="text-center py-10 text-muted-foreground">
                  Loading rides...
                </p>
              ) : error ? (
                <p className="text-center py-10 text-red-500">
                  Failed to load rides
                </p>
              ) : (
                <>
                  <AllRidesTable rides={ridesForTab} />

                  {/* Pagination */}
                  <div className="flex justify-center md:justify-end mt-4">
                    <TablePagination
                      currentPage={filters.page}
                      setCurrentPage={(value) =>
                        handlePageChange(
                          typeof value === "number"
                            ? value
                            : value(filters.page)
                        )
                      }
                      totalPage={data?.meta?.totalPage || 1}
                    />
                  </div>
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ViewAllRides;
