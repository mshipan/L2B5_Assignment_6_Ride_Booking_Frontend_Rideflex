import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/about/About";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Contact from "@/pages/contact/Contact";
import FAQ from "@/pages/faq/FAQ";
import Features from "@/pages/features/Features";
import Home from "@/pages/home/Home";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { riderSidebarItems } from "./riderSidebarItem";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import UnAuthorized from "@/pages/unauthorized/UnAuthorized";
import ProfilePage from "@/pages/profile/ProfilePage";
import { driverSidebarItems } from "./driverSidebarItems";
import RequestRide from "@/pages/requestRide/RequestRide";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: Home },
      { path: "/about", Component: About },
      { path: "/features", Component: Features },
      { path: "/contact", Component: Contact },
      { path: "/faq", Component: FAQ },
      { path: "/request-a-ride", Component: RequestRide },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/home" /> },
      { path: "/admin/profile", Component: ProfilePage },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/rider",
    Component: withAuth(DashboardLayout, role.RIDER as TRole),
    children: [
      { index: true, element: <Navigate to="/rider/home" /> },
      { path: "/rider/profile", Component: ProfilePage },
      ...generateRoutes(riderSidebarItems),
    ],
  },
  {
    path: "/driver",
    Component: withAuth(DashboardLayout, role.DRIVER as TRole),
    children: [
      { index: true, element: <Navigate to="/driver/home" /> },
      { path: "/driver/profile", Component: ProfilePage },
      ...generateRoutes(driverSidebarItems),
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/unauthorized",
    Component: UnAuthorized,
  },
]);

export default router;
