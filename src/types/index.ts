import type { ComponentType } from "react";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface IErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  errorMessages?: {
    path: string;
    message: string;
  }[];
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "RIDER" | "DRIVER";
export type TUserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
export type TApprovalStatus = "PENDING" | "APPROVED" | "SUSPENDED";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: TUserStatus;
  isVerified?: boolean;
  role: TRole;
  approvalStatus: TApprovalStatus;
  isOnline: boolean;
  vehicleInfo?: {
    model?: string;
    plateNumber?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
