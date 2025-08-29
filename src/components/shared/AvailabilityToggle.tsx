import { useUpdateDriverAvailabilityMutation } from "@/redux/features/driver/driver.api";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

const AvailabilityToggle = ({ initialOnline }: { initialOnline: boolean }) => {
  const [isOnline, setIsOnline] = useState(initialOnline);

  const [updateAvailability, { isLoading }] =
    useUpdateDriverAvailabilityMutation();

  useEffect(() => {
    setIsOnline(initialOnline);
  }, [initialOnline]);

  const handleToggle = async () => {
    try {
      const newStatus = !isOnline;

      await updateAvailability(newStatus).unwrap();

      setIsOnline(newStatus);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Switch
        checked={isOnline}
        onCheckedChange={handleToggle}
        disabled={isLoading}
      />
    </>
  );
};

export default AvailabilityToggle;
