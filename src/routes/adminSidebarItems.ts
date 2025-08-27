import AllUsers from "@/pages/admin/AllUsers";
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
  //   {
  //     title: "Ride Management",
  //     url: "/dashboard/admin/rides",
  //     items: [
  //       { title: "All Rides", url: "/dashboard/admin/rides" },
  //       { title: "Ongoing Rides", url: "/dashboard/admin/rides?status=ongoing" },
  //       {
  //         title: "Completed Rides",
  //         url: "/dashboard/admin/rides?status=completed",
  //       },
  //       {
  //         title: "Cancelled Rides",
  //         url: "/dashboard/admin/rides?status=cancelled",
  //       },
  //       { title: "Reports", url: "/dashboard/admin/reports" },
  //     ],
  //   },
];
