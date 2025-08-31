import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggler } from "@/components/shared/ModeToggler";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hook";
import type { IErrorResponse } from "@/types";
import { UserIcon } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { data: user } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleProfileClick = () => {
    if (!user) return;

    switch (user?.data?.role) {
      case "ADMIN":
        navigate("/admin/profile");
        break;
      case "DRIVER":
        navigate("/driver/profile");
        break;
      case "RIDER":
        navigate("/rider/profile");
        break;
      default:
        navigate("/");
    }
  };

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />

            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <div>
              <h1>
                {user?.data?.role === "ADMIN"
                  ? "Admin "
                  : user?.data?.role === "RIDER"
                  ? "Rider "
                  : "Driver "}
                Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Role-based Welcome Button */}
            {user?.data && (
              <div className="text-sm">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer w-10 h-10 border border-black dark:border-muted">
                      <AvatarFallback>
                        <UserIcon className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={handleProfileClick}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogOut}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <ModeToggler />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
