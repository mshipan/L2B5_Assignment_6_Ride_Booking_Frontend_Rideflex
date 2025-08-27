import ProfileHeader from "../../components/shared/ProfileHeader";
import ProfileContent from "../../components/shared/ProfileContent";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

export default function ProfilePage() {
  const { data: userData, isLoading, isError } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !userData?.data) {
    return <p>Failed to load user data</p>;
  }

  console.log("user from profile", userData.data);
  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <ProfileHeader userData={userData} />
      <ProfileContent user={userData?.data} />
    </div>
  );
}
