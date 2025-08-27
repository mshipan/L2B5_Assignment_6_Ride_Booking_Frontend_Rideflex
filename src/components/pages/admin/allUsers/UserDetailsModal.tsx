import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetSingleUserInfoQuery } from "@/redux/features/user/user.api";
import { useForm } from "react-hook-form";

interface UserDetailsModalProps {
  userId: string | null;
  open: boolean;
  onClose: () => void;
}

const UserDetailsModal = ({ userId, open, onClose }: UserDetailsModalProps) => {
  const { data, isLoading, error } = useGetSingleUserInfoQuery(userId!, {
    skip: !userId,
  });

  const userData = data?.data;

  console.log("uu", userData);

  const form = useForm({
    defaultValues: {
      name: userData?.name ?? "",
      email: userData?.email ?? "",
      phone: userData?.phone ?? "",
      role: userData?.role ?? "",
      address: userData?.address ?? "",
      status: userData?.isActive ? "Active" : "Inactive",
      approval: userData?.approvalStatus ?? "",
      isOnline: userData?.isOnline ? "Online" : "Offline",
      isVerified: userData?.isVerified ? "Verified" : "Not Verified",
      vehicleModel: userData?.vehicleInfo?.model ?? "",
      plateNumber: userData?.vehicleInfo?.plateNumber ?? "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        {isLoading && <p>Loading...</p>}

        {error ? (
          <p className="text-red-500">Failed to load user details</p>
        ) : null}

        {userData && (
          <Form {...form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                name="name"
                render={() => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input value={userData.name} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                name="email"
                render={() => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input value={userData.email} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                name="phone"
                render={() => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input value={userData.phone || "N/A"} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                name="address"
                render={() => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input value={userData.address || "N/A"} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                name="role"
                render={() => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input value={userData.role} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                name="status"
                render={() => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input
                        value={userData.isActive ? "Active" : "Inactive"}
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Approval */}
              <FormField
                name="approval"
                render={() => (
                  <FormItem>
                    <FormLabel>Approval</FormLabel>
                    <FormControl>
                      <Input value={userData.approvalStatus} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Online */}
              <FormField
                name="isOnline"
                render={() => (
                  <FormItem>
                    <FormLabel>Online Status</FormLabel>
                    <FormControl>
                      <Input
                        value={userData.isOnline ? "Online" : "Offline"}
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Verified */}
              <FormField
                name="isVerified"
                render={() => (
                  <FormItem>
                    <FormLabel>Verification</FormLabel>
                    <FormControl>
                      <Input
                        value={
                          userData.isVerified ? "Verified" : "Not Verified"
                        }
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Extra fields for driver */}
            {userData.role === "DRIVER" && (
              <div className="w-full">
                <p className="mb-4 pb-1 border-b border-muted-foreground border-dashed">
                  Vehical Info
                </p>
                <div className="flex gap-4 w-full">
                  <div className="w-1/2">
                    <FormField
                      name="vehicleModel"
                      render={() => (
                        <FormItem>
                          <FormLabel>Vehicle Model</FormLabel>
                          <FormControl>
                            <Input
                              value={userData.vehicleInfo?.model || "N/A"}
                              readOnly
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/2">
                    <FormField
                      name="plateNumber"
                      render={() => (
                        <FormItem>
                          <FormLabel>Plate Number</FormLabel>
                          <FormControl>
                            <Input
                              value={userData.vehicleInfo?.plateNumber || "N/A"}
                              readOnly
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
