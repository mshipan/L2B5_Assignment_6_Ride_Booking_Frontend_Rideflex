import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { registerSchema } from "@/schemas/registerSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";
import { Eye, EyeOff } from "lucide-react";

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [role, setRole] = useState<"RIDER" | "DRIVER" | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [registerUser, { isLoading: isRegistering, isSuccess }] =
    useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      role: "",
      vehicleInfo: undefined,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const toastId = toast.loading("Registering...");

    try {
      const res = await registerUser(data).unwrap();

      if (res.success) {
        toast.success("Registration Successfull", { id: toastId });

        const loginData = {
          email: data.email,
          password: data.password,
        };

        const loginRes = await loginUser(loginData).unwrap();

        if (loginRes.success) {
          toast.success("Logged in Successfully");
          navigate("/");
        }
      }

      form.reset();
    } catch (err) {
      const error = err as { data?: IErrorResponse };
      console.log(error);
      toast.error(error?.data?.message || "Registration failed", {
        id: toastId,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="max-w-md mx-auto flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl md:text-2xl font-bold">
            Register to your account
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter the fields below to register
          </p>

          {isSuccess && (
            <p className="text-green-500 text-sm mt-2">
              Registered successfully!
            </p>
          )}
        </div>
        <div className="grid gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
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
                  <Input placeholder="017XXXXXXXX" {...field} />
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
                  <Input placeholder="Your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setRole(e.target.value as "RIDER" | "DRIVER");
                    }}
                    className="border rounded-md px-3 py-2 w-full bg-muted"
                  >
                    <option value="">Select Role</option>
                    <option value="RIDER">Rider</option>
                    <option value="DRIVER">Driver</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vehicle Info - Only for Drivers */}
          {role === "DRIVER" && (
            <>
              <FormField
                control={form.control}
                name="vehicleInfo.model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Model" {...field} />
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

          <Button
            type="submit"
            disabled={isRegistering}
            className="w-full cursor-pointer"
          >
            {isRegistering ? "Registering..." : "Register"}
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
}
