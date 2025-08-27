import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 text-primary py-20 px-6 md:px-12 lg:px-20 shadow-lg mt-16 mb-14">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ride Smarter?
          </h2>
          <p className="text-lg opacity-90">
            Join thousands of riders and drivers who trust our platform every
            day. Safe, fast, and reliable rides are just a tap away.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/register">
            <Button
              variant="outline"
              size="lg"
              className=" text-orange-600 font-semibold cursor-pointer"
            >
              Sign Up
            </Button>
          </Link>
          <Button
            size="lg"
            className="bg-orange-400 text-black hover:bg-orange-500 font-semibold cursor-pointer"
          >
            Download App
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
