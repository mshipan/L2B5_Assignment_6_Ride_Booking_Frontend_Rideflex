import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Car,
  CheckCircle,
  CreditCard,
  History,
  LayoutDashboard,
  MapPin,
  ShieldAlert,
  Users,
} from "lucide-react";

const Features = () => {
  const riderFeatures = [
    { icon: <Car className="w-6 h-6 text-primary" />, title: "Request Ride" },
    { icon: <MapPin className="w-6 h-6 text-primary" />, title: "Track Ride" },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      title: "Payment Options",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-primary" />,
      title: "SOS Button",
    },
  ];

  const driverFeatures = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Accept/Reject Rides",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Earnings Dashboard",
    },
    {
      icon: <History className="w-6 h-6 text-primary" />,
      title: "Ride History",
    },
  ];

  const adminFeatures = [
    {
      icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
      title: "Ride Management",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "User Management",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Analytics Dashboard",
    },
  ];
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12 space-y-20">
      {/* Banner Section */}
      <section className="relative bg-gray-200 dark:bg-gray-900 text-primary px-6 py-16 text-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">
          Powerful Features for Everyone
        </h1>
        <p className="text-md md:text-xl max-w-2xl mx-auto mb-6">
          Whether you're a Rider, Driver, or Admin — our ride-sharing system
          offers the right tools to make your journey safe, seamless, and smart.
        </p>
        <Button
          variant="outline"
          className="px-6 py-3 bg-white text-primary font-semibold rounded-full shadow hover:bg-gray-100 transition"
        >
          Explore Features
        </Button>
      </section>
      {/* Rider Features */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Rider Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {riderFeatures.map((feature, i) => (
            <Card key={i} className="hover:shadow-lg transition rounded-2xl">
              <CardHeader className="flex items-center space-x-3">
                {feature.icon}
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Driver Features */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Driver Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {driverFeatures.map((feature, i) => (
            <Card key={i} className="hover:shadow-lg transition rounded-2xl">
              <CardHeader className="flex items-center space-x-3">
                {feature.icon}
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Admin Features */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Admin Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, i) => (
            <Card key={i} className="hover:shadow-lg transition rounded-2xl">
              <CardHeader className="flex items-center space-x-3">
                {feature.icon}
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
