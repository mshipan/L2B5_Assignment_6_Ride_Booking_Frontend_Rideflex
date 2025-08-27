import AllUsersTable from "@/components/pages/admin/allUsers/AllUsersTable";
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
import { useAllUsersQuery } from "@/redux/features/user/user.api";
import { useEffect, useState } from "react";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const { data: allUsers, isLoading: allLoading } = useAllUsersQuery({
    page: currentPage,
    search: searchTerm,
    role: roleFilter,
    isActive: statusFilter,
  });

  const { data: activeUsers, isLoading: activeLoading } = useAllUsersQuery({
    page: currentPage,
    search: searchTerm,
    role: roleFilter,
    isActive: "ACTIVE",
  });

  const { data: inactiveUsers, isLoading: inactiveLoading } = useAllUsersQuery({
    page: currentPage,
    search: searchTerm,
    role: roleFilter,
    isActive: "INACTIVE",
  });

  const totalPage = allUsers?.meta?.totalPage || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  return (
    <div>
      <PageBreadcrumb title="Manage Users" pageTitle="All Users" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>

      <Tabs defaultValue="all" className="mt-6 w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-80 rounded-lg border bg-muted/10">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        {/* All Users */}
        <TabsContent value="all" className="mt-6">
          <div className="flex flex-col md:flex-row item-center justify-between mb-3">
            <p className="text-muted-foreground mb-4">
              Below is the list of all registered users including riders and
              drivers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 item-center gap-4">
              {/* Search */}
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by name or email..."
                className="max-w-xl"
              />

              {/* Role Filter */}
              <Select
                value={roleFilter || "all"}
                onValueChange={(value) =>
                  setRoleFilter(value === "all" ? undefined : value)
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="RIDER">Rider</SelectItem>
                    <SelectItem value="DRIVER">Driver</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                value={statusFilter || "all"}
                onValueChange={(value) => {
                  if (value === "all") {
                    setStatusFilter(undefined);
                  } else {
                    setStatusFilter(value);
                  }
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {allLoading ? (
            <p className="text-center py-10 text-muted-foreground">
              Loading users...
            </p>
          ) : allUsers?.users?.length ? (
            <AllUsersTable
              data={allUsers.users.filter(
                (user) => user.role !== "ADMIN" && user.role !== "SUPER_ADMIN"
              )}
            />
          ) : (
            <p className="text-center py-10 text-muted-foreground">
              No users found.
            </p>
          )}
          <div className="flex justify-center md:justify-end mt-4">
            <div>
              <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            </div>
          </div>
        </TabsContent>

        {/* Active Users */}
        <TabsContent value="active" className="mt-6">
          <div className="flex flex-col md:flex-row item-center justify-between mb-3">
            <p className="text-muted-foreground mb-4">
              These users are currently active and allowed to use the platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 item-center gap-4">
              {/* Search */}
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by name or email..."
                className="max-w-xl"
              />

              {/* Role Filter */}
              <Select
                value={roleFilter || "all"}
                onValueChange={(value) =>
                  setRoleFilter(value === "all" ? undefined : value)
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="RIDER">Rider</SelectItem>
                    <SelectItem value="DRIVER">Driver</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {activeLoading ? (
            <p className="text-center py-10 text-muted-foreground">
              Loading active users...
            </p>
          ) : activeUsers?.users?.length ? (
            <AllUsersTable
              data={activeUsers.users.filter(
                (user) => user.role !== "ADMIN" && user.role !== "SUPER_ADMIN"
              )}
            />
          ) : (
            <p className="text-center py-10 text-muted-foreground">
              No active users found.
            </p>
          )}
          <div className="flex justify-center md:justify-end mt-4">
            <div>
              <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            </div>
          </div>
        </TabsContent>

        {/* Inactive Users */}
        <TabsContent value="inactive" className="mt-6">
          <div className="flex flex-col md:flex-row item-center justify-between mb-3">
            <p className="text-muted-foreground mb-4">
              These users are inactive. They might be suspended, blocked, or
              haven’t verified their account.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 item-center gap-4">
              {/* Search */}
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by name or email..."
                className="max-w-xl"
              />

              {/* Role Filter */}
              <Select
                value={roleFilter || "all"}
                onValueChange={(value) =>
                  setRoleFilter(value === "all" ? undefined : value)
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="RIDER">Rider</SelectItem>
                    <SelectItem value="DRIVER">Driver</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {inactiveLoading ? (
            <p className="text-center py-10 text-muted-foreground">
              Loading inactive users...
            </p>
          ) : inactiveUsers?.users?.length ? (
            <AllUsersTable
              data={inactiveUsers.users.filter(
                (user) => user.role !== "ADMIN" && user.role !== "SUPER_ADMIN"
              )}
            />
          ) : (
            <p className="text-center py-10 text-muted-foreground">
              No inactive users found.
            </p>
          )}
          <div className="flex justify-center md:justify-end mt-4">
            <div>
              <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllUsers;
