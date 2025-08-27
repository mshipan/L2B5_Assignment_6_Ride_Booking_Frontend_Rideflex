import MyRides from "@/pages/rider/MyRides";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const RiderHome = lazy(() => import("@/pages/rider/RiderHome"));

export const riderSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        url: "/rider/home",
        component: RiderHome,
      },
    ],
  },
  {
    title: "Rides",
    items: [
      {
        title: "My Rides",
        url: "/rider/my-ride",
        component: MyRides,
      },
    ],
  },
  //   {
  //     title: "Payments",
  //     items: [
  //       {
  //         title: "My Payments",
  //         url: "/dashboard/rider/payments",
  //         component: RiderPayments,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Profile",
  //     items: [
  //       {
  //         title: "My Profile",
  //         url: "/dashboard/rider/profile",
  //         component: RiderProfile,
  //       },
  //     ],
  //   },
];
