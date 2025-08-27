import unauthorizedImg from "@/assets/images/unauthorized.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

const UnAuthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-lg shadow-lg border rounded-2xl">
        <CardHeader className="text-center">
          <img
            src={unauthorizedImg}
            alt="Unauthorized"
            className="w-40 mx-auto mb-4 drop-shadow-md"
          />
          <CardTitle className="text-2xl font-bold">🚫 Access Denied</CardTitle>
          <CardDescription>
            You don’t have permission to view this page.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-center">
            Please login with the correct account or return to the homepage.
          </p>

          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline" className="cursor-pointer">
                Go Home
              </Button>
            </Link>
            <Link to="/login">
              <Button className="cursor-pointer">Login</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnAuthorized;
