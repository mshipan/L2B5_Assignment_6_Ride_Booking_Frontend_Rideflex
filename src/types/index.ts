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

// rides

export type RideStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "CANCELLED";

export interface IRide {
  _id: string;
  rider: string | IUser;
  driver?: string | IUser;
  pickupLocation: string;
  destinationLocation: string;
  fare?: number;
  distanceInKm?: number;
  durationInMinutes?: number;
  status?: RideStatus;
  createdAt?: string;
  requestedAt?: string;
  accepteddAt?: string;
  pickedUpAt?: string;
  transitStartedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

export interface RideQueryParams {
  status?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  limit: number;
}

export interface DriverHistoryParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface AdminDashboard {
  userSummary: {
    totalRiders: number;
    totalDrivers: number;
    activeDrivers: number;
    suspendedDrivers: number;
    blockedRiders: number;
  };
  rideSummary: {
    totalRides: number;
    completedRides: number;
    cancelledRides: number;
    ongoingRides: number;
  };
  revenueSummary: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
  driverActivity: {
    topDriversByRides: { driver: { name: string }; rides: number }[];
    topDriversByEarnings: { driver: { name: string }; earnings: number }[];
  };
  recentActivity: {
    _id: string;
    status: string;
    fare: number;
    createdAt: string;
    rider?: { name: string };
    driver?: { name: string };
  }[];
}

export interface RiderDashboard {
  rideSummary: {
    total: number;
    completed: number;
    cancelled: number;
    active: number;
  };
  riderStatus: {
    inActiveRide: boolean;
    activeRideId?: string;
  };
  spendingSummary: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
  recentActivity: {
    _id: string;
    driver: { name: string };
    status: string;
    fare: number;
    createdAt: string;
  }[];
}

export interface DriverDashboard {
  rideSummary: {
    total: number;
    completed: number;
    cancelled: number;
    active: number;
  };
  earningsSummary: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
  driverStatus: { isOnline: boolean };
}
