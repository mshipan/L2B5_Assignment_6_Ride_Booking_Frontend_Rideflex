import AllUsers from "@/pages/admin/AllUsers";
import ViewAllRides from "@/pages/admin/ViewAllRides";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AdminHome = lazy(() => import("@/pages/admin/AdminHome"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        url: "/admin/home",
        component: AdminHome,
      },
    ],
  },
  {
    title: "Manage Users",
    items: [{ title: "All Users", url: "/admin/users", component: AllUsers }],
  },
  {
    title: "Manage Rides",
    items: [
      { title: "All Rides", url: "/admin/rides", component: ViewAllRides },
    ],
  },
];
