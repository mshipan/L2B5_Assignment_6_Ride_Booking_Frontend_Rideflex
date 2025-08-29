import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { role } from "@/constants/role";

import { Outlet } from "react-router";

export interface NavigationLink {
  href: string;
  label: string;
  active?: boolean;
  role?: string;
}

const MainLayout = () => {
  const navigationLinks: NavigationLink[] = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/features", label: "Features", role: "PUBLIC" },
    { href: "/about", label: "About Us", role: "PUBLIC" },
    { href: "/contact", label: "Contact", role: "PUBLIC" },
    { href: "/faq", label: "FAQ", role: "PUBLIC" },
    { href: "/admin", label: "Dashboard", role: role.ADMIN },
    { href: "/request-a-ride", label: "Request Ride", role: role.RIDER },
    { href: "/rider", label: "Dashboard", role: role.RIDER },
    { href: "/driver", label: "Dashboard", role: role.DRIVER },
    { href: "/available-rides", label: "Rides", role: role.DRIVER },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navigationLinks={navigationLinks} />
      <div className="grow-1 bg-primary-foreground">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
