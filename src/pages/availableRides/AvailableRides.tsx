import AvailableRidesGrid from "@/components/pages/availableRides/AvailableRidesGrid";
import DriverStatus from "@/components/pages/availableRides/DriverStatus";
import { Button } from "@/components/ui/button";
import { useGetAvailableRidesQuery } from "@/redux/features/driver/driver.api";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

const AvailableRides = () => {
  const { data: userData, isLoading: userLoading } =
    useUserInfoQuery(undefined);
  const {
    data: allAvailableRides,
    isLoading,
    error,
  } = useGetAvailableRidesQuery();

  console.log("aa rid", allAvailableRides);
  console.log("aa err", error);

  const online = userData?.data?.isOnline;

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
      {/* Banner Section */}
      <section className="relative bg-gray-200 dark:bg-gray-900 text-primary px-6 py-16 text-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">Available Rides</h1>
        <p className="text-md md:text-xl max-w-2xl mx-auto mb-6">
          Check out the rides currently available for you!
        </p>
        <Button
          variant="outline"
          className="px-6 py-3 bg-white text-primary font-semibold rounded-full shadow hover:bg-gray-100 transition"
        >
          Available Rides
        </Button>
      </section>

      {/* Status & Toggle Section */}
      <DriverStatus userData={userData} isLoading={userLoading} />

      {/* Available Rides Grid */}
      {online && (
        <AvailableRidesGrid
          rides={allAvailableRides?.data ?? []}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default AvailableRides;
