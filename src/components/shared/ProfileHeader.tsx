import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, MapPin } from "lucide-react";
import type { IResponse, IUser } from "@/types";
import { format } from "date-fns";

interface ProfileHeaderProps {
  userData: IResponse<IUser>;
}

export default function ProfileHeader({ userData }: ProfileHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="flex-1 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h1 className="text-2xl font-bold">
                {userData?.data?.name || "No Name"}
              </h1>
              <Badge variant="secondary">{userData?.data?.isActive}</Badge>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="text-muted-foreground">
                <span>Role:</span>{" "}
                <Badge variant="secondary">{userData?.data?.role}</Badge>{" "}
              </div>
              <div className="text-muted-foreground">
                <span>Status:</span>{" "}
                <Badge variant="secondary">
                  {userData?.data?.approvalStatus}
                </Badge>{" "}
              </div>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {userData?.data?.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {userData?.data?.address || "No address provided yet"}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined{" "}
                {userData?.data?.createdAt
                  ? format(new Date(userData?.data?.createdAt), "dd MMM yyyy")
                  : "N/A"}
              </div>
            </div>
          </div>

          <Badge
            variant="default"
            className={`px-4 py-2 ${
              userData?.data?.isVerified ? "bg-blue-600" : "bg-red-600"
            }  text-white`}
          >
            {userData?.data?.isVerified ? "Verified" : "Not Verified"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
