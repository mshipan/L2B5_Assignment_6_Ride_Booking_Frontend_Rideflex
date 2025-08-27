import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggler } from "@/components/shared/ModeToggler";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { Outlet, useNavigate } from "react-router";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { data: user } = useUserInfoQuery(undefined);

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
          </div>
          <div className="flex items-center gap-4">
            {/* Role-based Welcome Button */}
            {user?.data && (
              <div className="text-sm">
                Profile{" "}
                <Badge
                  variant="default"
                  className="bg-orange-500 py-1 px-4 text-black dark:text-white text-md cursor-pointer"
                  onClick={handleProfileClick}
                >
                  {user?.data?.name}
                </Badge>
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
