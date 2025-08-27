import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Name is required." })
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(50, { message: "Name cannot exceed 50 characters." }),
    email: z.email({ message: "Invalid email format." }),
    password: z
      .string({ message: "Password is required." })
      .min(6, { message: "Password must be at least 6 characters long." })
      .regex(/[A-Z]/, {
        message: "Must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Must contain at least one special character.",
      }),
    confirmPassword: z.string({ message: "Confirm password is required" }),
    phone: z
      .string({ message: "Phone Number must be string" })
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
      }),
    role: z
      .enum(["RIDER", "DRIVER"], { message: "Role is required" })
      .or(z.literal("")),
    address: z
      .string({
        message: "Address must be a string.",
      })
      .min(2, { message: "Address must be at least 2 characters." })
      .max(200, { message: "Address can't exceed 200 characters." }),
    vehicleInfo: z
      .object({
        model: z.string().min(2, "Model is required"),
        plateNumber: z.string().min(2, "Plate number is required"),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
