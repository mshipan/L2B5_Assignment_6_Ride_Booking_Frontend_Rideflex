import { CreditCard, MapPin, Navigation2 } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Choose Pickup & Destination",
      icon: <MapPin className="text-4xl text-orange-500" />,
      description:
        "Select your pickup point and destination in just a few taps.",
    },
    {
      title: "Track Your Ride",
      icon: <Navigation2 className="text-4xl text-orange-500" />,
      description: "Follow your driver in real-time on the map until arrival.",
    },
    {
      title: "Pay Seamlessly",
      icon: <CreditCard className="text-4xl text-orange-500" />,
      description:
        "Pay safely using multiple payment options including cards and mobile wallets.",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
