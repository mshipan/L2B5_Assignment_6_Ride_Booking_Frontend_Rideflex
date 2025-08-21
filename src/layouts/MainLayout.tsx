import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

import { Outlet } from "react-router";

export interface NavigationLink {
  href: string;
  label: string;
  active?: boolean;
}

const MainLayout = () => {
  const navigationLinks: NavigationLink[] = [
    { href: "/", label: "Home", active: true },
    { href: "/features", label: "Features" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
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
