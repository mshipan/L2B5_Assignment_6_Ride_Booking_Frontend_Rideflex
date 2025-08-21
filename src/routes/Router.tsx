import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [{ path: "/", Component: Home }],
  },
]);

export default router;
