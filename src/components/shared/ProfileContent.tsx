import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import type { IErrorResponse, IUser } from "@/types";
import { useUpdateProfileMutation } from "@/redux/features/user/user.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
// import { useState } from "react";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  vehicleInfo: z
    .object({
      model: z.string().optional(),
      plateNumber: z.string().optional(),
    })
    .optional(),
});

const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .regex(/[A-Z]/, "Must include one uppercase letter")
      .regex(/[a-z]/, "Must include one lowercase letter")
      .regex(/[0-9]/, "Must include one number")
      .regex(/[^A-Za-z0-9]/, "Must include one special character"),
    confirmNewPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ProfileContent({ user }: { user: IUser }) {
  // const [showPassword, setShowPassword] = useState(false);
  // const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      vehicleInfo: user?.vehicleInfo || { model: "", plateNumber: "" },
    },
  });

  const passwordForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    console.log("rr", values);
    const toastId = toast.loading("Updating...");
    try {
      const res = await updateProfile({ id: user._id, body: values }).unwrap();
      if (res.success) {
        toast.success("Profile updated successfully", { id: toastId });
      }
      console.log("Profile updated successfully");
    } catch (err) {
      const error = err as { data?: IErrorResponse };
      console.error(error);

      if (error?.data?.message) {
        toast.error("Failed to update profile", {
          id: toastId,
        });
      }
    }
  };

  const onResetPassword = async (values: ResetPasswordValues) => {
    const toastId = toast.loading("Resetting password...");
    try {
      // await resetPassword({ id: user._id, body: values }).unwrap();
      toast.success("Password reset successfully", { id: toastId });
      passwordForm.reset();
    } catch (err) {
      const error = err as { data?: IErrorResponse };
      toast.error(error?.data?.message || "Failed to reset password", {
        id: toastId,
      });
    }
  };

  const isDriver = user.role === "DRIVER";

  return (
    <div className="space-y-6 flex flex-col md:flex-row w-full gap-6">
      <div className="md:w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <div className="flex flex-row items-center justify-between mr-7">
                <CardHeader className="w-full">
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and profile information.
                  </CardDescription>
                </CardHeader>
                <Badge
                  variant="default"
                  className="px-4 py-2 text-muted font-semibold hidden md:block"
                >
                  Edit Profile
                </Badge>
              </div>

              <CardContent className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled
                          {...field}
                          className="cursor-not-allowed"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+8801XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your address here..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isDriver && (
                  <>
                    <FormField
                      control={form.control}
                      name="vehicleInfo.model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Model</FormLabel>
                          <FormControl>
                            <Input placeholder="Vehicle Model" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicleInfo.plateNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plate Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Plate Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-500 dark:text-white text-black cursor-pointer"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>

      {/* Reset Password Card */}
      <div className="md:w-1/3">
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onResetPassword)}>
            <Card>
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Change your account password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  // disabled={isResetting}
                >
                  {/* {isResetting ? "Resetting..." : "Reset Password"} */}
                  Reset Password
                </Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
