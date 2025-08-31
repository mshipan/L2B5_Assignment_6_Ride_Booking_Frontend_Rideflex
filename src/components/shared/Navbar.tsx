import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { NavigationLink } from "@/layouts/MainLayout";
import { Link } from "react-router";
import { ModeToggler } from "./ModeToggler";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

interface NavbarProps {
  navigationLinks: NavigationLink[];
}

export default function Navbar({ navigationLinks }: NavbarProps) {
  const { data: userData } = useUserInfoQuery(undefined);

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    const toastId = toast.loading("Logging Out...");

    try {
      const res = await logout(undefined).unwrap();

      dispatch(authApi.util.resetApiState());

      if (res.success) {
        toast.success("Logged out successfully!", { id: toastId });
      }
    } catch (err) {
      const error = err as { data?: IErrorResponse };
      console.error(error);
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b px-4 md:px-6 bg-primary-foreground">
      <div className="flex h-16 items-center justify-between container mx-auto">
        {/* Left side: Logo */}
        <Link to="/" className="flex items-center">
          <Logo />
          <span className="text-2xl md:text-4xl font-bold ml-3 text-orange-500">
            Rideflex
          </span>
        </Link>

        {/* Center: Navigation links */}
        <nav className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {navigationLinks.map((link, index) => {
                if (
                  link.role === "PUBLIC" ||
                  link.role === userData?.data?.role
                ) {
                  return (
                    <NavigationMenuItem key={link.href + index}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  );
                }
                return null;
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex">
          {/* Right side: Buttons */}
          <div className="flex items-center gap-2">
            <ModeToggler />
            {userData?.data?.email && (
              <Button
                onClick={handleLogOut}
                variant="outline"
                className="cursor-pointer"
              >
                Logout
              </Button>
            )}
            {!userData?.data?.email && (
              <>
                <Button asChild variant="ghost" size="sm" className="text-sm">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild size="sm" className="text-sm">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  {/* Hamburger Icon */}
                  <svg
                    className="pointer-events-none"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <Link to={link.href} className="py-1.5">
                          {link.label}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
