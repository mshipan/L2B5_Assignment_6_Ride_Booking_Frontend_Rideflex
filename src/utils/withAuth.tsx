import { useUserInfoQuery } from "@/redux/features/user/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data: userData, isLoading } = useUserInfoQuery(undefined);

    if (!isLoading && !userData?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== userData?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
