import AvailabilityToggle from "@/components/shared/AvailabilityToggle";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IResponse, IUser } from "@/types";

interface DriverStatusProps {
  userData: IResponse<IUser>;
  isLoading: boolean;
}

const DriverStatus = ({ userData, isLoading }: DriverStatusProps) => {
  if (isLoading) {
    return (
      <Card className="bg-gray-100 dark:bg-gray-800 animate-pulse">
        <CardContent className="h-16"></CardContent>
      </Card>
    );
  }

  const online = userData?.data?.isOnline ?? false;

  return (
    <Card className="rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-start gap-2">
              <CardTitle className="text-xl md:text-2xl">
                Driver Status
              </CardTitle>
              <Badge
                variant="default"
                className={`py-0 ${online ? "bg-green-400" : "bg-gray-500"}`}
              >
                {online ? "Online" : "Offline"}
              </Badge>
            </div>
            <CardDescription>
              {!online ? (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  You need to go online to see available rides.
                </span>
              ) : (
                <span>
                  Toggle your availability to start receiving ride requests.
                </span>
              )}
            </CardDescription>
          </div>
          {/* Availability Toggle */}
          <div className="mt-2">
            <AvailabilityToggle initialOnline={online} />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default DriverStatus;
