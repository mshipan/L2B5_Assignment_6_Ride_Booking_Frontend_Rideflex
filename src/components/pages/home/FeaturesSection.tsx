import { Bell, Car, CreditCard, Map, UserCog, Wallet } from "lucide-react";

const FeaturesSection = () => {
  const riderFeatures = [
    {
      title: "Request Ride",
      icon: <Car className="w-12 h-12 text-orange-500 mx-auto" />,
      description:
        "Quickly book a ride with just a few taps anytime, anywhere.",
    },
    {
      title: "Track",
      icon: <Map className="w-12 h-12 text-orange-500 mx-auto" />,
      description: "Track your driver’s location live on the map.",
    },
    {
      title: "Payment Options",
      icon: <CreditCard className="w-12 h-12 text-orange-500 mx-auto" />,
      description: "Pay seamlessly with cards, wallets, or cash.",
    },
  ];

  const driverFeatures = [
    {
      title: "Earnings Dashboard",
      icon: <Wallet className="w-12 h-12 text-orange-500 mx-auto" />,
      description: "View your daily and weekly earnings with insights.",
    },
    {
      title: "Ride Requests",
      icon: <Bell className="w-12 h-12 text-orange-500 mx-auto" />,
      description: "Get notified instantly when new ride requests arrive.",
    },
    {
      title: "Profile Management",
      icon: <UserCog className="w-12 h-12 text-orange-500 mx-auto" />,
      description: "Easily manage your profile and ride preferences.",
    },
  ];
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          Our Features
        </h2>

        {/* Rider Features */}
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Rider Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {riderFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Driver Features */}
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Driver Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {driverFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
