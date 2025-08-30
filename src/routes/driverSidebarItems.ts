import DriverHistory from "@/pages/driver/DriverHistory";
import DriverRide from "@/pages/driver/DriverRide";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const DriverHome = lazy(() => import("@/pages/driver/DriverHome"));

export const driverSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        url: "/driver/home",
        component: DriverHome,
      },
    ],
  },
  {
    title: "Manage Rides",
    items: [
      {
        title: "Active Ride",
        url: "/driver/active-rides",
        component: DriverRide,
      },
      {
        title: "Ride History",
        url: "/driver/ride-history",
        component: DriverHistory,
      },
      // {
      //   title: "Ride History",
      //   url: "/rider/ride-history",
      //   component: RiderHistoryPage,
      // },
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
