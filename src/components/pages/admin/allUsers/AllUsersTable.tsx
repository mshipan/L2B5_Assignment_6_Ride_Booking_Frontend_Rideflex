import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useSetUserApprovalStatusMutation,
  useSetUserStatusMutation,
} from "@/redux/features/user/user.api";
import type { IUser, TApprovalStatus, TUserStatus } from "@/types";
import { Eye } from "lucide-react";
import { useState } from "react";
import UserDetailsModal from "./UserDetailsModal";

const AllUsersTable = ({ data }: { data?: IUser[] }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [loadingUserApproveId, setLoadingUserApproveId] = useState<
    string | null
  >(null);

  const [setUserStatus] = useSetUserStatusMutation();
  const [setUserApprovalStatus] = useSetUserApprovalStatusMutation();

  const handleStatusChange = async (userId: string, status: TUserStatus) => {
    try {
      setLoadingUserId(userId);
      await setUserStatus({ userId, isActive: status }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleApprovalChange = async (
    userId: string,
    status: TApprovalStatus
  ) => {
    try {
      setLoadingUserApproveId(userId);
      await setUserApprovalStatus({ userId, approvalStatus: status }).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUserApproveId(null);
    }
  };

  const handleViewUser = (id: string) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  if (!data || data.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-muted-foreground"
            >
              No users found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Status Action</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead className="text-right"> Approval Actions</TableHead>
            <TableHead className="text-right"> View Profile</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user, i) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "RIDER" ? "secondary" : "default"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.isActive === "ACTIVE"
                      ? "default"
                      : user.isActive === "INACTIVE"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {loadingUserId === user._id ? "..." : user.isActive}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  value={user.isActive || "ACTIVE"}
                  onValueChange={(value: TUserStatus) =>
                    handleStatusChange(user._id, value as TUserStatus)
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.approvalStatus === "PENDING"
                      ? "default"
                      : user.approvalStatus === "APPROVED"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {loadingUserApproveId === user._id
                    ? "..."
                    : user.approvalStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-right flex justify-end">
                <Select
                  value={user.approvalStatus || "PENDING"}
                  onValueChange={(value: TApprovalStatus) =>
                    handleApprovalChange(user._id, value as TApprovalStatus)
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="APPROVED">Approve</SelectItem>
                      <SelectItem value="SUSPENDED">Suspend</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleViewUser(user._id)}
                >
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserDetailsModal
        userId={selectedUserId}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AllUsersTable;
