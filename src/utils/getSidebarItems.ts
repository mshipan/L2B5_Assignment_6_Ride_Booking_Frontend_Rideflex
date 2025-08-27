import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";
import { riderSidebarItems } from "@/routes/riderSidebarItem";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.SUPER_ADMIN:
      return [...adminSidebarItems];
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.RIDER:
      return [...riderSidebarItems];
    case role.DRIVER:
      return [...driverSidebarItems];
    default:
      return [];
  }
};
