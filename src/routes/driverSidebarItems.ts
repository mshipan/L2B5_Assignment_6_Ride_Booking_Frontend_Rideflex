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
  //   {
  //     title: "Rides",
  //     items: [
  //       {
  //         title: "Book a Ride",
  //         url: "/dashboard/rider/book-ride",
  //         component: RideBooking,
  //       },
  //       {
  //         title: "Ride History",
  //         url: "/dashboard/rider/history",
  //         component: RideHistory,
  //       },
  //     ],
  //   },
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
